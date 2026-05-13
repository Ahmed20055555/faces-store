"use client";

import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const Hero = () => {
    return (
        <section className="max-w-[1400px] mx-auto px-4 md:px-12 font-sans" dir="rtl">
            {/* Top Promo Banner */}
            <div className="relative w-full min-h-[100px] h-[130px] sm:h-[160px] md:h-[200px] rounded-lg overflow-hidden mb-4 md:mb-6 group cursor-pointer flex items-center justify-center bg-[#a9c9b9]/20">
                <img
                    src="/DK-Promo.avif"
                    alt="Promo Banner"
                    className="w-full h-full object-cover object-center transition-transform duration-700"
                />
            </div>

            <div className="relative w-full h-[550px] md:h-[600px] overflow-hidden flex flex-col md:block">
                {/* Image Part */}
                <div
                    className="w-full h-[60%] md:h-full md:absolute md:inset-0 bg-cover bg-center transition-transform duration-1000"
                    style={{ backgroundImage: `url('/DK-Hero.avif')` }}></div>

                {/* Content Part (Mobile: Bottom Box, Desktop: Overlay) */}
                <div className="w-full h-[40%] md:hidden md:h-full md:absolute md:inset-0 bg-[#accfad] md:bg-transparent flex flex-col justify-center items-center md:items-end text-center md:text-right px-6 md:px-20 z-10 py-6">
                    <div className="max-w-md w-full">
                        <h2 className="text-[22px] md:text-5xl font-black text-[#1a1a1a] mb-2 md:mb-4 leading-tight">موسم يزهر بالجمال</h2>
                        <p className="text-[13px] md:text-lg text-gray-800 mb-6 md:mb-8 font-medium leading-relaxed px-4 md:px-0">
                            عطور ومكياج وعناية بالبشرة بإصدارات جديدة<br className="hidden md:block" />
                            تنبض بروح الربيع هذا الموسم.
                        </p>
                        <button className="w-[85%] md:w-auto bg-transparent border-[1.5px] border-black md:bg-white/90 md:backdrop-blur-sm md:border md:border-black px-10 py-3.5 text-[14px] md:text-base font-bold hover:bg-black hover:text-white transition-all duration-300">
                            اكتشف التشكيلة
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
