"use client";

import React, { useState, useRef, useEffect, MouseEvent as ReactMouseEvent } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';
import { Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { addItem } from '@/lib/features/cartSlice';

export default function EngravingStudio() {
    return (
        <React.Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
            <EngravingStudioContent />
        </React.Suspense>
    );
}

function EngravingStudioContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch();
    const [name, setName] = useState("الملكة");
    const [font, setFont] = useState<"arabic" | "english" | "modern">("arabic");
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const [isHovering, setIsHovering] = useState(false);
    const bottleRef = useRef<HTMLDivElement>(null);

    // Track mouse movement to create the 3D reflection and tilt effect
    const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
        if (!bottleRef.current) return;
        const rect = bottleRef.current.getBoundingClientRect();
        
        // Calculate mouse position relative to the element (0 to 100%)
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        setMousePosition({ x, y });
    };

    // Calculate rotation based on mouse position
    // Center is 50,50. If x is 0, we want rotateY(-10deg). If x is 100, rotateY(10deg)
    const rotateY = isHovering ? (mousePosition.x - 50) * 0.15 : 0;
    const rotateX = isHovering ? -(mousePosition.y - 50) * 0.15 : 0;
    
    // Background position for the gold shine effect
    const backgroundPosition = `${mousePosition.x}% ${mousePosition.y}%`;

    const productId = searchParams.get('id') || `engraved-balmy-${Date.now()}`;
    const productName = searchParams.get('name') || 'عطر بالْمي المخصص';
    const productBrand = searchParams.get('brand') || 'BALMY';
    const productPrice = searchParams.get('price') || '550';
    const productImage = searchParams.get('image') || '/product1.png';

    const handleAddToCart = () => {
        dispatch(addItem({
            id: productId,
            name: productName,
            brand: productBrand,
            price: productPrice,
            image: productImage,
            engravedName: name || 'بدون اسم'
        }));
    };

    return (
        <main className="min-h-screen flex flex-col bg-[#050505] selection:bg-[#D4AF37] selection:text-black font-tajawal">
            {/* Minimal Dark Navbar for this page */}
            <div className="w-full bg-black/50 backdrop-blur-md border-b border-white/10 z-50 sticky top-0 px-6 py-4 flex justify-between items-center" dir="rtl">
                <img src="/logo.svg?v=2" alt="Balmy Logo" className="h-8 w-auto object-contain cursor-pointer" onClick={() => router.push('/')} style={{ filter: 'brightness(0) invert(1)' }} />
                <button onClick={() => router.push('/')} className="text-white/70 hover:text-white flex items-center gap-2 text-sm font-bold transition-colors">
                    العودة للمتجر <ArrowRight size={16} />
                </button>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row relative overflow-hidden" dir="rtl">
                
                {/* Background Ambient Glow */}
                <div 
                    className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-1000"
                    style={{
                        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(212, 175, 55, 0.15), transparent 50%)`
                    }}
                />

                {/* Right Side: Controls (Arabic layout is RTL, so this is the right pane) */}
                <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 lg:px-16 py-12 lg:py-0 z-10 border-l border-white/5">
                    <div className="max-w-md mx-auto w-full space-y-10">
                        
                        {/* Header */}
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em] mb-2 px-3 py-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5">
                                <Sparkles size={14} /> استوديو بالْمي الحصري
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight">
                                النحت الملكي <br/>
                                <span className="font-serif italic text-[#D4AF37] opacity-90">Live Engraving</span>
                            </h1>
                            <p className="text-white/50 text-sm leading-relaxed">
                                حوّل زجاجة العطر إلى تحفة فنية فريدة. اكتب اسم من تحب ليتم حفره بالذهب الخالص على زجاجة عطر بالْمي، لتبقى ذكرى خالدة.
                            </p>
                        </div>

                        {/* Input Area */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-white/80 text-sm font-bold">الاسم المراد حفره (أقصى 15 حرف)</label>
                                <input 
                                    type="text" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value.slice(0, 15))}
                                    placeholder="اكتب الاسم هنا..."
                                    className="w-full bg-white/5 border border-white/20 rounded-none px-4 py-4 text-white text-lg focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                                    dir="auto"
                                />
                            </div>

                            {/* Font Selection */}
                            <div className="space-y-3">
                                <label className="text-white/80 text-sm font-bold">اختر نوع الخط المفضل</label>
                                <div className="grid grid-cols-3 gap-3">
                                    <button 
                                        onClick={() => setFont("arabic")}
                                        className={cn(
                                            "py-3 border rounded-none transition-all",
                                            font === "arabic" ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]" : "border-white/10 text-white/50 hover:border-white/30"
                                        )}
                                    >
                                        <span className="font-tajawal font-bold">ديواني عربي</span>
                                    </button>
                                    <button 
                                        onClick={() => setFont("english")}
                                        className={cn(
                                            "py-3 border rounded-none transition-all",
                                            font === "english" ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]" : "border-white/10 text-white/50 hover:border-white/30"
                                        )}
                                    >
                                        <span className="font-serif italic">English Serif</span>
                                    </button>
                                    <button 
                                        onClick={() => setFont("modern")}
                                        className={cn(
                                            "py-3 border rounded-none transition-all",
                                            font === "modern" ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]" : "border-white/10 text-white/50 hover:border-white/30"
                                        )}
                                    >
                                        <span className="font-sans font-black tracking-widest text-xs">MODERN</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Action */}
                        <div className="pt-6 border-t border-white/10">
                            <button 
                                onClick={handleAddToCart}
                                className="w-full group relative h-16 overflow-hidden bg-[#D4AF37] text-black transition-all hover:bg-white flex items-center justify-center gap-3"
                            >
                                <ShoppingBag size={20} className="transition-transform group-hover:-translate-y-1" />
                                <span className="font-black text-[15px] uppercase tracking-wider">اعتماد النحت وإضافة للسلة</span>
                            </button>
                            <p className="text-center text-white/30 text-xs mt-4">
                                *خدمة النحت مجانية لفترة محدودة. تستغرق يوم عمل إضافي.
                            </p>
                        </div>
                        
                    </div>
                </div>

                {/* Left Side: Interactive 3D Preview */}
                <div className="w-full lg:w-[55%] flex items-center justify-center min-h-[60vh] lg:min-h-screen relative p-8">
                    {/* Floating Particles in Background */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[...Array(20)].map((_, i) => (
                            <div 
                                key={i}
                                className="absolute rounded-full bg-[#D4AF37] animate-float-gentle"
                                style={{
                                    width: Math.random() * 4 + 1 + 'px',
                                    height: Math.random() * 4 + 1 + 'px',
                                    left: Math.random() * 100 + '%',
                                    top: Math.random() * 100 + '%',
                                    opacity: Math.random() * 0.5,
                                    animationDuration: Math.random() * 10 + 10 + 's',
                                    animationDelay: Math.random() * 5 + 's',
                                }}
                            />
                        ))}
                    </div>

                    {/* The 3D Container */}
                    <div 
                        ref={bottleRef}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        className="relative w-full max-w-[400px] aspect-[3/4] flex items-center justify-center"
                        style={{ perspective: '1000px' }}
                    >
                        {/* The Bottle Wrapper */}
                        <div 
                            className="relative w-full h-full transition-transform duration-200 ease-out flex items-center justify-center"
                            style={{ 
                                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovering ? 1.02 : 1})`,
                                transformStyle: 'preserve-3d'
                            }}
                        >
                            {/* Glass Shadow below bottle */}
                            <div className="absolute bottom-[10%] w-[60%] h-[20px] bg-black blur-[20px] rounded-[100%] opacity-80" style={{ transform: 'translateZ(-50px)' }} />

                            {/* The Bottle Image (We use productImage which comes from URL or defaults to product1.png) */}
                            {/* In case the image is missing or has white background, we use CSS blend modes to make it look great */}
                            <img 
                                src={productImage} 
                                alt="Perfume Bottle"
                                className="relative z-10 w-[60%] h-auto object-contain drop-shadow-[0_20px_50px_rgba(212,175,55,0.15)]"
                                onError={(e) => {
                                    // Fallback if product1.png doesn't exist
                                    (e.target as HTMLImageElement).src = "/001717728336_1.jpg";
                                    (e.target as HTMLImageElement).style.mixBlendMode = "lighten";
                                }}
                            />

                            {/* The Live Engraving Overlay */}
                            {/* We position this exactly where the glass face would be */}
                            <div 
                                className="absolute z-20 flex items-center justify-center w-[50%] h-[20%] bottom-[30%]"
                                style={{
                                    transform: 'translateZ(30px)', // Floats slightly in front of the bottle in 3D space
                                }}
                            >
                                <span 
                                    className={cn(
                                        "text-center transition-all duration-300 engraved-text",
                                        font === "arabic" && "font-tajawal text-3xl md:text-4xl font-bold",
                                        font === "english" && "font-serif italic text-3xl md:text-4xl",
                                        font === "modern" && "font-sans font-black tracking-[0.3em] text-xl md:text-2xl uppercase"
                                    )}
                                    style={{
                                        // The magic of the gold reflection!
                                        background: `linear-gradient(110deg, 
                                            #8a6c42 0%, 
                                            #bf9d73 20%, 
                                            #ffe5a3 40%, 
                                            #ffffff 50%, 
                                            #ffe5a3 60%, 
                                            #bf9d73 80%, 
                                            #8a6c42 100%
                                        )`,
                                        backgroundSize: '300% 300%',
                                        backgroundPosition: backgroundPosition, // Moves with mouse!
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        color: 'transparent',
                                        textShadow: `
                                            0px 1px 1px rgba(255, 255, 255, 0.4),
                                            0px -1px 1px rgba(0, 0, 0, 0.8),
                                            inset 0px 1px 2px rgba(0, 0, 0, 0.8)
                                        `,
                                        filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.5))',
                                        lineHeight: '1.2'
                                    }}
                                >
                                    {name || "اكتب الاسم"}
                                </span>
                            </div>

                            {/* Glass Glare Overlay - Moves opposite to mouse for realism */}
                            <div 
                                className="absolute inset-0 z-30 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none rounded-2xl"
                                style={{
                                    transform: `translateX(${isHovering ? (50 - mousePosition.x) * 0.5 : 0}px)`,
                                    opacity: isHovering ? 0.8 : 0.3,
                                    transition: 'opacity 0.3s'
                                }}
                            />
                        </div>
                    </div>

                    {/* Instruction hint */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 pointer-events-none">
                        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center animate-pulse">
                            <div className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" />
                        </div>
                        <span className="text-[10px] uppercase tracking-widest text-white/50">حرك الماوس لرؤية الانعكاس</span>
                    </div>

                </div>
            </div>

            <style jsx global>{`
                @keyframes float-gentle {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(10deg); }
                }
                .animate-float-gentle {
                    animation: float-gentle 6s ease-in-out infinite;
                }
                
                /* Refinement for the engraved text to make it look inset */
                .engraved-text {
                    position: relative;
                }
                .engraved-text::after {
                    content: attr(data-text);
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    z-index: -1;
                    text-shadow: 1px 1px 0px rgba(255,255,255,0.1), -1px -1px 0px rgba(0,0,0,0.8);
                }
            `}</style>
        </main>
    );
}
