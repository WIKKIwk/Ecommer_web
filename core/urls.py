from django.urls import include, path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register(r"catalog/categories", views.CategoryViewSet, basename="category")
router.register(r"catalog/products", views.ProductViewSet, basename="product")
router.register(r"branches", views.BranchViewSet, basename="branch")
router.register(r"hero/banners", views.HeroBannerViewSet, basename="hero-banners")

urlpatterns = [
    path("", include(router.urls)),
    path("settings/", views.SiteSettingsView.as_view(), name="site-settings"),
    path("cart/", views.CartView.as_view(), name="cart-detail"),
    path("cart/items/", views.CartItemListCreateView.as_view(), name="cart-items"),
    path("cart/items/<int:pk>/", views.CartItemDetailView.as_view(), name="cart-item-detail"),
    path("cart/checkout/", views.CheckoutView.as_view(), name="cart-checkout"),
    path("auth/send-code/", views.SMSSendCodeView.as_view(), name="auth-send-code"),
    path("auth/verify/", views.SMSVerifyCodeView.as_view(), name="auth-verify"),
    path("auth/logout/", views.LogoutView.as_view(), name="auth-logout"),
    path("me/profile/", views.CustomerProfileView.as_view(), name="me-profile"),
    path("me/orders/", views.CustomerOrdersView.as_view(), name="me-orders"),
    path("me/orders/<int:pk>/", views.CustomerOrderDetailView.as_view(), name="me-order-detail"),
    # Telegram mini-app endpoints
    path("telegram/profile/", views.TelegramUserProfileView.as_view(), name="telegram-profile"),
]
