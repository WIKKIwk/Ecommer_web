from __future__ import annotations

from datetime import timedelta
from decimal import Decimal
from typing import Any

from django.utils import timezone
from rest_framework import serializers

from . import models, services


class ProductOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProductOption
        fields = [
            "id",
            "name",
            "description",
            "price",
            "is_default",
        ]


class ProductSerializer(serializers.ModelSerializer):
    options = ProductOptionSerializer(many=True, read_only=True)
    category_name = serializers.CharField(source="category.name", read_only=True)

    class Meta:
        model = models.Product
        fields = [
            "id",
            "category",
            "category_name",
            "name",
            "slug",
            "description",
            "price",
            "old_price",
            "calories",
            "weight_in_grams",
            "image",
            "is_available",
            "is_featured",
            "preparation_minutes",
            "options",
        ]
        read_only_fields = [
            "category_name",
            "options",
        ]


class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = models.Category
        fields = [
            "id",
            "name",
            "slug",
            "description",
            "image",
            "is_active",
            "display_order",
            "products",
        ]
        read_only_fields = ["products"]


class DeliveryZoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.DeliveryZone
        fields = [
            "id",
            "name",
            "min_order_amount",
            "delivery_fee",
            "eta_minutes",
        ]


class BranchSerializer(serializers.ModelSerializer):
    zones = DeliveryZoneSerializer(many=True, read_only=True)

    class Meta:
        model = models.Branch
        fields = [
            "id",
            "name",
            "slug",
            "address",
            "phone",
            "map_url",
            "latitude",
            "longitude",
            "working_hours",
            "delivery_radius_km",
            "zones",
        ]
        read_only_fields = ["zones"]


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Customer
        fields = ["id", "full_name", "phone", "is_verified"]
        read_only_fields = ["id", "phone", "is_verified"]


class TelegramUserSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(read_only=True)

    class Meta:
        model = models.TelegramUser
        fields = [
            "id",
            "telegram_id",
            "username",
            "first_name",
            "last_name",
            "phone",
            "photo_url",
            "language_code",
            "is_premium",
            "full_name",
            "last_login_at",
        ]
        read_only_fields = ["id", "telegram_id", "full_name", "last_login_at"]


class TelegramUserUpdateSerializer(serializers.Serializer):
    """Telegram foydalanuvchi ma'lumotlarini yangilash yoki yaratish."""

    telegram_id = serializers.IntegerField()
    username = serializers.CharField(max_length=150, required=False, allow_blank=True)
    first_name = serializers.CharField(max_length=150, required=False, allow_blank=True)
    last_name = serializers.CharField(max_length=150, required=False, allow_blank=True)
    phone = serializers.CharField(max_length=20, required=False, allow_blank=True)
    photo_url = serializers.URLField(required=False, allow_blank=True, allow_null=True)
    language_code = serializers.CharField(max_length=10, required=False)
    is_premium = serializers.BooleanField(required=False)

    def save(self) -> models.TelegramUser:
        """Telegram foydalanuvchini yaratadi yoki yangilaydi."""
        telegram_id = self.validated_data["telegram_id"]

        # Telegram user ni topish yoki yaratish
        user, created = models.TelegramUser.objects.update_or_create(
            telegram_id=telegram_id,
            defaults={
                "username": self.validated_data.get("username", ""),
                "first_name": self.validated_data.get("first_name", ""),
                "last_name": self.validated_data.get("last_name", ""),
                "phone": self.validated_data.get("phone", ""),
                "photo_url": self.validated_data.get("photo_url"),
                "language_code": self.validated_data.get("language_code", "uz"),
                "is_premium": self.validated_data.get("is_premium", False),
            }
        )

        return user


class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name", read_only=True)
    option_name = serializers.CharField(source="option.name", read_only=True)

    class Meta:
        model = models.CartItem
        fields = [
            "id",
            "product",
            "product_name",
            "option",
            "option_name",
            "quantity",
            "unit_price",
            "note",
        ]
        read_only_fields = ["product_name", "option_name"]


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = models.Cart
        fields = [
            "id",
            "token",
            "customer",
            "branch",
            "status",
            "subtotal",
            "delivery_fee",
            "total",
            "items",
        ]
        read_only_fields = [
            "id",
            "token",
            "subtotal",
            "delivery_fee",
            "total",
            "items",
        ]


