import io
from urllib.request import urlopen

from django.core.files.base import ContentFile
from django.core.management.base import BaseCommand
from django.db import transaction
from django.utils.text import slugify

from core import models

CATEGORY_DATA = [
    {
        "name": "Setlar",
        "description": "Katta oilaviy osh to'plamlari",
        "image_url": "https://images.unsplash.com/photo-1608039829574-8142a142f938?auto=format&fit=crop&w=1200&q=80",
        "products": [
            {
                "name": "Set 8 kishi (Choyxona)",
                "description": "Ziravorlar bilan boyitilgan klassik osh",
                "price": 504000,
                "old_price": 574000,
                "image_url": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80",
            },
            {
                "name": "Set 6 kishi (Zigir)",
                "description": "Zigir yog'i qo'shilgan maxsus osh",
                "price": 360000,
                "image_url": "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=800&q=80",
            },
        ],
    },
    {
        "name": "Oshlar",
        "description": "Kundalik palovlar",
        "image_url": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
        "products": [
            {
                "name": "To'y oshi",
                "description": "Mayin qo'y go'shti, sariq sabzi",
                "price": 56000,
                "old_price": 65000,
                "image_url": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
            },
            {
                "name": "Sofi osh",
                "description": "Buxorocha uslubdagi ta'm",
                "price": 73000,
                "image_url": "https://images.unsplash.com/photo-1429554513019-6c61c19ffb7e?auto=format&fit=crop&w=800&q=80",
            },
        ],
    },
    {
        "name": "Ichimliklar",
        "description": "Yangi siqilgan sharbatlar",
        "image_url": "https://images.unsplash.com/photo-1447078806655-40579c2520d6?auto=format&fit=crop&w=1200&q=80",
        "products": [
            {
                "name": "Sabzi sharbati",
                "description": "Vitaminlarga boy",
                "price": 25000,
                "image_url": "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
            },
            {
                "name": "Kompot",
                "description": "Tabiiy mevalardan",
                "price": 18000,
                "image_url": "https://images.unsplash.com/photo-1481398123156-4277f35b9b74?auto=format&fit=crop&w=800&q=80",
            },
        ],
    },
]

BRANCH_DATA = [
    {
        "name": "Kamolon Osh Shayxontohur",
        "address": "Shayxontohur tumani, Zarqaynar 12",
    },
    {
        "name": "Kamolon Osh Chilonzor",
        "address": "Chilonzor 21/3",
    },
]

HERO_DATA = [
    {
        "title": "Kamolon Set",
        "subtitle": "8 kishilik maxsus to‘plam",
        "description": "Qo‘y go‘shti va sabzilar uyg‘unligidagi klassik oshni issiq holda yetkazib beramiz.",
        "cta_label": "Tez buyurtma",
        "badge": "Yangi",
        "image_url": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1600&q=80",
    },
    {
        "title": "Kundalik biznes-lanch",
        "subtitle": "Ofis uchun maxsus",
        "description": "Salat, mastava va mini palovdan iborat to‘plam – ish kunining mazali davomiga aylanadi.",
        "cta_label": "Tez buyurtma",
        "image_url": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80",
    },
]


def fetch_image(url: str) -> ContentFile | None:
    try:
        with urlopen(url) as response:
            return ContentFile(response.read())
    except Exception:
        return None


class Command(BaseCommand):
    help = "Seed demo categories, products, branches with images"

    @transaction.atomic
    def handle(self, *args, **options):
        self.stdout.write("Seeding demo content...")

        for cat_data in CATEGORY_DATA:
            category, _ = models.Category.objects.get_or_create(
                slug=slugify(cat_data["name"]),
                defaults={
                    "name": cat_data["name"],
                    "description": cat_data["description"],
                },
            )
            if cat_data.get("image_url"):
                image_file = fetch_image(cat_data["image_url"])
                if image_file:
                    category.image.save(f"{category.slug}.jpg", image_file, save=True)
            for product_data in cat_data["products"]:
                product, _ = models.Product.objects.get_or_create(
                    slug=slugify(product_data["name"]),
                    defaults={
                        "category": category,
                        "name": product_data["name"],
                        "description": product_data["description"],
                        "price": product_data["price"],
                        "old_price": product_data.get("old_price"),
                    },
                )
                product.category = category
                product.description = product_data["description"]
                product.price = product_data["price"]
                product.old_price = product_data.get("old_price")
                if product_data.get("image_url"):
                    image_file = fetch_image(product_data["image_url"])
                    if image_file:
                        product.image.save(f"{product.slug}.jpg", image_file, save=True)
                product.save()

        for branch_data in BRANCH_DATA:
            models.Branch.objects.get_or_create(
                slug=slugify(branch_data["name"]),
                defaults={
                    "name": branch_data["name"],
                    "address": branch_data["address"],
                    "phone": "+998 55 500 16 61",
                    "working_hours": "10:00-22:00",
                },
            )

        for order, hero in enumerate(HERO_DATA):
            banner, _ = models.HeroBanner.objects.get_or_create(
                title=hero["title"],
                defaults={
                    "subtitle": hero.get("subtitle", ""),
                    "description": hero.get("description", ""),
                    "cta_label": hero.get("cta_label", "Tez buyurtma"),
                    "cta_url": hero.get("cta_url", ""),
                    "badge": hero.get("badge", ""),
                    "order": order,
                },
            )
            banner.order = order
            banner.subtitle = hero.get("subtitle", "")
            banner.description = hero.get("description", "")
            banner.cta_label = hero.get("cta_label", "Tez buyurtma")
            banner.cta_url = hero.get("cta_url", "")
            banner.badge = hero.get("badge", "")
            if hero.get("image_url"):
                image_file = fetch_image(hero["image_url"])
                if image_file:
                    banner.image.save(f"hero-{order}.jpg", image_file, save=True)
            banner.save()

        self.stdout.write(self.style.SUCCESS("Demo data seeded."))
