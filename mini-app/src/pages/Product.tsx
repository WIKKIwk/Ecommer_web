import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api/client';
import { useCartStore } from '../stores/cart';
import { haptic, mainButton, backButton } from '../telegram/sdk';

export default function ProductPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addItem } = useCartStore();

    const { data: product, isLoading } = useQuery({
        queryKey: ['product', id],
        queryFn: () => api.getProduct(Number(id)),
        enabled: !!id,
    });

    useEffect(() => {
        backButton.show(() => {
            haptic.light();
            navigate(-1);
        });

        return () => backButton.hide();
    }, [navigate]);

    useEffect(() => {
        if (product && product.is_available) {
            mainButton.show('Savatga qo\'shish', async () => {
                haptic.success();
                mainButton.setLoading(true);
                await addItem(product.id);
                mainButton.setLoading(false);
                navigate('/cart');
            });
        } else {
            mainButton.hide();
        }

        return () => mainButton.hide();
    }, [product, addItem, navigate]);

    const handleAddToCart = async () => {
        if (!product) return;
        haptic.success();
        await addItem(product.id);
        navigate('/cart');
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-3 px-4 bg-gray-50">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-gray-900"></div>
                <p className="text-sm text-gray-500 font-medium">Yuklanmoqda...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex items-center justify-center min-h-screen text-gray-500 bg-gray-50">
                <p className="text-base font-medium">Mahsulot topilmadi</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-24 bg-gray-50">
            {/* Product Image */}
            {product.image && (
                <div className="relative aspect-square bg-white">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            {/* Product Info */}
            <div className="bg-white border-b border-gray-200 p-6 mb-4">
                <div className="mb-4">
                    <span className="text-sm text-gray-500 font-medium">{product.category_name}</span>
                    <h1 className="text-2xl font-bold text-gray-900 mt-1">{product.name}</h1>
                </div>

                {product.description && (
                    <p className="text-base text-gray-600 mb-6 leading-relaxed">{product.description}</p>
                )}

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-3xl font-bold text-gray-900">
                        {Math.floor(parseFloat(product.price)).toLocaleString()} so'm
                    </span>
                    {product.old_price && (
                        <span className="text-lg text-gray-400 line-through">
                            {Math.floor(parseFloat(product.old_price)).toLocaleString()}
                        </span>
                    )}
                </div>

                {/* Add to Cart Button */}
                {product.is_available && (
                    <button
                        onClick={handleAddToCart}
                        className="w-full py-4 bg-black text-white rounded-lg font-semibold text-base active:scale-95 transition-transform"
                    >
                        Savatga qo'shish
                    </button>
                )}
            </div>

            {/* Meta Info */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="space-y-4">
                    {product.weight_in_grams && (
                        <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                            <span className="text-base text-gray-500">Og'irligi</span>
                            <span className="text-base font-semibold text-gray-900">{product.weight_in_grams}g</span>
                        </div>
                    )}
                    {product.calories && (
                        <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                            <span className="text-base text-gray-500">Kaloriya</span>
                            <span className="text-base font-semibold text-gray-900">{product.calories} kcal</span>
                        </div>
                    )}
                    {product.preparation_minutes && (
                        <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                            <span className="text-base text-gray-500">Tayyorlash vaqti</span>
                            <span className="text-base font-semibold text-gray-900">{product.preparation_minutes} daqiqa</span>
                        </div>
                    )}
                </div>
            </div>

            {!product.is_available && (
                <div className="mx-4 mt-4">
                    <div className="p-4 bg-black50 border border-black100 text-black600 rounded-lg text-center font-medium">
                        Mahsulot hozircha mavjud emas
                    </div>
                </div>
            )}
        </div>
    );
}
