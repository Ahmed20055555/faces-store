"use client";

import React from 'react';
import { Search, User, ShoppingBag, ChevronRight, ChevronLeft, Menu, MapPin, Home } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const промо_messages = [
    "توصيل مجاني خلال ساعتين في الرياض عند الطلب قبل 8 مساءً",
    "توصيل مجاني على جميع الطلبات ما فوق 299 ريال",
    "اكتشفوا خدمات الجمال المختارة بعناية"
];

const Navbar = () => {
    return (
        <>
            <header className="w-full bg-white sticky top-0 z-[1000] font-cairo shadow-sm md:shadow-none mb-6" dir="rtl">
                {/* Top Bar Swiper */}
                <div className="bg-black text-white h-9 flex items-center overflow-hidden">
                    <div className="max-w-[1400px] mx-auto px-4 md:px-12 w-full flex justify-between items-center relative">

                        {/* Right: Country/Lang */}
                        <div className="hidden lg:flex items-center gap-2 cursor-pointer z-10 shrink-0">
                            <span className="flex items-center gap-1 text-[11px] font-medium">
                                <img src="https://flagcdn.com/w20/sa.png" alt="KSA" className="w-[27px] h-2 object-cover rounded-[1px]" />
                                السعودية English
                            </span>
                        </div>

                        {/* Center: Swiper Slider */}
                        <div className="flex-grow max-w-full md:max-w-2xl px-12 relative h-full flex items-center overflow-hidden">
                            <Swiper
                                modules={[Autoplay, Navigation]}
                                autoplay={{ delay: 2000, disableOnInteraction: false }}
                                navigation={{
                                    nextEl: '.swiper-button-next-custom',
                                    prevEl: '.swiper-button-prev-custom',
                                }}
                                loop={true}
                                slidesPerView={1}
                                allowTouchMove={true}
                                className="w-full h-full"
                            >
                                {промо_messages.map((msg, idx) => (
                                    <SwiperSlide key={idx} className="flex justify-center items-center h-full">
                                        <span className="text-[11px] md:text-[12px] font-medium leading-none whitespace-nowrap block text-center w-full">
                                            {msg}
                                        </span>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            <button className="swiper-button-prev-custom absolute right-2 top-1/2 -translate-y-1/2 z-20 opacity-70 hover:opacity-100 hidden md:block">
                                <ChevronRight size={14} />
                            </button>
                            <button className="swiper-button-next-custom absolute left-2 top-1/2 -translate-y-1/2 z-20 opacity-70 hover:opacity-100 hidden md:block">
                                <ChevronLeft size={14} />
                            </button>
                        </div>

                        {/* Left: Contact */}
                        <div className="hidden lg:block z-10 shrink-0 text-[11px] font-medium hover:opacity-80 transition-opacity cursor-pointer">
                            اتصل بنا
                        </div>
                    </div>
                </div>

                {/* Main Navigation */}
                <div className="max-w-[1400px] mx-auto px-4 md:px-12 flex justify-between items-center h-14 md:h-18 gap-2">

                    {/* Logo Section */}
                    <div className="flex-shrink-0 h-8 md:h-10 flex items-center justify-start min-w-[80px]">
                        <img src="/logo.svg" alt="FACES" className="h-full w-auto object-contain" />
                    </div>

                    {/* Desktop Search Bar */}
                    <div className="flex-grow max-w-[600px] hidden md:block px-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="ابحث عن الجمال والعلامات التجارية والمزيد"
                                className="w-full bg-white border border-gray-200 rounded-full py-2 pr-12 pl-6 text-[13px] focus:outline-none focus:border-gray-400 transition-all placeholder:text-gray-400"
                            />
                            <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-800" />
                        </div>
                    </div>

                    {/* Icons Group */}
                    <div className="flex items-center gap-3 md:gap-6 flex-shrink-0">
                        <div className="flex items-center gap-3 md:hidden">
                            <button className="p-1">
                                <Search size={22} strokeWidth={1.5} />
                            </button>
                        </div>
                        <button className="p-1">
                            <ShoppingBag className="w-6 h-6 md:w-[26px] md:h-[26px]" strokeWidth={1.5} />
                        </button>
                        <button className="hidden md:block">
                            <User className="w-7 h-7 md:w-8 md:h-8" strokeWidth={1} />
                        </button>
                    </div>
                </div>

                {/* Categories Bar */}
                <nav className="border-b border-gray-100 py-3 block whitespace-nowrap overflow-x-auto no-scrollbar scroll-smooth bg-white">
                    <div className="max-w-[1400px] mx-auto px-4 md:px-12">
                        <ul className="flex justify-start md:justify-between items-center text-[12.5px] md:text-[13px] font-bold gap-8 md:gap-4">
                            <li className="text-[#a51c30] cursor-pointer shrink-0">الفرصة الأخيرة</li>
                            <li className="cursor-pointer shrink-0">العطور</li>
                            <li className="cursor-pointer shrink-0">الجمال الكوري</li>
                            <li className="cursor-pointer shrink-0">الأكثر مبيعاً</li>
                            <li className="cursor-pointer shrink-0">وصل حديثاً</li>
                            <li className="cursor-pointer shrink-0">الماركات</li>
                            <li className="cursor-pointer shrink-0">البشرة</li>
                            <li className="cursor-pointer shrink-0">المكياج</li>
                            <li className="cursor-pointer shrink-0">الشعر</li>
                            <li className="cursor-pointer shrink-0">الجسم</li>
                            <li className="cursor-pointer shrink-0">مجموعات الهدايا</li>
                            <li className="cursor-pointer shrink-0">للرجال</li>
                            <li className="cursor-pointer shrink-0">عروض الجمال</li>
                            <li className="cursor-pointer shrink-0">حصرياً</li>
                        </ul>
                    </div>
                </nav>
            </header>

            {/* Mobile Bottom Navigation Bar */}
            <div className="md:hidden fixed bottom-1 left-0 right-0 bg-white border-t border-gray-100 z-[1000] px-4 py-2 flex justify-between items-center shadow-[0_-2px_10px_rgba(0,0,0,0.05)] mx-2 rounded-full mb-2">
                <div className="flex flex-col items-center gap-1 cursor-pointer text-accent">
                    <Home size={20} strokeWidth={2} />
                    <span className="text-[10px] font-bold">الرئيسية</span>
                </div>
                <div className="flex flex-col items-center gap-1 cursor-pointer text-gray-400">
                    <MapPin size={20} strokeWidth={1.5} />
                    <span className="text-[10px] font-bold">المتاجر</span>
                </div>
                <div className="flex flex-col items-center gap-1 cursor-pointer text-gray-400">
                    <Search size={22} strokeWidth={1.5} />
                    <span className="text-[10px] font-bold">ابحث</span>
                </div>
                <div className="flex flex-col items-center gap-1 cursor-pointer text-gray-400">
                    <User size={20} strokeWidth={1.5} />
                    <span className="text-[10px] font-bold">حسابي</span>
                </div>
            </div>

            <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </>
    );
};

export default Navbar;
