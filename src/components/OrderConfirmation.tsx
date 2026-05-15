"use client";

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Check, Copy, Package, Droplets, Truck } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface OrderConfirmationProps {
    customerName: string;
    orderId: string;
    productName: string;
    productImage?: string | null;
    collection?: "black" | "white";
    onClose?: () => void;
}

const OrderConfirmation = ({ 
    customerName, 
    orderId, 
    productName, 
    productImage, 
    collection = "black",
    onClose
}: OrderConfirmationProps) => {
    const router = useRouter();
    const [step, setStep] = useState(0); 
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const timers = [
            setTimeout(() => setStep(1), 300),  
            setTimeout(() => setStep(2), 1200), 
            setTimeout(() => setStep(3), 2500), 
            setTimeout(() => setStep(4), 3100), 
            setTimeout(() => setStep(5), 4100), 
            setTimeout(() => setStep(6), 4800), 
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(orderId);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="fixed inset-0 z-[1000] bg-[#050505] overflow-hidden flex flex-col font-tajawal dir-rtl selection:bg-[#D4AF37] selection:text-black">
            {/* Ultra-Luxury Ambient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />
            <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_60%)] pointer-events-none" />

            {/* Premium Gold Sparkles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                    <div 
                        key={i}
                        className="absolute w-[1px] h-[1px] bg-[#D4AF37] rounded-full opacity-30 animate-float-up"
                        style={{
                            left: `${Math.random() * 100}%`,
                            bottom: '-10px',
                            animationDelay: `${i * 1.2}s`,
                            animationDuration: `${10 + Math.random() * 10}s`
                        }}
                    />
                ))}
            </div>

            {/* TOP SECTION: Cinematic Hero (Reduced to 45%) */}
            <div className="relative h-[45vh] flex flex-col items-center justify-center pt-8">
                <div className={cn(
                    "relative transition-all duration-[2s] cubic-bezier(0.2, 1, 0.2, 1) transform",
                    step >= 1 ? "translate-y-0 opacity-100 scale-100" : "translate-y-[80px] opacity-0 scale-95",
                    step >= 6 && "animate-float-gentle"
                )}>
                    {/* Bottle SVG with Crystal & Gold Effects */}
                    <div className="relative w-[170px] h-[280px] flex items-center justify-center">
                        <div className={cn(
                            "absolute inset-0 bg-white/5 rounded-full blur-[100px] transition-all duration-[2.5s]",
                            step >= 1 ? "scale-125 opacity-20" : "scale-50 opacity-0"
                        )} />

                        <svg width="170" height="280" viewBox="0 0 160 300" fill="none" className="relative z-10">
                            <rect x="10" y="270" width="140" height="15" rx="2" fill="white" fillOpacity="0.05" />
                            <rect x="11.5" y="41.5" width="137" height="237" rx="3" stroke="white" strokeWidth="1" strokeOpacity="0.6" />
                            <path d="M 18 50 L 18 265" stroke="url(#reflectGrad)" strokeWidth="1" strokeOpacity="0.3" />
                            
                            <rect x="58" y="8" width="44" height="22" rx="2" fill="white" />
                            
                            {step >= 2 && (
                                <g>
                                    <text
                                        x="50%"
                                        y="148"
                                        textAnchor="middle"
                                        fill="#D4AF37"
                                        className="font-serif italic tracking-[0.5em] uppercase"
                                        style={{ fontSize: '11px' }}
                                    >
                                        {customerName.split('').map((char, i) => (
                                            <tspan key={i} className="animate-engrave" style={{ animationDelay: `${i * 0.1}s` }}>{char}</tspan>
                                        ))}
                                    </text>
                                    {step >= 3 && (
                                        <path d="M 55 174 H 105" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.6" className="animate-draw-line" />
                                    )}
                                </g>
                            )}

                            {step >= 4 && (
                                <g clipPath="url(#bottleClip)">
                                    <rect x="-180" y="-50" width="100" height="400" fill="url(#goldShineGrad)" className="animate-shine-sweep" style={{ transform: 'rotate(25deg)' }} />
                                </g>
                            )}
                            <defs>
                                <clipPath id="bottleClip"><rect x="11.5" y="41.5" width="137" height="237" rx="3" /></clipPath>
                                <linearGradient id="reflectGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="white" stopOpacity="0" />
                                    <stop offset="50%" stopColor="white" stopOpacity="1" />
                                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                                </linearGradient>
                                <linearGradient id="goldShineGrad" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
                                    <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.4" />
                                    <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>
            </div>

            {/* BOTTOM SECTION: Dark Editorial Info (55%) */}
            <div className={cn(
                "flex-1 flex flex-col items-center px-8 transition-all duration-[1.5s] delay-500",
                step >= 6 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}>
                {/* Editorial Logo */}
                <div className="mb-8 flex flex-col items-center">
                    <span className="text-[14px] font-light tracking-[1em] uppercase text-white/90">Balmy</span>
                    <div className="w-12 h-[1px] bg-[#D4AF37]/40 mt-2" />
                </div>

                <div className="text-center space-y-2 mb-10">
                    <h1 className="text-[28px] font-serif italic text-white tracking-wide">الطلب تحت رعاية الفخامة</h1>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]/60 font-bold">Your scent is being prepared</p>
                </div>

                {/* Glassmorphism Info Grid */}
                <div className="w-full grid grid-cols-2 gap-4 mb-8 max-w-[500px]">
                    <div className="bg-white/[0.03] backdrop-blur-md border border-white/[0.05] rounded-[2px] p-6 flex flex-col items-center text-center">
                        <span className="text-[8px] uppercase tracking-[0.3em] text-white/30 mb-3">Order Status</span>
                        <div className="flex items-center gap-3 text-white mb-1">
                            <Droplets size={14} className="text-[#D4AF37]" />
                            <span className="text-xs font-black tracking-tighter">جاري التعتيق</span>
                        </div>
                    </div>
                    <div className="bg-white/[0.03] backdrop-blur-md border border-white/[0.05] rounded-[2px] p-6 flex flex-col items-center text-center">
                        <span className="text-[8px] uppercase tracking-[0.3em] text-white/30 mb-3">Reference No.</span>
                        <span className="text-xs font-mono font-bold text-white tracking-widest">{orderId}</span>
                    </div>
                </div>

                {/* Minimalist Progress Line */}
                <div className="w-full max-w-[300px] mb-12 flex flex-col items-center">
                    <div className="w-full h-[1px] bg-white/10 relative">
                        <div className="absolute top-0 right-0 h-full bg-[#D4AF37] w-[40%] shadow-[0_0_10px_#D4AF37]" />
                    </div>
                    <div className="mt-4 flex justify-between w-full">
                        <span className="text-[8px] uppercase tracking-widest text-white/80 font-bold">Placed</span>
                        <span className="text-[8px] uppercase tracking-widest text-white/20 font-bold">Shipped</span>
                    </div>
                </div>

                {/* Action Buttons: Minimalist & High Contrast */}
                <div className="w-full max-w-[400px] grid grid-cols-2 gap-4 mt-auto pb-12">
                    <button 
                        onClick={() => onClose ? onClose() : router.push('/track')}
                        className="group relative h-14 overflow-hidden border border-white/[0.1] bg-white text-black transition-all hover:bg-transparent hover:text-white"
                    >
                        <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.2em]">Track Order</span>
                    </button>
                    <button 
                        onClick={() => onClose ? onClose() : router.push('/')}
                        className="h-14 border border-white/[0.1] text-white/60 text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:text-white hover:border-white/30"
                    >
                        Explore More
                    </button>
                </div>
            </div>

            <style jsx global>{`
                @font-face {
                    font-family: 'Editorial';
                    src: local('Times New Roman'); /* Fallback to a high-contrast serif */
                }
                @keyframes engrave {
                    0% { opacity: 0; transform: translateY(6px) scale(0.8); filter: blur(6px); }
                    100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
                }
                .animate-engrave {
                    display: inline-block;
                    animation: engrave 0.8s cubic-bezier(0.2, 1, 0.2, 1) forwards;
                }
                @keyframes draw-line {
                    from { stroke-dasharray: 0 100; stroke-dashoffset: 0; opacity: 0; }
                    to { stroke-dasharray: 100 0; stroke-dashoffset: 0; opacity: 1; }
                }
                .animate-draw-line {
                    animation: draw-line 1.2s cubic-bezier(0.2, 1, 0.2, 1) forwards;
                }
                @keyframes shine-sweep {
                    0% { transform: translateX(0) rotate(25deg); }
                    100% { transform: translateX(500px) rotate(25deg); }
                }
                .animate-shine-sweep {
                    animation: shine-sweep 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }
                @keyframes float-gentle {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-10px) rotate(0.5deg); }
                }
                .animate-float-gentle {
                    animation: float-gentle 6s ease-in-out infinite;
                }
                @keyframes float-up {
                    0% { transform: translateY(0) scale(0); opacity: 0; }
                    20% { opacity: 0.3; transform: scale(1); }
                    100% { transform: translateY(-100vh) scale(0.5); opacity: 0; }
                }
                .animate-float-up {
                    animation: float-up linear infinite;
                }
            `}</style>
        </div>
    );
};
</button>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes engrave {
                    0% { opacity: 0; transform: translateY(6px) scale(0.8); filter: blur(6px); }
                    100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
                }
                .animate-engrave {
                    display: inline-block;
                    animation: engrave 0.8s cubic-bezier(0.2, 1, 0.2, 1) forwards;
                }
                @keyframes draw-line {
                    from { stroke-dasharray: 0 100; stroke-dashoffset: 0; opacity: 0; }
                    to { stroke-dasharray: 100 0; stroke-dashoffset: 0; opacity: 1; }
                }
                .animate-draw-line {
                    animation: draw-line 1.2s cubic-bezier(0.2, 1, 0.2, 1) forwards;
                }
                @keyframes shine-sweep {
                    0% { transform: translateX(0) rotate(25deg); }
                    100% { transform: translateX(500px) rotate(25deg); }
                }
                .animate-shine-sweep {
                    animation: shine-sweep 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }
                @keyframes confetti {
                    0% { transform: translate(0, 0) rotate(0deg) scale(0); opacity: 0; }
                    15% { opacity: 1; transform: scale(1.2); }
                    100% { transform: translate(var(--x), var(--y)) rotate(var(--rot)) scale(0.3); opacity: 0; }
                }
                .animate-confetti {
                    animation: confetti 3.5s cubic-bezier(0.1, 0.9, 0.2, 1) forwards;
                }
                @keyframes float-gentle {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    33% { transform: translateY(-12px) rotate(1deg); }
                    66% { transform: translateY(-6px) rotate(-1deg); }
                }
                .animate-float-gentle {
                    animation: float-gentle 6s ease-in-out infinite;
                }
                @keyframes float-up {
                    0% { transform: translateY(0) scale(0); opacity: 0; }
                    20% { opacity: 0.3; transform: scale(1); }
                    80% { opacity: 0.3; }
                    100% { transform: translateY(-100vh) scale(0.5); opacity: 0; }
                }
                .animate-float-up {
                    animation: float-up linear infinite;
                }
            `}</style>
        </div>
    );
};

export default OrderConfirmation;
