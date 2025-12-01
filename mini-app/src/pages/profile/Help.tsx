import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail, MessageCircle, ChevronRight } from 'lucide-react';
import { haptic, backButton } from '../../telegram/sdk';

export default function HelpPage() {
    const navigate = useNavigate();

    useEffect(() => {
        backButton.show(() => {
            haptic.light();
            navigate('/profile');
        });

        return () => backButton.hide();
    }, [navigate]);

    const helpItems = [
        {
            icon: Phone,
            title: 'Telefon',
            description: '+998 88 000 00 00',
            onClick: () => {
                window.open('tel:+998880000000');
            },
        },
        {
            icon: MessageCircle,
            title: 'Telegram',
            description: '@custom_ecommer_support',
            onClick: () => {
                window.open('https://t.me/custom_ecommer_support');
            },
        },
        {
            icon: Mail,
            title: 'Email',
            description: 'support@custom-ecommer.uz',
            onClick: () => {
                window.open('mailto:support@custom-ecommer.uz');
            },
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 pt-6 pb-4 px-4 mb-4">
                <h1 className="text-2xl font-bold text-gray-900">Yordam</h1>
            </div>

            {/* Help Items */}
            <div className="bg-white border-b border-gray-200">
                {helpItems.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            haptic.light();
                            item.onClick();
                        }}
                        className="w-full flex items-center gap-4 px-6 py-4 border-b border-gray-200 last:border-0 active:bg-gray-50 transition-colors"
                    >
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                            <item.icon size={20} className="text-gray-600" />
                        </div>
                        <div className="flex-1 text-left">
                            <div className="text-base font-semibold text-gray-900">
                                {item.title}
                            </div>
                            <div className="text-sm text-gray-500 mt-0.5">
                                {item.description}
                            </div>
                        </div>
                        <ChevronRight size={20} className="text-gray-400" />
                    </button>
                ))}
            </div>

            {/* FAQ Section */}
            <div className="px-4 mt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Ko'p beriladigan savollar
                </h2>
                <div className="space-y-3">
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <h3 className="text-base font-semibold text-gray-900 mb-2">
                            Yetkazib berish qancha vaqt oladi?
                        </h3>
                        <p className="text-sm text-gray-600">
                            Odatda 30-45 daqiqa ichida yetkazib beramiz. Buyurtma soniga qarab vaqt o'zgarishi mumkin.
                        </p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <h3 className="text-base font-semibold text-gray-900 mb-2">
                            To'lovni qanday amalga oshirish mumkin?
                        </h3>
                        <p className="text-sm text-gray-600">
                            Naqd pul yoki terminal orqali to'lov qilishingiz mumkin.
                        </p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <h3 className="text-base font-semibold text-gray-900 mb-2">
                            Buyurtmani bekor qilsam bo'ladimi?
                        </h3>
                        <p className="text-sm text-gray-600">
                            Ha, buyurtma tayorlash jarayonida bo'lsa bekor qilishingiz mumkin.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
