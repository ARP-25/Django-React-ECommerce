from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.shortcuts import get_object_or_404
from django.db import transaction, models
from django.db.models.functions import ExtractMonth 
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
import stripe.error


from vendor.models import Vendor
from userauths.models import User

from decimal import Decimal

import stripe
import requests

from backend.settings import stripe_secret_key, stripe_public_key, FROM_EMAIL, PAYPAL_CLIENT_ID, PAYPAL_SECRET_KEY


from store.models import CartOrder, CartOrderItem, Product, Category, Cart, Tax, Coupon, Notification, Review, Wishlist
from store.serializer import ProductReadSerializer
from store.serializer import ProductWriteSerializer
from store.serializer import CategorySerializer
from store.serializer import CartSerializer
from store.serializer import CartOrderSerializer
from store.serializer import CartOrderItemSerializer
from store.serializer import CouponSerializer
from store.serializer import NotificationSerializer
from store.serializer import ReviewSerializer
from store.serializer import WishlistSerializer
from store.serializer import SummarySerializer



class DashboardStatsAPIView(generics.ListAPIView):
    serializer_class = SummarySerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        vendor_id = self.kwargs['vendor_id']
        vendor = Vendor.objects.get(id=vendor_id)

        # Calculate summary values
        product_count = Product.objects.filter(vendor=vendor).count()
        order_count = CartOrder.objects.filter(vendor=vendor, payment_status='paid').count()
        revenue = CartOrderItem.objects.filter(vendor=vendor, order__payment_status='paid').aggregate(total_revenue=models.Sum(models.F('sub_total') + models.F('shipping_amount')))['total_revenue'] or 0

        return [
            {
                'products': product_count,
                'orders': order_count,
                'revenue': revenue
            }
        ]
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    

@api_view(['GET'])
def MonthlyOrderChartAPIView(request, vendor_id):
    vendor = Vendor.objects.get(id=vendor_id)
    orders = CartOrder.objects.filter(vendor=vendor, payment_status='paid')
    order_by_month = orders.annotate(month=ExtractMonth('date')).values('month').annotate(orders=models.Count('id')).order_by('month')

    return Response(order_by_month)


@api_view(['GET'])
def MonthlyProductChartAPIView(request, vendor_id):
    vendor = Vendor.objects.get(id=vendor_id)
    products = Product.objects.filter(vendor=vendor)
    products_by_month = products.annotate(month=ExtractMonth('date')).values('month').annotate(products=models.Count('id')).order_by('month')

    return Response(products_by_month)



    



