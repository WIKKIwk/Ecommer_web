import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { haptic, backButton } from '../../telegram/sdk';

interface PlaceholderPageProps {
    title: string;
    description: string;
    icon?: string;
}

export default function PlaceholderPage({ title, description, icon = '🔧' }: PlaceholderPageProps) {
    const navigate = useNavigate();

    useEffect(() => {
        backButton.show(() => {
            haptic.light();
            navigate('/profile');
        });

        return () => backButton.hide();
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 pt-6 pb-4 px-4 mb-4">
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            </div>

            {/* Content */}
            <div className="flex flex-col items-center justify-center px-4 pt-20">
                <div className="text-7xl mb-6">{icon}</div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                    {title}
                </h2>
                <p className="text-base text-gray-500 text-center max-w-sm">
                    {description}
                </p>
            </div>
        </div>
    );
}
