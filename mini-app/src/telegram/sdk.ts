import WebApp from '@twa-dev/sdk';

// Initialize Telegram WebApp
export const tg = WebApp;

// Initialize the app
export function initTelegram() {
    tg.ready();
    tg.expand();

    // Apply Telegram theme colors to CSS variables
    if (tg.themeParams) {
        document.documentElement.style.setProperty('--tg-theme-bg-color', tg.themeParams.bg_color || '#ffffff');
        document.documentElement.style.setProperty('--tg-theme-text-color', tg.themeParams.text_color || '#000000');
        document.documentElement.style.setProperty('--tg-theme-hint-color', tg.themeParams.hint_color || '#999999');
        document.documentElement.style.setProperty('--tg-theme-link-color', tg.themeParams.link_color || '#2481cc');
        document.documentElement.style.setProperty('--tg-theme-button-color', tg.themeParams.button_color || '#000000');
        document.documentElement.style.setProperty('--tg-theme-button-text-color', tg.themeParams.button_text_color || '#ffffff');
    }

    // Enable closing confirmation
    tg.enableClosingConfirmation();

    return tg;
}

// Get user data from Telegram
export function getTelegramUser() {
    return tg.initDataUnsafe?.user;
}

// Get init data for backend authentication
export function getTelegramInitData() {
    return tg.initData;
}

// Haptic feedback helpers
export const haptic = {
    light: () => tg.HapticFeedback.impactOccurred('light'),
    medium: () => tg.HapticFeedback.impactOccurred('medium'),
    heavy: () => tg.HapticFeedback.impactOccurred('heavy'),
    success: () => tg.HapticFeedback.notificationOccurred('success'),
    warning: () => tg.HapticFeedback.notificationOccurred('warning'),
    error: () => tg.HapticFeedback.notificationOccurred('error'),
    selection: () => tg.HapticFeedback.selectionChanged(),
};

// MainButton helpers
export const mainButton = {
    show: (text: string, onClick: () => void) => {
        tg.MainButton.setParams({
            color: '#000000', // qora
            text_color: '#ffffff', // oq
        });
        tg.MainButton.setText(text);
        tg.MainButton.onClick(onClick);
        tg.MainButton.show();
    },
    hide: () => {
        tg.MainButton.hide();
        tg.MainButton.offClick(() => { });
    },
    setLoading: (loading: boolean) => {
        if (loading) {
            tg.MainButton.showProgress();
        } else {
            tg.MainButton.hideProgress();
        }
    },
    enable: () => tg.MainButton.enable(),
    disable: () => tg.MainButton.disable(),
};

// BackButton helpers
export const backButton = {
    show: (onClick: () => void) => {
        tg.BackButton.onClick(onClick);
        tg.BackButton.show();
    },
    hide: () => {
        tg.BackButton.hide();
        tg.BackButton.offClick(() => { });
    },
};

// Share helpers
export function shareUrl(url: string, text?: string) {
    const shareText = text || 'Check this out!';
    tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`);
}

export function openLink(url: string) {
    tg.openLink(url);
}
