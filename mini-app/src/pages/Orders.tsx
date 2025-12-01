import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';
import { haptic } from '../telegram/sdk';
import { useLanguage } from '../context/language-context';

// Temporary mock data
const mockOrders = [
    {
        id: 1,
        number: '#12345',
        date: '28 Noyabr, 2025',
        status: 'delivered',
        items: 3,
        total: '125,000',
    },
    {
        id: 2,
        number: '#12344',
        date: '25 Noyabr, 2025',
        status: 'processing',
        items: 2,
        total: '89,000',
    },
];

export default function OrdersPage() {
    const { t } = useLanguage();

    const getStatusInfo = (status: string) => {
        switch (status) {
            case 'delivered':
                return { icon: CheckCircle, label: t('orders.status.delivered'), color: 'text-gray-600 bg-gray-50' };
            case 'processing':
                return { icon: Clock, label: t('orders.status.pending'), color: 'text-gray-600 bg-gray-50' };
            case 'cancelled':
                return { icon: XCircle, label: 'Bekor qilindi', color: 'text-black600 bg-black50' };
            default:
                return { icon: Package, label: 'Yangi', color: 'text-gray-600 bg-gray-50' };
        }
    };

    if (mockOrders.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 pb-20">
                <Package size={64} className="text-gray-300 mb-4" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {t('orders.empty')}
                </h2>
                <p className="text-sm text-gray-500 text-center mb-6">
                    {t('orders.emptyDesc')}
                </p>
                <button
                    onClick={() => haptic.light()}
                    className="px-6 py-3 bg-black text-white rounded-lg font-medium active:scale-95 transition-transform"
                >
                    {t('home')}
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 pt-6 pb-4 px-4 mb-4">
                <h1 className="text-2xl font-bold text-gray-900">{t('orders.title')}</h1>
            </div>

            <div className="px-4 space-y-3">
                {mockOrders.map((order) => {
                    const statusInfo = getStatusInfo(order.status);
                    const StatusIcon = statusInfo.icon;

                    return (
                        <div
                            key={order.id}
                            onClick={() => haptic.light()}
                            className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 active:scale-[0.98] transition-transform cursor-pointer"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
                                <div>
                                    <div className="text-base font-bold text-gray-900">
                                        {order.number}
                                    </div>
                                    <div className="text-sm text-gray-500 mt-1">
                                        {order.date}
                                    </div>
                                </div>
                                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${statusInfo.color}`}>
                                    <StatusIcon size={16} />
                                    <span className="text-sm font-medium">{statusInfo.label}</span>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">
                                    {order.items} {t('orders.products')}
                                </span>
                                <span className="text-lg font-bold text-gray-900">
                                    {order.total} ₸
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
