import uuid

from django.db import models
from django.utils import timezone


class TimeStampedModel(models.Model):
    """Reusable base model with created/updated timestamps."""

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Category(TimeStampedModel):
    name = models.CharField(max_length=120)
    slug = models.SlugField(unique=True, db_index=True)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to="categories", blank=True, null=True)
    is_active = models.BooleanField(default=True, db_index=True)
    display_order = models.PositiveIntegerField(default=0, db_index=True)

    class Meta:
        ordering = ["display_order", "name"]
        indexes = [
            models.Index(fields=["is_active", "display_order"]),
        ]

    def __str__(self) -> str:
        return self.name


class Product(TimeStampedModel):
    category = models.ForeignKey(
        Category, related_name="products", on_delete=models.CASCADE, db_index=True
    )
    name = models.CharField(max_length=150)
    slug = models.SlugField(unique=True, db_index=True)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, db_index=True)
    old_price = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )
    calories = models.PositiveIntegerField(null=True, blank=True)
    weight_in_grams = models.PositiveIntegerField(null=True, blank=True)
    image = models.ImageField(upload_to="products", blank=True, null=True)
    is_available = models.BooleanField(default=True, db_index=True)
    is_featured = models.BooleanField(default=False, db_index=True)
    preparation_minutes = models.PositiveSmallIntegerField(default=30)

    class Meta:
        ordering = ["name"]
        indexes = [
            models.Index(fields=["is_available", "category"]),
            models.Index(fields=["is_featured", "-created_at"]),
        ]

    def __str__(self) -> str:
        return self.name


class ProductOption(TimeStampedModel):
    product = models.ForeignKey(
        Product, related_name="options", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=120)
    description = models.CharField(max_length=255, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    is_default = models.BooleanField(default=False)

    class Meta:
        unique_together = ("product", "name")
        ordering = ["product", "name"]

    def __str__(self) -> str:
        return f"{self.product} · {self.name}"


class Branch(TimeStampedModel):
    name = models.CharField(max_length=150)
    slug = models.SlugField(unique=True)
    address = models.CharField(max_length=255)
    phone = models.CharField(max_length=20, blank=True)
    map_url = models.URLField(blank=True)
    latitude = models.DecimalField(
        max_digits=9, decimal_places=6, null=True, blank=True
    )
    longitude = models.DecimalField(
        max_digits=9, decimal_places=6, null=True, blank=True
    )
    is_active = models.BooleanField(default=True)
    display_order = models.PositiveIntegerField(default=0)
    delivery_radius_km = models.DecimalField(
        max_digits=4, decimal_places=1, null=True, blank=True
    )
    working_hours = models.CharField(max_length=120, blank=True)

    class Meta:
        ordering = ["display_order", "name"]

    def __str__(self) -> str:
        return self.name


class DeliveryZone(TimeStampedModel):
    branch = models.ForeignKey(
        Branch, related_name="zones", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=120)
    min_order_amount = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    delivery_fee = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    eta_minutes = models.PositiveSmallIntegerField(default=60)

    class Meta:
        unique_together = ("branch", "name")
        ordering = ["branch", "min_order_amount"]

    def __str__(self) -> str:
        return f"{self.branch} – {self.name}"


class Customer(TimeStampedModel):
    phone = models.CharField(max_length=15, unique=True)
    full_name = models.CharField(max_length=150)
    is_verified = models.BooleanField(default=False)
    last_login_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.full_name} ({self.phone})"

    @property
    def is_authenticated(self) -> bool:  # pragma: no cover - compatibility helper
        return True

    @property
    def is_anonymous(self) -> bool:  # pragma: no cover
        return False


class TelegramUser(TimeStampedModel):
    """Telegram mini-app foydalanuvchilari uchun profil."""

    telegram_id = models.BigIntegerField(unique=True, db_index=True)
    username = models.CharField(max_length=150, blank=True)
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    photo_url = models.URLField(blank=True, null=True)
    language_code = models.CharField(max_length=10, default='uz')
    is_premium = models.BooleanField(default=False)
    last_login_at = models.DateTimeField(auto_now=True)

    # Customer modeliga bog'lash (agar telefon orqali kirsa)
    customer = models.OneToOneField(
        Customer,
        null=True,
        blank=True,
        related_name="telegram_profile",
        on_delete=models.SET_NULL
    )

    class Meta:
        ordering = ["-last_login_at"]
        indexes = [
            models.Index(fields=["telegram_id"]),
            models.Index(fields=["phone"]),
        ]

    def __str__(self) -> str:
        return f"{self.first_name} {self.last_name} (@{self.username or self.telegram_id})"

    @property
    def full_name(self) -> str:
        """To'liq ismni qaytaradi."""
        parts = [self.first_name, self.last_name]
        return " ".join(p for p in parts if p).strip() or f"User {self.telegram_id}"


