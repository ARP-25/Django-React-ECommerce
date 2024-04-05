from django.shortcuts import render

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from userauths.models import User, Profile
from userauths.serializer import MyTokenObtainPairSerializer, RegisterSerializer, UserSerializer

import random
import shortuuid

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny,]
    serializer_class = RegisterSerializer


def generate_otp(length=7):
    uuid_key = shortuuid.uuid()
    unique_key = uuid_key[:6]
    return unique_key


class PasswordResetEmailVerificationView(generics.RetrieveAPIView):
    permission_classes = [AllowAny,]
    serializer_class = UserSerializer
    
    def get_object(self):
        email = self.kwargs.get('email')
        user = User.objects.get(email=email)

        if user:
            otp = generate_otp()
            user.otp = otp
            user.save()

            uidb64 = user.pk
            otp = user.otp

            link = f"http://localhost:5173/create-new-password?otp={otp}&uidb64={uidb64}"
            print("link ======", link)

            # send email
            
        return user
    

class PasswordChangeView(generics.UpdateAPIView):
    permisson_classes = [AllowAny,]
    serializer_class = UserSerializer

    def create (self, request, *args, **kwargs):
        payload = request.data
        otp = payload.get('otp')
        uidb64 = payload.get('reset_token')
        reset_token = payload.get('reset_token')
        password = payload.get('password')

        user = User.objects.get(id=uidb64, otp=otp)

        if user:
            user.set_password(password)
            user.otp = ""
            user.reset_token = ""
            user.save()

            return Response({'message': 'Password changed successfully'}, status=status.HTTP_200_OK)

        else:
            return Response({'message': 'An error occured'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)