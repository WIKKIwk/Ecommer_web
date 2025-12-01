import { Home, ShoppingCart, User, Package } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { haptic } from '../telegram/sdk';
import { useLanguage } from '../context/language-context';

export default function BottomNav() {
    const location = useLocation();
    const navigate = useNavigate();
    const { t } = useLanguage();

    const navItems = [
        { path: '/', icon: Home, label: t('home') },
        { path: '/cart', icon: ShoppingCart, label: t('cart') },
        { path: '/orders', icon: Package, label: t('orders') },
        { path: '/profile', icon: User, label: t('profile') },
    ];

    // Find active item index for circle position animation
    const activeIndex = navItems.findIndex(item => location.pathname === item.path);

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 safe-area-bottom">
            <div className="relative grid grid-cols-4 h-16">
                {/* Animated background circle that moves horizontally between icons */}
                <div
                    className="absolute top-1/2 w-[56px] h-[56px] bg-black rounded-full border-[3px] border-white pointer-events-none"
                    style={{
                        left: `calc(${activeIndex * 25}% + 12.5% - 28px)`,
                        transform: activeIndex >= 0 ? 'translateY(calc(-50% - 8px)) scale(1.1)' : 'translateY(-50%) scale(1)',
                        opacity: activeIndex >= 0 ? 1 : 0,
                        transition: 'all 0.48s cubic-bezier(0.4, 0.0, 0.2, 1)',
                    }}
                />

                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.path}
                            onClick={() => {
                                haptic.selection();
                                navigate(item.path);
                            }}
                            className="relative flex flex-col items-center justify-center gap-1 active:scale-95 transition-all duration-200 group"
                        >
                            {/* Icon container */}
                            <div className={`relative transition-all duration-300 ease-out ${isActive ? 'scale-110 -translate-y-2' : 'group-hover:scale-105'
                                }`}>
                                {/* Icon with smooth color transition */}
                                <div className="relative z-10 flex items-center justify-center w-[56px] h-[56px]">
                                    <div className={`transition-all duration-300 ${isActive ? 'rotate-0' : 'group-hover:rotate-12'
                                        }`}>
                                        <Icon
                                            size={22}
                                            strokeWidth={2.5}
                                            className={`transition-all duration-300 ${isActive ? 'text-white drop-shadow-lg' : 'text-gray-400 group-hover:text-gray-600'
                                                }`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
