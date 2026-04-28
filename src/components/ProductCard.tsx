"use client";

import React from 'react';
import { Heart, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
    brand: string;
    name: string;
    price: string;
    image: string;
    isNew?: boolean;
    hasGift?: boolean;
    hasFrom?: boolean;
}

const ProductCard = ({ brand, name, price, image, isNew, hasGift, hasFrom = true }: ProductCardProps) => {
    return (
        <div className="group relative flex flex-col bg-white transition-all hover:shadow-xl hover:shadow-gray-100">
            {/* Image Area */}
            <div className="relative aspect-[4/5] overflow-hidden bg-white flex items-center justify-center mb-4">
                {hasGift && (
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 z-10 bg-[#8c1d3b] text-white text-[11px] font-bold px-3 py-1">
                        هدايا مجانية
                    </span>
                )}
                {!hasGift && isNew && (
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 z-10 bg-black text-white text-[11px] font-bold px-3 py-1">
                        جديد
                    </span>
                )}

                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                />
            </div>

            {/* Content Area */}
            <div className="mt-auto text-center px-2 pb-2">
                <h3 className="text-[15px] font-black text-[#111827] mb-1">
                    {brand}
                </h3>
                <p className="text-[13px] text-[#4b5563] leading-snug mb-4">
                    {name}
                </p>
                <div className="flex items-center justify-center gap-1.5">
                    {hasFrom && <span className="font-bold text-[13px] text-black">من</span>}
                    <span className="font-bold text-base text-black">{price}</span>
                    <span className="font-bold text-[13px] text-black">ريال</span>
                </div>
            </div>
            
        </div>
    );
};


export default ProductCard;
