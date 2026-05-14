"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Users, Stars, Coffee, Copy, Check, Gift } from "lucide-react";

const RECIPIENTS = [
  {
    id: "mother",
    label: "الأم",
    icon: Heart,
    desc: "لمن هي أغلى من الروح",
    products: [
      { id: "gm1", name: "ديور جادور", price: "540", image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&q=80&w=400", brand: "Dior" },
      { id: "gm2", name: "لانكوم لا في إي بيل", price: "430", image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=400", brand: "Lancôme" }
    ]
  },
  {
    id: "lover",
    label: "الحبيبة",
    icon: Stars,
    desc: "لشريكة الدرب والروح",
    products: [
      { id: "gm3", name: "إيف سان لوران ليبر", price: "480", image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&q=80&w=400", brand: "YSL" },
      { id: "gm4", name: "توم فورد بلاك أوركيد", price: "680", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=400", brand: "Tom Ford" }
    ]
  },
  {
    id: "friend",
    label: "الصديق",
    icon: Users,
    desc: "لرفيق الأيام والمواقف",
    products: [
      { id: "gm5", name: "ديور سوفاج", price: "450", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=400", brand: "Dior" },
      { id: "gm6", name: "شانيل بلو", price: "520", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=400", brand: "Chanel" }
    ]
  },
  {
    id: "father",
    label: "الأب",
    icon: Coffee,
    desc: "للقدوة وفخر العائلة",
    products: [
      { id: "gm7", name: "توم فورد عود وود", price: "920", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=400", brand: "Tom Ford" },
      { id: "gm8", name: "أرماني كود", price: "410", image: "https://images.unsplash.com/photo-1595475241949-0f02b288d61a?auto=format&fit=crop&q=80&w=400", brand: "Armani" }
    ]
  }
];

export default function GiftingMatchPage() {
  const [selected, setSelected] = useState(RECIPIENTS[0]);

  return (
    <main className="min-h-screen bg-white" dir="rtl">
      <Navbar />

      <section className="pt-8 pb-8 px-4">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8c1d3b]/5 text-[#8c1d3b] text-xs font-black uppercase tracking-widest border border-[#8c1d3b]/10">
              <Gift className="w-4 h-4" /> مساعد الهدايا الذكي
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">
              لمن هذه الهدية؟
            </h1>
            <p className="text-gray-500 text-lg font-medium">اختر الشخص، وسنتكفل نحن باختيار العطر والكلمات.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12 md:mb-20">
            {RECIPIENTS.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelected(item)}
                className={`p-4 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border-2 transition-all duration-300 text-center space-y-2 md:space-y-4 ${selected.id === item.id
                    ? "bg-[#8c1d3b] border-[#8c1d3b] text-white shadow-2xl scale-105"
                    : "bg-white border-gray-50 text-gray-400 hover:border-[#8c1d3b]/20 hover:text-gray-900"
                  }`}
              >
                <item.icon className={`w-6 h-6 md:w-10 md:h-10 mx-auto ${selected.id === item.id ? "animate-pulse" : ""}`} />
                <div>
                  <h3 className="text-sm md:text-lg font-black">{item.label}</h3>
                  <p className={`text-[8px] md:text-[10px] font-bold ${selected.id === item.id ? "text-white/70" : "text-gray-400"}`}>{item.desc}</p>
                </div>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start"
            >
              <div className="lg:col-span-12 space-y-6 md:space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-2">
                  <h3 className="text-xl md:text-2xl font-black text-gray-900 text-center md:text-right">أفضل الترشيحات لـ {selected.label}</h3>
                  <span className="text-[#8c1d3b] font-black text-[10px] md:text-xs uppercase tracking-tighter bg-[#8c1d3b]/5 px-3 py-1 rounded-full">Verified Gift Choice</span>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                  {selected.products.map((p) => (
                    <ProductCard key={p.id} {...p} />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </main>
  );
}
