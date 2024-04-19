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


class CartListView(generics.ListAPIView):
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





