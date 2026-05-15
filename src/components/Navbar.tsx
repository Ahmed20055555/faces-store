"use client";

import React from 'react';
import { Search, User, ShoppingBag, ChevronRight, ChevronLeft, MapPin, Home, Heart, Menu, X, Download } from 'lucide-react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const PROMO_MESSAGES = [
    "توصيل مجاني خلال ساعتين في الرياض عند الطلب قبل 8 مساءً",
    "توصيل مجاني على جميع الطلبات ما فوق 299 ريال",
    "اكتشفوا خدمات الجمال المختارة بعناية"
];

const Navbar = ({ isSticky = true }: { isSticky?: boolean }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { items } = useSelector((state: RootState) => state.cart);
    const favorites = useSelector((state: RootState) => state.favorites.items);
    const [animateHeart, setAnimateHeart] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const prevFavCount = React.useRef(favorites.length);

    React.useEffect(() => {
        if (favorites.length > prevFavCount.current) {
            setAnimateHeart(true);
            const timer = setTimeout(() => setAnimateHeart(false), 300);
            return () => clearTimeout(timer);
        }
        prevFavCount.current = favorites.length;
    }, [favorites.length]);

    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <>
            <header className={`w-full bg-white z-[1000] font-sans shadow-sm md:shadow-none mb-6 ${isSticky ? 'sticky top-0' : 'relative'}`} dir="rtl">
                {/* Top Bar Swiper */}
                <div className="bg-black text-white h-9 flex items-center overflow-hidden">
                    <div className="max-w-[1400px] mx-auto px-4 md:px-12 w-full flex justify-between items-center relative">
                        {/* Right: Country/Lang (Visible on all) */}
                        <div className="flex items-center gap-2 cursor-pointer z-10 shrink-0">
                            <span className="flex items-center gap-1 text-[10px] md:text-[11px] font-medium">
                                <img src="https://flagcdn.com/w20/sa.png" alt="KSA" className="w-5 md:w-[27px] h-3 md:h-2 object-cover rounded-[1px]" />
                                <span className="hidden md:inline">السعودية</span> English
                            </span>
                        </div>

                        {/* Center: Swiper Slider (Desktop Only) */}
                        <div className="hidden lg:flex flex-grow max-w-full md:max-w-2xl px-12 relative h-full items-center overflow-hidden">
                            <button className="swiper-button-prev-custom absolute right-4 z-20 text-white/50 hover:text-white transition-colors hidden md:block">
                                <ChevronRight size={14} />
                            </button>
                            <Swiper
                                modules={[Autoplay, Navigation]}
                                autoplay={{ delay: 3500, disableOnInteraction: false }}
                                navigation={{
                                    nextEl: '.swiper-button-next-custom',
                                    prevEl: '.swiper-button-prev-custom',
                                }}
                                loop={true}
                                slidesPerView={1}
                                className="w-full h-full"
                            >
                                {PROMO_MESSAGES.map((msg, idx) => (
                                    <SwiperSlide key={idx} className="flex justify-center items-center h-full">
                                        <span className="text-[11px] md:text-[12px] font-bold block text-center w-full text-white/90">
                                            {msg}
                                        </span>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <button className="swiper-button-next-custom absolute left-4 z-20 text-white/50 hover:text-white transition-colors">
                                <ChevronLeft size={14} />
                            </button>
                        </div>

                        {/* Left: Extra Links */}
                        <div className="flex items-center gap-4 z-20">
                            <Link href="/contact" className=" text-[11px] font-bold text-white/60 hover:text-white transition-colors cursor-pointer border-r border-white/20 pr-4" >اتصل بنا </Link>
                        </div>
                    </div>
                </div>

                {/* Main Navigation */}
                <div className="max-w-[1400px] mx-auto px-4 md:px-12 flex justify-between items-center h-14 md:h-20 gap-4">
                    {/* Logo & Mobile Menu Section */}
                    <div className="flex items-center gap-3 md:gap-4 shrink-0">
                        {/* Removed mobile hamburger menu to match desktop */}
                        <div onClick={() => router.push('/')} className="h-8 md:h-12 flex items-center justify-start min-w-[80px] cursor-pointer">
                            <img src="/logo.svg" alt="FACES" className="h-full w-auto object-contain" />
                        </div>
                    </div>

                    {/* Desktop Search Bar */}
                    <div className="flex-grow max-w-[600px] hidden md:block px-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="ابحث عن الجمال والعلامات التجارية والمزيد"
                                className="w-full bg-white border border-gray-200 rounded-full py-2.5 pr-12 pl-6 text-[13px] focus:outline-none focus:border-gray-400 transition-all placeholder:text-gray-400"
                            />
                            <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-800" />
                        </div>
                    </div>

                    {/* Icons Group */}
                    <div className="flex items-center gap-2 md:gap-5 flex-shrink-0">
                        <div className="flex items-center gap-3 md:hidden">
                            <button className="p-1">
                                <Search size={22} strokeWidth={1.5} />
                            </button>
                        </div>
                        <button onClick={() => router.push('/cart')} className="p-1 relative">
                            <ShoppingBag className="w-6 h-6 md:w-[28px] md:h-[28px]" strokeWidth={1.2} />
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-[#8c1d3b] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                                    {itemCount}
                                </span>
                            )}
                        </button>
                        <button onClick={() => router.push('/favorites')} className={cn("p-1 relative transition-transform duration-300", animateHeart && "scale-110")}>
                            <Heart className={cn("w-6 h-6 md:w-[28px] md:h-[28px] transition-colors", favorites.length > 0 && "fill-[#8c1d3b] text-[#8c1d3b]")} strokeWidth={1.2} />
                            {favorites.length > 0 && (
                                <span className="absolute top-0.5 right-0.5 bg-black w-2.5 h-2.5 rounded-full border-2 border-white"></span>
                            )}
                        </button>
                        <button className="hidden md:block">
                            <User className="w-7 h-7 md:w-8 md:h-8" strokeWidth={1} />
                        </button>
                    </div>
                </div>

                {/* Categories Bar - Premium Swiper Slider */}
                <nav className="border-t border-gray-100 py-2 bg-white relative group categories-slider" dir="rtl">
                    <div className="max-w-[1400px] mx-auto relative px-4 md:px-10">
                        <Swiper
                            modules={[Navigation, FreeMode]}
                            navigation={{
                                prevEl: '.cat-prev',
                                nextEl: '.cat-next',
                            }}
                            freeMode={true}
                            slidesPerView="auto"
                            spaceBetween={20}
                            className="w-full !static"
                            breakpoints={{
                                768: {
                                    spaceBetween: 40,
                                }
                            }}
                        >
                            {[
                                { name: 'الرئيسية', path: '/' },
                                { name: 'الأكثر مبيعاً', path: '/best-sellers' },
                                { name: 'وصل حديثاً', path: '/new-arrivals' },
                                { name: 'الغرفة المظلمة', path: '/dark-room' },
                                { name: 'العروض', path: '/offers' },
                                { name: 'اكتشف عطرك', path: '/scent-quiz' },
                                { name: 'باقات الهدايا', path: '/sets-gifts' },
                                { name: 'هدية لمن؟', path: '/gifting-match' },
                                { name: 'خزانة العطور', path: '/wardrobe' },
                                { name: 'الماركات', path: '/brands' },
                                { name: 'فروعنا', path: '/branches' },
                                { name: 'آراء العملاء', path: '/testimonials' },
                                { name: 'تواصل معنا', path: '/contact' },
                            ].map((cat, index) => (
                                <SwiperSlide key={index} className="!w-auto py-2">
                                    <span 
                                        onClick={() => router.push(cat.path)}
                                        className="cursor-pointer whitespace-nowrap text-[12px] md:text-[13.5px] font-bold text-gray-900 hover:text-[#8c1d3b] transition-all duration-300 relative after:absolute after:bottom-[-4px] after:right-0 after:w-0 after:h-[2px] after:bg-[#8c1d3b] hover:after:w-full after:transition-all block"
                                    >
                                        {cat.name}
                                    </span>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Custom Navigation Arrows */}
                        <button className="cat-prev absolute right-0 md:right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm p-1.5 shadow-md rounded-full border border-gray-100 text-black hover:text-[#8c1d3b] transition-all hidden md:flex items-center justify-center">
                            <ChevronRight size={18} />
                        </button>
                        <button className="cat-next absolute left-0 md:left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm p-1.5 shadow-md rounded-full border border-gray-100 text-black hover:text-black/70 transition-all hidden md:flex items-center justify-center">
                            <ChevronLeft size={18} />
                        </button>
                    </div>
                </nav>

                {/* Mobile Sidebar Menu */}
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 z-[2000] md:hidden">
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                            onClick={() => setIsMobileMenuOpen(false)}
                        ></div>

                        {/* Drawer */}
                        <div className="absolute top-0 right-0 bottom-0 w-[80%] max-w-[320px] bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                            {/* Drawer Header */}
                            <div className="flex items-center justify-between p-5 border-b border-gray-100">
                                <img src="/logo.svg" alt="FACES" className="h-8 w-auto object-contain" />
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 text-gray-500 hover:text-[#8c1d3b] bg-gray-50 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Drawer Links */}
                            <div className="flex-1 overflow-y-auto py-4 px-5">
                                <ul className="flex flex-col gap-4 text-[14px] font-bold text-gray-800">
                                    {[
                                        { label: 'الرئيسية', path: '/' },
                                        { label: 'من نحن', path: '/about' },
                                        { label: 'الأكثر مبيعاً', path: '/best-sellers' },
                                        { label: 'وصل حديثاً', path: '/new-arrivals' },
                                        { label: 'اكتشف عطرك', path: '/scent-quiz' },
                                        { label: 'باقات الهدايا', path: '/sets-gifts' },
                                        { label: 'هدية لمن؟', path: '/gifting-match' },
                                        { label: 'خزانة العطور', path: '/wardrobe' },
                                        { label: 'الماركات', path: '/brands' },
                                        { label: 'فروعنا', path: '/branches' },
                                        { label: 'آراء العملاء', path: '/testimonials' },
                                        { label: 'تواصل معنا', path: '/contact' }
                                    ].map((item, index) => (
                                        <li
                                            key={index}
                                            onClick={() => {
                                                router.push(item.path);
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className="pb-3 border-b border-gray-50 flex items-center justify-between group cursor-pointer"
                                        >
                                            <span className="group-hover:text-[#8c1d3b] transition-colors">{item.label}</span>
                                            <ChevronLeft size={16} className="text-gray-300 group-hover:text-[#8c1d3b] transition-colors" />
                                        </li>
                                    ))}
                                </ul>

                                {/* Mobile Sidebar Footer */}
                                <div className="mt-8 p-4 text-center">
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black">Balmy Luxury Experience</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* Mobile Bottom Navigation Bar */}
            <div className="md:hidden fixed bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md border border-gray-100 z-[1000] px-8 py-3 flex justify-between items-center shadow-lg rounded-3xl">
                <div onClick={() => router.push('/')} className="flex flex-col items-center gap-1 cursor-pointer text-[#8c1d3b]">
                    <Home size={22} strokeWidth={2.5} />
                    <span className="text-[10px] font-bold">الرئيسية</span>
                </div>
                <div onClick={() => router.push('/branches')} className="flex flex-col items-center gap-1 cursor-pointer text-gray-400">
                    <MapPin size={22} strokeWidth={1.5} />
                    <span className="text-[10px] font-bold">المتاجر</span>
                </div>
                <div className="flex flex-col items-center gap-1 cursor-pointer text-gray-400">
                    <Search size={22} strokeWidth={1.5} />
                    <span className="text-[10px] font-bold">ابحث</span>
                </div>
                <div className="flex flex-col items-center gap-1 cursor-pointer text-gray-400">
                    <User size={22} strokeWidth={1.5} />
                    <span className="text-[10px] font-bold">حسابي</span>
                </div>
            </div>
        </>
    );
};

export default Navbar;
