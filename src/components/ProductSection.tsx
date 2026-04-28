"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ProductCard from "@/components/ProductCard";

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
            <div className="relative w-full aspect-square md:aspect-auto md:h-full bg-gray-50 rounded-[4px] overflow-hidden">
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
            <div className="md:hidden relative w-full pb-4">
              <Swiper
                spaceBetween={12}
                slidesPerView={1.5}
                breakpoints={{ 480: { slidesPerView: 2.2, spaceBetween: 15 } }}
                className="!px-1"
              >
                {products.map((prod, idx) => (
                  <SwiperSlide key={idx}>
                    <ProductCard {...prod} />
                  </SwiperSlide>
                ))}
              </Swiper>
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
