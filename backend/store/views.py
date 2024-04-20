from django.http import JsonResponse
from django.shortcuts import render
from django.shortcuts import get_object_or_404

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status


from userauths.models import User

from decimal import Decimal

from .models import Product, Category, Cart, Tax
from .serializer import ProductReadSerializer
from .serializer import ProductWriteSerializer
from .serializer import CategorySerializer
from .serializer import CartSerializer

import logging

logger = logging.getLogger(__name__)

class CategoryListAPIView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]


class ProductListAPIView(generics.ListAPIView):
    queryset = Product.objects.all()
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT', 'PATCH']:
            return ProductWriteSerializer
        return ProductReadSerializer


class ProductDetailAPIView(generics.RetrieveAPIView):
    #queryset = Product.objects.all()
    serializer_class = ProductReadSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        return Product.objects.get(slug=self.kwargs.get('slug'))
    

class CartAPIView(generics.ListCreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        payload = request.data
        product_id = payload['product_id']
        user_id = payload['user_id']
        qty = payload['qty']
        price = payload['price']
        shipping_amount = payload['shipping_amount']
        country = payload['country']
        size = payload['size']
        color = payload['color']
        cart_id = payload['cart_id']

        try:
            product = Product.objects.filter(status="published", id=product_id).first()
            if not product:
                raise ValueError('Product not found or not published yet.')

            user = None  
            if user_id and user_id != 'undefined':
                user = User.objects.get(id=int(user_id))

            tax = Tax.objects.filter(country=country).first()
            tax_rate = tax.rate / 100 if tax else 0

            cart = Cart.objects.filter(cart_id=cart_id, product=product).first()
            if cart:
                cart.product = product
                cart.user = user
                cart.qty = qty
                cart.price = price
                cart.sub_total = Decimal(price) * int(qty)
                cart.shipping_amount = Decimal(shipping_amount) * int(qty)
                cart.tax_fee = int(qty) * Decimal(tax_rate)
                cart.color = color
                cart.size = size
                cart.cart_id = cart_id
                cart.country = country

                service_fee_percentage = 10 / 100
                cart.service_fee = Decimal(service_fee_percentage) * cart.sub_total

                cart.total = cart.sub_total + cart.shipping_amount + cart.tax_fee + cart.service_fee
                cart.save()

                return Response({'message': 'Cart updated successfully!'}, status=status.HTTP_200_OK)
            
            else:
                cart = Cart.objects.create(
                    product=product,
                    user=user,
                    qty=qty,
                    price=price,
                    sub_total=Decimal(price) * int(qty),
                    shipping_amount=Decimal(shipping_amount) * int(qty),
                    tax_fee=int(qty) * Decimal(tax_rate),
                    color=color,
                    size=size,
                    cart_id=cart_id,
                    country = country
                )

                service_fee_percentage = 10 / 100
                cart.service_fee = Decimal(service_fee_percentage) * cart.sub_total

                cart.total = cart.sub_total + cart.shipping_amount + cart.tax_fee + cart.service_fee
                cart.save()

                return Response({'message': 'Product added to cart successfully!'}, status=status.HTTP_201_CREATED)

        except (ValueError, Product.DoesNotExist, User.DoesNotExist):
            
            return JsonResponse({'message': 'Product/User not found or Product not published yet'}, status=status.HTTP_404_NOT_FOUND)


class CartListAPIView(generics.ListAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        cart_id = self.kwargs.get('cart_id')  # Ensuring you are retrieving from the correct place
        user_id = self.kwargs.get('user_id')

        if user_id is not None:
            user = get_object_or_404(User, id=user_id)
            queryset = Cart.objects.filter(user=user, cart_id=cart_id)
            
        else:
            queryset = Cart.objects.filter(cart_id=cart_id)
            
        return queryset


class CartDetailAPIView(generics.RetrieveAPIView):
    serializer_class = CartSerializer
    permission_classes = [AllowAny]
    lookup_field = 'cart_id'

    def get_queryset(self):
        cart_id = self.kwargs.get('cart_id')  
        user_id = self.kwargs.get('user_id')

        if user_id is not None:
            user = get_object_or_404(User, id=user_id)
            queryset = Cart.objects.filter(user=user, cart_id=cart_id)
            
        else:
            queryset = Cart.objects.filter(cart_id=cart_id)
            
        return queryset
    
    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        
        total_shipping = 0
        total_tax = 0
        total_service_fee = 0
        total_sub_total = 0
        total_total = 0

        for cart_item in queryset:
            total_shipping += self.calculate_shipping(cart_item)
            total_tax += self.calculate_tax(cart_item)
            total_service_fee += self.calculate_service_fee(cart_item)
            total_sub_total += self.calculate_sub_total(cart_item)
            total_total += self.calculate_total(cart_item)

        data = {
            'shipping':total_shipping,
            'tax': total_tax,
            'service_fee': total_service_fee,
            'sub_total': total_sub_total,
            'total': total_total,
            }
        
        return Response(data, status=status.HTTP_200_OK)
    
    def calculate_shipping(self, cart_items):
        return cart_items.shipping_amount
    
    def calculate_tax(self, cart_items):
        return cart_items.tax_fee
    
    def calculate_service_fee(self, cart_items):
        return cart_items.service_fee
    
    def calculate_sub_total(self, cart_items):
        return cart_items.sub_total
    
    def calculate_total(self, cart_items):
        return cart_items.total


class CartItemDeleteAPIView(generics.DestroyAPIView):
    serializer_class = CartSerializer
    lookup_field = 'cart_id'

    def get_object(self):
        cart_id = self.kwargs.get('cart_id')
        item_id = self.kwargs.get('item_id')
        user_id = self.kwargs.get('user_id')

        if user_id:
            user = get_object_or_404(User, id=user_id)
            cart = get_object_or_404(Cart, id=item_id, cart_id=cart_id, user=user)
        else:
            cart = get_object_or_404(Cart, id=cart_id, cart_id=cart_id)

        return cart

