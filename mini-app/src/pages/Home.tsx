import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api/client';
import { useCartStore } from '../stores/cart';
import { haptic, mainButton } from '../telegram/sdk';
import HeroCarousel from '../components/HeroCarousel';
import ProductCard from '../components/ProductCard';
import { Search as SearchIcon, X } from 'lucide-react';

interface HomePageProps {
    searchOpen: boolean;
    setSearchOpen: (open: boolean) => void;
}

export default function HomePage({ searchOpen, setSearchOpen }: HomePageProps) {
    const navigate = useNavigate();
    const { items, addItem } = useCartStore();
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [highlightedCategory, setHighlightedCategory] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const productsRef = useRef<HTMLDivElement>(null);
    const categoryRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

    // Fetch data
    const { data: banners } = useQuery({
        queryKey: ['banners'],
        queryFn: () => api.getHeroBanners(),
    });

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => api.getCategories(),
    });

    const { data: products, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: () => api.getProducts(),
    });

    const handleAddToCart = async (productId: number) => {
        haptic.success();
        await addItem(productId);
    };

    const handleCategoryChange = (categoryId: number | null) => {
        haptic.selection();

        if (categoryId === null) {
            // "Barchasi" - reset both states
            setSelectedCategory(null);
            setHighlightedCategory(null);
            // Scroll to products section with smooth animation
            setTimeout(() => {
                productsRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        } else if (selectedCategory === null) {
            // In "All" view, just scroll to category section without changing view
            setHighlightedCategory(categoryId);
            setTimeout(() => {
                categoryRefs.current[categoryId]?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        } else {
            // Switch to single category view
            setSelectedCategory(categoryId);
            setHighlightedCategory(null);
            setTimeout(() => {
                productsRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    };

    // Intersection Observer to auto-update highlighted category based on scroll
    useEffect(() => {
        if (selectedCategory !== null) return; // Only apply in "All" view

        const observer = new IntersectionObserver(
            (entries) => {
                // Find the entry with highest intersection ratio
                let maxEntry = entries[0];
                entries.forEach((entry) => {
                    if (entry.intersectionRatio > (maxEntry?.intersectionRatio || 0)) {
                        maxEntry = entry;
                    }
                });

                if (maxEntry && maxEntry.isIntersecting && maxEntry.intersectionRatio > 0.2) {
                    const categoryId = parseInt(maxEntry.target.getAttribute('data-category-id') || '0');
                    setHighlightedCategory(categoryId);
                }
            },
            {
                threshold: [0.2, 0.4, 0.6, 0.8],
                rootMargin: '-120px 0px -50% 0px'
            }
        );

        // Observe all category sections
        Object.values(categoryRefs.current).forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, [selectedCategory]);

    // Show main button if cart has items
    useEffect(() => {
        if (items.length > 0) {
            mainButton.show(`🛒 Savat (${items.length})`, () => {
                haptic.light();
                navigate('/cart');
            });
        } else {
            mainButton.hide();
        }

        return () => mainButton.hide();
    }, [items, navigate]);

    // Filter products by search query and category
    const allProducts = products || [];

    const searchFilteredProducts = searchQuery.trim()
        ? allProducts.filter(product => {
            const query = searchQuery.toLowerCase();
            const categoryName = categories?.find(c => c.id === product.category)?.name?.toLowerCase() || '';
            return product.name.toLowerCase().includes(query) ||
                   product.description?.toLowerCase().includes(query) ||
                   categoryName.includes(query);
        })
        : allProducts;

    const filteredProducts = selectedCategory
        ? searchFilteredProducts.filter((p) => p.category === selectedCategory)
        : searchFilteredProducts;

    // Featured products
    const featuredProducts = products?.filter((p) => p.is_featured) || [];

    // Group products by category for "All" view
    const productsByCategory = categories?.map(cat => ({
        category: cat,
        products: products?.filter(p => p.category === cat.id) || []
    })).filter(group => group.products.length > 0) || [];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Search Bar - Shows when searchOpen is true with animation */}
            <div className={`sticky top-14 z-50 bg-white border-b border-gray-200 px-4 overflow-hidden transition-all duration-300 ease-out ${
                searchOpen ? 'py-3 max-h-20 opacity-100' : 'py-0 max-h-0 opacity-0'
            }`}>
                <div className="flex items-center gap-3">
                    <div className="flex-1 relative">
                        <SearchIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Taom qidirish..."
                            autoFocus
                            className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border-none rounded-lg text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => {
                                    haptic.light();
                                    setSearchQuery('');
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
                            >
                                <X size={16} className="text-gray-500" />
                            </button>
                        )}
                    </div>
                    <button
                        onClick={() => {
                            haptic.light();
                            setSearchOpen(false);
                            setSearchQuery('');
                        }}
                        className="text-sm font-medium text-gray-600 hover:text-gray-900"
                    >
                        Bekor qilish
                    </button>
                </div>
            </div>

            {/* Hero Carousel */}
            {!searchOpen && banners && banners.length > 0 && (
                <div className="mb-4">
                    <HeroCarousel banners={banners} />
                </div>
            )}

            {/* Categories - Modern chip style with gradient */}
            {!searchOpen && categories && categories.length > 0 && (
                <div className="sticky top-14 z-40 bg-gray-50 mb-6 pt-4 pb-3 -mt-4 backdrop-blur-lg bg-gray-50/95 shadow-sm">
                    <div className="px-4">
                        <div className="flex gap-2.5 overflow-x-auto scrollbar-hide">
                            <button
                                onClick={() => handleCategoryChange(null)}
                                className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                                    selectedCategory === null && highlightedCategory === null
                                        ? 'bg-gray-200 text-gray-900'
                                        : 'text-gray-600 hover:text-gray-900 active:scale-95'
                                }`}
                            >
                                Barchasi
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => handleCategoryChange(cat.id)}
                                    className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                                        selectedCategory === cat.id || (selectedCategory === null && highlightedCategory === cat.id)
                                            ? 'bg-gray-200 text-gray-900'
                                            : 'text-gray-600 hover:text-gray-900 active:scale-95'
                                    }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Featured Products */}
            {!searchOpen && !selectedCategory && featuredProducts.length > 0 && (
                <div className="px-4 mb-6">
                    <h2 className="text-base font-semibold text-gray-900 mb-3">
                        Mashhur taomlar
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                        {featuredProducts.map((product) => (
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
                </div>
            )}

            {/* All Products */}
            <div ref={productsRef} className="scroll-mt-4">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-16 gap-3 px-4">
                        <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-gray-900"></div>
                        <p className="text-sm text-gray-500 font-medium">Yuklanmoqda...</p>
                    </div>
                ) : searchOpen && searchQuery.trim() ? (
                    // Search results view
                    <div className="px-4">
                        {searchFilteredProducts && searchFilteredProducts.length > 0 ? (
                            <>
                                <p className="text-sm text-gray-500 mb-4">
                                    {searchFilteredProducts.length} ta mahsulot topildi
                                </p>
                                <div className="grid grid-cols-2 gap-3 pb-24">
                                    {searchFilteredProducts.map((product) => (
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
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 gap-4">
                                <div className="text-6xl">😕</div>
                                <p className="text-base text-gray-900 font-semibold">Hech narsa topilmadi</p>
                                <p className="text-sm text-gray-500">"{searchQuery}" bo'yicha natija yo'q</p>
                            </div>
                        )}
                    </div>
                ) : selectedCategory ? (
                    // Single category view
                    <div className="px-4">
                        <h2 className="text-base font-semibold text-gray-900 mb-3">Taomlar</h2>
                        {filteredProducts && filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-2 gap-3 pb-24">
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
                        ) : (
                            <div className="flex flex-col items-center justify-center py-16 gap-3">
                                <div className="text-5xl">🔍</div>
                                <p className="text-gray-500 font-medium">Mahsulot topilmadi</p>
                                <button
                                    onClick={() => handleCategoryChange(null)}
                                    className="mt-2 px-6 py-2 bg-black text-white rounded-full text-sm font-semibold active:scale-95 transition-transform"
                                >
                                    Hammasini ko'rish
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    // All categories view - grouped by category
                    <div className="space-y-8 pb-24">
                        {productsByCategory.map((group) => (
                            <div
                                key={group.category.id}
                                ref={(el) => {
                                    categoryRefs.current[group.category.id] = el;
                                }}
                                data-category-id={group.category.id}
                                className="px-4 scroll-mt-24"
                            >
                                <h2 className="text-base font-semibold text-gray-900 mb-3">
                                    {group.category.name}
                                </h2>
                                <div className="grid grid-cols-2 gap-3">
                                    {group.products.map((product) => (
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
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
