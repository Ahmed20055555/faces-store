"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "@/components/ProductCard";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface Product {
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
 * Extracts the duplicated pattern used in "Free Full Size Gift" and
 * "Brand of the Week" sections.
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
    <section className="py-12 bg-white" dir="rtl">
      <div className="max-w-[1400px] mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Right Side: Banner */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-right">
            <div className="flex justify-between items-center mb-4 w-full">
              <h2 className="text-xl md:text-[22px] font-black tracking-tight text-[#153428]">
                {title}
              </h2>
            </div>
            <div className="relative w-full aspect-[4/3] md:aspect-auto md:h-full bg-gray-50 rounded-[8px] overflow-hidden">
              <img
                src={bannerSrc}
                className="w-full h-full object-cover"
                alt={bannerAlt}
              />
            </div>
          </div>

          {/* Left Side: Product Grid (Desktop) / Slider (Mobile) */}
          <div className="flex flex-col h-full w-full pt-0 lg:pt-11 overflow-hidden">
            {/* Mobile Slider */}
            <div className="md:hidden relative w-full pb-4 group">
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
                    <ProductCard {...prod} />
                  </SwiperSlide>
                ))}
              </Swiper>
              <button className={`${prevClass} absolute right-0 top-[40%] -translate-y-1/2 z-10 w-6 h-6 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center text-gray-800 shadow-[0_2px_8px_rgba(0,0,0,0.15)]`}>
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              <button className={`${nextClass} absolute left-0 top-[40%] -translate-y-1/2 z-10 w-6 h-6 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center text-gray-800 shadow-[0_2px_8px_rgba(0,0,0,0.15)]`}>
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-3 gap-3 md:gap-4">
              {products.map((prod, idx) => (
                <ProductCard key={idx} {...prod} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
