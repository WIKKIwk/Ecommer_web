import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../stores/cart';
import { haptic, mainButton, backButton } from '../telegram/sdk';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useLanguage } from '../context/language-context';

export default function CartPage() {
    const navigate = useNavigate();
    const { items, total, updateQuantity, removeItem, isLoading } = useCartStore();
    const { t } = useLanguage();

    useEffect(() => {
        backButton.show(() => {
            haptic.light();
            navigate('/');
        });

        return () => backButton.hide();
    }, [navigate]);

    useEffect(() => {
        if (items.length > 0 && !isLoading) {
            mainButton.show(`${t('cart.checkout')} (${Math.floor(parseFloat(total)).toLocaleString()} so'm)`, () => {
                haptic.medium();
                navigate('/checkout');
            });
        } else {
            mainButton.hide();
        }

        return () => mainButton.hide();
    }, [items, total, isLoading, navigate, t]);

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 bg-gray-50">
                <div className="text-6xl mb-4">🛒</div>
                <h2 className="text-xl font-bold mb-2 text-gray-900">{t('cart.empty')}</h2>
                <p className="text-gray-500 mb-6">{t('cart.emptyDesc')}</p>
                <button
                    onClick={() => {
                        haptic.light();
                        navigate('/');
                    }}
                    className="px-6 py-3 bg-black text-white rounded-lg font-medium active:scale-95 transition-transform"
                >
                    {t('home')}
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-32 bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 pt-6 pb-4 px-4 mb-4">
                <h1 className="text-2xl font-bold text-gray-900">{t('cart.title')}</h1>
            </div>

            <div className="px-4 space-y-3">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
                    >
                        <div className="flex gap-4">
                            {item.product.image && (
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                                />
                            )}

                            <div className="flex-1 min-w-0 flex flex-col justify-between">
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{item.product.name}</h3>
                                    <p className="text-sm text-gray-500">
                                        {Math.floor(parseFloat(item.product.price)).toLocaleString()} so'm
                                    </p>
                                </div>

                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={async () => {
                                                haptic.selection();
                                                if (item.quantity > 1) {
                                                    await updateQuantity(item.id, item.quantity - 1);
                                                } else {
                                                    await removeItem(item.id);
                                                }
                                            }}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 active:scale-95 transition-transform"
                                        >
                                            {item.quantity > 1 ? (
                                                <Minus size={16} className="text-gray-700" />
                                            ) : (
                                                <Trash2 size={16} className="text-black" />
                                            )}
                                        </button>

                                        <span className="w-8 text-center font-semibold text-gray-900">{item.quantity}</span>

                                        <button
                                            onClick={async () => {
                                                haptic.selection();
                                                await updateQuantity(item.id, item.quantity + 1);
                                            }}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-black text-white active:scale-95 transition-transform"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>

                                    <div className="font-bold text-gray-900">
                                        {Math.floor(parseFloat(item.subtotal)).toLocaleString()} ₸
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Total */}
            <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 z-40">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-gray-900">{t('cart.total')}</span>
                    <span className="text-2xl font-bold text-gray-900">
                        {Math.floor(parseFloat(total)).toLocaleString()} so'm
                    </span>
                </div>
                <button
                    onClick={() => {
                        haptic.medium();
                        navigate('/checkout');
                    }}
                    className="w-full py-3 bg-black text-white rounded-lg font-semibold text-base active:scale-95 transition-transform"
                >
                    {t('cart.checkout')}
                </button>
            </div>
        </div>
    );
}
