export type ProductOption = {
    id: number;
    name: string;
    price: number;
};

export type Product = {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    old_price?: number | null;
    image: string | null;
    calories?: number | null;
    weightInGrams?: number | null;
    preparationMinutes?: number | null;
    options?: ProductOption[];
};

export type Category = {
    id: number;
    name: string;
    slug: string;
    description?: string;
    image?: string | null;
    products: Product[];
};

export type HeroSlide = {
    id: number;
    title: string;
    subtitle?: string;
    description?: string;
    ctaLabel: string;
    ctaUrl?: string;
    image: string | null;
    badge?: string;
};

export type CartItem = {
    id: string;
    product: Product;
    quantity: number;
    option?: ProductOption;
    note?: string;
};

export type DeliveryZone = {
    id: number;
    name: string;
    minOrderAmount: number;
    deliveryFee: number;
    etaMinutes: number;
};

export type Branch = {
    id: number;
    name: string;
    slug: string;
    address: string;
    phone: string;
    mapUrl?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    workingHours?: string | null;
    deliveryRadiusKm?: number | null;
    zones: DeliveryZone[];
};

export type Customer = {
    id: number;
    full_name: string;
    phone: string;
    is_verified?: boolean;
};
