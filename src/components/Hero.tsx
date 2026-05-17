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
            {/* Top Promo Banner Slider */}
            <div className="relative w-full min-h-[100px] h-[130px] sm:h-[160px] md:h-[200px] rounded-lg overflow-hidden mb-4 md:mb-6 group/promo">
                <Swiper
                    modules={[Navigation, Autoplay, EffectFade]}
                    navigation={{
                        nextEl: '.promo-next',
                        prevEl: '.promo-prev',
                    }}
                    effect="fade"
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    loop={true}
                    className="w-full h-full"
                >
                    {TOP_PROMOS.map((promo) => (
                        <SwiperSlide key={promo.id}>
                            <div className="relative w-full h-full cursor-pointer bg-[#a9c9b9]/20 flex items-center justify-center overflow-hidden">
                                <img
                                    src={promo.image}
                                    alt={promo.alt}
                                    className="w-full h-full object-cover object-center absolute inset-0"
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

            {/* Main Hero Slider */}
            <div className="relative w-full group mb-4 md:mb-6">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation={{
                        nextEl: '.hero-next',
                        prevEl: '.hero-prev',
                    }}
                    pagination={{ clickable: true, el: '.hero-pagination' }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    loop={true}
                    className="w-full rounded-lg overflow-hidden"
                >
                    {HERO_SLIDES.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <div className="relative w-full h-[250px] md:h-[500px] block cursor-pointer overflow-hidden rounded-lg group/slide">
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover/slide:scale-105"
                                />
                                {/* Text Overlay */}
                                <div className="absolute inset-0 flex justify-start items-end p-2 md:pb-4 z-10 pointer-events-none">
                                    <h2 className="text-[10px] sm:text-xs md:text-2xl lg:text-3xl font-black text-white px-4 py-1.5 md:px-8 md:py-3 bg-black/40 backdrop-blur-md rounded-full shadow-xl">
                                        {slide.title}
                                    </h2>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Navigation & Pagination */}
                <button className="hero-prev absolute right-1 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-white/50 backdrop-blur-md flex items-center justify-center text-black transition-all hover:bg-white shadow-lg disabled:hidden  md:flex">
                    <ChevronRight size={10} />
                </button>
                <button className="hero-next absolute left-1 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-white/50 backdrop-blur-md flex items-center justify-center text-black transition-all hover:bg-white shadow-lg disabled:hidden md:flex">
                    <ChevronLeft size={10} />
                </button>
                <div className="hero-pagination mt-4 flex justify-center gap-2"></div>
            </div>
        </section>
    );
};

export default Hero;
