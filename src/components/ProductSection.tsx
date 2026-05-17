"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "@/components/ProductCard";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface Product {
  id?: string;
  brand: string;
  name: string;
  price: string;
  image: string;
  isNew?: boolean;
  hasGift?: boolean;
  hasFrom?: boolean;
}

interface ProductSectionProps {
  title: string;
  bannerSrc: string;
  bannerAlt: string;
  products: Product[];
}

/**
 * Renders a two-column layout: a banner image on the right and a product
 * grid (desktop) / swiper slider (mobile) on the left.
 */
const ProductSection = ({
  title,
  bannerSrc,
  bannerAlt,
  products,
}: ProductSectionProps) => {
  const nextClass = `ps-next-${title.replace(/\s+/g, "")}`;
  const prevClass = `ps-prev-${title.replace(/\s+/g, "")}`;

  return (
    <section className="py-6 bg-white" dir="rtl">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center mb-6 w-full gap-4">
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-right w-full">
            {title}
          </h2>
          <button className="text-[13px] md:text-sm font-bold shrink-0 whitespace-nowrap text-[#153428] hover:opacity-80 transition-all underline decoration-1 underline-offset-4">
            عرض الكل
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">

          {/* Right Side: Banner */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-right h-full">
            <div className="relative w-full aspect-square md:aspect-auto md:h-full bg-gray-50 rounded-[12px] md:rounded-[20px] overflow-hidden shadow-sm">
              <img
                src={bannerSrc}
                className="w-full h-full object-cover"
                alt={bannerAlt}
              />
            </div>
          </div>

          {/* Left Side: Product Grid (Desktop) / Slider (Mobile) */}
          <div className="flex flex-col h-full w-full overflow-hidden">
            {/* Mobile Slider */}
            <div className="md:hidden relative w-full pb-2 group">
              <Swiper
                modules={[Navigation]}
                navigation={{
                  nextEl: `.${nextClass}`,
                  prevEl: `.${prevClass}`,
                }}
                spaceBetween={12}
                slidesPerView={2}
                breakpoints={{ 480: { slidesPerView: 2.2, spaceBetween: 15 } }}
                className="!px-1"
              >
                {products.map((prod, idx) => (
                  <SwiperSlide key={idx}>
                    <ProductCard id={prod.id || `prod_${idx}`} {...prod} />
                  </SwiperSlide>
                ))}
              </Swiper>
              
              {/* Navigation Arrows (Subtle) */}
              <button className={`${prevClass} absolute right-0 top-[40%] -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-800 shadow-lg border border-gray-100 disabled:hidden active:scale-95 transition-all`}>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button className={`${nextClass} absolute left-0 top-[40%] -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-800 shadow-lg border border-gray-100 disabled:hidden active:scale-95 transition-all`}>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-3 gap-3 md:gap-4">
              {products.map((prod, idx) => (
                <ProductCard key={idx} id={prod.id || idx.toString()} {...prod} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProductSection;
