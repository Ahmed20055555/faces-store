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
        <div className="group relative flex flex-col bg-white p-3 md:p-4 border border-gray-100 transition-all hover:shadow-xl hover:shadow-gray-100 h-full">
            {/* Image Area */}
            <div className="relative aspect-square md:aspect-[4/5] overflow-hidden bg-white flex items-center justify-center mb-2 md:mb-4">
                {/* Badges */}
                <div className="absolute top-0 right-0 z-10 flex flex-col gap-1 items-end">
                    {hasGift && (
                        <span className="bg-[#8c1d3b] text-white text-[10px] font-bold px-2 py-1">
                            هدايا مجانية
                        </span>
                    )}
                    {isNew && (
                        <span className="bg-[#c2e6f5] text-[#0b412b] text-[10px] font-bold px-2 py-1">
                            جديد
                        </span>
                    )}
                </div>

                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-contain p-2 md:p-4 transition-transform duration-700 group-hover:scale-105"
                />
            </div>

            {/* Content Area */}
            <div className="mt-auto text-center px-1 md:px-2 pb-1 md:pb-2">
                <h3 className="text-[13px] md:text-[15px] font-black text-[#111827] mb-1">
                    {brand}
                </h3>
                <p className="text-[12px] md:text-[13px] text-[#4b5563] leading-snug mb-2 md:mb-4">
                    {name}
                </p>
                <div className="flex items-center justify-center gap-1.5">
                    {hasFrom && <span className="font-bold text-[11px] md:text-[13px] text-[#4b5563]">من</span>}
                    <span className="font-bold text-[14px] md:text-[15px] text-[#111827]">{price}</span>
                    <span className="font-bold text-[11px] md:text-[13px] text-[#111827]">ريال</span>
                </div>
            </div>
            
        </div>
    );
};


export default ProductCard;
