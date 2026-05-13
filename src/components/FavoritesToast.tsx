'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { Heart, ArrowLeft, X } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function FavoritesToast() {
    const { lastAdded, lastAction } = useSelector((state: RootState) => state.favorites);
    const [isVisible, setIsVisible] = useState(false);
    const [isLeaving, setIsLeaving] = useState(false);
    const [toastData, setToastData] = useState<{ name: string; brand: string; image: string; action: 'added' | 'removed' } | null>(null);
    const [heartBeat, setHeartBeat] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const prevRef = useRef<string | null>(null);

    useEffect(() => {
        if (!lastAdded || !lastAction) return;

        // Unique key to detect each new toggle
        const key = `${lastAdded.id}-${Date.now()}`;
        if (prevRef.current === lastAdded.id && !isLeaving) return;
        prevRef.current = key;

        if (timerRef.current) clearTimeout(timerRef.current);

        setToastData({
            name: lastAdded.name,
            brand: lastAdded.brand,
            image: lastAdded.image,
            action: lastAction,
        });

        setIsLeaving(false);
        setIsVisible(true);
        setHeartBeat(false);

        // Trigger heartbeat animation
        setTimeout(() => setHeartBeat(true), 100);

        timerRef.current = setTimeout(() => {
            setIsLeaving(true);
            setTimeout(() => {
                setIsVisible(false);
                setIsLeaving(false);
            }, 500);
        }, 4000);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastAdded, lastAction]);

    const handleClose = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        setIsLeaving(true);
        setTimeout(() => {
            setIsVisible(false);
            setIsLeaving(false);
        }, 500);
    };

    if (!isVisible || !toastData) return null;

    const isAdded = toastData.action === 'added';

    return (
        <div
            className={cn(
                "fixed bottom-6 right-6 z-[99999] max-w-[340px] w-full",
                "transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                isLeaving
                    ? "opacity-0 translate-x-full scale-95"
                    : "opacity-100 translate-x-0 scale-100"
            )}
            dir="rtl"
        >
            {/* Toast Card */}
            <div className="relative bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden">

                {/* Accent bar top */}
                <div className={cn(
                    "absolute top-0 left-0 right-0 h-[3px] transition-all duration-700",
                    isAdded ? "bg-gradient-to-r from-[#8c1d3b] via-rose-400 to-[#8c1d3b]" : "bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300"
                )} />

                {/* Progress bar */}
                <div className="absolute top-0 left-0 h-[3px] bg-white/60 animate-[shrink_4s_linear_forwards]" style={{ width: '100%' }} />

                <div className="flex items-center gap-4 p-4">

                    {/* Product Image */}
                    <div className="relative shrink-0 w-16 h-16 rounded-xl bg-gray-50 p-2 overflow-hidden">
                        <img
                            src={toastData.image}
                            alt={toastData.name}
                            className="w-full h-full object-contain mix-blend-multiply"
                        />
                        {/* Heart badge */}
                        <div className={cn(
                            "absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full flex items-center justify-center shadow-lg transition-all duration-700",
                            isAdded ? "bg-[#8c1d3b]" : "bg-gray-400",
                            heartBeat ? "scale-100" : "scale-0"
                        )}>
                            <Heart
                                className={cn(
                                    "w-3 h-3 text-white transition-all",
                                    isAdded ? "fill-white" : ""
                                )}
                                strokeWidth={2}
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <p className={cn(
                            "text-[11px] font-black uppercase tracking-widest mb-0.5",
                            isAdded ? "text-[#8c1d3b]" : "text-gray-400"
                        )}>
                            {isAdded ? "✨ تمت الإضافة للمفضلة" : "تمت الإزالة من المفضلة"}
                        </p>
                        <p className="text-[13px] font-black text-gray-900 truncate">{toastData.brand}</p>
                        <p className="text-[11px] text-gray-500 truncate leading-tight">{toastData.name}</p>

                        {isAdded && (
                            <Link
                                href="/favorites"
                                className="inline-flex items-center gap-1 mt-1.5 text-[11px] font-bold text-[#8c1d3b] hover:underline transition-all group"
                                onClick={handleClose}
                            >
                                <span>عرض قائمة أمنياتي</span>
                                <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-0.5" />
                            </Link>
                        )}
                    </div>

                    {/* Close button */}
                    <button
                        onClick={handleClose}
                        className="shrink-0 self-start p-1 rounded-full text-gray-300 hover:text-gray-600 hover:bg-gray-100 transition-all"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
