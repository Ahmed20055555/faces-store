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

const NEW_ARRIVALS = [
  { id: "5", name: "أرماني كود الجديد", price: "410", image: "https://images.unsplash.com/photo-1595475241949-0f02b288d61a?auto=format&fit=crop&q=80&w=400", brand: "Armani", rating: 5 },
  { id: "6", name: "عطر ايف سان لوران", price: "480", image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&q=80&w=400", brand: "YSL", rating: 4.9 },
];

export default function NewArrivalsPage() {
  return (
    <main className="min-h-screen bg-white" dir="rtl">
      <Navbar />
      <div className="pt-8 pb-8 max-w-[1400px] mx-auto px-4 md:px-12">
        <h1 className="text-xl md:text-3xl font-black mb-8 text-right">وصل حديثاً</h1>
        <div className="w-full mt-4 relative pb-20">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={12}
            slidesPerView={2}
            navigation={{
              nextEl: '.new-arrivals-next',
              prevEl: '.new-arrivals-prev',
            }}
            pagination={{ 
              clickable: true,
              el: '.new-arrivals-pagination'
            }}
            breakpoints={{
              480: { slidesPerView: 2, spaceBetween: 15 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 25 },
            }}
            className="w-full new-arrivals-swiper"
          >
            {NEW_ARRIVALS.map(product => (
              <SwiperSlide key={product.id}>
                <ProductCard {...product} />
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom Navigation Arrows */}
          <button className="new-arrivals-prev absolute -right-2 md:right-[-25px] top-[40%] -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-black hover:text-white transition-all shadow-[0_4px_12px_rgba(0,0,0,0.12)] border border-gray-100 disabled:opacity-0">
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button className="new-arrivals-next absolute -left-2 md:left-[-25px] top-[40%] -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-black hover:text-white transition-all shadow-[0_4px_12px_rgba(0,0,0,0.12)] border border-gray-100 disabled:opacity-0">
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Custom Pagination Dots Container - Pushed down */}
          <div className="new-arrivals-pagination flex justify-center gap-1.5 mt-12 !static"></div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
