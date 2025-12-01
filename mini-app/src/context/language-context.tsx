import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

type Language = 'uz' | 'ru' | 'en';

type LanguageContextType = {
    language: Language;
    setLanguage: (lang: Language) => void;
    options: Array<{ value: Language; label: string }>;
    t: (key: string) => string;
};

const STORAGE_KEY = 'kamolon-language';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_OPTIONS: Array<{ value: Language; label: string }> = [
    { value: 'uz', label: "O'z" },
    { value: 'ru', label: 'Ру' },
    { value: 'en', label: 'En' },
];

const TRANSLATIONS: Record<Language, Record<string, string>> = {
    uz: {
        'app.title': 'CUSTOM ECOMMER',
        'nav.menu': 'Menyu',
        'nav.branches': 'Filiallar',
        'nav.about': 'Biz haqimizda',
        'nav.contact': "Bog'lanish",
        'nav.location': 'Manzil',
        'nav.selectLocation': 'Manzilni tanlang',
        'nav.locationPlaceholder': 'Filial/zonani tanlang',
        'nav.language': 'Til',
        'actions.addToCart': "Qo'shish",
        'home': 'Asosiy',
        'categories': 'Kategoriyalar',
        'cart': 'Savat',
        'cart.title': 'Savat',
        'cart.empty': 'Savat bo\'sh',
        'cart.emptyDesc': 'Mahsulot qo\'shing',
        'cart.total': 'Jami',
        'cart.checkout': 'Rasmiylashtirish',
        'checkout.title': 'Yetkazib berish',
        'checkout.deliveryTime': 'Yetkazib berish vaqti',
        'checkout.deliveryAddress': 'Yetkazib berish manzili',
        'checkout.deliveryAddressPlaceholder': 'Manzilni tanlang',
        'checkout.homeDelivery': 'Uyga yetkazib berish',
        'checkout.timeSlot': 'daqiqa',
        'checkout.deliveryMethod': 'Yetkazib berish usuli',
        'checkout.paymentMethod': 'To\'lov usuli',
        'checkout.comment': 'Izoh',
        'checkout.commentPlaceholder': 'Buyurtmaga izoh qoldiring',
        'checkout.submit': 'Buyurtma berish',
        'checkout.whereTo': 'Qayerga',
        'checkout.house': 'Uy',
        'checkout.apartment': 'Xonadon',
        'checkout.floor': 'Qavat',
        'checkout.entrance': 'Kirish',
        'checkout.courierComment': 'Kuryerga izoh',
        'checkout.orderComment': 'Buyurtmaga izoh',
        'checkout.receiverPhone': 'Qabul qiluvchi telefoni',
        'checkout.whenReady': 'Tayyor bo\'lganda',
        'checkout.minutes': 'daqiqadan keyin',
        'checkout.payment': 'To\'lov',
        'checkout.paymentMethodSelect': 'To\'lov usulini tanlang',
        'checkout.promoCode': 'Promokod',
        'checkout.payWithBonus': 'Bonuslar bilan to\'lash',
        'checkout.products': 'Mahsulotlar',
        'checkout.addComment': 'Izoh qoldirish',
        'checkout.total': 'Jami',
        'checkout.delivery': 'Yetkazib berish',
        'checkout.fillAllFields': 'Iltimos, barcha maydonlarni to\'ldiring',
        'checkout.orderAccepted': 'Buyurtma qabul qilindi! Tez orada siz bilan bog\'lanamiz.',
        'checkout.error': 'Xatolik yuz berdi. Qaytadan urinib ko\'ring.',
        'orders': 'Buyurtmalar',
        'orders.title': 'Buyurtmalar',
        'orders.empty': 'Buyurtmalar yo\'q',
        'orders.emptyDesc': 'Hali buyurtma bermagansingiz',
        'orders.status.pending': 'Tayyorlanmoqda',
        'orders.status.delivered': 'Yetkazildi',
        'orders.products': 'ta mahsulot',
        'profile': 'Profil',
        'profile.title': 'Profil',
        'profile.personalInfo': 'Shaxsiy ma\'lumotlar',
        'profile.notifications': 'Bildirishnomalar',
        'profile.language': 'Til',
        'profile.help': 'Yordam',
        'profile.privacy': 'Maxfiylik',
        'profile.logout': 'Chiqish',
        'profile.orders': 'Buyurtmalar',
        'profile.favorites': 'Saqlanganlar',
        'profile.bonuses': 'Bonuslar',
        'profile.user': 'Foydalanuvchi',
    },
    ru: {
        'app.title': 'CUSTOM ECOMMER',
        'nav.menu': 'Меню',
        'nav.branches': 'Филиалы',
        'nav.about': 'О нас',
        'nav.contact': 'Связаться',
        'nav.location': 'Адрес',
        'nav.selectLocation': 'Выберите адрес',
        'nav.locationPlaceholder': 'Укажите филиал/зону',
        'nav.language': 'Язык',
        'actions.addToCart': 'Добавить',
        'home': 'Главная',
        'categories': 'Категории',
        'cart': 'Корзина',
        'cart.title': 'Корзина',
        'cart.empty': 'Корзина пуста',
        'cart.emptyDesc': 'Добавьте товары',
        'cart.total': 'Итого',
        'cart.checkout': 'Оформить',
        'checkout.title': 'Доставка',
        'checkout.deliveryTime': 'Время доставки',
        'checkout.deliveryAddress': 'Адрес доставки',
        'checkout.deliveryAddressPlaceholder': 'Выберите адрес',
        'checkout.homeDelivery': 'Доставка на дом',
        'checkout.timeSlot': 'минут',
        'checkout.deliveryMethod': 'Способ доставки',
        'checkout.paymentMethod': 'Способ оплаты',
        'checkout.comment': 'Комментарий',
        'checkout.commentPlaceholder': 'Оставьте комментарий к заказу',
        'checkout.submit': 'Оформить заказ',
        'checkout.whereTo': 'Куда',
        'checkout.house': 'Дом',
        'checkout.apartment': 'Квартира',
        'checkout.floor': 'Этаж',
        'checkout.entrance': 'Подъезд',
        'checkout.courierComment': 'Комментарий курьеру',
        'checkout.orderComment': 'Комментарий к заказу',
        'checkout.receiverPhone': 'Телефон получателя',
        'checkout.whenReady': 'Когда готово',
        'checkout.minutes': 'минут позже',
        'checkout.payment': 'Оплата',
        'checkout.paymentMethodSelect': 'Выберите способ оплаты',
        'checkout.promoCode': 'Промокод',
        'checkout.payWithBonus': 'Оплатить бонусами',
        'checkout.products': 'Товары',
        'checkout.addComment': 'Оставить комментарий',
        'checkout.total': 'Итого',
        'checkout.delivery': 'Доставка',
        'checkout.fillAllFields': 'Пожалуйста, заполните все поля',
        'checkout.orderAccepted': 'Заказ принят! Скоро свяжемся с вами.',
        'checkout.error': 'Произошла ошибка. Попробуйте снова.',
        'orders': 'Заказы',
        'orders.title': 'Заказы',
        'orders.empty': 'Нет заказов',
        'orders.emptyDesc': 'Вы еще не делали заказов',
        'orders.status.pending': 'Готовится',
        'orders.status.delivered': 'Доставлен',
        'orders.products': 'товаров',
        'profile': 'Профиль',
        'profile.title': 'Профиль',
        'profile.personalInfo': 'Личные данные',
        'profile.notifications': 'Уведомления',
        'profile.language': 'Язык',
        'profile.help': 'Помощь',
        'profile.privacy': 'Конфиденциальность',
        'profile.logout': 'Выйти',
        'profile.orders': 'Заказы',
        'profile.favorites': 'Избранное',
        'profile.bonuses': 'Бонусы',
        'profile.user': 'Пользователь',
    },
    en: {
        'app.title': 'CUSTOM ECOMMER',
        'nav.menu': 'Menu',
        'nav.branches': 'Branches',
        'nav.about': 'About',
        'nav.contact': 'Contact',
        'nav.location': 'Address',
        'nav.selectLocation': 'Select address',
        'nav.locationPlaceholder': 'Choose branch/zone',
        'nav.language': 'Language',
        'actions.addToCart': 'Add',
        'home': 'Home',
        'categories': 'Categories',
        'cart': 'Cart',
        'cart.title': 'Cart',
        'cart.empty': 'Cart is empty',
        'cart.emptyDesc': 'Add products',
        'cart.total': 'Total',
        'cart.checkout': 'Checkout',
        'checkout.title': 'Delivery',
        'checkout.deliveryTime': 'Delivery time',
        'checkout.deliveryAddress': 'Delivery address',
        'checkout.deliveryAddressPlaceholder': 'Select address',
        'checkout.homeDelivery': 'Home delivery',
        'checkout.timeSlot': 'minutes',
        'checkout.deliveryMethod': 'Delivery method',
        'checkout.paymentMethod': 'Payment method',
        'checkout.comment': 'Comment',
        'checkout.commentPlaceholder': 'Leave a comment for the order',
        'checkout.submit': 'Place order',
        'checkout.whereTo': 'Where to',
        'checkout.house': 'House',
        'checkout.apartment': 'Apartment',
        'checkout.floor': 'Floor',
        'checkout.entrance': 'Entrance',
        'checkout.courierComment': 'Comment for courier',
        'checkout.orderComment': 'Order comment',
        'checkout.receiverPhone': 'Receiver phone',
        'checkout.whenReady': 'When ready',
        'checkout.minutes': 'minutes later',
        'checkout.payment': 'Payment',
        'checkout.paymentMethodSelect': 'Select payment method',
        'checkout.promoCode': 'Promo code',
        'checkout.payWithBonus': 'Pay with bonuses',
        'checkout.products': 'Products',
        'checkout.addComment': 'Add comment',
        'checkout.total': 'Total',
        'checkout.delivery': 'Delivery',
        'checkout.fillAllFields': 'Please fill all fields',
        'checkout.orderAccepted': 'Order accepted! We will contact you soon.',
        'checkout.error': 'An error occurred. Please try again.',
        'orders': 'Orders',
        'orders.title': 'Orders',
        'orders.empty': 'No orders',
        'orders.emptyDesc': 'You haven\'t made any orders yet',
        'orders.status.pending': 'Preparing',
        'orders.status.delivered': 'Delivered',
        'orders.products': 'products',
        'profile': 'Profile',
        'profile.title': 'Profile',
        'profile.personalInfo': 'Personal Info',
        'profile.notifications': 'Notifications',
        'profile.language': 'Language',
        'profile.help': 'Help',
        'profile.privacy': 'Privacy',
        'profile.logout': 'Logout',
        'profile.orders': 'Orders',
        'profile.favorites': 'Favorites',
        'profile.bonuses': 'Bonuses',
        'profile.user': 'User',
    },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('uz');

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
        if (saved && LANGUAGE_OPTIONS.some((opt) => opt.value === saved)) {
            setLanguage(saved);
        }
    }, []);

    const updateLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem(STORAGE_KEY, lang);
    };

    const translate = (key: string) => {
        const table = TRANSLATIONS[language] ?? TRANSLATIONS.uz;
        return table[key] ?? key;
    };

    const value = useMemo<LanguageContextType>(
        () => ({ language, setLanguage: updateLanguage, options: LANGUAGE_OPTIONS, t: translate }),
        [language]
    );

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return ctx;
}

export function useTranslation() {
    const ctx = useLanguage();
    return ctx.t;
}