class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name", read_only=True)

    class Meta:
        model = models.OrderItem
        fields = [
            "id",
            "product",
            "product_name",
            "option_name",
            "quantity",
            "unit_price",
            "total_price",
        ]
        read_only_fields = [
            "product_name",
            "option_name",
            "unit_price",
            "total_price",
        ]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    branch_name = serializers.CharField(source="branch.name", read_only=True)

    class Meta:
        model = models.Order
        fields = [
            "id",
            "status",
            "payment_method",
            "subtotal",
            "delivery_fee",
            "total",
            "comment",
            "created_at",
            "branch",
            "branch_name",
            "delivery_zone",
            "items",
        ]
        read_only_fields = [
            "id",
            "items",
            "branch_name",
            "created_at",
            "subtotal",
            "delivery_fee",
            "total",
        ]


class CartTokenSerializer(serializers.Serializer):
    cart_token = serializers.UUIDField()

    def get_cart(self) -> models.Cart:
        token = self.validated_data["cart_token"]
        try:
            return models.Cart.objects.get(token=token, status=models.Cart.Status.ACTIVE)
        except models.Cart.DoesNotExist as exc:
            raise serializers.ValidationError(
                {"cart_token": "Cart topilmadi yoki aktiv emas."}
            ) from exc


class CartInitializeSerializer(serializers.Serializer):
    cart_token = serializers.UUIDField(required=False)
    branch = serializers.PrimaryKeyRelatedField(
        queryset=models.Branch.objects.filter(is_active=True), required=False
    )

    def create(self, validated_data: dict[str, Any]) -> models.Cart:
        token = validated_data.get("cart_token")
        branch = validated_data.get("branch")
        cart = None
        if token:
            cart = models.Cart.objects.filter(token=token).first()
        if cart is None:
            cart = models.Cart.objects.create(branch=branch)
        else:
            if branch:
                cart.branch = branch
                cart.save(update_fields=["branch", "updated_at"])
        return cart


class CartTotalsMixin:
    def _recalculate(self, cart: models.Cart) -> None:
        subtotal = Decimal("0.00")
        for item in cart.items.all():
            subtotal += item.unit_price * item.quantity
        cart.subtotal = subtotal
        cart.total = subtotal + cart.delivery_fee
        cart.save(update_fields=["subtotal", "total", "updated_at"])


class CartItemAddSerializer(CartTokenSerializer, CartTotalsMixin):
    product = serializers.PrimaryKeyRelatedField(
        queryset=models.Product.objects.filter(is_available=True)
    )
    option = serializers.PrimaryKeyRelatedField(
        queryset=models.ProductOption.objects.all(), required=False, allow_null=True
    )
    quantity = serializers.IntegerField(min_value=1)
    note = serializers.CharField(allow_blank=True, required=False)

    def validate(self, attrs: dict[str, Any]) -> dict[str, Any]:
        option: models.ProductOption | None = attrs.get("option")
        product: models.Product = attrs["product"]
        if option and option.product_id != product.id:
            raise serializers.ValidationError(
                {"option": "Tanlangan variant aynan shu mahsulotga tegishli bo‘lishi kerak."}
            )
        return attrs

    def create(self, validated_data: dict[str, Any]) -> models.Cart:
        cart = self.get_cart()
        product = validated_data["product"]
        option = validated_data.get("option")
        quantity = validated_data["quantity"]
        note = validated_data.get("note", "")
        unit_price = option.price if option else product.price

        item, created = models.CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            option=option,
            note=note,
            defaults={"quantity": quantity, "unit_price": unit_price},
        )
        if not created:
            item.quantity += quantity
            item.unit_price = unit_price
            item.save(update_fields=["quantity", "unit_price", "updated_at"])
        self._recalculate(cart)
        return cart


class CartItemUpdateSerializer(CartTokenSerializer, CartTotalsMixin):
    quantity = serializers.IntegerField(min_value=1, required=False)
    note = serializers.CharField(allow_blank=True, required=False)

    def validate(self, attrs: dict[str, Any]) -> dict[str, Any]:
        if "quantity" not in attrs and "note" not in attrs:
            raise serializers.ValidationError(
                "Hech bo‘lmaganda quantity yoki note maydonidan biri kerak."
            )
        return attrs

    def save(self, *, item: models.CartItem) -> models.Cart:
        cart = self.get_cart()
        if item.cart_id != cart.id:
            raise serializers.ValidationError(
                {"item": "Bu mahsulot ushbu cartga tegishli emas."}
            )
        if "quantity" in self.validated_data:
            item.quantity = self.validated_data["quantity"]
        if "note" in self.validated_data:
            item.note = self.validated_data["note"]
        item.save(update_fields=["quantity", "note", "updated_at"])
        self._recalculate(cart)
        return cart


