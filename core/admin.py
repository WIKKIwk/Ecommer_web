from django.contrib import admin
from unfold.admin import ModelAdmin

from . import models

# Admin site customization
admin.site.site_title = "Kamolon Admin Panel"
admin.site.site_header = "Kamolon Osh - Administrator"
admin.site.index_title = "Boshqaruv Paneli"


class ProductOptionInline(admin.TabularInline):
    model = models.ProductOption
    extra = 1


@admin.register(models.Category)
class CategoryAdmin(ModelAdmin):
    list_display = ("name", "is_active", "display_order")
    list_filter = ("is_active",)
    search_fields = ("name",)
    ordering = ("display_order",)
    prepopulated_fields = {"slug": ("name",)}


@admin.register(models.Product)
class ProductAdmin(ModelAdmin):
    list_display = ("name", "category", "price", "is_available", "is_featured")
    list_filter = ("category", "is_available", "is_featured")
    search_fields = ("name", "description")
    prepopulated_fields = {"slug": ("name",)}
    inlines = [ProductOptionInline]


class DeliveryZoneInline(admin.TabularInline):
    model = models.DeliveryZone
    extra = 1


@admin.register(models.Branch)
class BranchAdmin(ModelAdmin):
    list_display = ("name", "address", "phone", "is_active")
    list_filter = ("is_active",)
    search_fields = ("name", "address", "phone")
    prepopulated_fields = {"slug": ("name",)}
    inlines = [DeliveryZoneInline]


@admin.register(models.Customer)
class CustomerAdmin(ModelAdmin):
    list_display = ("full_name", "phone", "is_verified", "created_at")
    list_filter = ("is_verified",)
    search_fields = ("full_name", "phone")
    readonly_fields = ("created_at", "updated_at", "last_login_at")


@admin.register(models.TelegramUser)
class TelegramUserAdmin(ModelAdmin):
    list_display = ("telegram_id", "full_name", "username", "phone", "language_code", "last_login_at")
    list_filter = ("is_premium", "language_code")
    search_fields = ("telegram_id", "username", "first_name", "last_name", "phone")
    readonly_fields = ("telegram_id", "created_at", "updated_at", "last_login_at", "full_name")
    fieldsets = (
        (
            "Telegram ma'lumotlari",
            {
                "fields": ("telegram_id", "username", "is_premium", "language_code"),
            },
        ),
        (
            "Shaxsiy ma'lumotlar",
            {
                "fields": ("first_name", "last_name", "full_name", "phone", "photo_url"),
            },
        ),
        (
            "Bog'lanish",
            {
                "fields": ("customer",),
                "description": "Agar telefon orqali ro'yxatdan o'tgan bo'lsa, Customer bilan bog'lanadi.",
            },
        ),
        (
            "Vaqt ma'lumotlari",
            {
                "fields": ("created_at", "updated_at", "last_login_at"),
            },
        ),
    )


@admin.register(models.SMSCode)
class SMSCodeAdmin(ModelAdmin):
    list_display = ("phone", "code", "expires_at", "is_used", "attempt_count")
    list_filter = ("is_used",)
    search_fields = ("phone", "code")
    readonly_fields = ("created_at", "updated_at")


@admin.register(models.AuthToken)
class AuthTokenAdmin(ModelAdmin):
    list_display = ("key", "customer", "expires_at", "is_active", "device_name")
    list_filter = ("is_active",)
    search_fields = ("key", "customer__phone", "customer__full_name")
    readonly_fields = ("key", "created_at", "updated_at")


class CartItemInline(admin.TabularInline):
    model = models.CartItem
    extra = 0


@admin.register(models.Cart)
class CartAdmin(ModelAdmin):
    list_display = ("token", "customer", "branch", "status", "total", "updated_at")
    list_filter = ("status", "branch")
    search_fields = ("token", "customer__phone")
    readonly_fields = ("token", "created_at", "updated_at")
    inlines = [CartItemInline]


class OrderItemInline(admin.TabularInline):
    model = models.OrderItem
    extra = 0


@admin.register(models.Order)
class OrderAdmin(ModelAdmin):
    list_display = (
        "id",
        "full_name",
        "phone",
        "branch",
        "status",
        "total",
        "created_at",
    )
    list_filter = ("status", "branch", "payment_method")
    search_fields = ("id", "phone", "full_name", "address")
    readonly_fields = ("created_at", "updated_at")
    inlines = [OrderItemInline]


@admin.register(models.OrderItem)
class OrderItemAdmin(ModelAdmin):
    list_display = ("order", "product", "quantity", "total_price")
    search_fields = ("order__id", "product__name")


@admin.register(models.HeroBanner)
class HeroBannerAdmin(ModelAdmin):
    list_display = ("title", "order", "is_active", "updated_at")
    list_filter = ("is_active",)
    search_fields = ("title", "subtitle")
    ordering = ("order",)


@admin.register(models.GatewaySetting)
class GatewaySettingAdmin(ModelAdmin):
    list_display = ("name", "use_real_gateway", "sender_name", "updated_at")
    list_editable = ("use_real_gateway",)
    fieldsets = (
        (
            "Gateway mode",
            {
                "fields": ("name", "use_real_gateway", "test_code"),
                "description": "Test rejimda barcha foydalanuvchilar test kod (0000) bilan kira olishadi.",
            },
        ),
        (
            "Eskiz credentials",
            {
                "fields": ("sms_email", "sms_password", "sender_name"),
                "description": "Haqiqiy SMS yuborish uchun Eskiz ma'lumotlari.",
            },
        ),
    )


@admin.register(models.SiteSettings)
class SiteSettingsAdmin(ModelAdmin):
    fieldsets = (
        (
            "Asosiy ma'lumotlar",
            {
                "fields": ("site_name", "site_tagline", "site_logo", "site_description"),
                "description": "Sayt nomi va logotipi",
            },
        ),
        (
            "Bog'lanish ma'lumotlari",
            {
                "fields": ("phone_number", "email", "address"),
            },
        ),
        (
            "Ijtimoiy tarmoqlar",
            {
                "fields": ("facebook_url", "instagram_url", "telegram_url"),
            },
        ),
    )

    def has_add_permission(self, request):
        # Faqat bitta SiteSettings bo'lishi kerak
        return not models.SiteSettings.objects.exists()

    def has_delete_permission(self, request, obj=None):
        # SiteSettings o'chirilmasligi kerak
        return False
