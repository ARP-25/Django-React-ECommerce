from django.urls import path

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from userauths import views as userauths_views
from store import views as store_views


urlpatterns = [
    path('user/token/', userauths_views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('user/register/', userauths_views.RegisterView.as_view(), name='auth_register'),
    path('user/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/password-reset/<str:email>/', userauths_views.PasswordResetEmailVerificationView.as_view(), name='password-reset'),
    path('user/password-change/', userauths_views.PasswordChangeView.as_view(), name='password-change'),

    # Store Endpoints
    path('category/', store_views.CategoryListAPIView.as_view(), name='category-list'),
    path('product/', store_views.ProductListAPIView.as_view(), name='product-list'),
    path('product/<str:slug>/', store_views.ProductDetailAPIView.as_view(), name='product-detail'),
]