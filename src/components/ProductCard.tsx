"use client";

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';
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
    oldPrice?: string;
    discountBadge?: string;
    imageFit?: 'cover' | 'contain';
}

const ProductCard = ({ id, brand, name, price, image, isNew, hasGift, hasFrom = true, oldPrice, discountBadge, imageFit = 'cover' }: ProductCardProps) => {
    const dispatch = useDispatch();
    const favorites = useSelector((state: RootState) => state.favorites.items);
    const isFavorite = favorites.some(item => item.id === id);

    const handleToggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(toggleFavorite({ id, brand, name, price, image }));
    };

    return (
        <div className="group relative flex flex-col bg-white p-4 transition-all duration-300 hover:shadow-[0_4px_25px_rgba(0,0,0,0.07)] h-full border border-gray-100/80 cursor-pointer font-sans">
            <Link
                href={{
                    pathname: `/product/${id}`
                }}
                className="block"
            >
                {/* Image Area */}
                <div className="relative aspect-[4/5] w-full flex items-center justify-center mb-4 overflow-hidden rounded-md">
                    {/* Favorite Button */}
                    <button
                        onClick={handleToggleFavorite}
                        className="absolute top-0 left-0 z-20 p-2 text-gray-400 hover:text-[#8c1d3b] transition-colors"
                    >
                        <Heart className={cn("w-6 h-6", isFavorite && "fill-[#8c1d3b] text-[#8c1d3b]")} />
                    </button>

                    {/* Badges */}
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
                        {discountBadge && (
                            <span className="bg-[#8c1d3b] text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                                {discountBadge}
                            </span>
                        )}
                    </div>

                    {/* Product Image */}
                    <img
                        src={image}
                        alt={name}
                        className={cn(
                            "w-full h-full transition-transform duration-500 group-hover:scale-105",
                            imageFit === 'cover' ? "object-cover" : "object-contain p-2 mix-blend-multiply"
                        )}
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
                        <span className={cn("font-bold text-[14px] md:text-[16px] tracking-tight", oldPrice ? "text-[#8c1d3b]" : "text-[#0f172a]")}>
                            {price}
                        </span>
                        <span className={cn("font-bold text-[13px]", oldPrice ? "text-[#8c1d3b]" : "text-[#0f172a]")}>
                            ريال
                        </span>
                        {oldPrice && (
                            <span className="text-[12px] md:text-[13px] text-gray-400 line-through mr-2">
                                {oldPrice} ريال
                            </span>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
