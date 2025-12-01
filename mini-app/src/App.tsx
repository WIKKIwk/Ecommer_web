import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/auth-context';
import { LanguageProvider } from './context/language-context';
import { LocationProvider } from './context/location-context';
import { SiteSettingsProvider } from './context/site-settings-context';
import { useTelegramUser } from './hooks/useTelegramUser';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import HomePage from './pages/Home';
import ProductPage from './pages/Product';
import CartPage from './pages/Cart';
import CheckoutPage from './pages/Checkout';
import ProfilePage from './pages/Profile';
import OrdersPage from './pages/Orders';
import AboutPage from './pages/About';
import SearchPage from './pages/Search';
import NotificationsPage from './pages/Notifications';
import HelpPage from './pages/profile/Help';
import PlaceholderPage from './pages/profile/PlaceholderPage';
import PersonalInfoPage from './pages/profile/PersonalInfo';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});

// Create a separate component to access router hooks
function AppContent() {
    const location = useLocation();
    const [searchOpen, setSearchOpen] = useState(false);
    const isHomePage = location.pathname === '/';

    // Telegram foydalanuvchi ma'lumotlarini saqlash
    useTelegramUser();

    return (
        <div className="flex flex-col min-h-screen">
            <Header
                showSearch={isHomePage}
                onSearchClick={isHomePage ? () => setSearchOpen(true) : undefined}
            />
            <main className="flex-1 page-transition" key={location.pathname}>
                <Routes location={location}>
                    <Route path="/" element={<HomePage searchOpen={searchOpen} setSearchOpen={setSearchOpen} />} />
                    <Route path="/product/:id" element={<ProductPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/notifications" element={<NotificationsPage />} />
                    <Route path="/profile/help" element={<HelpPage />} />
                    <Route path="/profile/privacy" element={<PlaceholderPage title="Maxfiylik" description="Maxfiylik siyosati tez orada qo'shiladi" icon="🔒" />} />
                    <Route path="/profile/personal-info" element={<PersonalInfoPage />} />
                    <Route path="/profile/favorites" element={<PlaceholderPage title="Saqlanganlar" description="Saqlangan mahsulotlar ro'yxati" icon="❤️" />} />
                    <Route path="/profile/bonuses" element={<PlaceholderPage title="Bonuslar" description="Bonus ballaringiz va aksiyalar haqida ma'lumot" icon="🎁" />} />
                </Routes>
            </main>
            <BottomNav />
        </div>
    );
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <SiteSettingsProvider>
                <LanguageProvider>
                    <AuthProvider>
                        <LocationProvider>
                            <BrowserRouter>
                                <AppContent />
                            </BrowserRouter>
                        </LocationProvider>
                    </AuthProvider>
                </LanguageProvider>
            </SiteSettingsProvider>
        </QueryClientProvider>
    );
}

export default App;
