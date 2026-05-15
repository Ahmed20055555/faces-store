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
        <div className="fixed inset-0 z-[1000] bg-[#050505] overflow-hidden flex flex-col font-tajawal dir-rtl selection:bg-white selection:text-black">
            {/* Ultra-Luxury Ambient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none" />
            <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_60%)] pointer-events-none" />

            {/* Premium Gold Sparkles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <div 
                        key={i}
                        className="absolute w-[1.5px] h-[1.5px] bg-[#D4AF37] rounded-full opacity-20 animate-float-up"
                        style={{
                            left: `${Math.random() * 100}%`,
                            bottom: '-10px',
                            animationDelay: `${i * 1.5}s`,
                            animationDuration: `${12 + Math.random() * 8}s`
                        }}
                    />
                ))}
            </div>

            {/* TOP SECTION: Cinematic Hero (52%) */}
            <div className="relative h-[52vh] flex flex-col items-center justify-center pt-12">
                <div className={cn(
                    "relative transition-all duration-[1.8s] cubic-bezier(0.2, 1, 0.2, 1) transform",
                    step >= 1 ? "translate-y-0 opacity-100 scale-100" : "translate-y-[120px] opacity-0 scale-95",
                    step >= 6 && "animate-float-gentle"
                )}>
                    {/* Bottle SVG with Crystal & Gold Effects */}
                    <div className="relative w-[190px] h-[330px] flex items-center justify-center">
                        {/* Dramatic Aura */}
                        <div className={cn(
                            "absolute inset-0 bg-white/5 rounded-full blur-[110px] transition-all duration-[2.5s]",
                            step >= 1 ? "scale-125 opacity-30" : "scale-50 opacity-0"
                        )} />

                        <svg width="190" height="330" viewBox="0 0 160 300" fill="none" className="relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                            {/* Thick Crystal Base */}
                            <rect x="10" y="270" width="140" height="15" rx="2" fill="white" fillOpacity="0.1" />
                            <rect x="10" y="270" width="140" height="1" fill="white" fillOpacity="0.3" />
                            
                            {/* Bottle Main Body - Luxury Multi-layered Glass */}
                            <rect x="10" y="40" width="140" height="240" rx="4" stroke="white" strokeWidth="0.3" strokeOpacity="0.1" />
                            <rect x="11.5" y="41.5" width="137" height="237" rx="3" stroke="white" strokeWidth="1.2" strokeOpacity="0.7" />
                            <rect x="15" y="45" width="130" height="230" rx="2" stroke="white" strokeWidth="0.5" strokeOpacity="0.15" />
                            
                            {/* Realistic Glass Reflections */}
                            <path d="M 18 50 L 18 265" stroke="url(#reflectGrad)" strokeWidth="1.5" strokeOpacity="0.4" strokeLinecap="round" />
                            <path d="M 142 55 L 142 260" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" />
                            
                            {/* Cap Design - Heavy & Polished */}
                            <rect x="68" y="28" width="24" height="12" fill="white" fillOpacity="0.1" />
                            <rect x="58" y="8" width="44" height="22" rx="2" fill="white" />
                            <rect x="62" y="12" width="1" height="14" fill="black" fillOpacity="0.15" />
                            <rect x="97" y="12" width="1" height="14" fill="black" fillOpacity="0.1" />
                            
                            {/* Gold Engraved Name - Premium Serif */}
                            {step >= 2 && (
                                <g>
                                    <text
                                        x="50%"
                                        y="148"
                                        textAnchor="middle"
                                        fill="#D4AF37"
                                        className="font-serif italic tracking-[0.45em] uppercase"
                                        style={{ 
                                            fontSize: customerName.length > 12 ? '9.5px' : '11.5px',
                                            filter: 'drop-shadow(0 0 2px rgba(212,175,55,0.3))'
                                        }}
                                    >
                                        {customerName.split('').map((char, i) => (
                                            <tspan 
                                                key={i} 
                                                className="animate-engrave"
                                                style={{ animationDelay: `${i * 0.1}s` }}
                                            >
                                                {char}
                                            </tspan>
                                        ))}
                                    </text>
                                    <text
                                        x="50%"
                                        y="164"
                                        textAnchor="middle"
                                        fill="white"
                                        fillOpacity="0.25"
                                        className="text-[6.5px] font-bold tracking-[0.7em] uppercase"
                                    >
                                        {step >= 2 && "EAU DE PARFUM"}
                                    </text>
                                    
                                    {/* Gold Accent Line */}
                                    {step >= 3 && (
                                        <path 
                                            d="M 55 174 H 105" 
                                            stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.6"
                                            className="animate-draw-line"
                                        />
                                    )}
                                </g>
                            )}

                            {/* Luxury Gold Shine Sweep */}
                            {step >= 4 && (
                                <g clipPath="url(#bottleClip)">
                                    <rect 
                                        x="-180" y="-50" width="100" height="400" 
                                        fill="url(#goldShineGrad)"
                                        className="animate-shine-sweep"
                                        style={{ transform: 'rotate(25deg)' }}
                                    />
                                </g>
                            )}
                            <defs>
                                <clipPath id="bottleClip">
                                    <rect x="11.5" y="41.5" width="137" height="237" rx="3" />
                                </clipPath>
                                <linearGradient id="reflectGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="white" stopOpacity="0" />
                                    <stop offset="20%" stopColor="white" stopOpacity="1" />
                                    <stop offset="80%" stopColor="white" stopOpacity="1" />
                                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                                </linearGradient>
                                <linearGradient id="goldShineGrad" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
                                    <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.5" />
                                    <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* Gold & Silver Confetti */}
                        {step >= 5 && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
                                {[...Array(35)].map((_, i) => (
                                    <div 
                                        key={i}
                                        className={cn(
                                            "absolute w-1 h-1 rounded-sm animate-confetti",
                                            i % 2 === 0 ? "bg-[#D4AF37]" : "bg-white"
                                        )}
                                        style={{
                                            left: '50%',
                                            top: '10%',
                                            '--x': `${(Math.random() - 0.5) * 350}px`,
                                            '--y': `${-Math.random() * 250 - 50}px`,
                                            '--rot': `${Math.random() * 1080}deg`,
                                            animationDelay: `${Math.random() * 0.4}s`
                                        } as React.CSSProperties}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className={cn(
                    "mt-6 text-[#D4AF37]/40 text-[9px] tracking-[0.6em] uppercase transition-all duration-1000 delay-700",
                    step >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}>
                    Privé Collection • Balmy
                </div>
            </div>

            {/* BOTTOM SECTION: The White Podium (48%) */}
            <div className={cn(
                "absolute bottom-0 left-0 right-0 h-[48vh] bg-white rounded-t-[40px] transition-all duration-[1.5s] cubic-bezier(0.16, 1, 0.3, 1) z-20 shadow-[0_-40px_80px_rgba(0,0,0,0.7)]",
                step >= 6 ? "translate-y-0" : "translate-y-full"
            )}>
                {/* Visual Handle */}
                <div className="w-10 h-1 bg-black/5 rounded-full mx-auto mt-5 mb-8" />

                <div className="max-w-[480px] mx-auto h-full px-10 flex flex-col items-center">
                    <div className="mb-4">
                        <span className="text-[12px] font-black tracking-[0.6em] uppercase text-black">balmy</span>
                    </div>

                    <h1 className="text-2xl font-black text-black mb-1">طلبك في طريقه ليك</h1>
                    <p className="text-[13px] text-black/40 mb-10 font-bold tracking-tight">استعد لتجربة عطرية استثنائية</p>

                    {/* Progress Grid of 2 style */}
                    <div className="w-full grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-gray-50 rounded-2xl p-5 border border-black/[0.03] flex flex-col items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white shadow-lg">
                                <Package size={18} />
                            </div>
                            <span className="text-[11px] font-black uppercase">تم التأكيد</span>
                        </div>
                        <div className="bg-gray-50/50 rounded-2xl p-5 border border-black/[0.01] flex flex-col items-center gap-3 opacity-40">
                            <div className="w-10 h-10 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-black">
                                <Truck size={18} />
                            </div>
                            <span className="text-[11px] font-black uppercase">جاري الشحن</span>
                        </div>
                    </div>

                    {/* Order ID Bar */}
                    <div className="w-full flex items-center justify-between bg-black text-white p-2 pr-6 rounded-2xl mb-8 group cursor-pointer active:scale-95 transition-all" onClick={copyToClipboard}>
                        <div className="flex flex-col">
                            <span className="text-[8px] font-bold uppercase text-white/40 mb-0.5">Order Reference</span>
                            <span className="font-mono text-sm tracking-[0.2em] font-bold">{orderId}</span>
                        </div>
                        <div className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
                            copied ? "bg-white text-black" : "bg-white/10 text-white group-hover:bg-white/20"
                        )}>
                            {copied ? <Check size={20} /> : <Copy size={18} />}
                        </div>
                    </div>

                    {/* Final Action Grid of 2 */}
                    <div className="w-full grid grid-cols-2 gap-4 mt-auto pb-12">
                        <button 
                            onClick={() => onClose ? onClose() : router.push('/track')}
                            className="bg-black text-white py-5 rounded-2xl font-black text-[13px] shadow-2xl shadow-black/20 hover:scale-[1.02] active:scale-95 transition-all"
                        >
                            تتبع الطلب
                        </button>
                        <button 
                            onClick={() => onClose ? onClose() : router.push('/')}
                            className="bg-white text-black py-5 rounded-2xl font-black text-[13px] border-2 border-black/5 hover:bg-gray-50 active:scale-95 transition-all"
                        >
                            تسوق مجدداً
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
