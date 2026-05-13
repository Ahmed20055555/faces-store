"use client";

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ShoppingBag, Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '@/lib/features/cartSlice';
import { toggleFavorite } from '@/lib/features/favoritesSlice';
import { RootState } from '@/lib/store';

interface ProductCardProps {
    id: string;
    brand: string;
    name: string;
    price: string;
    image: string;
    isNew?: boolean;
    hasGift?: boolean;
    hasFrom?: boolean;
}

const ProductCard = ({ id, brand, name, price, image, isNew, hasGift, hasFrom = true }: ProductCardProps) => {
    const dispatch = useDispatch();
    const favorites = useSelector((state: RootState) => state.favorites.items);
    const isFavorite = favorites.some(item => item.id === id);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(addItem({ id, brand, name, price, image }));
    };

    const handleToggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(toggleFavorite({ id, brand, name, price, image }));
    };

    return (
        <div className="group relative flex flex-col bg-white p-4 transition-all duration-300 hover:shadow-[0_4px_25px_rgba(0,0,0,0.07)] h-full border border-gray-100/80 cursor-pointer font-sans">
            <Link href={`/product/${id}`} className="block">
            
            {/* Image Area */}
            <div className="relative aspect-[4/5] w-full flex items-center justify-center mb-4">
                
                {/* Favorite Button */}
                <button 
                    onClick={handleToggleFavorite}
                    className="absolute top-0 left-0 z-20 p-2 text-gray-400 hover:text-[#8c1d3b] transition-colors"
                >
                    <Heart className={cn("w-6 h-6", isFavorite && "fill-[#8c1d3b] text-[#8c1d3b]")} />
                </button>

                {/* Badges (Top Right in RTL) */}
                <div className="absolute top-0 right-0 z-10 flex flex-col gap-1 items-start">
                    {isNew && (
                        <span className="bg-[#dcf0fb] text-[#004777] text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                            جديد
                        </span>
                    )}
                    {hasGift && (
                        <span className="bg-[#fce7f3] text-[#be185d] text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                            هدايا
                        </span>
                    )}
                </div>

                {/* Product Image */}
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-contain p-2 mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {/* Content Area */}
            <div className="mt-auto text-right flex flex-col gap-1">
                <h3 className="text-[14px] md:text-[15px] font-bold text-[#0f172a] uppercase tracking-wide truncate w-full">
                    {brand}
                </h3>
                <p className="text-[13px] text-[#475569] leading-snug truncate w-full mb-2">
                    {name}
                </p>
                <div className="flex items-center justify-start gap-1 mt-auto">
                    <span className="font-bold text-[14px] md:text-[16px] text-[#0f172a] tracking-tight">
                        {price}
                    </span>
                    <span className="font-bold text-[13px] text-[#0f172a]">
                        ريال
                    </span>
                </div>
            </div>
            </Link>
            
            {/* Add to Bag Hover Button */}
            <button 
                onClick={handleAddToCart}
                className="absolute bottom-4 left-4 right-4 bg-[#071424] text-white py-3 rounded-sm font-black text-[12px] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 z-20"
            >
                <ShoppingBag className="w-4 h-4" />
                إضافة للسلة
            </button>
        </div>
    );
};

export default ProductCard;
