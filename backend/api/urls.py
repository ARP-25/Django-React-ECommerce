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
    path('products/', store_views.ProductListAPIView.as_view(), name='product-list'),
    path('products/<str:slug>/', store_views.ProductDetailAPIView.as_view(), name='product-detail'),
    path('cart-view/', store_views.CartAPIView.as_view(), name='cart-view'),
    path('cart-list/<str:cart_id>/<int:user_id>/', store_views.CartListAPIView.as_view(), name='cart-list'),
    path('cart-list/<str:cart_id>/', store_views.CartListAPIView.as_view(), name='cart-list'),
    path('cart-detail/<str:cart_id>/<int:user_id>/', store_views.CartDetailAPIView.as_view(), name='cart-detail'),
    path('cart-detail/<str:cart_id>/', store_views.CartDetailAPIView.as_view(), name='cart-detail'),
    path('cart-delete/<str:cart_id>/<int:item_id>/<int:user_id>/', store_views.CartItemDeleteAPIView.as_view(), name='cart-delete'),
    path('cart-delete/<str:cart_id>/<int:item_id>/', store_views.CartItemDeleteAPIView.as_view(), name='cart-delete'),
    path('create-order/', store_views.CreateOrderAPIView.as_view(), name='cart-delete'),
    path('checkout/<str:order_id>/', store_views.CheckoutAPIView.as_view(), name='checkout'),
    path('coupon/', store_views.CouponAPIView.as_view(), name='coupon'),
]