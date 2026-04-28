"use client";

import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const BRANDS = [
    "ديور", "شانيل", "إيف سان لوران", "توم فورد", "غوتشي",
    "جيفنشي", "أرماني بيوتي", "جيرلان", "لانكوم", "جون بول غوتييه", "بنفت",
];

const Hero = () => {
    return (
        <section className="max-w-[1400px] mx-auto px-4 md:px-12 font-cairo" dir="rtl">
            {/* Top Promo Banner - Hidden on Mobile as requested */}
            <div className="hidden md:block relative w-full h-[200px] rounded-lg overflow-hidden mb-6 group cursor-pointer">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 "
                    style={{ backgroundImage: `url('/DK-Promo.avif')` }}
                ></div>
            </div>

            {/* Main Hero Banner - Optimized for Mobile */}
            <div className="relative w-full overflow-hidden mb-10 rounded-xl md:rounded-lg group cursor-pointer flex flex-col md:block h-[600px] md:h-[450px] shadow-sm md:shadow-none">
                {/* Image Part - More space on mobile */}
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

            {/* Brands Scroller */}
               <div className="relative py-4 mb-4">
                <Swiper
                    modules={[Navigation]}
                    navigation={{
                        nextEl: '.brands-next',
                        prevEl: '.brands-prev',
                    }}
                    slidesPerView="auto"
                    spaceBetween={15}
                    className="brands-swiper !px-4"
                >
                    {BRANDS.map((brand, idx) => (
                        <SwiperSlide key={idx} className="!w-auto">
                            <div className="px-6 py-2.5 rounded-full border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all cursor-pointer whitespace-nowrap text-[13px] font-bold text-gray-800">
                                {brand}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <button className="brands-prev absolute right-0 md:right-[-10px] top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#8c929d]/90 md:bg-[#8c929d] flex items-center justify-center text-white hover:bg-black transition-all shadow-md">
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                <button className="brands-next absolute left-0 md:left-[-10px] top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#8c929d]/90 md:bg-[#8c929d] flex items-center justify-center text-white hover:bg-black transition-all shadow-md">
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>
            </div>

        </section>
    );
};

export default Hero;
