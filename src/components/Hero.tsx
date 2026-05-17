"use client";

import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const TOP_PROMOS = [
    {
        id: 1,
        image: "/add-1.jfif",
        alt: "Promo 1",
        title: "موسم يزهر بالجمال",
        subtitle: "عطور نيش وفاخرة",
        buttonText: "اكتشف التشكيلة"
    },
    {
        id: 2,
        image: "/add-2.jfif",
        alt: "Promo 2",
        title: "عروض حصرية",
        subtitle: "تسوق الآن واكتشف أحدث صيحات العطور",
        buttonText: "تسوق الآن"
    },
];

const HERO_SLIDES = [
    {
        id: 1,
        image: "/slider-1.jfif",
        title: "نفحات ترتقي بالحواس",
        description: "اكتشف تشكيلة حصرية من عطور النيش الفاخرة بإصدارات نادرة تعبر عن شخصيتك وتدوم طويلاً.",
        buttonText: "اكتشف التشكيلة",
        bgColor: "#accfad"
    },
    {
        id: 2,
        image: "/slider-2.png",
        title: "أيقونات عطرية",
        description: "مجموعة مختارة بعناية لأصحاب الذوق الرفيع. توليفات عطرية تأخذك في رحلة لا تُنسى.",
        buttonText: "تسوق الفخامة",
        bgColor: "#e6e2df"
    }
];

const Hero = () => {
    return (
        <section className="max-w-[1400px] mx-auto px-4 md:px-12 font-sans" dir="rtl">
            {/* Custom CSS Animation for cinematic Ken Burns moving effect */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes kenburns {
                    0% {
                        transform: scale(1.04) translate(0, 0);
                    }
                    50% {
                        transform: scale(1.15) translate(-1%, -0.5%);
                    }
                    100% {
                        transform: scale(1.04) translate(0, 0);
                    }
                }
                .ken-burns-active {
                    animation: kenburns 28s infinite ease-in-out;
                    transform-origin: center center;
                }
            `}} />

            {/* Top Promo Banner Slider */}
            <div className="relative w-full min-h-[100px] h-[130px] sm:h-[160px] md:h-[200px] rounded-lg overflow-hidden mb-4 md:mb-6 group/promo">
                <Swiper
                    modules={[Navigation, Autoplay, EffectFade]}
                    navigation={{
                        nextEl: '.promo-next',
                        prevEl: '.promo-prev',
                    }}
                    effect="fade"
                    autoplay={{ delay: 4500, disableOnInteraction: false }}
                    loop={true}
                    className="w-full h-full"
                >
                    {TOP_PROMOS.map((promo) => (
                        <SwiperSlide key={promo.id}>
                            <div className="relative w-full h-full cursor-pointer bg-[#a9c9b9]/20 flex items-center justify-center overflow-hidden">
                                <img
                                    src={promo.image}
                                    alt={promo.alt}
                                    className="w-full h-full object-cover object-center absolute inset-0 ken-burns-active"
                                />
                                {/* Text Overlay */}
                                <div className="absolute inset-0 flex justify-start items-end p-2 md:pb-4 z-10 pointer-events-none">
                                    <h3 className="text-[9px] sm:text-[10px] md:text-sm lg:text-base font-black text-white px-3 py-1 md:px-5 md:py-1.5 bg-black/40 backdrop-blur-md rounded-full shadow-lg">
                                        {promo.title}
                                    </h3>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Navigation Arrows for Promo */}
                <button className="promo-prev absolute right-1 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-white/50 backdrop-blur-md flex items-center justify-center text-black transition-all hover:bg-white shadow-lg disabled:hidden  md:flex">
                    <ChevronRight size={10} />
                </button>
                <button className="promo-next absolute left-1 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-white/50 backdrop-blur-md flex items-center justify-center text-black transition-all hover:bg-white shadow-lg disabled:hidden  md:flex">
                    <ChevronLeft size={10} />
                </button>
            </div>

            {/* Main Hero Luxury Video Banner */}
            <div className="relative w-full h-[320px] md:h-[550px] rounded-2xl overflow-hidden mb-6 group shadow-xl">
                {/* Background Video */}
                <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-1000 group-hover:scale-100"
                >
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-slow-motion-of-a-spray-bottle-spritzing-perfume-43141-large.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end items-start p-6 md:p-16 z-10 text-right text-white space-y-3 md:space-y-6">
                    <span className="text-[10px] md:text-xs uppercase tracking-widest font-black text-[#e6c17a] bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full">
                        مجموعة النيش الحصرية
                    </span>
                    <h2 className="text-2xl md:text-5xl lg:text-6xl font-black leading-tight max-w-2xl drop-shadow-md">
                        نفحات ترتقي بالحواس وفخامة تدوم
                    </h2>
                    <p className="text-xs md:text-base font-medium text-white/80 max-w-lg leading-relaxed hidden sm:block">
                        اكتشف تشكيلة حصرية من عطور النيش الفاخرة بإصدارات نادرة وبتركيبة تعبر عن شخصيتك وتدوم طويلاً.
                    </p>
                    <div className="pt-2">
                        <button className="bg-white hover:bg-black hover:text-white text-black font-black text-xs md:text-sm px-6 py-3.5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer">
                            اكتشف التشكيلة الآن
                        </button>
                    </div>
                </div>

                {/* Elegant gold corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#e6c17a]/30 to-transparent pointer-events-none rounded-bl-full" />
            </div>
            
        </section>
    );
};

export default Hero;
