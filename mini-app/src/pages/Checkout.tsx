import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, Clock, MessageSquare, ChevronRight, Home as HomeIcon } from 'lucide-react';
import { useCartStore } from '../stores/cart';
import { haptic, mainButton, backButton } from '../telegram/sdk';
import { useLanguage } from '../context/language-context';

export default function CheckoutPage() {
    const navigate = useNavigate();
    const { items, total, clearCart } = useCartStore();
    const { t } = useLanguage();
    const [deliveryTime, setDeliveryTime] = useState('asap'); // 'asap' or 'scheduled'
    const [address, setAddress] = useState({
        street: 'Toshkentskiy rayon, ulitsa Damarуk, 26',
        house: '26',
        apartment: 'hdd',
        floor: 'sb',
        entrance: 'nd',
        comment: ''
    });
    const [phone] = useState('+998888170131');
    const [paymentMethod, setPaymentMethod] = useState('cash'); // 'cash', 'card', 'online'
    const [promoCode, setPromoCode] = useState('');
    const [promoInput, setPromoInput] = useState('');
    const [useBonuses, setUseBonuses] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showPromoModal, setShowPromoModal] = useState(false);

    useEffect(() => {
        backButton.show(() => {
            haptic.light();
            navigate('/cart');
        });

        return () => backButton.hide();
    }, [navigate]);

    useEffect(() => {
        if (items.length === 0) {
            navigate('/');
            return;
        }

        const deliveryFee = 56300;
        const totalAmount = Math.floor(parseFloat(total)) + deliveryFee;

        mainButton.show(`${totalAmount.toLocaleString()} UZS - ${t('checkout.submit')}`, async () => {
            await handleSubmit();
        });

        return () => mainButton.hide();
    }, [items, total, navigate, t]);

    const handleSubmit = async () => {
        if (!phone || !address.street) {
            alert(t('checkout.fillAllFields'));
            return;
        }

        mainButton.setLoading(true);
        haptic.success();

        try {
            // TODO: Send order to backend
            await new Promise(resolve => setTimeout(resolve, 1500));

            clearCart();
            navigate('/orders');

            alert(t('checkout.orderAccepted'));
        } catch (error) {
            haptic.error();
            alert(t('checkout.error'));
        } finally {
            mainButton.setLoading(false);
        }
    };

    const deliveryFee = 56300;
    const itemsTotal = Math.floor(parseFloat(total));
    const totalAmount = itemsTotal + deliveryFee;

    return (
        <div className="min-h-screen bg-gray-50 pb-52">
            {/* Delivery Section */}
            <div className="bg-white border-b border-gray-200 mb-4">
                <div className="px-4 py-4">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">{t('checkout.title')}</h2>

                    {/* Delivery Time */}
                    <button
                        onClick={() => {
                            haptic.selection();
                            setDeliveryTime('asap');
                        }}
                        className={`w-full p-4 rounded-lg mb-3 border transition-colors ${
                            deliveryTime === 'asap'
                                ? 'bg-gray-100 border-gray-300'
                                : 'bg-gray-50 border-gray-200'
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                    deliveryTime === 'asap' ? 'border-gray-900' : 'border-gray-300'
                                }`}>
                                    {deliveryTime === 'asap' && (
                                        <div className="w-3 h-3 rounded-full bg-black" />
                                    )}
                                </div>
                                <div className="text-left">
                                    <div className="font-semibold text-gray-900">{t('checkout.homeDelivery')}</div>
                                    <div className="text-sm text-gray-500">45-55 {t('checkout.timeSlot')}</div>
                                </div>
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            {/* Address Section */}
            <div className="bg-white border-b border-gray-200 mb-4">
                <div className="px-4 py-4">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">{t('checkout.whereTo')}</h2>

                    {/* Address Display */}
                    <button
                        onClick={() => haptic.selection()}
                        className="w-full flex items-center gap-3 p-4 bg-gray-50 rounded-lg mb-4 active:bg-gray-100 transition-colors"
                    >
                        <MapPin size={20} className="text-gray-600 flex-shrink-0" />
                        <div className="flex-1 text-left">
                            <div className="text-sm text-gray-500">{t('checkout.deliveryAddress')}</div>
                            <div className="font-medium text-gray-900">{address.street}</div>
                        </div>
                        <ChevronRight size={20} className="text-gray-400" />
                    </button>

                    {/* Address Details Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-gray-50 rounded-lg p-3">
                            <div className="text-xs text-gray-500 mb-1">{t('checkout.house')}</div>
                            <input
                                type="text"
                                value={address.house}
                                onChange={(e) => setAddress({...address, house: e.target.value})}
                                className="w-full bg-transparent text-base font-semibold text-gray-900 outline-none"
                            />
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                            <div className="text-xs text-gray-500 mb-1">{t('checkout.apartment')}</div>
                            <input
                                type="text"
                                value={address.apartment}
                                onChange={(e) => setAddress({...address, apartment: e.target.value})}
                                className="w-full bg-transparent text-base font-semibold text-gray-900 outline-none"
                            />
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                            <div className="text-xs text-gray-500 mb-1">{t('checkout.floor')}</div>
                            <input
                                type="text"
                                value={address.floor}
                                onChange={(e) => setAddress({...address, floor: e.target.value})}
                                className="w-full bg-transparent text-base font-semibold text-gray-900 outline-none"
                            />
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                            <div className="text-xs text-gray-500 mb-1">{t('checkout.entrance')}</div>
                            <input
                                type="text"
                                value={address.entrance}
                                onChange={(e) => setAddress({...address, entrance: e.target.value})}
                                className="w-full bg-transparent text-base font-semibold text-gray-900 outline-none"
                            />
                        </div>
                    </div>

                    {/* Courier Comment */}
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <textarea
                            value={address.comment}
                            onChange={(e) => setAddress({...address, comment: e.target.value})}
                            placeholder={t('checkout.courierComment')}
                            className="w-full bg-transparent text-sm text-gray-900 outline-none resize-none"
                            rows={2}
                        />
                    </div>

                    {/* Order Comment */}
                    <button
                        onClick={() => haptic.selection()}
                        className="w-full flex items-center gap-3 p-4 bg-gray-50 rounded-lg mb-4 active:bg-gray-100 transition-colors"
                    >
                        <MessageSquare size={20} className="text-gray-600" />
                        <div className="flex-1 text-left text-sm text-gray-500">
                            {t('checkout.orderComment')}
                        </div>
                        <ChevronRight size={20} className="text-gray-400" />
                    </button>

                    {/* Phone */}
                    <button
                        onClick={() => haptic.selection()}
                        className="w-full flex items-center gap-3 p-4 bg-gray-50 rounded-lg mb-4 active:bg-gray-100 transition-colors"
                    >
                        <Phone size={20} className="text-gray-600" />
                        <div className="flex-1 text-left">
                            <div className="text-sm text-gray-500">{t('checkout.receiverPhone')}</div>
                            <div className="font-medium text-gray-900">{phone}</div>
                        </div>
                        <ChevronRight size={20} className="text-gray-400" />
                    </button>

                    {/* Delivery Time Selection */}
                    <button
                        onClick={() => haptic.selection()}
                        className="w-full flex items-center gap-3 p-4 bg-gray-50 rounded-lg active:bg-gray-100 transition-colors"
                    >
                        <Clock size={20} className="text-gray-600" />
                        <div className="flex-1 text-left">
                            <div className="text-sm text-gray-500">{t('checkout.deliveryTime')}</div>
                            <div className="font-medium text-gray-900">{t('checkout.whenReady')} (35 {t('checkout.minutes')})</div>
                        </div>
                        <ChevronRight size={20} className="text-gray-400" />
                    </button>
                </div>
            </div>

            {/* Payment Section */}
            <div className="bg-white border-b border-gray-200 mb-4">
                <div className="px-4 py-4">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">{t('checkout.payment')}</h2>

                    {/* Payment Method */}
                    <button
                        onClick={() => {
                            haptic.selection();
                            setShowPaymentModal(true);
                        }}
                        className="w-full flex items-center gap-3 p-4 bg-gray-50 rounded-lg mb-4 active:bg-gray-100 transition-colors"
                    >
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                            <HomeIcon size={16} className="text-gray-600" />
                        </div>
                        <div className="flex-1 text-left">
                            <div className="text-sm text-gray-500">{t('checkout.paymentMethodSelect')}</div>
                            <div className="font-medium text-gray-900">
                                {paymentMethod === 'cash' && 'Naqd pul'}
                                {paymentMethod === 'card' && 'Terminal orqali'}
                                {paymentMethod === 'online' && 'Onlayn to\'lov'}
                            </div>
                        </div>
                        <ChevronRight size={20} className="text-gray-400" />
                    </button>

                    {/* Promo Code */}
                    <button
                        onClick={() => {
                            haptic.selection();
                            setShowPromoModal(true);
                        }}
                        className="w-full flex items-center gap-3 p-4 bg-gray-50 rounded-lg mb-4 active:bg-gray-100 transition-colors"
                    >
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                            <div className="text-lg">%</div>
                        </div>
                        <div className="flex-1 text-left">
                            <div className="text-sm text-gray-500">{t('checkout.promoCode')}</div>
                            {promoCode && (
                                <div className="font-medium text-gray-900">{promoCode}</div>
                            )}
                        </div>
                        <ChevronRight size={20} className="text-gray-400" />
                    </button>

                    {/* Bonus Payment */}
                    <button
                        onClick={() => {
                            haptic.selection();
                            setUseBonuses(!useBonuses);
                        }}
                        className="w-full flex items-center gap-3 p-4 bg-gray-50 rounded-lg active:bg-gray-100 transition-colors"
                    >
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                            <MessageSquare size={16} className="text-gray-600" />
                        </div>
                        <div className="flex-1 text-left">
                            <div className="text-sm text-gray-500">{t('checkout.payWithBonus')}</div>
                            {useBonuses && (
                                <div className="font-medium text-gray-600">Faollashtirildi</div>
                            )}
                        </div>
                        <div className={`w-12 h-6 rounded-full transition-colors ${
                            useBonuses ? 'bg-gray-600' : 'bg-gray-300'
                        }`}>
                            <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform transform mt-0.5 ${
                                useBonuses ? 'translate-x-6' : 'translate-x-0.5'
                            }`} />
                        </div>
                    </button>
                </div>
            </div>

            {/* Items Section */}
            <div className="bg-white border-b border-gray-200 mb-4">
                <div className="px-4 py-4">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">{t('checkout.products')}</h2>

                    <div className="space-y-3">
                        {items.map((item) => (
                            <div key={item.id} className="flex items-start gap-3">
                                {item.product.image && (
                                    <img
                                        src={item.product.image}
                                        alt={item.product.name}
                                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                                    />
                                )}
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium text-gray-900 mb-1">{item.product.name}</div>
                                    <div className="text-sm text-gray-500">{Math.floor(parseFloat(item.product.price)).toLocaleString()} so'm</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-gray-500">x{item.quantity}</div>
                                    <div className="font-semibold text-gray-900">{Math.floor(parseFloat(item.subtotal)).toLocaleString()} so'm</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Add Comment Link */}
                    <button
                        onClick={() => haptic.selection()}
                        className="mt-4 text-gray-600 text-sm font-medium"
                    >
                        {t('checkout.addComment')}
                    </button>
                </div>
            </div>

            {/* Total Section */}
            <div className="bg-white border-b border-gray-200">
                <div className="px-4 py-4">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">{t('checkout.total')}</h2>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-base text-gray-900">{t('checkout.products')}</span>
                            <span className="text-base font-semibold text-gray-900">{itemsTotal.toLocaleString()} so'm</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-base text-gray-900">{t('checkout.delivery')}</span>
                                <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center">
                                    <span className="text-xs text-gray-600">i</span>
                                </div>
                            </div>
                            <span className="text-base font-semibold text-gray-900">{deliveryFee.toLocaleString()} so'm</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fixed Bottom Total */}
            <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 z-40">
                <button
                    onClick={() => {
                        haptic.medium();
                        handleSubmit();
                    }}
                    className="w-full py-4 bg-black text-white rounded-lg font-bold text-base active:scale-95 transition-transform flex items-center justify-between px-6"
                >
                    <span>{totalAmount.toLocaleString()} so'm</span>
                    <span>{t('checkout.submit')}</span>
                </button>
            </div>

            {/* Payment Method Modal */}
            {showPaymentModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
                    <div className="bg-white rounded-t-3xl w-full px-4 pb-8 pt-6 animate-slide-up">
                        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />
                        <h3 className="text-xl font-bold text-gray-900 mb-4">To'lov usulini tanlang</h3>

                        <div className="space-y-3">
                            <button
                                onClick={() => {
                                    haptic.selection();
                                    setPaymentMethod('cash');
                                    setShowPaymentModal(false);
                                }}
                                className={`w-full p-4 rounded-lg border-2 transition-colors ${
                                    paymentMethod === 'cash'
                                        ? 'bg-gray-100 border-gray-900'
                                        : 'bg-white border-gray-200'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                            paymentMethod === 'cash' ? 'border-gray-900' : 'border-gray-300'
                                        }`}>
                                            {paymentMethod === 'cash' && (
                                                <div className="w-3 h-3 rounded-full bg-black" />
                                            )}
                                        </div>
                                        <span className="font-semibold text-gray-900">Naqd pul</span>
                                    </div>
                                </div>
                            </button>

                            <button
                                onClick={() => {
                                    haptic.selection();
                                    setPaymentMethod('card');
                                    setShowPaymentModal(false);
                                }}
                                className={`w-full p-4 rounded-lg border-2 transition-colors ${
                                    paymentMethod === 'card'
                                        ? 'bg-gray-100 border-gray-900'
                                        : 'bg-white border-gray-200'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                            paymentMethod === 'card' ? 'border-gray-900' : 'border-gray-300'
                                        }`}>
                                            {paymentMethod === 'card' && (
                                                <div className="w-3 h-3 rounded-full bg-black" />
                                            )}
                                        </div>
                                        <span className="font-semibold text-gray-900">Terminal orqali</span>
                                    </div>
                                </div>
                            </button>

                            <button
                                onClick={() => {
                                    haptic.selection();
                                    setPaymentMethod('online');
                                    setShowPaymentModal(false);
                                }}
                                className={`w-full p-4 rounded-lg border-2 transition-colors ${
                                    paymentMethod === 'online'
                                        ? 'bg-gray-100 border-gray-900'
                                        : 'bg-white border-gray-200'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                            paymentMethod === 'online' ? 'border-gray-900' : 'border-gray-300'
                                        }`}>
                                            {paymentMethod === 'online' && (
                                                <div className="w-3 h-3 rounded-full bg-black" />
                                            )}
                                        </div>
                                        <span className="font-semibold text-gray-900">Onlayn to'lov</span>
                                    </div>
                                </div>
                            </button>
                        </div>

                        <button
                            onClick={() => {
                                haptic.light();
                                setShowPaymentModal(false);
                            }}
                            className="w-full mt-4 py-3 bg-gray-100 text-gray-900 rounded-lg font-semibold active:scale-95 transition-transform"
                        >
                            Bekor qilish
                        </button>
                    </div>
                </div>
            )}

            {/* Promo Code Modal */}
            {showPromoModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
                    <div className="bg-white rounded-3xl w-full max-w-md px-6 py-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Promokod</h3>

                        <input
                            type="text"
                            value={promoInput}
                            onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                            placeholder="Promokodni kiriting"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent mb-4"
                        />

                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    haptic.light();
                                    setShowPromoModal(false);
                                    setPromoInput('');
                                }}
                                className="flex-1 py-3 bg-gray-100 text-gray-900 rounded-lg font-semibold active:scale-95 transition-transform"
                            >
                                Bekor qilish
                            </button>
                            <button
                                onClick={() => {
                                    if (promoInput.trim()) {
                                        haptic.success();
                                        setPromoCode(promoInput.trim());
                                        setShowPromoModal(false);
                                        setPromoInput('');
                                    }
                                }}
                                className="flex-1 py-3 bg-black text-white rounded-lg font-semibold active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={!promoInput.trim()}
                            >
                                Qo'llash
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
