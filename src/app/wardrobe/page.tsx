"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Shirt, Briefcase, Moon, Sun, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STYLES = [
  { id: "casual", label: "كاجوال", icon: Shirt, desc: "عطور يومية منعشة تناسب الجينز والتيشيرت والطلعات اليومية." },
  { id: "formal", label: "فورمال (رسمي)", icon: Briefcase, desc: "عطور قوية وفخمة تناسب البدلات الرسمية والاجتماعات الهامة." },
  { id: "night", label: "ليلي / سهرات", icon: Moon, desc: "عطور دافئة وجذابة للسهرات والمناسبات الخاصة." },
  { id: "summer", label: "صيفي / منعش", icon: Sun, desc: "عطور خفيفة برائحة الحمضيات والبحر تناسب الأجواء الحارة." },
];

const WARDROBE_PRODUCTS: any = {
  casual: [
    { id: "w1", name: "عطر ديور سوفاج", price: "450", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=400", brand: "Dior", rating: 5 },
    { id: "w2", name: "شانيل بلو", price: "520", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=400", brand: "Chanel", rating: 4.8 },
  ],
  formal: [
    { id: "w3", name: "توم فورد بلاك أوركيد", price: "680", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=400", brand: "Tom Ford", rating: 4.9 },
    { id: "w4", name: "أرماني بريفيه", price: "890", image: "https://images.unsplash.com/photo-1595475241949-0f02b288d61a?auto=format&fit=crop&q=80&w=400", brand: "Armani", rating: 5 },
  ],
  night: [
    { id: "w5", name: "لانكوم لا في إي بيل", price: "430", image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=400", brand: "Lancôme", rating: 4.9 },
    { id: "w6", name: "واي ايف سان لوران", price: "510", image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&q=80&w=400", brand: "YSL", rating: 4.8 },
  ],
  summer: [
    { id: "w7", name: "أكوا دي جيو", price: "380", image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&q=80&w=400", brand: "Armani", rating: 4.7 },
    { id: "w8", name: "دولتشي آند غابانا لايت بلو", price: "360", image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=400", brand: "D&G", rating: 4.8 },
  ],
};

export default function WardrobePage() {
  const [activeStyle, setActiveStyle] = useState("casual");

  return (
    <main className="min-h-screen bg-white" dir="rtl">
      <Navbar />
      
      {/* Hero Header */}
      <section className="pt-8 pb-8 bg-gray-50 overflow-hidden relative">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12 relative z-10">
          <div className="max-w-3xl text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8c1d3b]/5 border border-[#8c1d3b]/10 text-[#8c1d3b] text-xs font-black mb-6">
              <Sparkles className="w-3.5 h-3.5" /> ميزة حصرية لمساعدتك في الاختيار
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              خزانة عطورك <span className="text-[#8c1d3b] font-serif italic">(The Wardrobe)</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed font-medium mb-12">
              العطر هو اللمسة الأخيرة لأناقتك. اختر "الستايل" الذي تلبسه اليوم، وسنخبرك بالعطور المثالية التي تكتمل بها إطلالتك.
            </p>
          </div>
        </div>
      </section>

      {/* Style Selector */}
      <section className="py-4 border-b border-gray-100 sticky top-20 bg-white z-40 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {STYLES.map((style) => (
              <button
                key={style.id}
                onClick={() => setActiveStyle(style.id)}
                className={`flex flex-col items-center gap-3 p-4 md:p-6 rounded-[2rem] transition-all duration-300 min-w-[120px] md:min-w-[180px] border-2 ${
                  activeStyle === style.id 
                  ? "bg-[#8c1d3b] border-[#8c1d3b] text-white shadow-xl scale-105" 
                  : "bg-white border-gray-50 text-gray-400 hover:border-[#8c1d3b]/20 hover:text-gray-900"
                }`}
              >
                <style.icon className={`w-8 h-8 ${activeStyle === style.id ? "animate-pulse" : ""}`} />
                <span className="font-black text-sm md:text-base">{style.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8 min-h-[600px]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12">
          <div className="text-center mb-8 max-w-xl mx-auto">
            <h3 className="text-2xl font-black text-gray-900 mb-4">
              إليك ما نقترحه لستايل <span className="text-[#8c1d3b]">{STYLES.find(s => s.id === activeStyle)?.label}</span>
            </h3>
            <p className="text-gray-500 font-medium">
              {STYLES.find(s => s.id === activeStyle)?.desc}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStyle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {WARDROBE_PRODUCTS[activeStyle].map((product: any) => (
                <div key={product.id} className="relative group">
                    <div className="absolute bottom-4 right-4 z-10 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-gray-100 min-w-[90px] flex items-center justify-between gap-3">
                       <span className="text-[10px] font-black text-gray-900 uppercase tracking-tighter">Perfect Match</span>
                       {React.createElement(STYLES.find(s => s.id === activeStyle)!.icon, { className: "w-3.5 h-3.5 text-[#8c1d3b]" })}
                    </div>
                   <ProductCard {...product} />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </main>
  );
}
