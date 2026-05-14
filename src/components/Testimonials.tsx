"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronRight, ChevronLeft, Quote } from "lucide-react";

const REVIEWS = [
  {
    name: "سارة الحربي",
    location: "الرياض",
    rating: 5,
    text: "الخدمة ممتازة ووصل الطلب بسرعة فائقة! العبوة كانت محكمة والعطر أصلي 100٪. سأتسوق منكم دائماً.",
    product: "عطر بلاك أوبيوم",
    avatar: "س",
  },
  {
    name: "محمد العتيبي",
    location: "جدة",
    rating: 5,
    text: "تجربة تسوق رائعة من البداية للنهاية. الموقع سهل الاستخدام والتوصيل في نفس اليوم. شكراً وجوه!",
    product: "عطر أرماني كود",
    avatar: "م",
  },
  {
    name: "نورة السلمي",
    location: "الدمام",
    rating: 5,
    text: "أفضل موقع عطور في السعودية! المنتجات أصلية والأسعار منافسة. التغليف فخم جداً.",
    product: "لانكوم آيدول",
    avatar: "ن",
  },
  {
    name: "خالد الدوسري",
    location: "الكويت",
    rating: 5,
    text: "طلبت هدية لزوجتي وفاجأتني بالتغليف الجميل والرسالة الشخصية. خدمة من الدرجة الأولى.",
    product: "إيف سان لوران",
    avatar: "خ",
  },
  {
    name: "ريم القحطاني",
    location: "أبوظبي",
    rating: 5,
    text: "وصل خلال 24 ساعة فقط! العطر بالضبط كما وصفوه. سعيدة جداً بالشراء وبالتأكيد سأعود.",
    product: "ميو ميو عطر",
    avatar: "ر",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i < count ? "text-amber-500 fill-amber-500" : "text-gray-200"}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className=" bg-white overflow-hidden border-t border-gray-50" dir="rtl">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
          <div className="text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-100 text-gray-600 text-xs font-bold mb-4">
              <span className="text-amber-500">★</span> آراء العملاء
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">ماذا يقول عملاؤنا</h2>
            <p className="text-gray-500 text-sm">
              ثقة أكثر من <span className="font-bold text-gray-900">50,000</span> عميل في جودة منتجاتنا
            </p>
          </div>

          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100 self-start">
            <span className="text-4xl font-black text-gray-900 leading-none">4.9</span>
            <div className="flex flex-col gap-1">
              <StarRating count={5} />
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">مبني على +2,400 تقييم</span>
            </div>
          </div>
        </div>

        {/* Swiper Slider */}
        <div className="relative group">
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              nextEl: ".testi-next",
              prevEl: ".testi-prev",
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            spaceBetween={20}
            slidesPerView={1.2}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 25 },
              1280: { slidesPerView: 4, spaceBetween: 25 },
            }}
            className="!pb-10"
          >
            {REVIEWS.map((review, i) => (
              <SwiperSlide key={i} className="!h-auto flex">
                <div className="h-full w-full bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-11 h-11 rounded-full bg-[#8c1d3b] text-white flex items-center justify-center font-black text-lg shadow-sm shrink-0">
                      {review.avatar}
                    </div>
                    <div className="flex-1 min-w-0 text-right">
                      <h4 className="text-[13px] font-black text-gray-900 truncate">{review.name}</h4>
                      <div className="flex items-center justify-start gap-1 text-[10px] text-gray-400 font-bold uppercase mt-0.5">
                        <span className="text-[#8c1d3b]">📍</span> {review.location}
                      </div>
                    </div>
                    <Quote className="w-6 h-6 text-gray-50 shrink-0 transform rotate-180" />
                  </div>
                  
                  <div className="mb-4 flex justify-start">
                    <StarRating count={review.rating} />
                  </div>
                  
                  <p className="text-[13px] text-gray-600 leading-relaxed mb-6 flex-1 italic text-right">
                    "{review.text}"
                  </p>

                  <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex flex-col text-right">
                      <span className="text-[9px] font-black text-gray-300 uppercase tracking-tighter">اشترى:</span>
                      <span className="text-[11px] font-black text-[#8c1d3b]">{review.product}</span>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center">
                      <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <button className="testi-prev absolute right-[-15px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-800 hover:bg-[#8c1d3b] hover:text-white transition-all duration-300  ">
            <ChevronRight className="w-5 h-5" />
          </button>
          <button className="testi-next absolute left-[-15px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-800 hover:bg-[#8c1d3b] hover:text-white transition-all duration-300  ">
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
