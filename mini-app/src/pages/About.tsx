import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { backButton } from '../telegram/sdk';

const aboutImages = [
    'https://images.unsplash.com/photo-1455849318743-b2233052fcff?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1200&q=80',
];

export default function AboutPage() {
    const navigate = useNavigate();

    useEffect(() => {
        backButton.show(() => {
            navigate('/');
        });

        return () => backButton.hide();
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-white rounded-3xl p-8 shadow-sm">
                    <p className="text-xs uppercase tracking-wider text-gray-400">Biz haqimizda</p>
                    <h1 className="mt-3 text-3xl font-bold text-gray-900">Custom Ecommer haqida</h1>
                    <p className="mt-4 text-gray-600 leading-relaxed">
                        Custom Ecommer — mijozlarga moslashgan onlayn savdo va yetkazib berish tajribasini taqdim etish
                        uchun ishlab chiqilgan platforma. Loyiha mahsulot katalogi, savatcha, to'lov va yetkazib berish
                        jarayonlarini yagona interfeysda boshqarishni maqsad qiladi.
                    </p>
                    <p className="mt-3 text-gray-600 leading-relaxed">
                        Platforma menyu va mahsulotlar bilan ishlash, tezkor buyurtma, hamda kur'er yoki pick-up
                        variantlarini qo'llab-quvvatlaydi. Dizayn mobil qurilmalarda ham qulay ishlashiga e'tibor qaratilgan.
                    </p>
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                        {aboutImages.map((src, index) => (
                            <div key={index} className="relative h-48 w-full overflow-hidden rounded-2xl">
                                <img src={src} alt="Custom Ecommer" className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 space-y-2 text-gray-600">
                        <p className="font-semibold text-gray-900">Xizmatlar:</p>
                        <ul className="list-disc pl-6 text-sm space-y-1">
                            <li>Tezkor yetkazib berish va pick-up rejimlari</li>
                            <li>Mobil va veb ilovalarda bir xil tajriba</li>
                            <li>Hamkorlar uchun moslashuvchan menyu va chegirmalar</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
