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
import FeaturesBar from "@/components/FeaturesBar";
import FAQ from "@/components/FAQ";

// ---------------------------------------------------------------------------
// Data constants
// ---------------------------------------------------------------------------

const NEW_ARRIVALS = [
  { brand: " Balmy", name: "عطر بالمي لافندر سبريت", price: "460", image: "/product-1.jpeg", isNew: true, hasGift: true },
  { brand: "بالمي | Balmy", name: "عطر بالمي عود ملكي", price: "537", image: "/product-2.jpeg", isNew: true, hasGift: true },
  { brand: "بالمي | Balmy", name: "عطر بالمي روز نوار", price: "572", image: "/product-3.jpeg", isNew: true, hasGift: true },
  { brand: "بالمي | Balmy", name: "عطر بالمي فيلفيت صندل", price: "790", image: "/product-4.jpeg", isNew: true, hasGift: true },
  { brand: "بالمي | Balmy", name: "عطر بالمي عود وود", price: "488", image: "/product-5.jpeg", isNew: true, hasGift: true },
  { brand: "بالمي | Balmy", name: "عطر بالمي رويال ياسمين", price: "572", image: "/product-13.jpeg", isNew: true, hasGift: true },
  { brand: "بالمي | Balmy", name: "عطر بالمي باتشولي ميست", price: "460", image: "/product-7.jpeg", isNew: true, hasGift: true },
  { brand: "بالمي | Balmy", name: "عطر بالمي جولدن نكتار", price: "537", image: "/product-9.jpeg", isNew: true, hasGift: true },
  { brand: "بالمي | Balmy", name: "عطر بالمي ديب ليذر", price: "690", image: "/product-10.jpeg", isNew: true, hasGift: true },
  { brand: "بالمي | Balmy", name: "عطر بالمي مسك رويال", price: "572", image: "/product-11.jpeg", isNew: true, hasGift: true },
  { brand: "بالمي | Balmy", name: "عطر بالمي سافرون سبايس", price: "488", image: "/product-3.jpeg", isNew: true, hasGift: true },
  { brand: "بالمي | Balmy", name: "عطر بالمي أمبر نايت", price: "640", image: "/product-13.jpeg", isNew: true, hasGift: true },
];

const SPRING_IMAGES = [
  "/product-14.jpeg",
  "/product-15.jpeg",
  "/product-16.jpeg",
  "/product-17.jpeg",
  "/product-18.jpeg",
  "/product-19.jpeg",
];

const GWP_IMAGES = [
  "/product-20.jpeg",
  "/product-21.jpeg",
  "/product-22.jpeg",
  "/product-23.jpeg",
  "/product-24.jpeg",
  "/product-25.jpeg",
  "/product-26.jpeg",
  "/product-27.jpeg",
];

const FREE_GIFT_PRODUCTS = [
  { brand: "بالمي | Balmy", name: "عطر بالمي أوبالين", price: "531", image: "/product-14.jpeg", hasGift: false, hasFrom: true },
  { brand: "بالمي | Balmy", name: "عطر بالمي مسك روز", price: "489", image: "/product-15.jpeg", hasGift: false, hasFrom: true },
  { brand: "بالمي | Balmy", name: "عطر بالمي سفاري عود", price: "621", image: "/product-16.jpeg", hasGift: false, hasFrom: false },
  { brand: "بالمي | Balmy", name: "عطر بالمي هيريتج", price: "477", image: "/product-17.jpeg", hasGift: false, hasFrom: true },
  { brand: "بالمي | Balmy", name: "عطر بالمي رويال توباز", price: "587", image: "/product-18.jpeg", hasGift: false, hasFrom: true },
  { brand: "بالمي | Balmy", name: "عطر بالمي لورين", price: "518", image: "/product-19.jpeg", hasGift: false, hasFrom: true },
];

const ISSEY_PRODUCTS = [
  { brand: "بالمي | Balmy", name: "عطر بالمي إليكسير", price: "444", image: "/product-20.jpeg", hasGift: false, hasFrom: true },
  { brand: "بالمي | Balmy", name: "عطر بالمي مسك الفخامة", price: "460", image: "/product-21.jpeg", hasGift: false, hasFrom: true },
  { brand: "بالمي | Balmy", name: "عطر بالمي كشمير وود", price: "537", image: "/product-22.jpeg", hasGift: false, hasFrom: true },
  { brand: "بالمي | Balmy", name: "عطر بالمي سوليفان", price: "514", image: "/product-23.jpeg", hasGift: false, hasFrom: true },
  { brand: "بالمي | Balmy", name: "عطر بالمي رويال توباز", price: "551", image: "/product-24.jpeg", hasGift: false, hasFrom: true },
  { brand: "بالمي | Balmy", name: "عطر بالمي ويسبر", price: "419", image: "/product-25.jpeg", hasGift: false, hasFrom: true },
];

