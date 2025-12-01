import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Package, Tag, Info } from 'lucide-react';
import { haptic, backButton } from '../telegram/sdk';

// Demo notifications
const notifications = [
    {
        id: 1,
        type: 'order',
        title: 'Buyurtmangiz yetkazildi',
        message: 'Set 4 kishi buyurtmangiz muvaffaqiyatli yetkazildi',
        time: '5 daqiqa oldin',
        read: false,
    },
    {
        id: 2,
        type: 'promo',
        title: 'Yangi chegirma!',
        message: 'Barcha setlarga 15% chegirma. Bugun oxirigacha!',
        time: '2 soat oldin',
        read: false,
    },
    {
        id: 3,
        type: 'info',
        title: 'Yetkazib berish vaqti',
        message: 'Bugun yetkazib berish 30-40 daqiqa davom etadi',
        time: 'Kecha',
        read: true,
    },
];

const getIcon = (type: string) => {
    switch (type) {
        case 'order':
            return <Package size={20} className="text-gray-600" />;
        case 'promo':
            return <Tag size={20} className="text-gray-600" />;
        default:
            return <Info size={20} className="text-gray-600" />;
    }
};

export default function NotificationsPage() {
    const navigate = useNavigate();

    useEffect(() => {
        backButton.show(() => {
            haptic.light();
            navigate('/');
        });

        return () => backButton.hide();
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 pt-6 pb-4 px-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-2xl font-bold text-gray-900">Xabarnomalar</h1>
                    <Bell size={24} className="text-gray-600" />
                </div>
                <p className="text-sm text-gray-500">
                    {notifications.filter(n => !n.read).length} ta o'qilmagan
                </p>
            </div>

            {/* Notifications List */}
            <div className="px-4 pb-24">
                {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <div className="text-6xl">🔔</div>
                        <p className="text-base text-gray-900 font-semibold">Xabarnomalar yo'q</p>
                        <p className="text-sm text-gray-500">Sizga yangi xabarnomalar kelganda bu yerda ko'rinadi</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {notifications.map((notification) => (
                            <button
                                key={notification.id}
                                onClick={() => haptic.light()}
                                className="w-full bg-white rounded-lg border border-gray-200 p-4 text-left active:scale-[0.98] transition-transform"
                            >
                                <div className="flex gap-3">
                                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                                        !notification.read ? 'bg-gray-100' : 'bg-gray-50'
                                    }`}>
                                        {getIcon(notification.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2 mb-1">
                                            <h3 className={`text-sm font-semibold ${
                                                !notification.read ? 'text-gray-900' : 'text-gray-600'
                                            }`}>
                                                {notification.title}
                                            </h3>
                                            {!notification.read && (
                                                <span className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-1"></span>
                                            )}
                                        </div>
                                        <p className={`text-sm mb-2 ${
                                            !notification.read ? 'text-gray-600' : 'text-gray-500'
                                        }`}>
                                            {notification.message}
                                        </p>
                                        <span className="text-xs text-gray-400">{notification.time}</span>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
