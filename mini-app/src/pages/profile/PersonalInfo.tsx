import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, User, Save } from 'lucide-react';
import { haptic, backButton } from '../../telegram/sdk';
import { useAuth } from '../../context/auth-context';
import { updateTelegramUser } from '../../hooks/useTelegramUser';

export default function PersonalInfoPage() {
    const navigate = useNavigate();
    const { customer } = useAuth();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        backButton.show(() => {
            haptic.light();
            navigate('/profile');
        });

        // Check if user is logged in
        const storedUser = localStorage.getItem('telegram_user');
        if (!storedUser && !customer) {
            // Agar login qilmagan bo'lsa, profile ga qaytarish
            alert('Iltimos, avval tizimga kiring!');
            navigate('/profile');
            return;
        }

        // Load initial data from localStorage
        let userData = null;
        if (storedUser) {
            userData = JSON.parse(storedUser);
        }

        setFullName(
            customer?.full_name ||
            userData?.full_name ||
            `${userData?.first_name || ''} ${userData?.last_name || ''}`.trim() ||
            ''
        );
        setPhone(customer?.phone || userData?.phone || `+${userData?.telegram_id || ''}`);

        return () => backButton.hide();
    }, [navigate, customer]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
                haptic.success();
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        haptic.medium();
        setIsSaving(true);

        try {
            // Parse first_name and last_name from fullName
            const names = fullName.trim().split(' ');
            const firstName = names[0] || '';
            const lastName = names.slice(1).join(' ') || '';

            // Backend ga yuborish
            await updateTelegramUser({
                first_name: firstName,
                last_name: lastName,
                photo_url: profileImage || undefined,
            });

            haptic.success();

            // Show success message
            alert('Ma\'lumotlar muvaffaqiyatli saqlandi!');
            navigate('/profile');
        } catch (error) {
            console.error('Failed to save profile:', error);
            haptic.error();
            alert('Xatolik yuz berdi. Iltimos qayta urinib ko\'ring.');
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 pt-6 pb-4 px-4 mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Shaxsiy ma'lumotlar</h1>
            </div>

            {/* Profile Image */}
            <div className="px-4 mb-6">
                <div className="flex flex-col items-center">
                    <div className="relative">
                        <div className="w-32 h-32 rounded-full bg-black flex items-center justify-center overflow-hidden">
                            {profileImage ? (
                                <img
                                    src={profileImage}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <User size={48} className="text-white" />
                            )}
                        </div>
                        <button
                            onClick={() => {
                                haptic.light();
                                fileInputRef.current?.click();
                            }}
                            className="absolute bottom-0 right-0 w-10 h-10 bg-black rounded-full flex items-center justify-center border-4 border-gray-50 active:scale-95 transition-transform"
                        >
                            <Camera size={18} className="text-white" />
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>
                    <p className="text-sm text-gray-500 mt-3">
                        Rasmni o'zgartirish uchun bosing
                    </p>
                </div>
            </div>

            {/* Form */}
            <div className="bg-white border-b border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        To'liq ism
                    </label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Ismingizni kiriting"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                </div>

                <div className="px-6 py-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefon raqam
                    </label>
                    <input
                        type="tel"
                        value={phone}
                        disabled
                        className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-base text-gray-500 cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                        Telefon raqamni o'zgartirib bo'lmaydi
                    </p>
                </div>
            </div>

            {/* Additional Info */}
            <div className="px-4 mt-6">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-sm text-gray-900">
                        💡 Ma'lumotlaringiz xavfsiz saqlanadi va faqat buyurtmalarni qayta ishlash uchun ishlatiladi.
                    </p>
                </div>
            </div>

            {/* Save Button */}
            <div className="fixed bottom-20 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4">
                <button
                    onClick={handleSave}
                    disabled={isSaving || !fullName.trim()}
                    className="w-full py-4 bg-black text-white rounded-lg font-semibold text-base active:scale-95 transition-transform flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                >
                    {isSaving ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                            <span>Saqlanmoqda...</span>
                        </>
                    ) : (
                        <>
                            <Save size={20} />
                            <span>Saqlash</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
