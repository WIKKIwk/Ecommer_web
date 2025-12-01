import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Bell, Home } from 'lucide-react';
import { haptic } from '../telegram/sdk';
import { useLanguage } from '../context/language-context';
import { useSiteSettings } from '../context/site-settings-context';

interface HeaderProps {
    showSearch?: boolean;
    showNotifications?: boolean;
    onSearchClick?: () => void;
}

export default function Header({
    showSearch = true,
    showNotifications = true,
    onSearchClick
}: HeaderProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useLanguage();
    const { settings } = useSiteSettings();
    const isHomePage = location.pathname === '/';

    const title = settings?.site_name || t('app.title');
    const firstLetter = title.charAt(0).toUpperCase();

    const handleLogoClick = () => {
        if (!isHomePage) {
            haptic.light();
            navigate('/');
        }
    };

    return (
        <header className="sticky top-0 z-30 bg-white border-b border-gray-100 backdrop-blur-sm bg-white/95">
            <div className="flex items-center justify-between px-4 h-14">
                {/* Logo / Title */}
                <button
                    onClick={handleLogoClick}
                    className={`flex items-center gap-3 group ${
                        !isHomePage ? 'active:scale-95' : 'cursor-default'
                    } transition-transform duration-200`}
                    disabled={isHomePage}
                >
                    <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                        <span className="text-white text-sm font-bold">{firstLetter}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <h1 className="font-semibold text-base text-gray-900 group-hover:text-gray-700 transition-colors">
                            {title}
                        </h1>
                        {!isHomePage && (
                            <Home size={14} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                    </div>
                </button>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    {showSearch && (
                        <button
                            onClick={() => {
                                haptic.light();
                                if (onSearchClick) {
                                    onSearchClick();
                                } else {
                                    navigate('/search');
                                }
                            }}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-all active:scale-95"
                        >
                            <Search size={20} className="text-gray-600" />
                        </button>
                    )}
                    {showNotifications && (
                        <button
                            onClick={() => {
                                haptic.light();
                                navigate('/notifications');
                            }}
                            className="relative p-2 hover:bg-gray-100 rounded-lg transition-all active:scale-95"
                        >
                            <Bell size={20} className="text-gray-600" />
                            {/* Notification badge */}
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-black rounded-full"></span>
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}
