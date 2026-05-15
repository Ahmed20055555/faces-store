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
}

const OrderConfirmation = ({ 
    customerName, 
    orderId, 
    productName, 
    productImage, 
    collection = "black" 
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
            {/* Spotlight Effect */}
            <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-full h-[80%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)] pointer-events-none" />

            {/* Ambient Dust Particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <div 
                        key={i}
                        className="absolute w-[2px] h-[2px] bg-white rounded-full opacity-10 animate-float-up"
                        style={{
                            left: `${Math.random() * 100}%`,
                            bottom: '-10px',
                            animationDelay: `${i * 2}s`,
                            animationDuration: `${15 + Math.random() * 10}s`
                        }}
                    />
                ))}
            </div>

            {/* TOP SECTION: Cinematic Hero (60%) */}
            <div className="relative h-[55vh] flex flex-col items-center justify-center pt-10">
                <div className={cn(
                    "relative transition-all duration-[1.5s] ease-[cubic-bezier(0.23,1,0.32,1)] transform",
                    step >= 1 ? "translate-y-0 opacity-100 scale-100" : "translate-y-[100px] opacity-0 scale-90",
                    step >= 6 && "animate-float-gentle"
                )}>
                    {/* Bottle SVG with Luxury Glass Effect */}
                    <div className="relative w-[180px] h-[320px] flex items-center justify-center">
                        {/* Inner Glow */}
                        <div className={cn(
                            "absolute inset-0 bg-white/5 rounded-full blur-[100px] transition-all duration-[2s]",
                            step >= 1 ? "scale-110 opacity-20" : "scale-50 opacity-0"
                        )} />

                        <svg width="180" height="320" viewBox="0 0 160 300" fill="none" className="relative z-10 drop-shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                            {/* Bottle Main Body - Double Stroke for Glass Depth */}
                            <rect x="10" y="40" width="140" height="240" rx="6" stroke="white" strokeWidth="0.5" strokeOpacity="0.2" />
                            <rect x="12" y="42" width="136" height="236" rx="4" stroke="white" strokeWidth="1.5" strokeOpacity="0.8" />
                            
                            {/* Glass Reflections */}
                            <path d="M 20 50 Q 25 150 20 270" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" strokeLinecap="round" />
                            <path d="M 140 50 Q 135 150 140 270" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" strokeLinecap="round" />
                            
                            {/* Neck & Cap with Details */}
                            <rect x="70" y="30" width="20" height="10" fill="white" fillOpacity="0.15" />
                            <rect x="60" y="10" width="40" height="20" rx="3" fill="white" />
                            {/* Cap Reflection */}
                            <rect x="65" y="14" width="2" height="12" rx="1" fill="black" fillOpacity="0.1" />
                            
                            {/* Engraved Name with Premium Typography */}
                            {step >= 2 && (
                                <g>
                                    <text
                                        x="50%"
                                        y="145"
                                        textAnchor="middle"
                                        fill="white"
                                        fillOpacity="0.6"
                                        className="font-serif italic tracking-[0.4em] uppercase"
                                        style={{ fontSize: customerName.length > 12 ? '9px' : '11px' }}
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
                                        y="160"
                                        textAnchor="middle"
                                        fill="white"
                                        fillOpacity="0.3"
                                        className="text-[7px] font-bold tracking-[0.6em] uppercase"
                                    >
                                        {step >= 2 && "Collection Priveé"}
                                    </text>
                                    
                                    {/* Underline Decoration */}
                                    {step >= 3 && (
                                        <path 
                                            d="M 50 170 Q 80 172 110 170" 
                                            stroke="white" strokeWidth="0.5" strokeOpacity="0.4"
                                            fill="none"
                                            className="animate-draw-line"
                                        />
                                    )}
                                </g>
                            )}

                            {/* Luxury Shine Sweep */}
                            {step >= 4 && (
                                <g clipPath="url(#bottleClip)">
                                    <rect 
                                        x="-150" y="-50" width="80" height="400" 
                                        fill="url(#shineGradient)"
                                        className="animate-shine-sweep"
                                        style={{ transform: 'rotate(30deg)' }}
                                    />
                                </g>
                            )}
                            <defs>
                                <clipPath id="bottleClip">
                                    <rect x="12" y="42" width="136" height="236" rx="4" />
                                </clipPath>
                                <linearGradient id="shineGradient" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="white" stopOpacity="0" />
                                    <stop offset="50%" stopColor="white" stopOpacity="0.4" />
                                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* Premium White Confetti */}
                        {step >= 5 && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
                                {[...Array(30)].map((_, i) => (
                                    <div 
                                        key={i}
                                        className="absolute w-1 h-1 bg-white animate-confetti"
                                        style={{
                                            left: '50%',
                                            top: '10%',
                                            '--x': `${(Math.random() - 0.5) * 300}px`,
                                            '--y': `${-Math.random() * 200 - 50}px`,
                                            '--rot': `${Math.random() * 720}deg`,
                                            animationDelay: `${Math.random() * 0.3}s`
                                        } as React.CSSProperties}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Subtitle after animation */}
                <div className={cn(
                    "mt-8 text-white/40 text-[10px] tracking-[0.5em] uppercase transition-all duration-1000 delay-500",
                    step >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}>
                    Handcrafted for you
                </div>
            </div>

            {/* BOTTOM SECTION: Exclusive Card (45%) */}
            <div className={cn(
                "absolute bottom-0 left-0 right-0 h-[48vh] bg-white rounded-t-[32px] transition-all duration-[1.2s] ease-[cubic-bezier(0.19,1,0.22,1)] z-20 shadow-[0_-30px_60px_rgba(0,0,0,0.6)]",
                step >= 6 ? "translate-y-0" : "translate-y-full"
            )}>
                {/* Drag Handle Decoration */}
                <div className="w-12 h-1 bg-black/5 rounded-full mx-auto mt-4 mb-6" />

                <div className="max-w-[480px] mx-auto h-full px-8 flex flex-col items-center">
                    {/* Tiny Logo */}
                    <div className="mb-4">
                        <span className="text-[11px] font-black tracking-[0.5em] uppercase text-black/90">balmy</span>
                    </div>

                    <h1 className="text-2xl font-black text-black mb-1">طلبك في طريقه ليك</h1>
                    <p className="text-sm text-black/50 mb-8 font-medium">تجربة عطرية لا تُنسى في انتظارك</p>

                    {/* Order Status Visualization */}
                    <div className="w-full bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100/50">
                        <div className="flex justify-between items-center relative">
                            {/* Connector Line */}
                            <div className="absolute top-[15px] left-0 right-0 h-[2px] bg-gray-200 -z-0" />
                            <div className="absolute top-[15px] right-0 h-[2px] bg-black transition-all duration-1000 w-[15%]" />

                            <div className="relative z-10 flex flex-col items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white ring-4 ring-white shadow-lg">
                                    <Package size={14} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-tighter">تم الاستلام</span>
                            </div>
                            <div className="relative z-10 flex flex-col items-center gap-3 opacity-30">
                                <div className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center text-black ring-4 ring-white">
                                    <Droplets size={14} />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-tighter">التجهيز</span>
                            </div>
                            <div className="relative z-10 flex flex-col items-center gap-3 opacity-30">
                                <div className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center text-black ring-4 ring-white">
                                    <Truck size={14} />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-tighter">الشحن</span>
                            </div>
                        </div>
                    </div>

                    {/* Order ID & Copy Section */}
                    <div className="w-full flex items-center justify-between mb-8">
                        <div className="text-right">
                            <span className="text-[10px] font-bold uppercase text-gray-400 block mb-1">رقم الطلب الخاص بك</span>
                            <span className="font-mono text-lg font-black tracking-widest text-black">{orderId}</span>
                        </div>
                        <button 
                            onClick={copyToClipboard}
                            className={cn(
                                "p-4 rounded-2xl transition-all duration-300 active:scale-90",
                                copied ? "bg-black text-white" : "bg-gray-100 text-black hover:bg-gray-200"
                            )}
                        >
                            {copied ? <Check size={20} /> : <Copy size={20} />}
                        </button>
                    </div>

                    {/* Footer Actions */}
                    <div className="w-full grid grid-cols-2 gap-4 mt-auto pb-10">
                        <button 
                            onClick={() => router.push('/track')}
                            className="bg-black text-white py-4 px-6 rounded-2xl font-black text-sm shadow-xl shadow-black/10 hover:shadow-black/20 transition-all active:scale-95"
                        >
                            تتبع الآن
                        </button>
                        <button 
                            onClick={() => router.push('/')}
                            className="bg-white text-black py-4 px-6 rounded-2xl font-black text-sm border-2 border-black/5 hover:bg-gray-50 transition-all active:scale-95"
                        >
                            الرئيسية
                        </button>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes engrave {
                    0% { opacity: 0; transform: translateY(4px) scale(0.9); filter: blur(4px); }
                    100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
                }
                .animate-engrave {
                    display: inline-block;
                    animation: engrave 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
                }
                @keyframes draw-line {
                    from { stroke-dasharray: 0 100; stroke-dashoffset: 0; opacity: 0; }
                    to { stroke-dasharray: 100 0; stroke-dashoffset: 0; opacity: 1; }
                }
                .animate-draw-line {
                    animation: draw-line 1s cubic-bezier(0.23, 1, 0.32, 1) forwards;
                }
                @keyframes shine-sweep {
                    0% { transform: translateX(0) rotate(30deg); }
                    100% { transform: translateX(400px) rotate(30deg); }
                }
                .animate-shine-sweep {
                    animation: shine-sweep 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }
                @keyframes confetti {
                    0% { transform: translate(0, 0) rotate(0deg) scale(0); opacity: 0; }
                    20% { opacity: 1; transform: scale(1); }
                    100% { transform: translate(var(--x), var(--y)) rotate(var(--rot)) scale(0.5); opacity: 0; }
                }
                .animate-confetti {
                    animation: confetti 3s cubic-bezier(0.1, 0.8, 0.2, 1) forwards;
                }
                @keyframes float-gentle {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-15px); }
                }
                .animate-float-gentle {
                    animation: float-gentle 4s ease-in-out infinite;
                }
                @keyframes float-up {
                    0% { transform: translateY(0); opacity: 0; }
                    20% { opacity: 0.15; }
                    80% { opacity: 0.15; }
                    100% { transform: translateY(-100vh); opacity: 0; }
                }
                .animate-float-up {
                    animation: float-up linear infinite;
                }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s cubic-bezier(0.23, 1, 0.32, 1) forwards;
                }
            `}</style>
        </div>
    );
};

export default OrderConfirmation;
