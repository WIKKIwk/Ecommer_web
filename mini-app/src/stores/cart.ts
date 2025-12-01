import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api, type CartItem } from '../api/client';

interface CartStore {
    items: CartItem[];
    total: string;
    isLoading: boolean;
    error: string | null;

    fetchCart: () => Promise<void>;
    addItem: (productId: number, quantity?: number, options?: number[]) => Promise<void>;
    updateQuantity: (itemId: number, quantity: number) => Promise<void>;
    removeItem: (itemId: number) => Promise<void>;
    clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            total: '0.00',
            isLoading: false,
            error: null,

            fetchCart: async () => {
                // No need - persist handles this automatically
                return;
            },

            addItem: async (productId, quantity = 1, options = []) => {
                set({ isLoading: true, error: null });
                try {
                    const { items } = get();
                    const existingIndex = items.findIndex(i => i.product.id === productId);

                    let newItems;
                    if (existingIndex >= 0) {
                        newItems = [...items];
                        newItems[existingIndex].quantity += quantity;
                        newItems[existingIndex].subtotal = (parseFloat(newItems[existingIndex].product.price) * newItems[existingIndex].quantity).toString();
                    } else {
                        // Fetch product details
                        const product = await api.getProduct(productId);
                        newItems = [...items, {
                            id: Date.now(),
                            product,
                            quantity,
                            options,
                            subtotal: (parseFloat(product.price) * quantity).toString()
                        }];
                    }

                    const total = newItems.reduce((sum, item) => sum + parseFloat(item.subtotal), 0).toString();
                    set({ items: newItems, total, isLoading: false });
                } catch (error) {
                    set({ error: (error as Error).message, isLoading: false });
                }
            },

            updateQuantity: async (itemId, quantity) => {
                set({ isLoading: true, error: null });
                try {
                    const { items } = get();
                    const newItems = items.map(item => {
                        if (item.id === itemId) {
                            const newQuantity = Math.max(1, quantity);
                            return {
                                ...item,
                                quantity: newQuantity,
                                subtotal: (parseFloat(item.product.price) * newQuantity).toString()
                            };
                        }
                        return item;
                    });

                    const total = newItems.reduce((sum, item) => sum + parseFloat(item.subtotal), 0).toString();
                    set({ items: newItems, total, isLoading: false });
                } catch (error) {
                    set({ error: (error as Error).message, isLoading: false });
                }
            },

            removeItem: async (itemId) => {
                set({ isLoading: true, error: null });
                try {
                    const { items } = get();
                    const newItems = items.filter(item => item.id !== itemId);
                    const total = newItems.reduce((sum, item) => sum + parseFloat(item.subtotal), 0).toString();
                    set({ items: newItems, total, isLoading: false });
                } catch (error) {
                    set({ error: (error as Error).message, isLoading: false });
                }
            },

            clearCart: () => {
                set({ items: [], total: '0.00' });
            },
        }),
        {
            name: 'mini-app-cart',
        }
    )
);
