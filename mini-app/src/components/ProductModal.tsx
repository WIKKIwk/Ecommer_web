import { useState } from 'react';
import { X, Minus, Plus } from 'lucide-react';
import type { Product, ProductOption } from '../types';

type Props = {
    product: Product | null;
    open: boolean;
    onClose: () => void;
    onAdd: (product: Product, quantity: number, option?: ProductOption) => void;
};

export function ProductModal({ product, open, onClose, onAdd }: Props) {
    const [quantity, setQuantity] = useState(1);
    const [selectedOption, setSelectedOption] = useState<ProductOption | undefined>();

    if (!open || !product) return null;

    const handleAdd = () => {
        onAdd(product, quantity, selectedOption);
        setQuantity(1);
        setSelectedOption(undefined);
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-t-[32px] sm:rounded-[32px] w-full max-w-lg max-h-[85vh] overflow-hidden animate-[slideUp_0.3s_cubic-bezier(0.34,1.56,0.64,1)] shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header with image */}
                <div className="relative">
                    {product.image && (
                        <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                    )}

                    {/* Close button */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm border border-gray-200/50 flex items-center justify-center text-gray-700 shadow-lg active:scale-90 transition-transform"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(85vh-16rem)]">
                    <div className="space-y-5">
                        <div>
                            <p className="text-xs uppercase tracking-wider text-gray-400 font-medium mb-2">Mahsulot</p>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h3>
                            {product.description && (
                                <p className="text-sm leading-relaxed text-gray-600">{product.description}</p>
                            )}
                        </div>
                        {product.options && product.options.length > 0 && (
                            <div className="space-y-3">
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                    Qo'shimcha
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {product.options.map((option) => {
                                        const active = selectedOption?.id === option.id;
                                        return (
                                            <button
                                                type="button"
                                                key={option.id}
                                                onClick={() => setSelectedOption(active ? undefined : option)}
                                                className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition-all active:scale-95 ${
                                                    active
                                                        ? 'border-gray-900 bg-black text-white shadow-md'
                                                        : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                                                }`}
                                            >
                                                {option.name} · {Math.floor(parseFloat(String(option.price))).toLocaleString()} so'm
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Bottom action bar */}
                    <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 -mx-6 -mb-6 mt-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-xs uppercase tracking-wider text-gray-400 font-medium mb-1">Narx</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {Math.floor(parseFloat(String(selectedOption?.price ?? product.price))).toLocaleString()} so'm
                                </p>
                            </div>
                            <div className="flex items-center rounded-full border-2 border-gray-200 bg-gray-50">
                                <button
                                    type="button"
                                    className="p-3 active:scale-90 transition-transform"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                >
                                    <Minus className="h-4 w-4" />
                                </button>
                                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                                <button
                                    type="button"
                                    className="p-3 active:scale-90 transition-transform"
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={handleAdd}
                            className="w-full rounded-2xl bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4 text-base font-bold text-white shadow-lg active:scale-[0.98] transition-transform"
                        >
                            Savatga qo'shish {quantity > 1 ? `(${quantity})` : ''}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
