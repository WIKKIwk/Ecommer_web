import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ChevronRight, LogOut, Bell, Globe, HelpCircle, Shield } from 'lucide-react';
import { getTelegramUser, haptic } from '../telegram/sdk';
import { useAuth } from '../context/auth-context';
import { useLanguage } from '../context/language-context';
import { LoginModal } from '../components/LoginModal';

export default function ProfilePage() {
    const navigate = useNavigate();
    const [localTelegramUser, setLocalTelegramUser] = useState(() => {
        const stored = localStorage.getItem('telegram_user');
        return stored ? JSON.parse(stored) : null;
    });
    const telegramUser = getTelegramUser();
    const { customer, logout, requestCode, verifyCode } = useAuth();
    const { language, setLanguage, options, t } = useLanguage();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showLanguageModal, setShowLanguageModal] = useState(false);

    const currentLang = options.find((opt) => opt.value === language)?.label || 'O\'z';
    const isLoggedIn = !!(customer || localTelegramUser);

    const menuItems = [
        {
            icon: User,
            label: t('profile.personalInfo'),
            onClick: () => {
                haptic.selection();
                navigate('/profile/personal-info');
            },
        },
        {
            icon: Bell,
            label: t('profile.notifications'),
            onClick: () => {
                haptic.selection();
                navigate('/notifications');
            },
        },
        {
            icon: Globe,
            label: t('profile.language'),
            value: currentLang,
            onClick: () => {
                haptic.selection();
                setShowLanguageModal(true);
            },
        },
        {
            icon: HelpCircle,
            label: t('profile.help'),
            onClick: () => {
                haptic.selection();
                navigate('/profile/help');
            },
        },
        {
            icon: Shield,
            label: t('profile.privacy'),
            onClick: () => {
                haptic.selection();
                navigate('/profile/privacy');
            },
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* User Info Card */}
            {isLoggedIn ? (
                <button
                    onClick={() => {
                        haptic.light();
                        navigate('/profile/personal-info');
                    }}
                    className="w-full bg-white border-b border-gray-200 p-6 active:bg-gray-50 transition-colors"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center">
                            <User size={28} className="text-white" />
                        </div>
                        <div className="flex-1 text-left">
                            <h2 className="text-lg font-semibold text-gray-900">
                                {customer?.full_name ||
                                    localTelegramUser?.first_name ||
                                    telegramUser?.first_name ||
                                    t('profile.user')}
                                {!customer && (localTelegramUser?.last_name || telegramUser?.last_name) && ` ${localTelegramUser?.last_name || telegramUser?.last_name}`}
                            </h2>
                            <p className="text-sm text-gray-500">
                                {customer?.phone || localTelegramUser?.phone || `+${localTelegramUser?.telegram_id || telegramUser?.id || '998888170131'}`}
                            </p>
                        </div>
                        <ChevronRight size={20} className="text-gray-400" />
                    </div>
                </button>
            ) : (
                <div className="bg-white border-b border-gray-200 p-6">
                    <div className="flex flex-col items-center gap-4 py-8">
                        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                            <User size={36} className="text-gray-400" />
                        </div>
                        <div className="text-center">
                            <h2 className="text-lg font-semibold text-gray-900 mb-2">
                                Profilga xush kelibsiz
                            </h2>
                            <p className="text-sm text-gray-500 mb-6">
                                Buyurtmalaringizni kuzatish va maxsus takliflardan foydalanish uchun tizimga kiring
                            </p>
                            <button
                                onClick={() => {
                                    haptic.medium();
                                    setShowLoginModal(true);
                                }}
                                className="px-8 py-3 bg-black text-white rounded-lg font-semibold active:scale-95 transition-transform"
                            >
                                Kirish
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Stats */}
            <div className="bg-white border-b border-gray-200 p-6">
                <div className="grid grid-cols-3 divide-x divide-gray-200">
                    <button
                        onClick={() => {
                            haptic.light();
                            navigate('/orders');
                        }}
                        className="text-center active:scale-95 transition-transform"
                    >
                        <div className="text-2xl font-bold text-gray-900">0</div>
                        <div className="text-sm text-gray-500 mt-1">{t('profile.orders')}</div>
                    </button>
                    <button
                        onClick={() => {
                            haptic.light();
                            navigate('/profile/favorites');
                        }}
                        className="text-center active:scale-95 transition-transform"
                    >
                        <div className="text-2xl font-bold text-gray-900">0</div>
                        <div className="text-sm text-gray-500 mt-1">{t('profile.favorites')}</div>
                    </button>
                    <button
                        onClick={() => {
                            haptic.light();
                            navigate('/profile/bonuses');
                        }}
                        className="text-center active:scale-95 transition-transform"
                    >
                        <div className="text-2xl font-bold text-gray-900">0</div>
                        <div className="text-sm text-gray-500 mt-1">{t('profile.bonuses')}</div>
                    </button>
                </div>
            </div>

            {/* Menu Items */}
            <div className="bg-white border-b border-gray-200 mt-4">
                {menuItems.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            haptic.selection();
                            item.onClick();
                        }}
                        className="w-full flex items-center gap-3 px-6 py-4 border-b border-gray-200 last:border-0 active:bg-gray-50 transition-colors"
                    >
                        <item.icon size={20} className="text-gray-600" />
                        <span className="flex-1 text-left text-base text-gray-900">
                            {item.label}
                        </span>
                        {item.value && (
                            <span className="text-sm text-gray-500">{item.value}</span>
                        )}
                        <ChevronRight size={18} className="text-gray-400" />
                    </button>
                ))}
            </div>

            {/* Logout */}
            {isLoggedIn && (
                <div className="bg-white border-b border-gray-200 mt-4">
                    <button
                        onClick={() => {
                            haptic.error();
                            // Clear localStorage
                            localStorage.removeItem('telegram_user');
                            setLocalTelegramUser(null);
                            if (customer) {
                                logout();
                            }
                        }}
                        className="w-full flex items-center justify-center gap-2 py-4 text-black600 font-medium active:bg-gray-50 transition-colors"
                    >
                        <LogOut size={20} />
                        <span>{t('profile.logout')}</span>
                    </button>
                </div>
            )}

            {/* Version */}
            <div className="text-center mt-8 mb-4 text-xs text-gray-400">Versiya 1.0.0</div>

            {/* Modals */}
            <LoginModal
                open={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onRequestCode={requestCode}
                onVerify={verifyCode}
            />

            {/* Language Modal */}
            {showLanguageModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="bg-white rounded-2xl w-full max-w-sm p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Tilni tanlang</h3>
                        <div className="space-y-2">
                            {options.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => {
                                        haptic.selection();
                                        setLanguage(option.value);
                                        setShowLanguageModal(false);
                                    }}
                                    className={`w-full text-left px-4 py-3 rounded-lg border ${
                                        language === option.value
                                            ? 'bg-black text-white border-gray-900'
                                            : 'bg-white text-gray-900 border-gray-200'
                                    }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => {
                                haptic.selection();
                                setShowLanguageModal(false);
                            }}
                            className="w-full mt-4 px-4 py-3 border border-gray-200 text-gray-900 rounded-lg font-medium"
                        >
                            Bekor qilish
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
