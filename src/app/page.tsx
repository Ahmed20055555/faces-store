"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ChevronRight, ChevronLeft, ArrowRight, ArrowLeft } from 'lucide-react';

const products = [
  {
    brand: "أطياب المرشود",
    name: "حصرياً خصلة بينك",
    price: "460",
    image: "/001717728336_1.jpg",
    isNew: false,
    hasGift: true
  },
  {
    brand: "إيسي مياكي",
    name: "لوميير ديسي",
    price: "537",
    image: "/001717728336_1.jpg",
    isNew: false,
    hasGift: true
  },
  {
    brand: "ميو ميو",
    name: "عطر ميوتين",
    price: "572",
    image: "/001717728336_1.jpg",
    isNew: false,
    hasGift: true
  },
  {
    brand: "ميمو باريس",
    name: "عطر أوشن ليذر",
    price: "1365",
    image: "/001717728336_1.jpg",
    isNew: false,
    hasGift: true
  },
  {
    brand: "جورجو أرماني",
    name: "عطر باور أوف يو أو",
    price: "488",
    image: "/001717728336_1.jpg",
    isNew: false,
    hasGift: true
  },
  {
    brand: "ميو ميو",
    name: "عطر لو دو موغيه",
    price: "572",
    image: "/001717728336_1.jpg",
    isNew: false,
    hasGift: true
  }
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Main Categories Section */}
      <section className="py-12 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-right w-full">وصل حديثاً</h2>
            <button className="text-sm font-bold shrink-0 whitespace-nowrap text-black hover:text-accent transition-all">
              عرض الكل
            </button>
          </div>

          <div className="relative">
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: '.products-next',
                prevEl: '.products-prev',
              }}
              breakpoints={{
                320: { slidesPerView: 2, spaceBetween: 15 },
                768: { slidesPerView: 4, spaceBetween: 20 },
                1024: { slidesPerView: 6, spaceBetween: 25 },
              }}
              className="!px-2 !pb-6"
            >
              {products.map((product, index) => (
                <SwiperSlide key={index}>
                  <ProductCard {...product} />
                </SwiperSlide>
              ))}
            </Swiper>
            <button className="products-prev absolute right-[-20px] top-[40%] -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-black hover:text-white transition-all shadow-[0_2px_10px_rgba(0,0,0,0.1)] hidden md:flex">
              <ChevronRight className="w-6 h-6" />
            </button>
            <button className="products-next absolute left-[-20px] top-[40%] -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-black hover:text-white transition-all shadow-[0_2px_10px_rgba(0,0,0,0.1)] hidden md:flex">
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Green Delivery Banner */}
      <section className="pb-4 pt-2 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12">
          <img src="/DK-Hero-Loreal-EN-3.avif" className="w-full rounded-[4px]" alt="Delivery Banner"/>
        </div>
      </section>

      {/* Spring Trends Section */}
      <section className="py-6 bg-white" dir="rtl">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-right w-full">صيحات الربيع</h2>
          </div>
          
          <div className="relative">
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: '.spring-next',
                prevEl: '.spring-prev',
              }}
              loop={true}
              breakpoints={{
                320: { slidesPerView: 1.2, spaceBetween: 15 },
                768: { slidesPerView: 2.5, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 25 },
              }}
              className="!px-2"
            >
              {[
                "/DK-SUB.avif",
                "/DK-SUB-Skincare_UAE-1.avif",
                "/DK-SUB-Fragrance_KSA-1.avif",
                "/DK-SUB-Fragrance_KSA-1.avif",
              ].map((imgSrc, index) => (
                <SwiperSlide key={index}>
                  <div className="aspect-[4/3] md:aspect-[3/2] rounded-[4px] overflow-hidden relative group cursor-pointer bg-gray-50">
                    <img src={imgSrc} alt="Spring Trend" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <button className="spring-prev absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#656e77] flex items-center justify-center text-white hover:bg-black transition-all shadow-md hidden md:flex">
              <ArrowRight className="w-6 h-6" />
            </button>
            <button className="spring-next absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#656e77] flex items-center justify-center text-white hover:bg-black transition-all shadow-md hidden md:flex">
              <ArrowLeft className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Free Full Size Gift Section */}
      <section className="py-12 bg-white" dir="rtl">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Right Side: Banner */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-right">
              <div className="flex justify-between items-center mb-4 w-full">
                <h2 className="text-xl md:text-[22px] font-black tracking-tight text-[#153428]">مجاناً عطر بالحجم الكامل</h2>
              </div>
              <div className="relative w-full aspect-square md:aspect-auto md:h-full bg-gray-50 rounded-[4px] overflow-hidden">
                 <img src="/MB-Hero-P4Box-UAE-EN-2.avif" className="w-full h-full object-cover" alt="Black Opium Offer" />
              </div>
            </div>

            {/* Left Side: Product Grid (Desktop) / Slider (Mobile) */}
            <div className="flex flex-col h-full w-full pt-0 lg:pt-11 overflow-hidden">
              {/* Mobile Slider */}
              <div className="md:hidden relative w-full pb-4">
                <Swiper
                  spaceBetween={12}
                  slidesPerView={1.5}
                  breakpoints={{
                    480: { slidesPerView: 2.2, spaceBetween: 15 }
                  }}
                  className="!px-1"
                >
                  {[
                    { brand: "لانكوم", name: "آيدول ناو", price: "531", image: "/001717728336_1.jpg", hasGift: false, hasFrom: true },
                    { brand: "إيف سان لوران", name: "ليبر لو بارفان", price: "489", image: "/001717728336_1.jpg", hasGift: false, hasFrom: true },
                    { brand: "جورجو أرماني", name: "عطر ماي واي إنتنس...", price: "621", image: "/001717728336_1.jpg", hasGift: false, hasFrom: false },
                    { brand: "جورجو أرماني", name: "سترونغر ويز يو...", price: "477", image: "/001717728336_1.jpg", hasGift: false, hasFrom: true },
                    { brand: "إيف سان لوران", name: "عطر بلاك أوبيوم أو د...", price: "587", image: "/001717728336_1.jpg", hasGift: false, hasFrom: true },
                    { brand: "إيف سان لوران", name: "عطر واي أو دو برفان", price: "518", image: "/001717728336_1.jpg", hasGift: false, hasFrom: true },
                  ].map((prod, idx) => (
                    <SwiperSlide key={idx}>
                      <ProductCard {...prod} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Desktop Grid */}
              <div className="hidden md:grid md:grid-cols-3 gap-3 md:gap-4">
                 {[
                   { brand: "لانكوم", name: "آيدول ناو", price: "531", image: "/001717728336_1.jpg", hasGift: false, hasFrom: true },
                   { brand: "إيف سان لوران", name: "ليبر لو بارفان", price: "489", image: "/001717728336_1.jpg", hasGift: false, hasFrom: true },
                   { brand: "جورجو أرماني", name: "عطر ماي واي إنتنس...", price: "621", image: "/001717728336_1.jpg", hasGift: false, hasFrom: false },
                   { brand: "جورجو أرماني", name: "سترونغر ويز يو...", price: "477", image: "/001717728336_1.jpg", hasGift: false, hasFrom: true },
                   { brand: "إيف سان لوران", name: "عطر بلاك أوبيوم أو د...", price: "587", image: "/001717728336_1.jpg", hasGift: false, hasFrom: true },
                   { brand: "إيف سان لوران", name: "عطر واي أو دو برفان", price: "518", image: "/001717728336_1.jpg", hasGift: false, hasFrom: true },
                 ].map((prod, idx) => (
                   <ProductCard key={idx} {...prod} />
                 ))}
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* Gifts With Purchase Section */}
      <section className="py-6 bg-white" dir="rtl">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-[22px] font-black tracking-tight text-[#153428]">هدايا عند التسوق</h2>
          </div>
          
          <div className="relative">
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: '.gwp-next',
                prevEl: '.gwp-prev',
              }}
              spaceBetween={12}
              slidesPerView={1.5}
              breakpoints={{
                480: { slidesPerView: 2.2, spaceBetween: 15 },
                768: { slidesPerView: 2.5, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 20 },
              }}
              className="!px-1"
            >
              {[
                "/ysl-gwp-ksa.avif",
                "/prada-gwp.avif",
                "/lancome-gwp-ksa-2.avif",
                "/issey-gwp-uae2.avif"
              ].map((imgSrc, index) => (
                <SwiperSlide key={index}>
                  <div className="aspect-[4/5] md:aspect-square rounded-[4px] overflow-hidden relative group cursor-pointer bg-gray-50 border border-gray-100">
                    <img src={imgSrc} alt="Gift With Purchase" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <button className="gwp-prev absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#656e77] flex items-center justify-center text-white hover:bg-black transition-all shadow-md hidden md:flex">
              <ArrowRight className="w-6 h-6" />
            </button>
            <button className="gwp-next absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#656e77] flex items-center justify-center text-white hover:bg-black transition-all shadow-md hidden md:flex">
              <ArrowLeft className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Brand of the Week Section */}
      <section className="py-12 bg-white" dir="rtl">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Right Side: Banner */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-right">
              <div className="flex justify-between items-center mb-4 w-full">
                <h2 className="text-xl md:text-[22px] font-black tracking-tight text-[#153428]">ماركة الأسبوع - ايسي مياكي</h2>
              </div>
              <div className="relative w-full aspect-square md:aspect-auto md:h-full bg-gray-50 rounded-[4px] overflow-hidden">
                 <img src="/IMLDI_BANNER_750x714.avif" className="w-full h-full object-cover" alt="Issey Miyake Brand of the Week" />
                 {/* Fallback if image not found */}
                 <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#b1c3d4] text-white opacity-0 hover:opacity-10 transition-opacity">
                    <span className="text-2xl font-black">ISSEY MIYAKE</span>
                 </div>
              </div>
            </div>

            {/* Left Side: Product Grid (Desktop) / Slider (Mobile) */}
            <div className="flex flex-col h-full w-full pt-0 lg:pt-11 overflow-hidden">
              {/* Mobile Slider */}
              <div className="md:hidden relative w-full pb-4">
                <Swiper
                  spaceBetween={12}
                  slidesPerView={1.5}
                  breakpoints={{
                    480: { slidesPerView: 2.2, spaceBetween: 15 }
                  }}
                  className="!px-1"
                >
                  {[
                    { brand: "ايسي مياكي", name: "لو ديسي انتنس", price: "444", image: "/001717728336_1.jpg", hasGift: false, hasFrom: true },
                    { brand: "ايسي مياكي", name: "لو سيل ديسي", price: "460", image: "/001717728336_1.jpg", hasGift: false, hasFrom: true },
                    { brand: "ايسي مياكي", name: "لوميير ديسي", price: "537", image: "/001717728336_1.jpg", hasGift: false, hasFrom: true },
                    { brand: "ايسي مياكي", name: "عطر بيفوان بيني", price: "514", image: "/001717728336_1.jpg", hasGift: false, hasFrom: true },
                    { brand: "ايسي مياكي", name: "لو ديسي انتنس", price: "551", image: "/001717728336_1.jpg", hasGift: false, hasFrom: true },
                    { brand: "ايسي مياكي", name: "عطر لو سيل دي إيسي", price: "419", image: "/001717728336_1.jpg", hasGift: false, hasFrom: true },
                  ].map((prod, idx) => (
                    <SwiperSlide key={idx}>
                      <ProductCard {...prod} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Desktop Grid */}
              <div className="hidden md:grid md:grid-cols-3 gap-3 md:gap-4">
                 {[
                    { brand: "ايسي مياكي", name: "لو ديسي انتنس", price: "444", image: "/001717728336_1.jpg", hasGift: false, hasFrom: true },
                    { brand: "ايسي مياكي", name: "لو سيل ديسي", price: "460", image: "/001717728336_1.jpg", hasGift: false, hasFrom: true },
                    { brand: "ايسي مياكي", name: "لوميير ديسي", price: "537", image: "/001717728336_1.jpg", hasGift: false, hasFrom: true },
                    { brand: "ايسي مياكي", name: "عطر بيفوان بيني", price: "514", image: "/001717728336_1.jpg", hasGift: false, hasFrom: true },
                    { brand: "ايسي مياكي", name: "لو ديسي انتنس", price: "551", image: "/001717728336_1.jpg", hasGift: false, hasFrom: true },
                    { brand: "ايسي مياكي", name: "عطر لو سيل دي إيسي", price: "419", image: "/001717728336_1.jpg", hasGift: false, hasFrom: true },
                 ].map((prod, idx) => (
                   <ProductCard key={idx} {...prod} />
                 ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Gift Card Banner */}
      <section className="py-6 bg-white" dir="rtl">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12">
           <div className="relative w-full aspect-[3/1] md:aspect-[4/1] bg-[#d3cec4] rounded-[4px] overflow-hidden group cursor-pointer">
              <img src="/DK-Promo-EN-1.avif" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Gift Card" />
              {/* Fallback overlay in case image doesn't exist yet */}
              <div className="absolute inset-0 flex flex-col items-start justify-center p-8 md:p-16 text-right">
                 <h2 className="text-2xl md:text-4xl font-black text-[#153428] mb-2 opacity-0">جمال من اختيارهم</h2>
              </div>
           </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
