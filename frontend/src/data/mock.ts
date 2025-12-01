import type { Category, HeroSlide } from "@/types";

const baseImage = (name: string) =>
  `https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=80&sat=-10&blend=111827&blend-mode=multiply&sig=${encodeURIComponent(
    name,
  )}`;

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Custom Combo",
    subtitle: "8 kishilik maxi to‘plam",
    description:
      "Qo‘y go‘shti, ziravor va sabzidan iborat klassik oshni issiq holida yetkazib beramiz. Hamma uchun bitta dasturxon.",
    ctaLabel: "Tez buyurtma",
    ctaUrl: "#menyu",
    image: baseImage("set-8"),
    badge: "-12%",
  },
  {
    id: 2,
    title: "Guruchli palov",
    subtitle: "Kichik oilaviy set",
    description:
      "Yog‘li qo‘y go‘shti, sariq sabzi va ziravorlar uyg‘unligidagi osh. Filialdan olib ketish imkoniyati ham bor.",
    ctaLabel: "Menyuni ko‘rish",
    ctaUrl: "#menyu",
    image: baseImage("family-set"),
    badge: "Yangi",
  },
  {
    id: 3,
    title: "Kundalik biznes-lanch",
    subtitle: "Ofis uchun maxsus",
    description:
      "Salat, mastava va mini palovdan iborat to‘plam – ish kunining mazali davomiga aylanadi.",
    ctaLabel: "Tez buyurtma",
    ctaUrl: "#menyu",
    image: baseImage("business-lunch"),
  },
];

export const categories: Category[] = [
  {
    id: 1,
    name: "Setlar",
    slug: "setlar",
    products: [
      {
        id: 101,
        name: "Set 8 kishi (Choyxona osh)",
        slug: "set-8",
        description:
          "Choyxona uslubidagi sho‘r osh, salatlar, qattiq non va shirinliklardan iborat to‘plam.",
        price: 504_000,
        oldPrice: 574_000,
        image: baseImage("set-8"),
        options: [
          { id: 1, name: "Qo‘shimcha murch", price: 10_000 },
          { id: 2, name: "Chili sous", price: 8_000 },
        ],
      },
      {
        id: 102,
        name: "Set 6 kishi (Zigir)",
        slug: "set-6",
        description: "Qo‘y go‘shti va zigir yog‘i bilan tayyorlangan maxsus osh.",
        price: 360_000,
        image: baseImage("set-6"),
      },
    ],
  },
  {
    id: 2,
    name: "Oshlar",
    slug: "oshlar",
    products: [
      {
        id: 201,
        name: "To‘y oshi",
        slug: "toy-oshi",
        description:
          "Qo‘y va mol go‘shtining mayinligi, hushbo‘y lazer guruchi va sariq sabzi uyg‘unligi.",
        price: 56_000,
        oldPrice: 65_000,
        image: baseImage("toy-oshi"),
      },
      {
        id: 202,
        name: "Sofi osh",
        slug: "sofi-osh",
        description: "Buxorocha uslubda ziravorlar bilan boyitilgan osh.",
        price: 73_000,
        image: baseImage("sofi-osh"),
      },
      {
        id: 203,
        name: "Mini palov",
        slug: "mini-palov",
        description: "Ofis va tezkor tushlik uchun mo‘ljallangan kichik porsiya.",
        price: 42_000,
        image: baseImage("mini-palov"),
      },
    ],
  },
  {
    id: 3,
    name: "Ichimliklar",
    slug: "ichimliklar",
    products: [
      {
        id: 301,
        name: "Yangi siqilgan sabzi sharbati",
        slug: "sabzi-juice",
        description: "Vitaminlarga boy, sovutilgan holda yetkaziladi.",
        price: 25_000,
        image: baseImage("carrot-juice"),
      },
      {
        id: 302,
        name: "Kompot (1L)",
        slug: "kompot",
        description: "Tabiiy mevalardan tayyorlangan shirin ichimlik.",
        price: 18_000,
        image: baseImage("kompot"),
      },
    ],
  },
];