class CartItemRemoveSerializer(CartTokenSerializer, CartTotalsMixin):
    def save(self, *, item: models.CartItem) -> models.Cart:
        cart = self.get_cart()
        if item.cart_id != cart.id:
            raise serializers.ValidationError(
                {"item": "Bu mahsulot ushbu cartga tegishli emas."}
            )
        item.delete()
        self._recalculate(cart)
        return cart


class CheckoutSerializer(CartTokenSerializer):
    full_name = serializers.CharField(max_length=150)
    phone = serializers.CharField(max_length=15)
    address = serializers.CharField(max_length=255)
    delivery_zone = serializers.PrimaryKeyRelatedField(
        queryset=models.DeliveryZone.objects.all(), required=False, allow_null=True
    )
    payment_method = serializers.ChoiceField(choices=models.Order.PaymentMethod.choices)
    comment = serializers.CharField(allow_blank=True, required=False)

    def create(self, validated_data: dict[str, Any]) -> models.Order:
        cart = (
            models.Cart.objects.filter(
                token=validated_data["cart_token"], status=models.Cart.Status.ACTIVE
            )
            .prefetch_related("items__product", "items__option")
            .first()
        )
        if not cart or not cart.items.exists():
            raise serializers.ValidationError("Cart topilmadi yoki bo‘sh.")

        customer, _ = models.Customer.objects.get_or_create(
            phone=validated_data["phone"],
            defaults={"full_name": validated_data["full_name"], "is_verified": True},
        )
        customer.full_name = validated_data["full_name"]
        customer.last_login_at = timezone.now()
        customer.is_verified = True
        customer.save(update_fields=["full_name", "last_login_at", "is_verified", "updated_at"])

        order = models.Order.objects.create(
            cart=cart,
            customer=customer,
            branch=cart.branch or models.Branch.objects.first(),
            delivery_zone=validated_data.get("delivery_zone"),
            phone=validated_data["phone"],
            full_name=validated_data["full_name"],
            address=validated_data["address"],
            status=models.Order.Status.NEW,
            payment_method=validated_data["payment_method"],
            subtotal=cart.subtotal,
            delivery_fee=cart.delivery_fee,
            total=cart.total,
            comment=validated_data.get("comment", ""),
        )
        order_items = []
        for item in cart.items.all():
            order_items.append(
                models.OrderItem(
                    order=order,
                    product=item.product,
                    option_name=item.option.name if item.option else "",
                    quantity=item.quantity,
                    unit_price=item.unit_price,
                    total_price=item.unit_price * item.quantity,
                )
            )
        models.OrderItem.objects.bulk_create(order_items)

        cart.status = models.Cart.Status.ORDERED
        cart.save(update_fields=["status", "updated_at"])
        cart.items.all().delete()
        return order


class HeroBannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.HeroBanner
        fields = [
            "id",
            "title",
            "subtitle",
            "description",
            "cta_label",
            "cta_url",
            "badge",
            "image",
            "order",
        ]


class SMSCodeRequestSerializer(serializers.Serializer):
    phone = serializers.CharField(max_length=15)

    def validate(self, attrs: dict[str, Any]) -> dict[str, Any]:
        from django.conf import settings
        from .models import GatewaySetting

        phone = attrs["phone"]
        config = GatewaySetting.get_active()
        test_mode = config and not config.use_real_gateway
        now = timezone.now()
        # Allow rapid testing if DEBUG or gateway test mode
        if not settings.DEBUG and not test_mode:
            if models.SMSCode.objects.filter(
                phone=phone, created_at__gte=now - timedelta(seconds=60)
            ).exists():
                raise serializers.ValidationError(
                    {"phone": "Kod allaqachon yuborilgan, 1 daqiqa kuting."}
                )
            hourly_count = models.SMSCode.objects.filter(
                phone=phone, created_at__gte=now - timedelta(hours=1)
            ).count()
            if hourly_count >= 5:
                raise serializers.ValidationError(
                    {"phone": "Bir soatda maksimal kodlar soniga yetdingiz."}
                )
        return attrs

    def create(self, validated_data: dict[str, Any]) -> models.SMSCode:
        phone = validated_data["phone"]
        code = services.generate_numeric_code(4)
        sms_code = models.SMSCode.objects.create(
            phone=phone,
            code=code,
            expires_at=timezone.now() + timedelta(minutes=5),
        )
        services.send_sms_code(phone, code)
        return sms_code