class SMSCode(TimeStampedModel):
    phone = models.CharField(max_length=15)
    code = models.CharField(max_length=6)
    expires_at = models.DateTimeField()
    is_used = models.BooleanField(default=False)
    attempt_count = models.PositiveSmallIntegerField(default=0)

    class Meta:
        indexes = [
            models.Index(fields=["phone"]),
            models.Index(fields=["phone", "code"]),
        ]
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.phone} → {self.code}"


class AuthToken(TimeStampedModel):
    key = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    customer = models.ForeignKey(
        Customer, related_name="tokens", on_delete=models.CASCADE
    )
    expires_at = models.DateTimeField()
    is_active = models.BooleanField(default=True)
    device_name = models.CharField(max_length=150, blank=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["key"]),
            models.Index(fields=["customer", "is_active"]),
        ]

    def __str__(self) -> str:
        return f"{self.customer} token"

    @property
    def is_expired(self) -> bool:
        return timezone.now() >= self.expires_at


class Cart(TimeStampedModel):
    class Status(models.TextChoices):
        ACTIVE = ("active", "Faol")
        ORDERED = ("ordered", "Buyurtmaga aylangan")
        ABANDONED = ("abandoned", "Tashlab ketilgan")

    token = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    customer = models.ForeignKey(
        Customer, null=True, blank=True, related_name="carts", on_delete=models.SET_NULL
    )
    branch = models.ForeignKey(
        Branch, null=True, blank=True, related_name="carts", on_delete=models.SET_NULL
    )
    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.ACTIVE
    )
    subtotal = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    delivery_fee = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    class Meta:
        ordering = ["-updated_at"]

    def __str__(self) -> str:
        return f"{self.token} ({self.status})"


class CartItem(TimeStampedModel):
    cart = models.ForeignKey(
        Cart, related_name="items", on_delete=models.CASCADE
    )
    product = models.ForeignKey(
        Product, related_name="cart_items", on_delete=models.PROTECT
    )
    option = models.ForeignKey(
        ProductOption,
        related_name="cart_items",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    quantity = models.PositiveIntegerField(default=1)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    note = models.CharField(max_length=255, blank=True)

    class Meta:
        unique_together = ("cart", "product", "option", "note")

    def __str__(self) -> str:
        return f"{self.product} x{self.quantity}"


class Order(TimeStampedModel):
    class Status(models.TextChoices):
        NEW = ("new", "Yangi")
        CONFIRMED = ("confirmed", "Tasdiqlandi")
        PREPARING = ("preparing", "Tayyorlanmoqda")
        ON_DELIVERY = ("on_delivery", "Kur'erda")
        COMPLETED = ("completed", "Yakunlandi")
        CANCELED = ("canceled", "Bekor qilindi")

    class PaymentMethod(models.TextChoices):
        CASH = ("cash", "Naqd")
        CARD = ("card", "Terminal")
        ONLINE = ("online", "Onlayn to'lov")

    cart = models.OneToOneField(
        Cart, null=True, blank=True, related_name="order", on_delete=models.SET_NULL
    )
    customer = models.ForeignKey(
        Customer, related_name="orders", on_delete=models.PROTECT, db_index=True
    )
    branch = models.ForeignKey(
        Branch, related_name="orders", on_delete=models.PROTECT, db_index=True
    )
    delivery_zone = models.ForeignKey(
        DeliveryZone,
        related_name="orders",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    phone = models.CharField(max_length=15)
    full_name = models.CharField(max_length=150)
    address = models.CharField(max_length=255)
    entrance = models.CharField(max_length=50, blank=True)
    floor = models.CharField(max_length=50, blank=True)
    apartment = models.CharField(max_length=50, blank=True)
    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.NEW, db_index=True
    )
    payment_method = models.CharField(
        max_length=20, choices=PaymentMethod.choices, default=PaymentMethod.CASH
    )
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    delivery_fee = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    comment = models.TextField(blank=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["customer", "-created_at"]),
            models.Index(fields=["status", "branch"]),
            models.Index(fields=["-created_at"]),
        ]

    def __str__(self) -> str:
        return f"Order #{self.pk} • {self.full_name}"


