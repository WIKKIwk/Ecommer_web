const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001/api';

export interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    image: string | null;
    is_active: boolean;
    display_order: number;
    products?: Product[];
}

export interface Product {
    id: number;
    category: number;
    category_name: string;
    name: string;
    slug: string;
    description: string;
    price: string;
    old_price: string | null;
    calories: number | null;
    weight_in_grams: number | null;
    image: string | null;
    is_available: boolean;
    is_featured: boolean;
    preparation_minutes: number;
    options: ProductOption[];
}

export interface ProductOption {
    id: number;
    name: string;
    price_modifier: string;
}

export interface CartItem {
    id: number;
    product: Product;
    quantity: number;
    options: number[]; // Product option IDs
    subtotal: string;
}

export interface HeroBanner {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    image: string | null;
    cta_label: string;
    cta_url: string;
    badge: string;
    is_active: boolean;
    display_order: number;
}

class API {
    private baseURL: string;
    private token: string | null = null;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
        // Load token from localStorage
        this.token = localStorage.getItem('auth_token');
    }

    setToken(token: string) {
        this.token = token;
        localStorage.setItem('auth_token', token);
    }

    clearToken() {
        this.token = null;
        localStorage.removeItem('auth_token');
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...(options.headers as Record<string, string>),
        };

        if (this.token) {
            headers['Authorization'] = `Token ${this.token}`;
        }

        const response = await fetch(`${this.baseURL}${endpoint}`, {
            ...options,
            headers,
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        return response.json();
    }

    // Auth endpoints
    async telegramAuth(initData: string) {
        return this.request<{ token: string; customer: any }>('/telegram/auth/', {
            method: 'POST',
            body: JSON.stringify({ init_data: initData }),
        });
    }

    // Categories
    async getCategories() {
        return this.request<Category[]>('/catalog/categories/');
    }

    // Products
    async getProducts() {
        return this.request<Product[]>('/catalog/products/');
    }

    async getProduct(id: number) {
        return this.request<Product>(`/catalog/products/${id}/`);
    }

    // Hero banners
    async getHeroBanners() {
        return this.request<HeroBanner[]>('/hero/banners/');
    }

    // Cart
    async getCart() {
        return this.request<{ items: CartItem[]; total: string }>('/cart/');
    }

    async addToCart(productId: number, quantity: number = 1, options: number[] = []) {
        return this.request<CartItem>('/cart/items/', {
            method: 'POST',
            body: JSON.stringify({
                product: productId,
                quantity,
                selected_options: options,
            }),
        });
    }

    async updateCartItem(itemId: number, quantity: number) {
        return this.request<CartItem>(`/cart/items/${itemId}/`, {
            method: 'PATCH',
            body: JSON.stringify({ quantity }),
        });
    }

    async removeFromCart(itemId: number) {
        return this.request(`/cart/items/${itemId}/`, {
            method: 'DELETE',
        });
    }

    async checkout(data: any) {
        return this.request('/cart/checkout/', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    // Orders
    async getOrders() {
        return this.request('/me/orders/');
    }

    async getOrder(id: number) {
        return this.request(`/me/orders/${id}/`);
    }

    // Profile
    async getProfile() {
        return this.request('/me/profile/');
    }

    async updateProfile(data: any) {
        return this.request('/me/profile/', {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }
}

export const api = new API(API_BASE_URL);
