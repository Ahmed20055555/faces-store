'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Toast() {
    const { items } = useSelector((state: RootState) => state.cart);
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (items.length > 0) {
            setMessage('تم إضافة المنتج إلى حقيبة التسوق بنجاح!');
            setIsVisible(true);
            const timer = setTimeout(() => setIsVisible(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [items.length]);

    return (
        <div 
            className={cn(
                "fixed bottom-8 left-1/2 -translate-x-1/2 z-[10000] transition-all duration-500",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
            )}
        >
            <div className="bg-black/90 backdrop-blur-md text-white px-8 py-3 rounded-full flex items-center gap-3 shadow-2xl border border-white/10">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span className="text-[14px] font-bold font-sans tracking-wide">{message}</span>
            </div>
        </div>
    );
}