class OrderItem(TimeStampedModel):
    order = models.ForeignKey(
        Order, related_name="items", on_delete=models.CASCADE
    )
    product = models.ForeignKey(
        Product, related_name="order_items", on_delete=models.PROTECT
    )
    option_name = models.CharField(max_length=120, blank=True)
    quantity = models.PositiveIntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        ordering = ["order_id"]

    def __str__(self) -> str:
        return f"{self.product} x{self.quantity}"


class HeroBanner(TimeStampedModel):
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=150, blank=True)
    description = models.TextField(blank=True)
    cta_label = models.CharField(max_length=80, default="Tez buyurtma")
    cta_url = models.URLField(blank=True)
    badge = models.CharField(max_length=50, blank=True)
    image = models.ImageField(upload_to="hero", blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "-created_at"]

    def __str__(self) -> str:
        return self.title


class GatewaySetting(TimeStampedModel):
    """Store configurable SMS gateway credentials and modes."""

    name = models.CharField(max_length=50, default="default", unique=True)
    sms_email = models.EmailField(blank=True)
    sms_password = models.CharField(max_length=255, blank=True)
    sender_name = models.CharField(max_length=50, default="4546")
    use_real_gateway = models.BooleanField(
        default=False,
        help_text="Off -> test rejim (kod 0000). On -> haqiqiy Eskiz gateway ishlaydi.",
    )
    test_code = models.CharField(max_length=6, default="0000")

    class Meta:
        ordering = ["name"]

    def __str__(self) -> str:
        return f"Gateway: {self.name}"

    @classmethod
    def get_active(cls) -> "GatewaySetting | None":
        return cls.objects.order_by("-updated_at").first()


class SiteSettings(TimeStampedModel):
    """Sayt sozlamalari - logo, nom va boshqa ma'lumotlar"""

    site_name = models.CharField(
        max_length=100,
        default="KAMOLON",
        verbose_name="Sayt nomi",
        help_text="Saytning asosiy nomi (masalan: KAMOLON)"
    )
    site_tagline = models.CharField(
        max_length=50,
        default="OSH",
        verbose_name="Sayt slogani",
        help_text="Sayt nomi yonidagi matn (masalan: OSH, TAOM, va h.k.)"
    )
    site_logo = models.ImageField(
        upload_to="site/",
        blank=True,
        null=True,
        verbose_name="Sayt logotipi",
        help_text="Sayt logotipi rasmi"
    )
    site_description = models.CharField(
        max_length=255,
        blank=True,
        verbose_name="Sayt tavsifi",
        help_text="Qisqa tavsif yoki slogan"
    )
    phone_number = models.CharField(
        max_length=20,
        blank=True,
        verbose_name="Telefon raqami",
        help_text="Bog'lanish uchun telefon raqami"
    )
    email = models.EmailField(
        blank=True,
        verbose_name="Email",
        help_text="Bog'lanish uchun email"
    )
    address = models.CharField(
        max_length=255,
        blank=True,
        verbose_name="Manzil",
        help_text="Kompaniya manzili"
    )
    facebook_url = models.URLField(blank=True, verbose_name="Facebook")
    instagram_url = models.URLField(blank=True, verbose_name="Instagram")
    telegram_url = models.URLField(blank=True, verbose_name="Telegram")

    class Meta:
        verbose_name = "Sayt sozlamalari"
        verbose_name_plural = "Sayt sozlamalari"

    def __str__(self) -> str:
        return f"Sayt sozlamalari - {self.site_name}"

    @classmethod
    def get_settings(cls) -> "SiteSettings":
        """Sayt sozlamalarini qaytaradi yoki yangi yaratadi"""
        settings = cls.objects.first()
        if not settings:
            settings = cls.objects.create()
        return settings
