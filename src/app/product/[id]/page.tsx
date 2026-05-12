"use client";

import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronRight, ChevronLeft, Share, Undo2, ChevronDown, Percent, Gift, Star } from 'lucide-react';
import ProductCard from "@/components/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ReviewModal from "@/components/ReviewModal";
import ImageGalleryModal from "@/components/ImageGalleryModal";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = React.use(params);
    const id = resolvedParams.id;
    
    const [activeTab, setActiveTab] = useState<'may-like' | 'similar'>('may-like');
    const [mainImage, setMainImage] = useState("/001717728336_1.jpg");
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);

    const thumbnails = [
        "/001717728336_1.jpg",
        "/001717728336_2.jpg", // Just a placeholder for visual difference if the user adds actual different images
        "/001717728336_3.jpg"
    ];

    const currentImageIndex = thumbnails.indexOf(mainImage) !== -1 ? thumbnails.indexOf(mainImage) : 0;

    const SIMILAR_PRODUCTS = [
        { brand: "إيسي مياكي", name: "لوميير ديسي", price: "537", image: "/001717728336_1.jpg", isNew: true, hasGift: true },
        { brand: "هيوغو بوس", name: "عطر بوتلد بيوند", price: "520", image: "/001717728336_1.jpg", isNew: true, hasGift: false },
        { brand: "جورجو أرماني", name: "سترونغر ويز يو", price: "317.80", image: "/001717728336_1.jpg", isNew: false, hasGift: false },
        { brand: "فالنتينو", name: "بورن إن روما", price: "597", image: "/001717728336_1.jpg", isNew: true, hasGift: true },
        { brand: "جيرلان", name: "فلورابلوم فورتي", price: "817", image: "/001717728336_1.jpg", isNew: true, hasGift: false }
    ];

    const MAY_LIKE_PRODUCTS = [
        { brand: "نارسيسو رودريغيز", name: "عطر بيور مسك", price: "450", image: "/001717728336_1.jpg", isNew: false, hasGift: true },
        { brand: "جيرلان", name: "فلورابلوم فورتي", price: "817", image: "/001717728336_1.jpg", isNew: true, hasGift: false },
        { brand: "فالنتينو", name: "بورن إن روما", price: "597", image: "/001717728336_1.jpg", isNew: true, hasGift: true },
        { brand: "إيسي مياكي", name: "لوميير ديسي", price: "537", image: "/001717728336_1.jpg", isNew: true, hasGift: true },
        { brand: "هيوغو بوس", name: "عطر بوتلد بيوند", price: "520", image: "/001717728336_1.jpg", isNew: true, hasGift: false }
    ];

    const currentProducts = activeTab === 'may-like' ? MAY_LIKE_PRODUCTS : SIMILAR_PRODUCTS;

    return (
        <main className="min-h-screen bg-white" dir="rtl">
            <Navbar isSticky={false} />

            {/* Image Gallery Modal */}
            <ImageGalleryModal 
                images={thumbnails} 
                initialIndex={currentImageIndex} 
                isOpen={isGalleryOpen} 
                onClose={() => setIsGalleryOpen(false)} 
            />

            <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-4 md:py-8 font-cairo">
                
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-[13px] text-gray-500 mb-6 md:mb-8">
                    <a href="/" className="hover:text-black">الرئيسية وجوه</a>
                    <ChevronRight className="w-3 h-3" />
                    <a href="#" className="hover:text-black">العطور</a>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-gray-400">المنتج: {id}</span>
                </nav>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
                    
                    {/* Left Side: Images */}
                    <div className="flex flex-col-reverse md:flex-row gap-4">
                        {/* Thumbnails */}
                        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible shrink-0 pb-2 md:pb-0">
                            {thumbnails.map((img, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => setMainImage(img)}
                                    className={`w-20 h-24 shrink-0 border ${mainImage === img ? 'border-black' : 'border-gray-200'} rounded-sm overflow-hidden flex items-center justify-center p-1`}
                                >
                                    <img src={img} alt="Thumbnail" className="w-full h-full object-contain mix-blend-multiply" />
                                </button>
                            ))}
                        </div>

                        {/* Main Image */}
                        <button 
                            onClick={() => setIsGalleryOpen(true)}
                            className="flex-1 border border-gray-100 rounded-sm p-4 flex items-center justify-center min-h-[400px] md:min-h-[500px] cursor-zoom-in group"
                        >
                            <img 
                                src={mainImage} 
                                alt="Main Product" 
                                className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-[1.02]" 
                            />
                        </button>
                    </div>

                    {/* Right Side: Product Details */}
                    <div className="flex flex-col">
                        
                        {/* Header: Badges & Share */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <span className="bg-[#8c1d3b] text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                                    هدايا مجانية
                                </span>
                                <span className="bg-[#dcf0fb] text-[#004777] text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                                    جديد
                                </span>
                            </div>
                            <button className="text-gray-600 hover:text-black">
                                <Share className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Title Section */}
                        <div className="mb-6">
                            <h1 className="text-[16px] md:text-[18px] font-bold text-[#8c1d3b] uppercase tracking-wide mb-1">
                                نارسيسو رودريغيز
                            </h1>
                            <h2 className="text-[22px] md:text-[28px] font-black text-gray-900 mb-1 leading-tight">
                                ماسك غرينات إنتينس
                            </h2>
                            <p className="text-[14px] text-gray-500 mb-3">
                                عطر لكلا الجنسين
                            </p>
                            <a href="#" className="text-[#8c1d3b] text-[13px] font-bold hover:underline">
                                استكشف نوتات العطر
                            </a>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-1 mb-8">
                            <span className="text-[20px] md:text-[24px] font-black text-gray-900">1064</span>
                            <span className="text-[16px] font-bold text-gray-900">ريال</span>
                        </div>

                        {/* Add to Bag Button */}
                        <button className="w-full bg-[#071424] text-white font-bold text-[14px] md:text-[16px] py-4 rounded-sm hover:bg-black transition-colors mb-6">
                            إضافة للسلة
                        </button>

                        {/* Split Payments Widget */}
                        <div className="bg-[#f5f5f5] p-4 rounded-sm mb-6 flex flex-col gap-3">
                            <p className="text-center text-[12px] text-gray-600">
                                قسمها على 4 دفعات متساوية بقيمة <span className="font-bold text-black">266.00 ريال</span> مع:
                            </p>
                            <div className="flex items-center justify-center gap-4">
                                <button className="bg-white flex-1 py-2 flex items-center justify-center rounded-sm font-black text-[14px] shadow-sm">
                                    tabby <span className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-[10px] font-normal mr-1">i</span>
                                </button>
                                <span className="text-[12px] text-gray-500 font-bold">أو</span>
                                <button className="bg-white flex-1 py-2 flex items-center justify-center rounded-sm font-black text-[14px] shadow-sm">
                                    tamara <span className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-[10px] font-normal mr-1">i</span>
                                </button>
                            </div>
                        </div>

                        {/* Easy Return */}
                        <div className="flex items-start gap-4 p-4 border border-gray-100 rounded-sm mb-8">
                            <Undo2 className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="text-[14px] font-bold text-gray-900 mb-1">إرجاع سهل</h4>
                                <p className="text-[12px] text-gray-500">
                                    يمكنك إرجاع هذا المنتج خلال 7 أيام.
                                </p>
                            </div>
                        </div>

                        {/* Free Gifts Accordion */}
                        <div className="mb-4 border-t border-gray-100 pt-6">
                            <h3 className="text-[16px] font-black text-gray-900 mb-4 text-right">هدايا مجانية مع هذا المنتج</h3>
                            
                            <Accordion type="multiple" dir="rtl" className="flex flex-col gap-0 border border-gray-100 rounded-sm">
                                {/* Promo 1 */}
                                <AccordionItem value="promo-1" className="border-b border-gray-100">
                                    <AccordionTrigger className="hover:no-underline p-4 hover:bg-gray-50 group [&[data-state=open]>svg]:rotate-180">
                                        <div className="flex items-center justify-between w-full ml-4">
                                            <div className="text-right">
                                                <h4 className="text-[13px] font-bold text-gray-900 mb-1">خصم 15% على أول طلب من التطبيق!</h4>
                                                <p className="text-[11px] text-gray-500 font-normal">سجل الدخول واستخدم الكود: APP.</p>
                                            </div>
                                            <Percent className="w-8 h-8 text-black shrink-0" />
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-4 pb-4 text-[12px] text-gray-600 text-right">
                                        الحد الأدنى للإنفاق 200 ريال. يسري العرض على المنتجات غير المخفضة فقط. تطبق الشروط والأحكام.
                                    </AccordionContent>
                                </AccordionItem>
                                
                                {/* Promo 2 */}
                                <AccordionItem value="promo-2" className="border-b border-gray-100">
                                    <AccordionTrigger className="hover:no-underline p-4 hover:bg-gray-50 group [&[data-state=open]>svg]:rotate-180">
                                        <div className="flex items-center justify-between w-full ml-4">
                                            <div className="text-right">
                                                <h4 className="text-[13px] font-bold text-gray-900 mb-1">عينات مجانية عند الدفع</h4>
                                                <p className="text-[11px] text-gray-500 font-normal">عند إنفاق 299 ريال في الموقع.</p>
                                            </div>
                                            <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-[8px] font-bold text-gray-400 shrink-0">FACES</div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-4 pb-4 text-[12px] text-gray-600 text-right">
                                        اكتشف منتجات جديدة مع عيناتنا المجانية. سيتم إضافة العينات تلقائياً في سلة التسوق عند تخطي الحد الأدنى للإنفاق.
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Promo 3 */}
                                <AccordionItem value="promo-3" className="border-b-0">
                                    <AccordionTrigger className="hover:no-underline p-4 hover:bg-gray-50 group [&[data-state=open]>svg]:rotate-180">
                                        <div className="flex items-center justify-between w-full ml-4">
                                            <div className="text-right">
                                                <h4 className="text-[13px] font-bold text-gray-900 mb-1">عينة مجانية من نارسيسو رودريغيز 10 مل</h4>
                                            </div>
                                            <div className="w-8 h-8 flex items-center justify-center shrink-0">
                                                <img src="/001717728336_1.jpg" alt="gift" className="max-w-full max-h-full object-contain mix-blend-multiply" />
                                            </div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-4 pb-4 text-[12px] text-gray-600 text-right">
                                        احصل على عينة مجانية بحجم 10 مل من عطر نارسيسو رودريغيز بيور مسك عند شراء أي عطر من تشكيلة نارسيسو بحجم 100 مل.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>

                        {/* Description Accordion using shadcn/ui */}
                        <Accordion type="single" collapsible dir="rtl" className="w-full border-t border-gray-100">
                            <AccordionItem value="description" className="border-b-0">
                                <AccordionTrigger className="hover:no-underline py-4 group data-[state=open]:text-black [&[data-state=open]>svg]:rotate-180">
                                    <div className="flex items-center justify-start w-full">
                                        <h3 className="text-[18px] font-black text-gray-900 text-right">الوصف</h3>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="text-[14px] text-gray-600 leading-relaxed pb-6 text-right">
                                    عطر ماسك غرينات إنتينس من نارسيسو رودريغيز هو عطر زهري خشبي مسكي لكلا الجنسين. يفتتح العطر بنوتات منعشة من الفاكهة والتوابل، ويتميز بقلب من المسك النقي المميز لعلامة نارسيسو، مع قاعدة دافئة من الأخشاب الفاخرة والعنبر. عطر يجمع بين الأناقة والغموض ويترك انطباعاً لا يُنسى.
                                    <br /><br />
                                    <strong className="text-gray-900">مكونات العطر:</strong>
                                    <ul className="list-disc list-inside mt-2 space-y-1 pr-2 text-right">
                                        <li>مقدمة العطر: التوت الأحمر، البرغموت</li>
                                        <li>قلب العطر: المسك، الورد، زنبق الوادي</li>
                                        <li>قاعدة العطر: الباتشولي، العنبر، الأخشاب</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                    </div>
                </div>
            </div>

            {/* Ratings & Reviews Section */}
            <div className="w-full bg-[#faf9f8] py-12 border-t border-gray-100 z-1000">
                <div className="max-w-[1400px] mx-auto px-4 md:px-6 font-cairo flex flex-col items-start">
                    <h3 className="text-[20px] font-black text-gray-900 mb-4">التقييمات والمراجعات</h3>
                    
                    <div className="flex items-center gap-2 mb-6">
                        <div className="flex gap-1 text-gray-300">
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                        </div>
                        <span className="text-[13px] text-gray-500">كن أول من يقيّم هذا المنتج</span>
                    </div>
                        
                    <ReviewModal />

                </div>
            </div>

            {/* Similar Products Section */}
            <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-12 md:py-16 border-t border-gray-100 font-cairo">
                {/* Tabs */}
                <div className="flex gap-6 border-b border-gray-200 mb-8">
                    <button 
                        onClick={() => setActiveTab('may-like')}
                        className={`pb-3 transition-colors ${activeTab === 'may-like' ? 'border-b-2 border-black font-black text-[16px] text-gray-900' : 'font-bold text-[16px] text-gray-500 hover:text-gray-900'}`}
                    >
                        قد يعجبك أيضاً
                    </button>
                    <button 
                        onClick={() => setActiveTab('similar')}
                        className={`pb-3 transition-colors ${activeTab === 'similar' ? 'border-b-2 border-black font-black text-[16px] text-gray-900' : 'font-bold text-[16px] text-gray-500 hover:text-gray-900'}`}
                    >
                        منتجات مشابهة
                    </button>
                </div>

                {/* Slider */}
                <div className="relative">
                    <Swiper
                        key={activeTab} // Forces Swiper to re-initialize when data changes
                        modules={[Navigation]}
                        navigation={{
                            nextEl: ".similar-next",
                            prevEl: ".similar-prev",
                        }}
                        spaceBetween={12}
                        slidesPerView={2}
                        breakpoints={{
                            480:  { slidesPerView: 2.5, spaceBetween: 15 },
                            768:  { slidesPerView: 3, spaceBetween: 20 },
                            1024: { slidesPerView: 4, spaceBetween: 20 },
                            1280: { slidesPerView: 5, spaceBetween: 20 },
                        }}
                        className="!px-1"  
                    >
                        {currentProducts.map((product, index) => (
                            <SwiperSlide key={`${activeTab}-${index}`}>
                                <ProductCard id={`${activeTab}_${index}`} {...product} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <button className="similar-prev absolute right-0 md:right-[-20px] top-[40%] -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-black hover:text-white transition-all shadow-[0_2px_8px_rgba(0,0,0,0.15)] disabled:hidden">
                        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                    <button className="similar-next absolute left-0 md:left-[-20px] top-[40%] -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-black hover:text-white transition-all shadow-[0_2px_8px_rgba(0,0,0,0.15)] disabled:hidden">
                        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                </div>
            </div>

            <Footer />
        </main>
    );
}
