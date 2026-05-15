"use client";

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ChevronRight, ChevronLeft } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const OFFERS = [
  { id: "off1", brand: "لانكوم", name: "عطر لا في إي بيل", price: "399", oldPrice: "520", discountBadge: "خصم 23%", image: "/001717728336_1.jpg", hasGift: true },
  { id: "off2", brand: "إيف سان لوران", name: "ليبر لو بارفان", price: "450", oldPrice: "580", discountBadge: "خصم 22%", image: "/001717728336_1.jpg" },
  { id: "off3", brand: "جورجو أرماني", name: "عطر سي باسيوني", price: "410", oldPrice: "500", discountBadge: "خصم 18%", image: "/001717728336_1.jpg", isNew: true },
  { id: "off4", brand: "فالنتينو", name: "عطر دونا بورن إن روما", price: "480", oldPrice: "600", discountBadge: "خصم 20%", image: "/001717728336_1.jpg" },
  { id: "off5", brand: "ديور", name: "عطر جادور", price: "550", oldPrice: "680", discountBadge: "خصم 19%", image: "/001717728336_1.jpg", hasGift: true },
  { id: "off6", brand: "شانيل", name: "كوكو مدموزيل", price: "620", oldPrice: "750", discountBadge: "خصم 17%", image: "/001717728336_1.jpg" },
  { id: "off7", brand: "توم فورد", name: "بلاك أوركيد", price: "590", oldPrice: "720", discountBadge: "خصم 18%", image: "/001717728336_1.jpg" },
  { id: "off8", brand: "جيفنشي", name: "عطر لانتيردي", price: "380", oldPrice: "480", discountBadge: "خصم 21%", image: "/001717728336_1.jpg" },
  { id: "off9", brand: "كارولينا هيريرا", name: "جود جيرل", price: "430", oldPrice: "550", discountBadge: "خصم 22%", image: "/001717728336_1.jpg", hasGift: true },
  { id: "off10", brand: "باكو رابان", name: "عطر ون مليون", price: "350", oldPrice: "450", discountBadge: "خصم 22%", image: "/001717728336_1.jpg" },
  { id: "off11", brand: "فيرساتشي", name: "إيروس", price: "299", oldPrice: "400", discountBadge: "خصم 25%", image: "/001717728336_1.jpg" },
  { id: "off12", brand: "دولتشي أند غابانا", name: "ذا ون", price: "340", oldPrice: "450", discountBadge: "خصم 24%", image: "/001717728336_1.jpg", isNew: true },
];

export default function OffersPage() {
  return (
    <div className="min-h-screen bg-gray-50 dir-rtl font-tajawal flex flex-col">
      <Navbar />
      
      <div className="flex-1 pb-12">
        {/* Banner Section */}
        <div className="w-full bg-[#8c1d3b] text-white py-12 md:py-20 mb-10 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full translate-y-1/3 -translate-x-1/3 blur-3xl"></div>
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-2xl md:text-5xl font-black mb-4">العروض الحصرية</h1>
            <p className="text-sm md:text-xl text-white/80 max-w-2xl mx-auto">
              اكتشف أقوى الخصومات على تشكيلة واسعة من أرقى العطور. عروض لفترة محدودة!
            </p>
          </div>
        </div>

        {/* Filters and Grid */}
        <div className="container mx-auto px-4 max-w-[1400px]">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg md:text-xl font-bold text-[#2B3440] mb-4 md:mb-0">
              جميع العروض ({OFFERS.length} منتج)
            </h2>
            
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 custom-scrollbar">
              <button className="whitespace-nowrap px-4 py-2 bg-[#8c1d3b] text-white rounded-full text-sm font-bold">الكل</button>
              <button className="whitespace-nowrap px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full text-sm font-bold transition-colors">عطور نسائية</button>
              <button className="whitespace-nowrap px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full text-sm font-bold transition-colors">عطور رجالية</button>
            </div>
          </div>

          <div className="w-full mt-4 relative pb-20">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={12}
              slidesPerView={2}
              navigation={{
                nextEl: '.offers-next',
                prevEl: '.offers-prev',
              }}
              pagination={{ 
                clickable: true,
                el: '.offers-pagination'
              }}
              breakpoints={{
                480: { slidesPerView: 2, spaceBetween: 15 },
                768: { slidesPerView: 3, spaceBetween: 20 },
                1024: { slidesPerView: 4, spaceBetween: 25 },
                1280: { slidesPerView: 5, spaceBetween: 25 },
              }}
              className="w-full offers-swiper"
            >
              {OFFERS.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard {...product} />
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* Custom Navigation Arrows */}
            <button className="offers-prev absolute -right-2 md:right-[-25px] top-[40%] -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-black hover:text-white transition-all shadow-[0_4px_12px_rgba(0,0,0,0.12)] border border-gray-100 disabled:opacity-0">
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button className="offers-next absolute -left-2 md:left-[-25px] top-[40%] -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-black hover:text-white transition-all shadow-[0_4px_12px_rgba(0,0,0,0.12)] border border-gray-100 disabled:opacity-0">
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Custom Pagination Dots Container - Pushed down */}
            <div className="offers-pagination flex justify-center gap-1.5 mt-12 !static"></div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
