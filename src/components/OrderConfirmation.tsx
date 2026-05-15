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

            {/* TOP SECTION: Ultra-Realistic Alchemist Pouring (55vh) */}
            <div className="relative h-[55vh] flex flex-col items-center justify-center pt-4">
                <div className="relative w-[320px] h-[420px]">
                    
                    {/* Source Beaker - Professional Laboratory Glass */}
                    <div className={cn(
                        "absolute top-0 right-4 w-[110px] h-[150px] transition-all duration-[2.5s] ease-in-out z-30",
                        step >= 1 ? "opacity-100 translate-x-0 rotate-[-42deg]" : "opacity-0 translate-x-24 rotate-0"
                    )}>
                        <svg width="110" height="150" viewBox="0 0 100 140" fill="none">
                            {/* Glass Body with Reflections */}
                            <path d="M 20 10 Q 20 5 25 5 L 75 5 Q 80 5 80 10 L 85 120 Q 85 130 75 130 L 25 130 Q 15 130 15 120 Z" fill="white" fillOpacity="0.03" stroke="white" strokeOpacity="0.2" strokeWidth="0.5" />
                            <path d="M 22 15 L 22 120" stroke="white" strokeOpacity="0.1" strokeWidth="1" strokeLinecap="round" />
                            
                            {/* Draining Liquid */}
                            <clipPath id="drainClip">
                                <rect 
                                    x="0" 
                                    y={step >= 2 ? "140" : "20"} 
                                    width="100" 
                                    height="140" 
                                    className="transition-all duration-[4s] ease-in-out" 
                                />
                            </clipPath>
                            <path 
                                d="M 20 10 Q 20 5 25 5 L 75 5 Q 80 5 80 10 L 85 120 Q 85 130 75 130 L 25 130 Q 15 130 15 120 Z" 
                                fill="#D4AF37" 
                                fillOpacity="0.4" 
                                clipPath="url(#drainClip)"
                            />
                        </svg>
                    </div>

                    {/* Realistic Liquid Stream with Varying Thickness */}
                    {step >= 2 && (
                        <svg className="absolute inset-0 pointer-events-none z-20" width="320" height="420" viewBox="0 0 300 400">
                            {/* The Core Stream */}
                            <path 
                                d="M 238 65 Q 210 130 150 145" 
                                stroke="#D4AF37" 
                                strokeWidth="4" 
                                strokeLinecap="round"
                                fill="none"
                                className="animate-liquid-pour"
                                style={{ filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.6))' }}
                            />
                            {/* Highlights on stream */}
                            <path 
                                d="M 238 65 Q 210 130 150 145" 
                                stroke="white" 
                                strokeWidth="1" 
                                strokeOpacity="0.3"
                                strokeLinecap="round"
                                fill="none"
                                className="animate-liquid-pour"
                            />
                        </svg>
                    )}

                    {/* Target Bottle - The Crystal Masterpiece */}
                    <div className={cn(
                        "absolute bottom-0 left-1/2 -translate-x-1/2 w-[180px] h-[280px] transition-all duration-[1.5s]",
                        step >= 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
                    )}>
                        {/* Dramatic Environment Glow */}
                        <div className={cn(
                            "absolute inset-0 bg-[#D4AF37]/10 rounded-full blur-[100px] transition-all duration-[4s]",
                            step >= 3 ? "scale-150 opacity-50" : "scale-50 opacity-0"
                        )} />

                        <svg width="180" height="280" viewBox="0 0 160 300" fill="none" className="relative z-10">
                            {/* Thick Crystal Glass */}
                            <rect x="10" y="40" width="140" height="240" rx="6" stroke="white" strokeWidth="1.5" strokeOpacity="0.6" />
                            <rect x="14" y="44" width="132" height="232" rx="4" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" />
                            
                            {/* Glass Reflections */}
                            <path d="M 20 50 L 20 260" stroke="white" strokeOpacity="0.2" strokeWidth="1" />
                            <path d="M 140 50 L 140 260" stroke="white" strokeOpacity="0.1" strokeWidth="0.5" />

                            {/* Filling Liquid Level */}
                            <clipPath id="realisticFillClip">
                                <rect 
                                    x="10" 
                                    y={step >= 3 ? "40" : "280"} 
                                    width="140" 
                                    height="240" 
                                    className="transition-all duration-[5s] cubic-bezier(0.4, 0, 0.2, 1)" 
                                />
                            </clipPath>
                            
                            {/* Liquid with Gradient and Internal Glow */}
                            <g clipPath="url(#realisticFillClip)">
                                <rect x="12" y="42" width="136" height="236" fill="url(#luxuryLiquidGrad)" className="opacity-60" />
                                
                                {/* Rising Bubbles - Tiny and Subtle */}
                                {[...Array(8)].map((_, i) => (
                                    <circle 
                                        key={i}
                                        cx={30 + Math.random() * 100}
                                        cy={260}
                                        r={0.8 + Math.random() * 1.5}
                                        fill="white"
                                        fillOpacity="0.4"
                                        className="animate-bubble"
                                        style={{ animationDelay: `${i * 0.6}s` }}
                                    />
                                ))}
                            </g>

                            {/* Splash/Impact effect at entry point */}
                            {step >= 3 && step < 6 && (
                                <g className="animate-splash" style={{ transform: 'translate(150px, 145px)' }}>
                                    <circle r="2" fill="#D4AF37" className="animate-ping" />
                                    <path d="M -5 -5 L -10 -15" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.6" className="animate-droplet" />
                                    <path d="M 5 -5 L 10 -15" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.6" className="animate-droplet" />
                                </g>
                            )}

                            {/* Name Engraving - High Attention Reveal */}
                            {step >= 4 && (
                                <g>
                                    <text
                                        x="50%"
                                        y="148"
                                        textAnchor="middle"
                                        fill="#D4AF37"
                                        className="font-serif italic tracking-[0.5em] uppercase font-black"
                                        style={{ 
                                            fontSize: '13px',
                                            filter: 'drop-shadow(0 0 15px rgba(212,175,55,1))'
                                        }}
                                    >
                                        {customerName}
                                    </text>
                                    <path 
                                        d="M 45 168 H 115" 
                                        stroke="#D4AF37" 
                                        strokeWidth="1.5" 
                                        className="animate-draw-line"
                                        style={{ filter: 'drop-shadow(0 0 5px #D4AF37)' }}
                                    />
                                </g>
                            )}

                            <defs>
                                <linearGradient id="luxuryLiquidGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.8">
                                        <animate attributeName="stopColor" values="#D4AF37;#FFD700;#D4AF37" dur="3s" repeatCount="indefinite" />
                                    </stop>
                                    <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.2" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>
            </div>

            {/* BOTTOM SECTION: Detailed Status Ritual */}
            <div className={cn(
                "flex-1 flex flex-col items-center px-8 transition-all duration-[1.5s] delay-700",
                step >= 6 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}>
                <div className="text-center space-y-4 mb-8">
                    <h1 className="text-[26px] font-serif italic text-white tracking-wide">طقوس تحضير عطرك الملكي</h1>
                    <div className="flex items-center justify-center gap-6">
                        <div className="h-[0.5px] w-12 bg-[#D4AF37]/30" />
                        <p className="text-[10px] uppercase tracking-[0.6em] text-[#D4AF37] font-bold">The Art of Alchemy</p>
                        <div className="h-[0.5px] w-12 bg-[#D4AF37]/30" />
                    </div>
                </div>

                {/* Refined Status Timeline */}
                <div className="w-full max-w-[500px] space-y-4 mb-10">
                    <div className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-sm flex items-center justify-between group hover:bg-white/[0.04] transition-all">
                        <div className="flex items-center gap-5">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] shadow-[0_0_12px_#D4AF37]" />
                            <div className="flex flex-col">
                                <span className="text-[11px] text-white font-bold uppercase tracking-widest">تجهيز الزيوت الخام</span>
                                <span className="text-[8px] text-white/30 uppercase tracking-tighter">Pure Scent Extraction</span>
                            </div>
                        </div>
                        <Check size={14} className="text-[#D4AF37]" />
                    </div>
                    
                    <div className={cn(
                        "bg-white/[0.02] border border-white/[0.05] p-6 rounded-sm flex items-center justify-between transition-all",
                        step >= 3 ? "opacity-100" : "opacity-20"
                    )}>
                        <div className="flex items-center gap-5">
                            <div className={cn("w-2.5 h-2.5 rounded-full", step >= 3 ? "bg-[#D4AF37] animate-pulse shadow-[0_0_12px_#D4AF37]" : "bg-white/10")} />
                            <div className="flex flex-col">
                                <span className="text-[11px] text-white font-bold uppercase tracking-widest">مرحلة الصب والتعتيق</span>
                                <span className="text-[8px] text-white/30 uppercase tracking-tighter">Liquid Gold Infusion</span>
                            </div>
                        </div>
                        {step >= 6 ? <Check size={14} className="text-[#D4AF37]" /> : <Droplets size={14} className="text-[#D4AF37] animate-bounce" />}
                    </div>

                    <div className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-sm flex items-center justify-between opacity-10">
                        <div className="flex items-center gap-5">
                            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                            <div className="flex flex-col">
                                <span className="text-[11px] text-white font-bold uppercase tracking-widest">الختم والتغليف الملكي</span>
                                <span className="text-[8px] text-white/30 uppercase tracking-tighter">Royal Seal & Packaging</span>
                            </div>
                        </div>
                        <Package size={14} className="text-white/20" />
                    </div>
                </div>

                <div className="w-full max-w-[400px] grid grid-cols-2 gap-4 mt-auto pb-12">
                    <button 
                        onClick={() => onClose ? onClose() : router.push('/track')}
                        className="group relative h-14 overflow-hidden border border-white/[0.1] bg-white text-black transition-all hover:bg-transparent hover:text-white"
                    >
                        <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.2em]">تتبع الطلب الآن</span>
                    </button>
                    <button 
                        onClick={() => onClose ? onClose() : router.push('/')}
                        className="h-14 border border-white/[0.1] text-white/60 text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:text-white hover:border-white/30"
                    >
                        تسوق المزيد
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
                @keyframes liquid-pour {
                    0% { stroke-dasharray: 0 500; stroke-dashoffset: 500; opacity: 0; }
                    10% { opacity: 1; stroke-dashoffset: 500; }
                    90% { stroke-dashoffset: 0; opacity: 1; }
                    100% { stroke-dashoffset: 0; opacity: 0; }
                }
                .animate-liquid-pour {
                    stroke-dasharray: 500;
                    stroke-dashoffset: 500;
                    animation: liquid-pour 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                }
                @keyframes bubble {
                    0% { transform: translateY(0) scale(1); opacity: 0; }
                    20% { opacity: 0.6; }
                    100% { transform: translateY(-200px) scale(0.5); opacity: 0; }
                }
                .animate-bubble {
                    animation: bubble 4s linear infinite;
                }
                @keyframes splash {
                    0% { transform: scale(0); opacity: 1; }
                    100% { transform: scale(2.5); opacity: 0; }
                }
                .animate-splash {
                    animation: splash 1s ease-out infinite;
                }
                @keyframes droplet {
                    0% { transform: translate(0, 0); opacity: 1; }
                    100% { transform: translate(var(--dx, 10px), var(--dy, -20px)); opacity: 0; }
                }
                .animate-droplet {
                    animation: droplet 0.6s ease-out infinite;
                }
                @keyframes float-gentle {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-10px) rotate(0.5deg); }
                }
                .animate-float-gentle {
                    animation: float-gentle 6s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

            `}</style>
        </div>
    );
};

export default OrderConfirmation;
