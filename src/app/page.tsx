"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import ProductSection from "@/components/ProductSection";
import Footer from "@/components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronRight, ChevronLeft, ArrowRight, ArrowLeft, Mail } from "lucide-react";

// ---------------------------------------------------------------------------
// Data constants
// ---------------------------------------------------------------------------

const NEW_ARRIVALS = [
  { brand: "أطياب المرشود", name: "حصرياً خصلة بينك",      price: "460",  image: "/001717728336_1.jpg", isNew: false, hasGift: true  },
  { brand: "إيسي مياكي",   name: "لوميير ديسي",            price: "537",  image: "/001717728336_1.jpg", isNew: false, hasGift: true  },
  { brand: "ميو ميو",      name: "عطر ميوتين",              price: "572",  image: "/001717728336_1.jpg", isNew: false, hasGift: true  },
  { brand: "ميمو باريس",   name: "عطر أوشن ليذر",          price: "1365", image: "/001717728336_1.jpg", isNew: false, hasGift: true  },
  { brand: "جورجو أرماني", name: "عطر باور أوف يو أو",     price: "488",  image: "/001717728336_1.jpg", isNew: false, hasGift: true  },
  { brand: "ميو ميو",      name: "عطر لو دو موغيه",        price: "572",  image: "/001717728336_1.jpg", isNew: false, hasGift: true  },
  { brand: "أطياب المرشود", name: "حصرياً خصلة بينك",      price: "460",  image: "/001717728336_1.jpg", isNew: false, hasGift: true  },
  { brand: "إيسي مياكي",   name: "لوميير ديسي",            price: "537",  image: "/001717728336_1.jpg", isNew: false, hasGift: true  },
  { brand: "ميو ميو",      name: "عطر ميوتين",              price: "572",  image: "/001717728336_1.jpg", isNew: false, hasGift: true  },
  { brand: "ميمو باريس",   name: "عطر أوشن ليذر",          price: "1365", image: "/001717728336_1.jpg", isNew: false, hasGift: true  },
  { brand: "جورجو أرماني", name: "عطر باور أوف يو أو",     price: "488",  image: "/001717728336_1.jpg", isNew: false, hasGift: true  },
  { brand: "ميو ميو",      name: "عطر لو دو موغيه",        price: "572",  image: "/001717728336_1.jpg", isNew: false, hasGift: true  },
];

const SPRING_IMAGES = [
  "/DK-SUB.avif",
  "/DK-SUB-Skincare_UAE-1.avif",
  "/DK-SUB-Fragrance_KSA-1.avif",
  "/DK-SUB-Fragrance_KSA-1.avif",
  "/DK-SUB.avif",
  "/DK-SUB-Skincare_UAE-1.avif",
  "/DK-SUB-Fragrance_KSA-1.avif",
  "/DK-SUB-Fragrance_KSA-1.avif",
];

const GWP_IMAGES = [
  "/ysl-gwp-ksa.avif",
  "/prada-gwp.avif",
  "/lancome-gwp-ksa-2.avif",
  "/issey-gwp-uae2.avif",
  "/ysl-gwp-ksa.avif",
  "/prada-gwp.avif",
  "/lancome-gwp-ksa-2.avif",
  "/issey-gwp-uae2.avif",
];

const FREE_GIFT_PRODUCTS = [
  { brand: "لانكوم",        name: "آيدول ناو",                    price: "531", image: "/001717728336_1.jpg", hasGift: false, hasFrom: true  },
  { brand: "إيف سان لوران", name: "ليبر لو بارفان",              price: "489", image: "/001717728336_1.jpg", hasGift: false, hasFrom: true  },
  { brand: "جورجو أرماني",  name: "عطر ماي واي إنتنس...",       price: "621", image: "/001717728336_1.jpg", hasGift: false, hasFrom: false },
  { brand: "جورجو أرماني",  name: "سترونغر ويز يو...",          price: "477", image: "/001717728336_1.jpg", hasGift: false, hasFrom: true  },
  { brand: "إيف سان لوران", name: "عطر بلاك أوبيوم أو د...",   price: "587", image: "/001717728336_1.jpg", hasGift: false, hasFrom: true  },
  { brand: "إيف سان لوران", name: "عطر واي أو دو برفان",       price: "518", image: "/001717728336_1.jpg", hasGift: false, hasFrom: true  },
];

