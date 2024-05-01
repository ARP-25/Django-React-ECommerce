from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.shortcuts import get_object_or_404
from django.db import transaction
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
import stripe.error


from userauths.models import User

from decimal import Decimal

import stripe
import requests

from backend.settings import stripe_secret_key, stripe_public_key, FROM_EMAIL, PAYPAL_CLIENT_ID, PAYPAL_SECRET_KEY


from store.models import CartOrder, CartOrderItem, Product, Category, Cart, Tax, Coupon, Notification, Review
from store.serializer import ProductReadSerializer
from store.serializer import ProductWriteSerializer
from store.serializer import CategorySerializer
from store.serializer import CartSerializer
from store.serializer import CartOrderSerializer
from store.serializer import CartOrderItemSerializer
from store.serializer import CouponSerializer
from store.serializer import NotificationSerializer
from store.serializer import ReviewSerializer


class OrdersAPIView(generics.ListAPIView):
    queryset = CartOrder.objects.all()
    serializer_class = CartOrderSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        user = User.objects.get(id=user_id)
        orders = CartOrder.objects.filter(buyer=user, payment_status='paid')
        return orders
        

class OrderDetailAPIView(generics.RetrieveAPIView):
    queryset = CartOrder.objects.all()
    serializer_class = CartOrderSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        user_id = self.kwargs['user_id']
        user = User.objects.get(id=user_id)
        order_id = self.kwargs['order_oid']
        order = CartOrder.objects.get(buyer=user, oid=order_id, payment_status='paid')
        return order