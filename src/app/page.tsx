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
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Home() {
  const newArrivals = useSelector((state: RootState) => state.products.newArrivals);
  const springImages = useSelector((state: RootState) => state.products.springImages);
  const gwpImages = useSelector((state: RootState) => state.products.gwpImages);
  const freeGiftProducts = useSelector((state: RootState) => state.products.freeGiftProducts);
  const isseyProducts = useSelector((state: RootState) => state.products.isseyProducts);
  const aroundTheWorldBrands = useSelector((state: RootState) => state.products.aroundTheWorldBrands);
  const categories = useSelector((state: RootState) => state.products.categories);

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
              {categories.map((cat, i) => (
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
              {newArrivals.map((product, index) => (
                <SwiperSlide key={index}>
                  <ProductCard {...product} />
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
          <div className=" w-full bg-[#BE9D72] text-white rounded-[8px] p-4 text-center flex flex-col justify-center items-center min-h-[100px] shadow-sm">
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
              عطور اموج
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
              {springImages.map((imgSrc, index) => (
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
        title="عطور المشاهير"
        bannerSrc="/product-12.jpeg"
        bannerAlt="Black Opium Offer"
        products={freeGiftProducts}
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
              {gwpImages.map((imgSrc, index) => (
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
        title="اكتشف عطور بوووص"
        bannerSrc="/product-28.jpeg"
        bannerAlt="Balmy Luxury Collection"
        products={isseyProducts}
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
              {newArrivals.map((product, index) => (
                <SwiperSlide key={index}>
                  <ProductCard {...product} />
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
              عطور السهرات
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
              {gwpImages.map((imgSrc, index) => (
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


      <Footer />
    </main>
  );
}
