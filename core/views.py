from typing import Any

from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from . import models, serializers


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = (
        models.Category.objects.filter(is_active=True)
        .prefetch_related("products__options")
        .order_by("display_order")
    )
    serializer_class = serializers.CategorySerializer
    pagination_class = None


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = (
        models.Product.objects.filter(is_available=True)
        .select_related("category")
        .prefetch_related("options")
    )
    serializer_class = serializers.ProductSerializer
    pagination_class = None


class BranchViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = (
        models.Branch.objects.filter(is_active=True)
        .prefetch_related("zones")
        .order_by("display_order")
    )
    serializer_class = serializers.BranchSerializer
    pagination_class = None


class CartView(APIView):
    """Initialize or fetch cart by token."""

    def get(self, request, *args: Any, **kwargs: Any) -> Response:
        serializer = serializers.CartTokenSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        cart = serializer.get_cart()
        return Response(serializers.CartSerializer(cart).data)

    def post(self, request, *args: Any, **kwargs: Any) -> Response:
        serializer = serializers.CartInitializeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        cart = serializer.save()
        return Response(serializers.CartSerializer(cart).data)


class CartItemListCreateView(APIView):
    """Add items to cart."""

    def post(self, request, *args: Any, **kwargs: Any) -> Response:
        serializer = serializers.CartItemAddSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        cart = serializer.save()
        return Response(serializers.CartSerializer(cart).data)


class CartItemDetailView(APIView):
    """Update or remove a cart item."""

    def patch(self, request, pk: int, *args: Any, **kwargs: Any) -> Response:
        item = get_object_or_404(models.CartItem, pk=pk)
        serializer = serializers.CartItemUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        cart = serializer.save(item=item)
        return Response(serializers.CartSerializer(cart).data)

    def delete(self, request, pk: int, *args: Any, **kwargs: Any) -> Response:
        item = get_object_or_404(models.CartItem, pk=pk)
        serializer = serializers.CartItemRemoveSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        cart = serializer.save(item=item)
        return Response(serializers.CartSerializer(cart).data)


class CheckoutView(APIView):
    """Create order from cart."""

    def post(self, request, *args: Any, **kwargs: Any) -> Response:
        serializer = serializers.CheckoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        return Response({"order_id": order.id, "status": order.status})


class HeroBannerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.HeroBanner.objects.filter(is_active=True).order_by("order")
    serializer_class = serializers.HeroBannerSerializer
    pagination_class = None


class SMSSendCodeView(APIView):
    """Send OTP code to the provided phone number."""

    def post(self, request, *args: Any, **kwargs: Any) -> Response:
        serializer = serializers.SMSCodeRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        phone = serializer.validated_data["phone"]
        is_new = not models.Customer.objects.filter(phone=phone).exists()
        serializer.save()
        return Response({"detail": "Kod yuborildi.", "is_new": is_new})


class SMSVerifyCodeView(APIView):
    """Verify OTP and create auth token."""

    def post(self, request, *args: Any, **kwargs: Any) -> Response:
        serializer = serializers.SMSCodeVerifySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        token = serializer.save()
        return Response(serializers.AuthTokenSerializer(token).data)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args: Any, **kwargs: Any) -> Response:
        token = getattr(request, "auth", None)
        if token:
            token.is_active = False
            token.save(update_fields=["is_active", "updated_at"])
        return Response({"detail": "Chiqildi."})


class CustomerProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args: Any, **kwargs: Any) -> Response:
        serializer = serializers.CustomerSerializer(request.user)
        return Response(serializer.data)

    def patch(self, request, *args: Any, **kwargs: Any) -> Response:
        serializer = serializers.CustomerSerializer(request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class CustomerOrdersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args: Any, **kwargs: Any) -> Response:
        orders = (
            models.Order.objects.filter(customer=request.user)
            .select_related("branch", "delivery_zone")
            .prefetch_related("items__product")
            .order_by("-created_at")
        )
        serializer = serializers.OrderSerializer(orders, many=True)
        return Response(serializer.data)


class CustomerOrderDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk: int, *args: Any, **kwargs: Any) -> Response:
        order = get_object_or_404(
            models.Order.objects.select_related("branch", "delivery_zone").prefetch_related(
                "items__product"
            ),
            pk=pk,
            customer=request.user,
        )
        serializer = serializers.OrderSerializer(order)
        return Response(serializer.data)


class TelegramUserProfileView(APIView):
    """Telegram mini-app foydalanuvchilarini olish yoki yangilash."""

    def post(self, request, *args: Any, **kwargs: Any) -> Response:
        """
        Telegram foydalanuvchini yaratadi yoki yangilaydi.
        Mini-app ochilganda bu endpoint chaqiriladi.
        """
        serializer = serializers.TelegramUserUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(serializers.TelegramUserSerializer(user).data)

    def get(self, request, *args: Any, **kwargs: Any) -> Response:
        """Telegram ID bo'yicha foydalanuvchini olish."""
        telegram_id = request.query_params.get("telegram_id")
        if not telegram_id:
            return Response({"detail": "telegram_id parametri kerak."}, status=400)

        try:
            user = models.TelegramUser.objects.get(telegram_id=telegram_id)
            return Response(serializers.TelegramUserSerializer(user).data)
        except models.TelegramUser.DoesNotExist:
            return Response({"detail": "Foydalanuvchi topilmadi."}, status=404)

    def patch(self, request, *args: Any, **kwargs: Any) -> Response:
        """Profile ma'lumotlarini yangilash (telefon, ism va hokazo)."""
        telegram_id = request.data.get("telegram_id")
        if not telegram_id:
            return Response({"detail": "telegram_id kerak."}, status=400)

        try:
            user = models.TelegramUser.objects.get(telegram_id=telegram_id)
        except models.TelegramUser.DoesNotExist:
            return Response({"detail": "Foydalanuvchi topilmadi."}, status=404)

        # Yangilanishi mumkin bo'lgan maydonlar
        update_fields = []
        if "first_name" in request.data:
            user.first_name = request.data["first_name"]
            update_fields.append("first_name")
        if "last_name" in request.data:
            user.last_name = request.data["last_name"]
            update_fields.append("last_name")
        if "phone" in request.data:
            user.phone = request.data["phone"]
            update_fields.append("phone")
        if "photo_url" in request.data:
            user.photo_url = request.data["photo_url"]
            update_fields.append("photo_url")
        if "language_code" in request.data:
            user.language_code = request.data["language_code"]
            update_fields.append("language_code")

        if update_fields:
            update_fields.append("updated_at")
            user.save(update_fields=update_fields)

        return Response(serializers.TelegramUserSerializer(user).data)


class SiteSettingsView(APIView):
    """Sayt sozlamalarini olish"""

    permission_classes = []

    def get(self, request, *args: Any, **kwargs: Any) -> Response:
        settings = models.SiteSettings.get_settings()
        return Response(serializers.SiteSettingsSerializer(settings).data)
