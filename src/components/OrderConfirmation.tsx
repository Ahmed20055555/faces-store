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
    const [step, setStep] = useState(0); // 0: Start, 1: Bottle In, 2: Name, 3: Line, 4: Shine, 5: Confetti, 6: Card
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        // Animation Sequence
        const timers = [
            setTimeout(() => setStep(1), 300),  // Bottle in
            setTimeout(() => setStep(2), 1200), // Name engraving starts
            setTimeout(() => {
                // Wait for name to finish (approx 14 chars * 0.08s = 1.1s)
                setStep(3);
            }, 2500), 
            setTimeout(() => setStep(4), 3100), // Shine
            setTimeout(() => setStep(5), 4100), // Confetti
            setTimeout(() => setStep(6), 4500), // Card slide up
        ];

        return () => timers.forEach(clearTimeout);
    }, []);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(orderId);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="fixed inset-0 z-[1000] bg-black overflow-hidden flex flex-col font-tajawal dir-rtl">
            {/* Ambient Background Particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(4)].map((_, i) => (
                    <div 
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full opacity-5 animate-float-up"
                        style={{
                            left: `${20 + i * 20}%`,
                            bottom: '-20px',
                            animationDelay: `${i * 1.5}s`,
                            animationDuration: `${10 + Math.random() * 5}s`
                        }}
                    />
                ))}
            </div>

            {/* TOP SECTION: Cinematic Hero (60%) */}
            <div className="relative h-[60vh] flex items-center justify-center pt-10">
                <div className={cn(
                    "relative transition-all duration-1000 ease-out transform",
                    step >= 1 ? "translate-y-0 opacity-100" : "translate-y-[40px] opacity-0",
                    step >= 6 && "animate-float-gentle"
                )}>
                    {/* Bottle SVG/Image Container */}
                    <div className="relative w-[160px] h-[300px] flex items-center justify-center">
                        {/* Glow Background */}
                        <div className={cn(
                            "absolute inset-0 bg-white rounded-full blur-[80px] transition-opacity duration-1000",
                            step >= 1 ? "opacity-10" : "opacity-0"
                        )} />

                        {/* Bottle Frame */}
                        <svg width="160" height="300" viewBox="0 0 160 300" fill="none" className="relative z-10">
                            {/* Outer Frame */}
                            <rect x="10" y="40" width="140" height="240" rx="4" stroke="white" strokeWidth="1.5" />
                            {/* Neck & Cap */}
                            <rect x="70" y="30" width="20" height="10" fill="white" fillOpacity="0.2" />
                            <rect x="60" y="10" width="40" height="20" rx="2" fill="white" />
                            
                            {/* Engraved Name Section */}
                            {step >= 2 && (
                                <g>
                                    <text
                                        x="50%"
                                        y="150"
                                        textAnchor="middle"
                                        fill="white"
                                        fillOpacity="0.55"
                                        className="font-serif tracking-[0.3em] uppercase transition-all duration-500"
                                        style={{ fontSize: customerName.length > 10 ? '10px' : '12px' }}
                                    >
                                        {customerName.split('').map((char, i) => (
                                            <tspan 
                                                key={i} 
                                                className="animate-engrave"
                                                style={{ animationDelay: `${i * 0.08}s` }}
                                            >
                                                {char}
                                            </tspan>
                                        ))}
                                    </text>
                                    
                                    {/* Underline */}
                                    {step >= 3 && (
                                        <line 
                                            x1="45" y1="162" x2="115" y2="162" 
                                            stroke="white" strokeWidth="0.5" strokeOpacity="0.4"
                                            className="animate-draw-line"
                                        />
                                    )}
                                </g>
                            )}

                            {/* Shine Sweep */}
                            {step >= 4 && (
                                <g clipPath="url(#bottleClip)">
                                    <rect 
                                        x="-100" y="0" width="50" height="300" 
                                        fill="white" fillOpacity="0.3"
                                        className="animate-shine-sweep"
                                        style={{ transform: 'rotate(25deg)' }}
                                    />
                                </g>
                            )}
                            <defs>
                                <clipPath id="bottleClip">
                                    <rect x="10" y="40" width="140" height="240" rx="4" />
                                </clipPath>
                            </defs>
                        </svg>

                        {/* Confetti Burst */}
                        {step >= 5 && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
                                {[...Array(25)].map((_, i) => (
                                    <div 
                                        key={i}
                                        className="absolute w-1.5 h-1.5 bg-white animate-confetti"
                                        style={{
                                            left: '50%',
                                            top: '10%',
                                            '--x': `${(Math.random() - 0.5) * 200}px`,
                                            '--y': `${-Math.random() * 150}px`,
                                            '--rot': `${Math.random() * 360}deg`,
                                            animationDelay: `${Math.random() * 0.2}s`
                                        } as React.CSSProperties}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* BOTTOM SECTION: Info Card (40%) */}
            <div className={cn(
                "absolute bottom-0 left-0 right-0 h-[45vh] bg-white rounded-t-[24px] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] z-20 shadow-[0_-20px_40px_rgba(0,0,0,0.4)]",
                step >= 6 ? "translate-y-0" : "translate-y-full"
            )}>
                <div className="max-w-[480px] mx-auto h-full p-8 flex flex-col items-center">
                    {/* Logo */}
                    <div className="mb-6 opacity-80">
                        <span className="text-[10px] font-black tracking-[0.4em] uppercase">balmy</span>
                    </div>

                    <h1 className="text-2xl font-bold text-black mb-2">طلبك في طريقه ليك</h1>
                    <p className="text-sm text-black/60 mb-6">هنبعتلك أبديت على كل خطوة</p>

                    {/* Order ID Pill */}
                    <div 
                        onClick={copyToClipboard}
                        className="group relative bg-black text-white px-6 py-2 rounded-full flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform active:scale-95"
                    >
                        <span className="font-mono tracking-widest text-[13px]">{orderId}</span>
                        {copied ? <Check size={14} className="text-white" /> : <Copy size={12} className="opacity-50" />}
                        {copied && (
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] py-1 px-3 rounded animate-fade-in">
                                ✓ اتنسخ
                            </div>
                        )}
                    </div>

                    <hr className="w-full border-black/5 my-6" />

                    {/* Status Steps */}
                    <div className="w-full flex justify-between items-center px-4 mb-6">
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
                                <Package size={14} />
                            </div>
                            <span className="text-[10px] font-bold">تم الاستلام</span>
                        </div>
                        <div className="flex-1 h-[1px] bg-black/10 mx-2 -translate-y-4"></div>
                        <div className="flex flex-col items-center gap-2 opacity-30">
                            <div className="w-8 h-8 rounded-full border border-black flex items-center justify-center">
                                <Droplets size={14} />
                            </div>
                            <span className="text-[10px] font-bold">جاري التجهيز</span>
                        </div>
                        <div className="flex-1 h-[1px] bg-black/10 mx-2 -translate-y-4"></div>
                        <div className="flex flex-col items-center gap-2 opacity-30">
                            <div className="w-8 h-8 rounded-full border border-black flex items-center justify-center">
                                <Truck size={14} />
                            </div>
                            <span className="text-[10px] font-bold">في الطريق</span>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="w-full space-y-3 mt-auto">
                        <button 
                            onClick={() => router.push('/track')}
                            className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-black/90 transition-colors"
                        >
                            تابع طلبك
                        </button>
                        <button 
                            onClick={() => router.push('/')}
                            className="w-full bg-white text-black py-4 rounded-xl font-bold border border-black hover:bg-gray-50 transition-colors"
                        >
                            تسوق تاني
                        </button>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes engrave {
                    from { opacity: 0; transform: scale(0.8); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-engrave {
                    animation: engrave 0.4s ease-out forwards;
                }
                @keyframes draw-line {
                    from { stroke-dasharray: 0 100; stroke-dashoffset: 0; }
                    to { stroke-dasharray: 100 0; stroke-dashoffset: 0; }
                }
                .animate-draw-line {
                    animation: draw-line 0.6s ease-out forwards;
                }
                @keyframes shine-sweep {
                    0% { left: -100px; }
                    100% { left: 300px; }
                }
                .animate-shine-sweep {
                    position: absolute;
                    animation: shine-sweep 0.8s ease-in-out forwards;
                }
                @keyframes confetti {
                    0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
                    100% { transform: translate(var(--x), var(--y)) rotate(var(--rot)); opacity: 0; }
                }
                .animate-confetti {
                    animation: confetti 2.5s cubic-bezier(0.2, 0.8, 0.3, 1) forwards;
                }
                @keyframes float-gentle {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-float-gentle {
                    animation: float-gentle 3s ease-in-out infinite;
                }
                @keyframes float-up {
                    0% { transform: translateY(0); opacity: 0; }
                    10% { opacity: 0.05; }
                    90% { opacity: 0.05; }
                    100% { transform: translateY(-100vh); opacity: 0; }
                }
                .animate-float-up {
                    animation: float-up linear infinite;
                }
            `}</style>
        </div>
    );
};

export default OrderConfirmation;
