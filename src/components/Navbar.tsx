"use client";

import React from 'react';
import { Search, User, ShoppingBag, ChevronRight, ChevronLeft, MapPin, Home, Heart, Menu, X, Download } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import InstallPWA from './InstallPWA';

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
                        <div className="hidden lg:flex items-center gap-2 cursor-pointer z-10">
                            <span className="flex items-center gap-2 text-[10px] md:text-[11px] font-bold tracking-tight hover:opacity-70 transition-opacity">
                                <img src="https://flagcdn.com/w20/sa.png" alt="KSA" className="w-5 md:w-6 h-3.5 object-cover rounded-[2px] shadow-sm" />
                                <span className="text-white/60">KSA</span>
                                <span className="text-white border-l border-white/20 pl-2">English</span>
                            </span>
                        </div>

                        {/* Center: Swiper Slider (Perfectly Centered) */}
                        <div className="flex-grow flex justify-center items-center overflow-hidden">
                            <div className="w-full max-w-[320px] md:max-w-2xl">
                                <Swiper
                                    modules={[Autoplay, Navigation]}
                                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                                    loop={true}
                                    slidesPerView={1}
                                    className="w-full h-9"
                                >
                                    {PROMO_MESSAGES.map((msg, idx) => (
                                        <SwiperSlide key={idx} className="flex justify-center items-center h-full">
                                            <div className="flex items-center justify-center gap-2 w-full">
                                                <span className="w-1 h-1 bg-[#8c1d3b] rounded-full animate-pulse"></span>
                                                <span className="text-[10px] md:text-[12px] font-black leading-none whitespace-nowrap block text-center text-white tracking-wide uppercase">
                                                    {msg}
                                                </span>
                                                <span className="w-1 h-1 bg-[#8c1d3b] rounded-full animate-pulse"></span>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>

                        {/* Left: Download App (Premium Pill) */}
                        <div className="flex items-center gap-3 z-10">
                            <button
                                onClick={() => {
                                    const btn = document.querySelector('.install-pwa-trigger') as HTMLButtonElement;
                                    if (btn) btn.click();
                                }}
                                className="group relative flex items-center gap-1.5 bg-white/10 hover:bg-[#8c1d3b] px-3 py-1.5 rounded-full border border-white/10 transition-all duration-500"
                            >
                                <Download size={13} className="text-[#8c1d3b] group-hover:text-white animate-bounce md:animate-none" />
                                <span className="text-[10px] md:text-[11px] font-black text-white whitespace-nowrap">تحميل التطبيق</span>
                                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8c1d3b] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8c1d3b]"></span>
                                </span>
                            </button>
                            <span onClick={() => router.push('/testimonials')} className="hidden xl:block text-[11px] font-bold text-white/60 hover:text-white transition-colors cursor-pointer border-r border-white/20 pr-4 ml-4">آراء العملاء</span>
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
                    <div className="flex items-center gap-3 md:gap-8 flex-shrink-0">
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

                {/* Categories Bar - Visible on Mobile as Slider */}
                <nav className="border-t border-gray-100 py-3 block whitespace-nowrap overflow-x-auto scroll-smooth bg-white custom-scrollbar" dir="rtl">
                    <div className="max-w-[1400px] mx-auto px-4 md:px-12">
                        <ul className="flex justify-start md:justify-center items-center text-[12.5px] md:text-[13px] font-bold gap-6 md:gap-12">
                            <li onClick={() => router.push('/')} className="cursor-pointer shrink-0 hover:text-[#8c1d3b] transition-colors">الرئيسية</li>
                            <li onClick={() => router.push('/about')} className="cursor-pointer shrink-0 hover:text-[#8c1d3b] transition-colors">من نحن</li>
                            <li onClick={() => router.push('/best-sellers')} className="cursor-pointer shrink-0 hover:text-[#8c1d3b] transition-colors">الأكثر مبيعاً</li>
                            <li onClick={() => router.push('/new-arrivals')} className="cursor-pointer shrink-0 hover:text-[#8c1d3b] transition-colors">وصل حديثاً</li>
                            <li onClick={() => router.push('/dark-room')} className="cursor-pointer shrink-0 hover:text-[#8c1d3b] transition-colors">الغرفة المظلمة</li>
                            <li onClick={() => router.push('/offers')} className="cursor-pointer shrink-0 hover:text-[#8c1d3b] transition-colors">العروض</li>
                            <li onClick={() => router.push('/scent-quiz')} className="cursor-pointer shrink-0 hover:text-[#8c1d3b] transition-colors">اكتشف عطرك </li>
                            <li onClick={() => router.push('/sets-gifts')} className="cursor-pointer shrink-0 hover:text-[#8c1d3b] transition-colors">باقات الهدايا</li>
                            <li onClick={() => router.push('/gifting-match')} className="cursor-pointer shrink-0 hover:text-[#8c1d3b] transition-colors">هدية لمن؟ </li>
                            <li onClick={() => router.push('/wardrobe')} className="cursor-pointer shrink-0 hover:text-[#8c1d3b] transition-colors">خزانة العطور</li>
                            <li onClick={() => router.push('/brands')} className="cursor-pointer shrink-0 hover:text-[#8c1d3b] transition-colors">الماركات</li>
                            <li onClick={() => router.push('/branches')} className="cursor-pointer shrink-0 hover:text-[#8c1d3b] transition-colors">فروعنا</li>
                            <li onClick={() => router.push('/testimonials')} className="cursor-pointer shrink-0 hover:text-[#8c1d3b] transition-colors">آراء العملاء</li>
                            <li onClick={() => router.push('/contact')} className="cursor-pointer shrink-0 hover:text-[#8c1d3b] transition-colors">تواصل معنا</li>
                        </ul>
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

                                {/* Mobile Sidebar Download Button */}
                                <div className="mt-8 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                    <p className="text-[12px] text-gray-500 mb-3 text-center">استمتع بتجربة تسوق أفضل</p>
                                    <button 
                                        onClick={() => {
                                            const btn = document.querySelector('.install-pwa-trigger') as HTMLButtonElement;
                                            if (btn) btn.click();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="w-full py-3 bg-black text-white rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
                                    >
                                        <Download size={18} />
                                        تحميل التطبيق
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* Mobile Bottom Navigation Bar */}
            <div className="md:hidden fixed bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md border border-gray-100 z-[1000] px-6 py-3 flex justify-between items-center shadow-lg rounded-3xl">
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
                <div onClick={() => {
                    const btn = document.querySelector('.install-pwa-trigger') as HTMLButtonElement;
                    if (btn) btn.click();
                }} className="flex flex-col items-center gap-1 cursor-pointer text-gray-400">
                    <Download size={22} strokeWidth={1.5} />
                    <span className="text-[10px] font-bold">تثبيت</span>
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
