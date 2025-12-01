import { Plus } from 'lucide-react';
import { type Product } from '../api/client';

interface ProductCardProps {
    product: Product;
    onClick: () => void;
    onAddToCart?: (e: React.MouseEvent) => void;
}

export default function ProductCard({ product, onClick, onAddToCart }: ProductCardProps) {
    const price = Math.floor(parseFloat(product.price));
    const oldPrice = product.old_price ? Math.floor(parseFloat(product.old_price)) : null;
    const hasDiscount = oldPrice && oldPrice > price;

    return (
        <div
            onClick={onClick}
            className="group bg-white/95 backdrop-blur-sm rounded-xl overflow-hidden shadow-md border border-gray-200/60 hover:shadow-xl hover:border-gray-300/80 active:scale-[0.98] transition-all duration-200 cursor-pointer"
        >
            {/* Image */}
            <div className="relative aspect-square bg-gray-50 overflow-hidden">
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <span className="text-4xl">🍽</span>
                    </div>
                )}

                {/* Discount Badge */}
                {hasDiscount && (
                    <div className="absolute top-2 left-2">
                        <span className="bg-black500 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm">
                            -{Math.round(((oldPrice - price) / oldPrice) * 100)}%
                        </span>
                    </div>
                )}

                {!product.is_available && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-[2px]">
                        <span className="bg-white text-gray-900 px-3 py-1.5 rounded-lg text-xs font-medium shadow-md">
                            Tugagan
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-3">
                <h3 className="text-sm font-medium mb-1.5 line-clamp-2 text-gray-900 transition-colors">
                    {product.name}
                </h3>

                <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-col">
                        <span className="text-base font-semibold text-gray-900">
                            {price.toLocaleString()} ₸
                        </span>
                        {oldPrice && (
                            <span className="text-xs text-gray-400 line-through">
                                {oldPrice.toLocaleString()} ₸
                            </span>
                        )}
                    </div>
                    {onAddToCart && product.is_available && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onAddToCart(e);
                            }}
                            className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-black text-white rounded-lg hover:bg-gray-800 active:scale-90 transition-all duration-150 shadow-sm"
                        >
                            <Plus size={16} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