class AuthTokenSerializer(serializers.ModelSerializer):
    token = serializers.UUIDField(source="key", read_only=True)
    customer = CustomerSerializer(read_only=True)

    class Meta:
        model = models.AuthToken
        fields = ["token", "expires_at", "customer"]
        read_only_fields = ["token", "expires_at", "customer"]


class SMSCodeVerifySerializer(serializers.Serializer):
    phone = serializers.CharField(max_length=15)
    code = serializers.CharField(max_length=6)
    full_name = serializers.CharField(max_length=150, required=False, allow_blank=True)
    cart_token = serializers.UUIDField(required=False)
    device_name = serializers.CharField(max_length=150, required=False, allow_blank=True)

    def validate(self, attrs: dict[str, Any]) -> dict[str, Any]:
        from django.conf import settings
        from .models import GatewaySetting

        phone = attrs["phone"]
        code = attrs["code"]
        attrs["full_name"] = attrs.get("full_name", "").strip()
        customer_exists = models.Customer.objects.filter(phone=phone).exists()
        if not customer_exists and not attrs["full_name"]:
            raise serializers.ValidationError({"full_name": "Ismingizni kiriting."})

        config = GatewaySetting.get_active()
        fixed_code = config.test_code if config else getattr(settings, "TEST_SMS_FIXED_CODE", "")
        if fixed_code and code == fixed_code and (not config or not config.use_real_gateway or settings.DEBUG):
            attrs["sms_obj"] = None
            attrs["is_fixed_code"] = True
            return attrs

        sms_code = (
            models.SMSCode.objects.filter(
                phone=phone,
                code=code,
                is_used=False,
                expires_at__gte=timezone.now(),
            )
            .order_by("-created_at")
            .first()
        )
        if not sms_code:
            raise serializers.ValidationError({"code": "Kod noto‘g‘ri yoki eskirgan."})
        attrs["sms_obj"] = sms_code
        attrs["is_fixed_code"] = False
        return attrs

    def save(self) -> models.AuthToken:
        sms_code: models.SMSCode | None = self.validated_data["sms_obj"]
        phone = self.validated_data["phone"]
        full_name = self.validated_data.get("full_name", "")
        device_name = self.validated_data.get("device_name", "")

        customer, created = models.Customer.objects.get_or_create(
            phone=phone,
            defaults={"full_name": full_name or "Mijoz", "is_verified": True},
        )
        update_fields = ["is_verified", "last_login_at", "updated_at"]
        if full_name:
            customer.full_name = full_name
            update_fields.append("full_name")
        elif created:
            # `full_name` is guaranteed for newly created customers, but keep fallback
            update_fields.append("full_name")
        customer.is_verified = True
        customer.last_login_at = timezone.now()
        customer.save(update_fields=update_fields)

        models.AuthToken.objects.filter(
            customer=customer, is_active=True
        ).update(is_active=False)

        token = models.AuthToken.objects.create(
            customer=customer,
            expires_at=timezone.now() + timedelta(days=7),
            device_name=device_name,
        )

        if sms_code:
            sms_code.is_used = True
            sms_code.attempt_count += 1
            sms_code.save(update_fields=["is_used", "attempt_count", "updated_at"])

        cart_token = self.validated_data.get("cart_token")
        if cart_token:
            cart = models.Cart.objects.filter(
                token=cart_token, status=models.Cart.Status.ACTIVE
            ).first()
            if cart:
                cart.customer = customer
                cart.save(update_fields=["customer", "updated_at"])

        return token


class SiteSettingsSerializer(serializers.ModelSerializer):
    """Sayt sozlamalari serializeri"""

    class Meta:
        model = models.SiteSettings
        fields = [
            "site_name",
            "site_tagline",
            "site_logo",
            "site_description",
            "phone_number",
            "email",
            "address",
            "facebook_url",
            "instagram_url",
            "telegram_url",
        ]