const AROUND_THE_WORLD_BRANDS = [
  { name: "بالمي سيجنتشر", image: "/product-26.jpeg" },
  { name: "بالمي كلاسيك", image: "/product-27.jpeg" },
  { name: "بالمي عود", image: "/product-28.jpeg" },
  { name: "بالمي رويال", image: "/product-1.jpeg" },
  { name: "بالمي أوركيد", image: "/product-2.jpeg" },
  { name: "بالمي إليت", image: "/product-3.jpeg" },
];

const CATEGORIES = [
  { name: "عطور نسائية", image: "/product-12.jpeg" },
  { name: "عطور رجالية", image: "/product-28.jpeg" },
  { name: "عطور النيش", image: "/product-26.jpeg" },
  { name: "عطور الشعر", image: "/product-18.jpeg" },
  { name: "أطقم هدايا", image: "/product-21.jpeg" },
  { name: "عطور العود", image: "/product-2.jpeg" },
  { name: "الأكثر مبيعاً", image: "/product-27.jpeg" },
  { name: "جديدنا", image: "/product-10.jpeg" },
  { name: "الماركات", image: "/product-14.jpeg" },
  { name: "عطور زيتية", image: "/product-25.jpeg" },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      <Navbar />


      {/* Hero Section */}
      <Hero />

      {/* Features / Trust Badges */}
      <FeaturesBar />

      {/* Category Stories Slider (Instagram Style) */}
      <section className="bg-white py-6 md:py-10 overflow-hidden" dir="rtl">
        <div className="max-w-[1400px] mx-auto relative">
          {/* Arrows — sit in fixed left/right gutters */}
          <button className="cat-next-btn absolute right-0 md:-right-1 top-[42%] -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white shadow-[0_4px_15px_rgba(0,0,0,0.18)] flex items-center justify-center text-black transition-all border border-gray-100 hover:bg-black hover:text-white">
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button className="cat-prev-btn absolute left-0 md:-left-1 top-[42%] -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white shadow-[0_4px_15px_rgba(0,0,0,0.18)] flex items-center justify-center text-black transition-all border border-gray-100 hover:bg-black hover:text-white">
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          {/* Slider — padded to not hide behind arrows */}
          <div className="px-10 md:px-14">
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: '.cat-next-btn',
                prevEl: '.cat-prev-btn',
              }}
              slidesPerView={2}
              spaceBetween={10}
              className="pt-2 pb-3"
              breakpoints={{
                305: { slidesPerView: 3, spaceBetween: 10 },
                460: { slidesPerView: 4, spaceBetween: 12 },
                720: { slidesPerView: 5, spaceBetween: 18 },
                980: { slidesPerView: 7, spaceBetween: 22 },
                1240: { slidesPerView: 8, spaceBetween: 25 },
              }}
            >
              {CATEGORIES.map((cat, i) => (
                <SwiperSlide key={i}>
                  <div className="flex flex-col items-center gap-2 cursor-pointer group/cat">
                    <div className="transition-transform duration-300 ease-out group-hover/cat:scale-110">
                      <div className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] rounded-full overflow-hidden bg-white shadow-md border border-gray-100 relative">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/cat:scale-110"
                        />
                      </div>
                    </div>
                    <span className="text-[11px] md:text-[13px] font-black text-gray-900 group-hover/cat:text-[#8c1d3b] transition-colors text-center leading-tight w-full">
                      {cat.name}
                    </span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

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
                nextEl: ".arrivals-next",
                prevEl: ".arrivals-prev",
              }}
              spaceBetween={12}
              slidesPerView={2}
              breakpoints={{
                480: { slidesPerView: 2.5, spaceBetween: 15 },
                768: { slidesPerView: 3, spaceBetween: 20 },
                1024: { slidesPerView: 4, spaceBetween: 20 },
                1280: { slidesPerView: 5, spaceBetween: 20 },
              }}
              className="!px-1"
            >
              {NEW_ARRIVALS.map((product, index) => (
                <SwiperSlide key={index}>
                  <ProductCard id={`prod_${index}`} {...product} />
                </SwiperSlide>
              ))}
            </Swiper>
            <button className="arrivals-prev absolute -right-2 md:right-[-25px] top-[40%] -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-gray-800 hover:bg-[#8c1d3b] hover:text-white transition-all shadow-lg border border-white/30 disabled:hidden">
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button className="arrivals-next absolute -left-2 md:left-[-25px] top-[40%] -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-gray-800 hover:bg-[#8c1d3b] hover:text-white transition-all shadow-lg border border-white/30 disabled:hidden">
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Delivery Banner */}
      <section className="pb-4 pt-4 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          {/* Desktop Image */}
          {/* <img
            src="/DK-Hero-Loreal-EN-3.avif"
            className="hidden md:block w-full h-auto rounded-[8px]"
            alt="Delivery Banner"
          /> */}
          {/* Mobile HTML Banner */}
          <div className=" w-full bg-[#F5E6C4] text-[#8c1d3b] rounded-[8px] p-4 text-center flex flex-col justify-center items-center min-h-[100px] shadow-sm">
            <h3 className="font-black text-[17px] mb-1">توصيل مجاني خلال ساعتين في الرياض</h3>
            <p className="font-bold text-[14px] text-[#8c1d3b]/90">عند الطلب قبل 8 مساءً</p>
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
                320: { slidesPerView: 2, spaceBetween: 15 },
                768: { slidesPerView: 2.5, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 25 },
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
        bannerSrc="/product-12.jpeg"
        bannerAlt="Black Opium Offer"
        products={FREE_GIFT_PRODUCTS}
      />

      {/* Gifts With Purchase Section */}
      <section className="py-6 bg-white" dir="rtl">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-right w-full">
              اصدارات جديدة
            </h2>
          </div>

          <div className="relative">
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".new-releases-next",
                prevEl: ".new-releases-prev",
              }}
              spaceBetween={12}
              slidesPerView={2}
              breakpoints={{
                480: { slidesPerView: 2, spaceBetween: 15 },
                768: { slidesPerView: 2.5, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 20 },
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
            <button className="new-releases-prev absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#656e77]/90 md:bg-[#656e77] flex items-center justify-center text-white hover:bg-black transition-all shadow-[0_2px_8px_rgba(0,0,0,0.15)] disabled:hidden">
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button className="new-releases-next absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#656e77]/90 md:bg-[#656e77] flex items-center justify-center text-white hover:bg-black transition-all shadow-[0_2px_8px_rgba(0,0,0,0.15)] disabled:hidden">
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Balmy Special Collection */}
      <ProductSection
        title="توليفات بالمي الفاخرة"
        bannerSrc="/product-28.jpeg"
        bannerAlt="Balmy Luxury Collection"
        products={ISSEY_PRODUCTS}
      />


      {/* Most Popular Products Section */}
      <section className="py-4 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-right w-full">
              الأكثر مبيعاً
            </h2>
            <button className="text-sm font-bold shrink-0 whitespace-nowrap text-black  transition-all">
              عرض الكل
            </button>
          </div>

          <div className="relative">
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".bestseller-next",
                prevEl: ".bestseller-prev",
              }}
              spaceBetween={12}
              slidesPerView={2}
              breakpoints={{
                480: { slidesPerView: 2.5, spaceBetween: 15 },
                768: { slidesPerView: 3, spaceBetween: 20 },
                1024: { slidesPerView: 4, spaceBetween: 20 },
                1280: { slidesPerView: 5, spaceBetween: 20 },
              }}
              className="!px-1"
            >
              {NEW_ARRIVALS.map((product, index) => (
                <SwiperSlide key={index}>
                  <ProductCard id={`prod_${index}`} {...product} />
                </SwiperSlide>
              ))}
            </Swiper>
            <button className="bestseller-prev absolute -right-2 md:right-[-25px] top-[40%] -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-gray-800 hover:bg-[#8c1d3b] hover:text-white transition-all shadow-lg border border-white/30 disabled:hidden">
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button className="bestseller-next absolute -left-2 md:left-[-25px] top-[40%] -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-gray-800 hover:bg-[#8c1d3b] hover:text-white transition-all shadow-lg border border-white/30 disabled:hidden">
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Gifts With Purchase Section */}
      <section className="py-6 bg-white" dir="rtl">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl text-[15px] md:text-[22px] font-black tracking-tight text-right w-full">
              اكتشفوا عالمًا من الخدمه
            </h2>

          </div>

          <div className="relative">
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".services-next",
                prevEl: ".services-prev",
              }}
              spaceBetween={12}
              slidesPerView={2}
              breakpoints={{
                480: { slidesPerView: 2, spaceBetween: 15 },
                768: { slidesPerView: 2.5, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 20 },
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
            <button className="services-prev absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#656e77]/90 md:bg-[#656e77] flex items-center justify-center text-white hover:bg-black transition-all shadow-[0_2px_8px_rgba(0,0,0,0.15)] disabled:hidden">
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button className="services-next absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#656e77]/90 md:bg-[#656e77] flex items-center justify-center text-white hover:bg-black transition-all shadow-[0_2px_8px_rgba(0,0,0,0.15)] disabled:hidden">
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* <section className="py-6 bg-white" dir="rtl">
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
              breakpoints={{
                480: { slidesPerView: 2.5, spaceBetween: 15 },
                768: { slidesPerView: 4, spaceBetween: 20 },
                1024: { slidesPerView: 5, spaceBetween: 20 },
                1280: { slidesPerView: 6, spaceBetween: 20 },
              }}
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
            <button className="around-prev absolute -right-2 md:right-[-25px] top-[40%] -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-gray-800 hover:bg-[#8c1d3b] hover:text-white transition-all shadow-lg border border-white/30 disabled:hidden">
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button className="around-next absolute -left-2 md:left-[-25px] top-[40%] -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-gray-800 hover:bg-[#8c1d3b] hover:text-white transition-all shadow-lg border border-white/30 disabled:hidden">
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </section>

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
                nextEl: ".global-next",
                prevEl: ".global-prev",
              }}
              spaceBetween={12}
              slidesPerView={2}
              breakpoints={{
                480: { slidesPerView: 2.5, spaceBetween: 15 },
                768: { slidesPerView: 3, spaceBetween: 20 },
                1024: { slidesPerView: 4, spaceBetween: 20 },
                1280: { slidesPerView: 5, spaceBetween: 20 },
              }}
              className="!px-1"
            >
              {NEW_ARRIVALS.map((product, index) => (
                <SwiperSlide key={index}>
                  <ProductCard id={`prod_${index}`} {...product} />
                </SwiperSlide>
              ))}
            </Swiper>
            <button className="global-prev absolute -right-2 md:right-[-25px] top-[40%] -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-gray-800 hover:bg-[#8c1d3b] hover:text-white transition-all shadow-lg border border-white/30 disabled:hidden">
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button className="global-next absolute -left-2 md:left-[-25px] top-[40%] -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-gray-800 hover:bg-[#8c1d3b] hover:text-white transition-all shadow-lg border border-white/30 disabled:hidden">
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </section> */}


      {/* Laila AI Advisor Banner */}
      {/* <section className="py-2 md:py-6 bg-white" dir="rtl">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <a href="#" className="block w-full rounded-[8px] overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-shadow">
            <img
              src="/download.jpeg"
              alt="مرحباً أنا ليلى مستشارتكم الجمالية الذكية"
              className="w-full h-[180px] md:h-auto object-cover object-left md:object-center transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </a>
        </div>
      </section> */}

      {/* FAQ Section */}
      <FAQ />

      {/* SEO Text Block */}
      {/* <section className="py-12 bg-[#f9f9f9]" dir="rtl">
        <div className="max-w-[1000px] mx-auto px-4 md:px-6 text-center">
          <h2 className="text-xl md:text-2xl font-black mb-4 text-[#153428]">
            تسوق من المعرض المثالي لمستحضرات الجمال و العناية في السعودية
          </h2>
          <p className="text-[13px] md:text-[14px] text-gray-700 leading-relaxed mb-4">
            بالمي هي الوجهة الرائدة في عالم العطور الفاخرة، نقدم تشكيلة متنوعة من أحدث عطور النيش والعطور العالمية لتناسب جميع الأذواق في المنطقة.
          </p>
          <p className="text-[13px] md:text-[14px] text-gray-700 leading-relaxed mb-4">
            مع خبرة 20 عاماً في الشرق الأوسط وسوق الخليج، لدينا 85 متجراً في 9 دول (الإمارات العربية المتحدة و الكويت و المملكة العربية السعودية و مصر و لبنان و قطر و المزيد) عدا عن تواجدنا الدائم على الموقع الإلكتروني.
          </p>
          <a href="#" className="text-[14px] font-black underline text-[#153428] hover:opacity-80 transition-opacity">
            اكتشفوا عالم الجمال
          </a>
        </div>
      </section> */}

      <Footer />
    </main>
  );
}
