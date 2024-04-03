from django.urls import path

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from userauths import views as userauths_views
from store import views as store_views


urlpatterns = [
    path('user/token/', userauths_views.MyTokenObtainPairView.as_view()),
    path('user/register/', userauths_views.RegisterView.as_view()),
    path('user/token/refresh/', TokenRefreshView.as_view()),
    path('user/password-reset/<str:email>/', userauths_views.PasswordResetEmailVerificationView.as_view()),
]