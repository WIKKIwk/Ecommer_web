import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api/client';
import { haptic, backButton } from '../telegram/sdk';
import ProductCard from '../components/ProductCard';
import { useCartStore } from '../stores/cart';

export default function SearchPage() {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const { addItem, fetchCart } = useCartStore();

    const { data: products, isLoading: isLoadingProducts } = useQuery({
        queryKey: ['products'],
        queryFn: () => api.getProducts(),
    });

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => api.getCategories(),
    });

    useEffect(() => {
        backButton.show(() => {
            haptic.light();
            navigate('/');
        });

        return () => backButton.hide();
    }, [navigate]);

    const handleAddToCart = async (productId: number) => {
        haptic.success();
        await addItem(productId);
        fetchCart();
    };

    // Get all products from all categories
    const allProducts = categories?.flatMap(cat =>
        products?.filter(p => p.category === cat.id) || []
    ) || products || [];

    const filteredProducts = allProducts.filter(product => {
        const searchQuery = query.toLowerCase();
        const categoryName = categories?.find(c => c.id === product.category)?.name?.toLowerCase() || '';

        return product.name.toLowerCase().includes(searchQuery) ||
               product.description?.toLowerCase().includes(searchQuery) ||
               categoryName.includes(searchQuery);
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Search Header */}
            <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3">
                <div className="flex items-center gap-3">
                    <div className="flex-1 relative">
                        <SearchIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Taom qidirish..."
                            autoFocus
                            className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border-none rounded-lg text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        />
                        {query && (
                            <button
                                onClick={() => {
                                    haptic.light();
                                    setQuery('');
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
                            >
                                <X size={16} className="text-gray-500" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Results */}
            <div className="px-4 pt-4 pb-24">
                {isLoadingProducts ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-3">
                        <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-gray-900"></div>
                        <p className="text-sm text-gray-500 font-medium">Yuklanmoqda...</p>
                    </div>
                ) : !query ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <div className="text-6xl">🔍</div>
                        <p className="text-base text-gray-500 font-medium">Taom nomini kiriting</p>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <div className="text-6xl">😕</div>
                        <p className="text-base text-gray-900 font-semibold">Hech narsa topilmadi</p>
                        <p className="text-sm text-gray-500">"{query}" bo'yicha natija yo'q</p>
                    </div>
                ) : (
                    <>
                        <p className="text-sm text-gray-500 mb-4">
                            {filteredProducts.length} ta mahsulot topildi
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            {filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onClick={() => {
                                        haptic.light();
                                        navigate(`/product/${product.id}`);
                                    }}
                                    onAddToCart={() => handleAddToCart(product.id)}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
