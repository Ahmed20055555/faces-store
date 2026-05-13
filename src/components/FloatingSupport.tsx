'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function FloatingSupport() {
    return (
        <a 
            href="https://wa.me/yournumber" 
            target="_blank" 
            rel="noopener noreferrer"
            className="fixed bottom-8 left-8 z-[9000] group flex items-center gap-3"
            dir="rtl"
        >
            <div className="bg-white px-4 py-2 rounded-full shadow-xl opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 font-bold text-[13px] border border-gray-100">
                مساعدة؟ تواصل معنا
            </div>
            <div className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 relative">
                <MessageCircle className="w-7 h-7" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
            </div>
        </a>
    );
}
