"use client";

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface BottleFillAnimationProps {
    currentStep: 1 | 2 | 3 | 4;
    orderComplete?: boolean;
}

const STEP_MESSAGES = {
    1: "تم استلام طلبك",
    2: "جاري تجهيز عطرك",
    3: "عطرك في الطريق",
    4: "وصل عطرك! 🖤"
};

const BottleFillAnimation = ({ currentStep, orderComplete = false }: BottleFillAnimationProps) => {
    const [fillLevel, setFillLevel] = useState(0);
    const [isCelebration, setIsCelebration] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Entrance animation
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Map steps to percentages
        const levels = { 1: 25, 2: 50, 3: 75, 4: 100 };
        setFillLevel(levels[currentStep] || 0);

        if (currentStep === 4 || orderComplete) {
            setIsCelebration(true);
            const timer = setTimeout(() => setIsCelebration(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [currentStep, orderComplete]);

    // Calculate liquid height based on percentage
    // Bottle interior height is roughly 120 units in our 80x160 SVG
    const maxFillHeight = 120;
    const currentHeight = (fillLevel / 100) * maxFillHeight;

    return (
        <div className={cn(
            "fixed bottom-8 right-8 z-50 flex flex-col items-center gap-3 transition-all duration-700 ease-out transform",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0",
            "max-md:right-0 max-md:left-0 max-md:bottom-6 max-md:mx-auto"
        )}>
            <div className={cn(
                "relative transition-transform duration-500",
                isCelebration && "animate-pulse-scale"
            )}>
                {/* SVG Bottle */}
                <svg
                    width="60"
                    height="120"
                    viewBox="0 0 80 160"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-lg"
                >
                    {/* Bottle Cap */}
                    <rect x="30" y="5" width="20" height="15" rx="2" fill="black" />
                    
                    {/* Bottle Neck */}
                    <rect x="35" y="20" width="10" height="10" fill="black" fillOpacity="0.1" />

                    {/* Bottle Body Outline */}
                    <rect 
                        x="10" 
                        y="30" 
                        width="60" 
                        height="120" 
                        rx="8" 
                        stroke="black" 
                        strokeWidth="2.5" 
                    />

                    {/* Liquid Clipping Mask */}
                    <defs>
                        <clipPath id="bottleMask">
                            <rect x="11.5" y="31.5" width="57" height="117" rx="7" />
                        </clipPath>
                    </defs>

                    {/* Liquid Fill Group */}
                    <g clipPath="url(#bottleMask)">
                        {/* Liquid Base */}
                        <rect
                            x="0"
                            y={150 - currentHeight}
                            width="80"
                            height={currentHeight + 20}
                            fill="black"
                            className="transition-all duration-[1200ms] ease-in-out"
                        />
                        
                        {/* Wave Effect */}
                        <path
                            d="M 0 150 C 20 145, 60 155, 80 150 L 80 160 L 0 160 Z"
                            fill="black"
                            className="animate-wave transition-all duration-[1200ms] ease-in-out"
                            style={{ 
                                transform: `translateY(${-currentHeight}px)`,
                                opacity: currentHeight > 0 ? 1 : 0
                            }}
                        />
                    </g>

                    {/* Reflection for Luxury feel */}
                    <rect x="18" y="40" width="4" height="100" rx="2" fill="white" fillOpacity="0.1" />
                </svg>

                {/* Particle Celebration */}
                {isCelebration && (
                    <div className="absolute inset-0 pointer-events-none">
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-1.5 h-1.5 bg-black rounded-full animate-particle"
                                style={{
                                    left: '50%',
                                    top: '50%',
                                    '--angle': `${i * 45}deg`,
                                    '--distance': '40px'
                                } as React.CSSProperties}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Step Text Label */}
            <div className="text-center min-w-[150px]">
                <p className="text-[12px] md:text-[13px] font-medium text-black tracking-wide animate-fade-in" key={currentStep}>
                    {currentStep === 4 && orderComplete ? "عطرك في طريقه ليك 🖤" : STEP_MESSAGES[currentStep]}
                </p>
            </div>

            <style jsx global>{`
                @keyframes wave {
                    0% { transform: translateX(-5px); }
                    50% { transform: translateX(5px); }
                    100% { transform: translateX(-5px); }
                }
                .animate-wave {
                    animation: wave 2s ease-in-out infinite;
                }
                @keyframes particle {
                    0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                    100% { 
                        transform: translate(
                            calc(cos(var(--angle)) * var(--distance)), 
                            calc(sin(var(--angle)) * var(--distance))
                        ) scale(0); 
                        opacity: 0; 
                    }
                }
                .animate-particle {
                    animation: particle 1s ease-out forwards;
                }
                @keyframes pulse-scale {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
                .animate-pulse-scale {
                    animation: pulse-scale 0.5s ease-in-out;
                }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.4s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default BottleFillAnimation;