const ISSEY_PRODUCTS = [
  { brand: "ايسي مياكي", name: "لو ديسي انتنس",       price: "444", image: "/001717728336_1.jpg", hasGift: false, hasFrom: true },
  { brand: "ايسي مياكي", name: "لو سيل ديسي",         price: "460", image: "/001717728336_1.jpg", hasGift: false, hasFrom: true },
  { brand: "ايسي مياكي", name: "لوميير ديسي",         price: "537", image: "/001717728336_1.jpg", hasGift: false, hasFrom: true },
  { brand: "ايسي مياكي", name: "عطر بيفوان بيني",     price: "514", image: "/001717728336_1.jpg", hasGift: false, hasFrom: true },
  { brand: "ايسي مياكي", name: "لو ديسي انتنس",       price: "551", image: "/001717728336_1.jpg", hasGift: false, hasFrom: true },
  { brand: "ايسي مياكي", name: "عطر لو سيل دي إيسي", price: "419", image: "/001717728336_1.jpg", hasGift: false, hasFrom: true },
];


const AROUND_THE_WORLD_BRANDS = [
  { name: "اروما دي لاموري", image: "/001717728336_1.jpg" },
  { name: "ماوس اوف 1984", image: "/001717728336_1.jpg" },
  { name: "العربية للعود", image: "/001717728336_1.jpg" },
  { name: "أس كي 2", image: "/001717728336_1.jpg" },
  { name: "ريف العطور", image: "/001717728336_1.jpg" },
  { name: "دايسون", image: "/001717728336_1.jpg" },
  { name: "اروما دي لاموري", image: "/001717728336_1.jpg" },
  { name: "ماوس اوف 1984", image: "/001717728336_1.jpg" },
  { name: "العربية للعود", image: "/001717728336_1.jpg" },
  { name: "أس كي 2", image: "/001717728336_1.jpg" },
  { name: "ريف العطور", image: "/001717728336_1.jpg" },
  { name: "دايسون", image: "/001717728336_1.jpg" },
];
// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* New Arrivals Section */}
      <section className="py-4 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-right w-full">
              وصل حديثاً
            </h2>
            <button className="text-sm font-bold shrink-0 whitespace-nowrap text-black hover:opacity-80 transition-all underline">
              عرض الكل
            </button>
          </div>

          <div className="relative">
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".products-next",
                prevEl: ".products-prev",
              }}
              spaceBetween={12}
              slidesPerView={2}
              breakpoints={{ 480: { slidesPerView: 2.2, spaceBetween: 15 } }}
              className="!px-1"  
            >
              {NEW_ARRIVALS.map((product, index) => (
                <SwiperSlide key={index}>
                  <ProductCard {...product} />
                </SwiperSlide>
              ))}
            </Swiper>
            <button className="products-prev absolute right-0 md:right-[-20px] top-[40%] -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-black hover:text-white transition-all shadow-[0_2px_8px_rgba(0,0,0,0.15)] disabled:hidden">
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button className="products-next absolute left-0 md:left-[-20px] top-[40%] -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-black hover:text-white transition-all shadow-[0_2px_8px_rgba(0,0,0,0.15)] disabled:hidden">
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Delivery Banner */}
      <section className="pb-4 pt-4 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          {/* Desktop Image */}
          <img
            src="/DK-Hero-Loreal-EN-3.avif"
            className="hidden md:block w-full h-auto rounded-[8px]"
            alt="Delivery Banner"
          />
          {/* Mobile HTML Banner */}
          <div className="md:hidden w-full bg-[#aed2b4] text-[#0b412b] rounded-[8px] p-4 text-center flex flex-col justify-center items-center min-h-[100px] shadow-sm">
            <h3 className="font-black text-[17px] mb-1">توصيل مجاني خلال ساعتين في الرياض</h3>
            <p className="font-bold text-[14px]">عند الطلب قبل 8 مساءً</p>
          </div>
        </div>
      </section>

      {/* Spring Trends Section */}
      <section className="py-6 bg-white" dir="rtl">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-right w-full">
              صيحات الربيع
            </h2>
            <button className="text-sm font-bold shrink-0 whitespace-nowrap text-black hover:opacity-80 transition-all underline">
              عرض الكل
            </button>
          </div>

          <div className="relative">
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".spring-next",
                prevEl: ".spring-prev",
              }}
              loop={true}
              breakpoints={{
                320:  { slidesPerView: 2, spaceBetween: 15 },
                768:  { slidesPerView: 2.5, spaceBetween: 20 },
                1024: { slidesPerView: 3,   spaceBetween: 25 },
              }}
              className="!px-2"
            >
              {SPRING_IMAGES.map((imgSrc, index) => (
                <SwiperSlide key={index}>
                  <div className="aspect-[4/3] md:aspect-[3/2] rounded-[4px] overflow-hidden relative group cursor-pointer bg-gray-50">
                    <img
                      src={imgSrc}
                      alt="Spring Trend"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <button className="spring-prev absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#656e77]/90 md:bg-[#656e77] flex items-center justify-center text-white hover:bg-black transition-all shadow-[0_2px_8px_rgba(0,0,0,0.15)] disabled:hidden">
              <ArrowRight className="w-4 h-4 md:w-6 md:h-6" />
            </button>
            <button className="spring-next absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#656e77]/90 md:bg-[#656e77] flex items-center justify-center text-white hover:bg-black transition-all shadow-[0_2px_8px_rgba(0,0,0,0.15)] disabled:hidden">
              <ArrowLeft className="w-4 h-4 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Free Full Size Gift Section */}
      <ProductSection
        title="مجاناً عطر بالحجم الكامل"
        bannerSrc="/MB-Hero-P4Box-UAE-EN-2.avif"
        bannerAlt="Black Opium Offer"
        products={FREE_GIFT_PRODUCTS}
      />

      {/* Gifts With Purchase Section */}
      <section className="py-6 bg-white" dir="rtl">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-[22px] font-black tracking-tight text-[#153428]">
              هدايا عند التسوق
            </h2>
          </div>

          <div className="relative">
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".gwp-next",
                prevEl: ".gwp-prev",
              }}
              spaceBetween={12}
              slidesPerView={2}
              breakpoints={{
                480:  { slidesPerView: 2, spaceBetween: 15 },
                768:  { slidesPerView: 2.5, spaceBetween: 20 },
                1024: { slidesPerView: 3,   spaceBetween: 20 },
              }}
              className="!px-1"
            >
              {GWP_IMAGES.map((imgSrc, index) => (
                <SwiperSlide key={index}>
                  <div className="aspect-[4/5] md:aspect-square rounded-[4px] overflow-hidden relative group cursor-pointer bg-gray-50 border border-gray-100">
                    <img
                      src={imgSrc}
                      alt="Gift With Purchase"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <button className="gwp-prev absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#656e77]/90 md:bg-[#656e77] flex items-center justify-center text-white hover:bg-black transition-all shadow-[0_2px_8px_rgba(0,0,0,0.15)] disabled:hidden">
              <ArrowRight className="w-4 h-4 md:w-6 md:h-6" />
            </button>
            <button className="gwp-next absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#656e77]/90 md:bg-[#656e77] flex items-center justify-center text-white hover:bg-black transition-all shadow-[0_2px_8px_rgba(0,0,0,0.15)] disabled:hidden">
              <ArrowLeft className="w-4 h-4 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Brand of the Week – Issey Miyake */}
      <ProductSection
        title="ماركة الأسبوع - ايسي مياكي"
        bannerSrc="/IMLDI_BANNER_750x714.avif"
        bannerAlt="Issey Miyake Brand of the Week"
        products={ISSEY_PRODUCTS}
      />

      {/* Gift Card Banner */}
      <section className="py-6 bg-white" dir="rtl">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          {/* Desktop Image */}
          <img
            src="/DK-Promo-EN-1.avif"
            className="hidden md:block w-full h-auto rounded-[8px]"
            alt="Gift Card"
          />
          {/* Mobile HTML Banner */}
          <div className="md:hidden w-full bg-[#e6e2df] text-[#0f4531] rounded-[8px] px-4 py-6 flex flex-col justify-center items-center text-center shadow-sm relative overflow-hidden">
            <h3 className="font-black text-[18px] mb-2 z-10">جمال من اختيارهم</h3>
            <p className="text-[12px] font-bold mb-4 z-10 opacity-80 leading-relaxed max-w-[280px]">
              بطاقة هدايا حصرياً من وجوه تمنحهم اختيار ما يأملون الحصول عليه
            </p>
            <button className="text-[13px] font-black underline z-10 decoration-2 underline-offset-4">
              تسوق الآن
            </button>
          </div>
        </div>
      </section>


      {/* Most Popular Products Section */}
      <section className="py-4 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-right w-full">
              الأكثر مبيعاً
            </h2>
            <button className="text-sm font-bold shrink-0 whitespace-nowrap text-black hover:text-accent transition-all">
              عرض الكل
            </button>
          </div>

          <div className="relative">
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".products-next",
                prevEl: ".products-prev",
              }}
              spaceBetween={12}
              slidesPerView={2}
              breakpoints={{ 480: { slidesPerView: 2.2, spaceBetween: 15 } }}
              className="!px-1"  
            >
              {NEW_ARRIVALS.map((product, index) => (
                <SwiperSlide key={index}>
                  <ProductCard {...product} />
                </SwiperSlide>
              ))}
            </Swiper>
            <button className="products-prev absolute right-0 md:right-[-20px] top-[40%] -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-black hover:text-white transition-all shadow-[0_2px_8px_rgba(0,0,0,0.15)] disabled:hidden">
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button className="products-next absolute left-0 md:left-[-20px] top-[40%] -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-black hover:text-white transition-all shadow-[0_2px_8px_rgba(0,0,0,0.15)] disabled:hidden">
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </section>

            {/* Gifts With Purchase Section */}
      <section className="py-6 bg-white" dir="rtl">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-[22px] font-black tracking-tight text-[#153428]">
             اكتشفوا عالمًا من الخدمه
            </h2>
            <p className="text-sm md:text-base font-black shrink-0 whitespace-nowrap text-black hover:text-accent transition-all">
              عرض جميع الخدمات
            </p>
          </div>

          <div className="relative">
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".gwp-next",
                prevEl: ".gwp-prev",
              }}
              spaceBetween={12}
              slidesPerView={2}
              breakpoints={{
                480:  { slidesPerView: 2, spaceBetween: 15 },
                768:  { slidesPerView: 2.5, spaceBetween: 20 },
                1024: { slidesPerView: 3,   spaceBetween: 20 },
              }}
              className="!px-1"
            >
              {GWP_IMAGES.map((imgSrc, index) => (
                <SwiperSlide key={index}>
                  <div className="aspect-[4/5] md:aspect-square rounded-[4px] overflow-hidden relative group cursor-pointer bg-gray-50 border border-gray-100">
                    <img
                      src={imgSrc}
                      alt="Gift With Purchase"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <button className="gwp-prev absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#656e77]/90 md:bg-[#656e77] flex items-center justify-center text-white hover:bg-black transition-all shadow-[0_2px_8px_rgba(0,0,0,0.15)] disabled:hidden">
              <ArrowRight className="w-4 h-4 md:w-6 md:h-6" />
            </button>
            <button className="gwp-next absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#656e77]/90 md:bg-[#656e77] flex items-center justify-center text-white hover:bg-black transition-all shadow-[0_2px_8px_rgba(0,0,0,0.15)] disabled:hidden">
              <ArrowLeft className="w-4 h-4 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </section>

{/* Around the World Section */}
      <section className="py-6 bg-white" dir="rtl">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-6 w-full">
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-right w-full">
              من حول العالم
            </h2>

            <button className="text-sm font-bold shrink-0 whitespace-nowrap text-black hover:text-accent transition-all">
              عرض جميع الماركات
            </button>
          </div>

          <div className="relative">
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".around-next",
                prevEl: ".around-prev",
              }}
              loop={true}
              spaceBetween={12}
              slidesPerView={2}
              breakpoints={{ 480: { slidesPerView: 2.2, spaceBetween: 15 } }}
              className="!px-1"  
            >
              {AROUND_THE_WORLD_BRANDS.map((brand, index) => (
                <SwiperSlide key={index}>
                  <div className="flex flex-col items-center group cursor-pointer">
                    <div className="aspect-square w-full rounded-[4px] overflow-hidden relative bg-gray-50 mb-3 border border-gray-100">
                      <img
                        src={brand.image}
                        alt={brand.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <p className="text-[13px] md:text-[15px] font-bold text-center text-[#153428]">
                      {brand.name}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <button className="around-prev absolute right-2 md:right-[-20px] top-[40%] -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-black hover:text-white transition-all shadow-[0_2px_8px_rgba(0,0,0,0.15)] disabled:hidden">
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button className="around-next absolute left-2 md:left-[-20px] top-[40%] -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-black hover:text-white transition-all shadow-[0_2px_8px_rgba(0,0,0,0.15)] disabled:hidden">
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </section>


            {/* New Arrivals Section */}
      <section className="py-4 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-right w-full">
             مختارات عالمية
            </h2>
            <button className="text-sm font-bold shrink-0 whitespace-nowrap text-black hover:opacity-80 transition-all underline">
              عرض الكل
            </button>
          </div>

          <div className="relative">
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".products-next",
                prevEl: ".products-prev",
              }}
              spaceBetween={12}
              slidesPerView={2}
              breakpoints={{ 480: { slidesPerView: 2.2, spaceBetween: 15 } }}
              className="!px-1"  
            >
              {NEW_ARRIVALS.map((product, index) => (
                <SwiperSlide key={index}>
                  <ProductCard {...product} />
                </SwiperSlide>
              ))}
            </Swiper>
            <button className="products-prev absolute right-0 md:right-[-20px] top-[40%] -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-black hover:text-white transition-all shadow-[0_2px_8px_rgba(0,0,0,0.15)] disabled:hidden">
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button className="products-next absolute left-0 md:left-[-20px] top-[40%] -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-black hover:text-white transition-all shadow-[0_2px_8px_rgba(0,0,0,0.15)] disabled:hidden">
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Laila AI Advisor Banner */}
      <section className="py-2 md:py-6 bg-white" dir="rtl">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <a href="#" className="block w-full rounded-[8px] overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-shadow">
            <img
              src="/download.jpeg"
              alt="مرحباً أنا ليلى مستشارتكم الجمالية الذكية"
              className="w-full h-[180px] md:h-auto object-cover object-left md:object-center transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </a>
        </div>
      </section>

      {/* SEO Text Block */}
      <section className="py-12 bg-[#f9f9f9]" dir="rtl">
        <div className="max-w-[1000px] mx-auto px-4 md:px-6 text-center">
          <h2 className="text-xl md:text-2xl font-black mb-4 text-[#153428]">
            تسوق من المعرض المثالي لمستحضرات الجمال و العناية في السعودية
          </h2>
          <p className="text-[13px] md:text-[14px] text-gray-700 leading-relaxed mb-4">
            وجوه (FACES) هي شركة البيع بالتجزئة الرائدة في مجال الجمال و العناية بالبشرة في جميع أنحاء العالم مع تشكيلة متنوعة من أحدث العطور والعناية بالبشرة والجسم والمكياج والعناية بالشعر والاكسسوارات في المنطقة.
          </p>
          <p className="text-[13px] md:text-[14px] text-gray-700 leading-relaxed mb-4">
            مع خبرة 20 عاماً في الشرق الأوسط وسوق الخليج، لدينا 85 متجراً في 9 دول (الإمارات العربية المتحدة و الكويت و المملكة العربية السعودية و مصر و لبنان و قطر و المزيد) عدا عن تواجدنا الدائم على الموقع الإلكتروني.
          </p>
          <a href="#" className="text-[14px] font-black underline text-[#153428] hover:opacity-80 transition-opacity">
            اكتشفوا عالم الجمال
          </a>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-8 bg-[#efded8]" dir="rtl">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Right Side - Text */}
            <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-right">
              <Mail className="w-10 h-10 md:w-8 md:h-8 text-[#153428] shrink-0 mb-2 md:mb-0" />
              <div>
                <h3 className="text-xl font-black text-[#153428] mb-2 md:mb-1">اشترك في نشرتنا الإخبارية</h3>
                <p className="text-sm text-gray-700 font-bold">كن أول من يعلم بمنتجاتنا الجديدة، العروض، و فعاليات المتاجر</p>
              </div>
            </div>

            {/* Left Side - Form */}
            <div className="w-full md:w-auto flex-1 max-w-lg mt-4 md:mt-0">
              <form className="flex w-full h-12" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="عنوان البريد الإلكتروني"
                  className="flex-1 min-w-0 h-full px-4 border border-black/20 bg-transparent text-right placeholder-gray-600 focus:outline-none focus:border-black rounded-r-[4px]"
                />
                <button
                  type="submit"
                  className="h-full px-6 md:px-8 bg-black text-white font-bold text-sm hover:bg-gray-800 transition-colors rounded-l-[4px] shrink-0"
                >
                  اشترك
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
