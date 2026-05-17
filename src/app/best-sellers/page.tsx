"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ChevronRight, ChevronLeft } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// سنستخدم بيانات تجريبية لهذه الصفحة
const BEST_SELLERS = [
  { id: "1", name: "عطر بالمي رويال سيجنتشر", price: "720", image: "/product-26.jpeg", brand: "بالمي | Balmy", rating: 5 },
  { id: "2", name: "عطر بالمي عود انتنس", price: "680", image: "/product-27.jpeg", brand: "بالمي | Balmy", rating: 4.9 },
  { id: "3", name: "عطر بالمي فيلفيت توباز", price: "850", image: "/product-28.jpeg", brand: "بالمي | Balmy", rating: 5 },
  { id: "4", name: "عطر بالمي لافندر سبريت", price: "460", image: "/product-1.jpeg", brand: "بالمي | Balmy", rating: 4.8 },
];

export default function BestSellersPage() {
  return (
    <main className="min-h-screen bg-white" dir="rtl">
      <Navbar />
      <div className="pt-8 pb-8 max-w-[1400px] mx-auto px-4 md:px-12">
        <h1 className="text-xl md:text-3xl font-black mb-8 text-right">الأكثر مبيعاً</h1>
        <div className="w-full mt-4 relative pb-20">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={12}
            slidesPerView={2}
            navigation={{
              nextEl: '.best-sellers-next',
              prevEl: '.best-sellers-prev',
            }}
            pagination={{ 
              clickable: true,
              el: '.best-sellers-pagination'
            }}
            breakpoints={{
              480: { slidesPerView: 2, spaceBetween: 15 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 25 },
            }}
            className="w-full best-sellers-swiper"
          >
            {BEST_SELLERS.map(product => (
              <SwiperSlide key={product.id}>
                <ProductCard {...product} imageFit="cover" />
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom Navigation Arrows */}
          <button className="best-sellers-prev absolute -right-2 md:right-[-25px] top-[40%] -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-transparent backdrop-blur-md flex items-center justify-center text-gray-800 hover:bg-[#8c1d3b] hover:text-white transition-all shadow-lg border border-white/30 disabled:opacity-0">
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button className="best-sellers-next absolute -left-2 md:left-[-25px] top-[40%] -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-transparent backdrop-blur-md flex items-center justify-center text-gray-800 hover:bg-[#8c1d3b] hover:text-white transition-all shadow-lg border border-white/30 disabled:opacity-0">
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Custom Pagination Dots Container - Pushed down */}
          <div className="best-sellers-pagination flex justify-center gap-1.5 mt-12 !static"></div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
