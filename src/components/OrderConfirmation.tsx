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

            {/* TOP SECTION: The Masterpiece Pouring (55vh) */}
            <div className="relative h-[55vh] flex flex-col items-center justify-center pt-4">
                <div className="relative w-[300px] h-[400px]">
                    {/* Source Bottle (The Alchemist Bottle) - Appears and Tilts */}
                    <div className={cn(
                        "absolute top-0 right-0 w-[100px] h-[140px] transition-all duration-[2.5s] ease-in-out",
                        step >= 1 ? "opacity-100 translate-x-0 rotate-[-45deg]" : "opacity-0 translate-x-20 rotate-0"
                    )}>
                        <svg width="100" height="140" viewBox="0 0 100 140" fill="none">
                            <rect x="30" y="10" width="40" height="110" rx="4" stroke="white" strokeOpacity="0.2" />
                            <rect x="35" y="15" width="30" height="100" rx="2" fill="white" fillOpacity="0.05" />
                            {/* Liquid inside source */}
                            <rect x="35" y="15" width="30" height="70" rx="2" fill="#D4AF37" fillOpacity="0.3" className="animate-pulse" />
                        </svg>
                    </div>

                    {/* The Golden Liquid Stream */}
                    {step >= 2 && (
                        <svg className="absolute inset-0 pointer-events-none z-20" width="300" height="400" viewBox="0 0 300 400">
                            <path 
                                d="M 235 60 Q 200 120 150 150" 
                                stroke="#D4AF37" 
                                strokeWidth="3" 
                                strokeLinecap="round"
                                fill="none"
                                className="animate-liquid-pour"
                                style={{ filter: 'drop-shadow(0 0 5px #D4AF37)' }}
                            />
                        </svg>
                    )}

                    {/* Target Bottle (The Crystal Personalized Bottle) */}
                    <div className={cn(
                        "absolute bottom-0 left-1/2 -translate-x-1/2 w-[160px] h-[260px] transition-all duration-[1.5s]",
                        step >= 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
                    )}>
                        {/* Glow behind target */}
                        <div className={cn(
                            "absolute inset-0 bg-[#D4AF37]/5 rounded-full blur-[80px] transition-all duration-[3s]",
                            step >= 3 ? "scale-150 opacity-40" : "scale-50 opacity-0"
                        )} />

                        <svg width="160" height="260" viewBox="0 0 160 300" fill="none" className="relative z-10">
                            {/* Bottle Glass Body */}
                            <rect x="10" y="40" width="140" height="240" rx="4" stroke="white" strokeWidth="1.2" strokeOpacity="0.5" />
                            
                            {/* Filling Liquid Animation */}
                            <clipPath id="fillClip">
                                <rect 
                                    x="10" 
                                    y={step >= 3 ? "40" : "280"} 
                                    width="140" 
                                    height="240" 
                                    className="transition-all duration-[4s] ease-out" 
                                />
                            </clipPath>
                            
                            <rect 
                                x="12" y="42" width="136" height="236" 
                                fill="url(#liquidGrad)" 
                                clipPath="url(#fillClip)"
                                className="opacity-40"
                            />

                            {/* Name Engraving - Highlighted */}
                            {step >= 3 && (
                                <g className="animate-in fade-in duration-1000 delay-1000">
                                    <text
                                        x="50%"
                                        y="148"
                                        textAnchor="middle"
                                        fill="#D4AF37"
                                        className="font-serif italic tracking-[0.4em] uppercase font-bold"
                                        style={{ 
                                            fontSize: '12px',
                                            filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.8))'
                                        }}
                                    >
                                        {customerName}
                                    </text>
                                    <path d="M 50 165 H 110" stroke="#D4AF37" strokeWidth="1" className="animate-draw-line" />
                                </g>
                            )}

                            <defs>
                                <linearGradient id="liquidGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.6" />
                                    <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.1" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>
            </div>

            {/* BOTTOM SECTION: Detailed Status (45vh) */}
            <div className={cn(
                "flex-1 flex flex-col items-center px-8 transition-all duration-[1.5s] delay-700",
                step >= 5 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}>
                <div className="text-center space-y-3 mb-8">
                    <h1 className="text-[24px] font-serif italic text-white tracking-wide">طقوس تحضير عطرك الخاص</h1>
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-[1px] w-8 bg-white/10" />
                        <p className="text-[9px] uppercase tracking-[0.5em] text-[#D4AF37] font-bold">Infusing Royal Essence</p>
                        <div className="h-[1px] w-8 bg-white/10" />
                    </div>
                </div>

                {/* Status Timeline */}
                <div className="w-full max-w-[500px] space-y-4 mb-10">
                    <div className="bg-white/[0.02] border border-white/[0.05] p-5 rounded-sm flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse shadow-[0_0_8px_#D4AF37]" />
                            <span className="text-[11px] text-white/90 font-bold uppercase tracking-widest">تجهيز الزيوت العطرية</span>
                        </div>
                        <span className="text-[9px] text-white/30 font-mono">Completed</span>
                    </div>
                    <div className={cn(
                        "bg-white/[0.02] border border-white/[0.05] p-5 rounded-sm flex items-center justify-between transition-opacity",
                        step >= 3 ? "opacity-100" : "opacity-30"
                    )}>
                        <div className="flex items-center gap-4">
                            <div className={cn("w-2 h-2 rounded-full", step >= 3 ? "bg-[#D4AF37] animate-pulse shadow-[0_0_8px_#D4AF37]" : "bg-white/20")} />
                            <span className="text-[11px] text-white/90 font-bold uppercase tracking-widest">حفر الاسم بالذهب</span>
                        </div>
                        <span className="text-[9px] text-white/30 font-mono">{step >= 3 ? "In Progress" : "Pending"}</span>
                    </div>
                    <div className="bg-white/[0.02] border border-white/[0.05] p-5 rounded-sm flex items-center justify-between opacity-20">
                        <div className="flex items-center gap-4">
                            <div className="w-2 h-2 rounded-full bg-white/20" />
                            <span className="text-[11px] text-white/90 font-bold uppercase tracking-widest">التغليف الملكي</span>
                        </div>
                        <span className="text-[9px] text-white/30 font-mono">Scheduled</span>
                    </div>
                </div>

                <div className="w-full max-w-[300px] mb-12 flex flex-col items-center">
                    <div className="w-full h-[1px] bg-white/10 relative">
                        <div className="absolute top-0 right-0 h-full bg-[#D4AF37] w-[40%] shadow-[0_0_10px_#D4AF37]" />
                    </div>
                    <div className="mt-4 flex justify-between w-full">
                        <span className="text-[8px] uppercase tracking-widest text-white/80 font-bold">Placed</span>
                        <span className="text-[8px] uppercase tracking-widest text-white/20 font-bold">Shipped</span>
                    </div>
                </div>

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
                @keyframes liquid-pour {
                    0% { stroke-dasharray: 0 500; opacity: 0; }
                    20% { opacity: 1; }
                    80% { stroke-dasharray: 500 0; opacity: 1; }
                    100% { stroke-dasharray: 500 0; opacity: 0; }
                }
                .animate-liquid-pour {
                    stroke-dasharray: 500;
                    stroke-dashoffset: 0;
                    animation: liquid-pour 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                }
            `}</style>
        </div>
    );
};

export default OrderConfirmation;
