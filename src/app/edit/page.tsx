"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Quote, Calendar, Star, Sparkles } from "lucide-react";

const EDIT_THEME = {
  month: "مايو 2024",
  title: "همسات الربيع",
  desc: "هذا الشهر، اخترنا لكم مجموعة تحتفي بالطبيعة المتفتحة. روائح تجمع بين انتعاش الحمضيات ورقة الزهور البيضاء لتناسب الأجواء الدافئة والمتجددة."
};

const PICKS = [
  {
    id: "e1",
    product: { id: "p1", name: "شانيل غابرييل", price: "620", image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=400", brand: "Chanel", rating: 5 },
    reason: "اخترنا هذا العطر لأنه يجسد الأنوثة الطاغية برائحة الياسمين واليلانغ يلانغ. مثالي للصباحات المشرقة."
  },
  {
    id: "e2",
    product: { id: "p2", name: "توم فورد نيرولي", price: "780", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=400", brand: "Tom Ford", rating: 4.9 },
    reason: "انفجار من الانتعاش الإيطالي! إنه العطر الذي تحتاجه لتشعر ببرودة البحر في عز الصيف."
  },
  {
    id: "e3",
    product: { id: "p3", name: "ديور جادور", price: "540", image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&q=80&w=400", brand: "Dior", rating: 4.8 },
    reason: "كلاسيكية لا تموت. باقة ذهبية من الزهور تمنحك شعوراً بالفخامة الفورية في أي مناسبة مسائية."
  }
];

export default function TheEditPage() {
  return (
    <main className="min-h-screen bg-white text-right" dir="rtl">
      <Navbar />
      
      <section className="pt-32 pb-24 border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8c1d3b] text-white text-[10px] font-black tracking-widest uppercase">
              <Calendar className="w-3 h-3" /> إصدار {EDIT_THEME.month}
            </div>
            <h1 className="text-5xl md:text-8xl font-serif italic text-gray-900 leading-tight">
               The Edit <span className="text-[#8c1d3b]">.</span>
            </h1>
            <h2 className="text-3xl md:text-4xl font-black text-gray-800">"{EDIT_THEME.title}"</h2>
            <p className="text-xl text-gray-500 font-medium leading-relaxed">
              {EDIT_THEME.desc}
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-4 md:px-12 space-y-32">
          {PICKS.map((pick, index) => (
            <div key={pick.id} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24`}>
              <div className="w-full md:w-1/2 relative">
                 <div className="absolute inset-0 bg-[#8c1d3b]/5 -rotate-3 rounded-[3rem] -z-10" />
                 <div className="p-8">
                    <ProductCard {...pick.product} />
                 </div>
                 <div className="absolute -bottom-6 -right-6 md:-right-12 bg-white p-6 shadow-2xl rounded-3xl border border-gray-50 max-w-[200px] hidden md:block">
                    <div className="flex items-center gap-2 text-amber-500 mb-2">
                       <Star className="w-4 h-4 fill-amber-500" />
                       <span className="text-xs font-black text-gray-900 uppercase">Editor's Pick</span>
                    </div>
                    <p className="text-[11px] font-bold text-gray-400 italic">"عطر استثنائي يستحق أن يكون رفيقك هذا الشهر."</p>
                 </div>
              </div>

              <div className="w-full md:w-1/2 space-y-8">
                <div className="w-16 h-1 bg-[#8c1d3b]" />
                <Quote className="w-12 h-12 text-[#8c1d3b]/20 rotate-180" />
                <h3 className="text-3xl font-black text-gray-900 leading-tight">لماذا اخترنا {pick.product.brand}؟</h3>
                <p className="text-xl text-gray-600 leading-relaxed font-medium">
                  {pick.reason}
                </p>
                <button className="px-8 py-4 bg-black text-white rounded-full font-black text-sm hover:bg-gray-800 transition-all flex items-center gap-3">
                   <Sparkles className="w-4 h-4 text-amber-400" /> تسوق المجموعة كاملة
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
