import { useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001/api';

interface TelegramUserData {
    telegram_id: number;
    username?: string;
    first_name?: string;
    last_name?: string;
    photo_url?: string;
    language_code?: string;
    is_premium?: boolean;
}

/**
 * Telegram foydalanuvchi ma'lumotlarini backend ga yuboradi va saqlaydi
 */
export function useTelegramUser() {
    useEffect(() => {
        const saveUserData = async () => {
            try {
                const user = WebApp.initDataUnsafe?.user;

                if (!user?.id) {
                    console.log('Telegram user data not available (running in browser without Telegram)');
                    // Browser da test qilish uchun - foydalanuvchi login qilishi kerak
                    return;
                }

                const userData: TelegramUserData = {
                    telegram_id: user.id,
                    username: user.username || '',
                    first_name: user.first_name || '',
                    last_name: user.last_name || '',
                    photo_url: user.photo_url,
                    language_code: user.language_code || 'uz',
                    is_premium: user.is_premium || false,
                };

                console.log('Saving Telegram user data:', userData);

                const response = await axios.post(`${API_BASE_URL}/telegram/profile/`, userData);

                console.log('User data saved successfully:', response.data);

                // LocalStorage ga saqlaymiz
                localStorage.setItem('telegram_user', JSON.stringify(response.data));
            } catch (error) {
                console.error('Failed to save user data:', error);
            }
        };

        saveUserData();
    }, []);
}

/**
 * Saqlangan Telegram foydalanuvchi ma'lumotlarini olish
 */
export function getTelegramUser() {
    try {
        const stored = localStorage.getItem('telegram_user');
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error('Failed to get telegram user from localStorage:', error);
    }
    return null;
}

/**
 * Telegram foydalanuvchi ma'lumotlarini yangilash
 */
export async function updateTelegramUser(updates: Partial<TelegramUserData>) {
    try {
        // Avval localStorage tekshiramiz
        const stored = localStorage.getItem('telegram_user');
        if (!stored) {
            throw new Error('Foydalanuvchi tizimga kirmagan. Iltimos, avval login qiling.');
        }

        const storedUser = JSON.parse(stored);
        const telegramId = storedUser.telegram_id;

        if (!telegramId) {
            throw new Error('Telegram user ID topilmadi');
        }

        const response = await axios.patch(`${API_BASE_URL}/telegram/profile/`, {
            telegram_id: telegramId,
            ...updates,
        });

        // LocalStorage ni yangilaymiz
        localStorage.setItem('telegram_user', JSON.stringify(response.data));

        return response.data;
    } catch (error) {
        console.error('Failed to update user data:', error);
        throw error;
    }
}
