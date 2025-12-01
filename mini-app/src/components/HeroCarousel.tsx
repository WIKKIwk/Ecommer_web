import { useState, useEffect } from 'react';
import { type HeroBanner } from '../api/client';

interface HeroCarouselProps {
    banners: HeroBanner[];
}

export default function HeroCarousel({ banners }: HeroCarouselProps) {
    const [index, setIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [banners.length]);

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe && index < banners.length - 1) {
            setIndex(index + 1);
        }
        if (isRightSwipe && index > 0) {
            setIndex(index - 1);
        }

        setTouchStart(0);
        setTouchEnd(0);
    };

    if (banners.length === 0) return null;

    return (
        <div className="relative px-4 pt-4">
            <div className="relative overflow-hidden rounded-2xl shadow-card">
                {/* Slides */}
                <div
                    className="flex transition-transform duration-700 ease-out"
                    style={{ transform: `translateX(-${index * 100}%)` }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {banners.map((banner) => (
                        <div key={banner.id} className="relative min-w-full aspect-[16/9]">
                            {/* Background Image */}
                            {banner.image ? (
                                <>
                                    <img
                                        src={banner.image}
                                        alt={banner.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent" />
                                </>
                            ) : (
                                <div className="absolute inset-0 bg-gradient-to-r from-black via-neutral-900 to-neutral-800" />
                            )}

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-between p-8 text-white">
                                <div className="flex items-center gap-2">
                                    {banner.badge && (
                                        <span className="rounded-full bg-white px-4 py-1.5 text-[10px] font-bold text-neutral-900 uppercase tracking-wider">
                                            {banner.badge}
                                        </span>
                                    )}
                                    <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70">
                                        Custom Ecommer
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/70">
                                        {banner.subtitle}
                                    </p>
                                    <h1 className="text-3xl font-black leading-tight">
                                        {banner.title}
                                    </h1>
                                    <p className="text-sm text-white/80 pr-12">
                                        {banner.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Indicators */}
                <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2">
                    {banners.map((_, i) => (
                        <span
                            key={i}
                            className={`h-1.5 rounded-full transition-all ${i === index ? 'w-8 bg-white' : 'w-1.5 bg-white/50'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
