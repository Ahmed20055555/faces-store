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
    message: "إلى من علمتني معنى الحب، عطر يليق بنقاء قلبك وجمال روحك. كل عام وأنتِ جنتي.",
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
    message: "مع كل رشة من هذا العطر، تذكري أنكِ الشخص المفضل لقلبي دائماً وأبطلاً. أحبك.",
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
    message: "لأنك السند ورفيق الدرب، اخترت لك هذا العطر ليكون بصمتك في كل مكان نذهب إليه.",
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
    message: "إلى من جعلتني فخوراً دائماً، عطر يعكس هيبتك وفخامتك التي لا تضاهى. حفظك الله لنا.",
    products: [
      { id: "gm7", name: "توم فورد عود وود", price: "920", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=400", brand: "Tom Ford" },
      { id: "gm8", name: "أرماني كود", price: "410", image: "https://images.unsplash.com/photo-1595475241949-0f02b288d61a?auto=format&fit=crop&q=80&w=400", brand: "Armani" }
    ]
  }
];

export default function GiftingMatchPage() {
  const [selected, setSelected] = useState(RECIPIENTS[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selected.message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-white" dir="rtl">
      <Navbar />
      
      <section className="pt-32 pb-20 px-4">
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {RECIPIENTS.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelected(item)}
                className={`p-8 rounded-[2.5rem] border-2 transition-all duration-300 text-center space-y-4 ${
                  selected.id === item.id 
                  ? "bg-[#8c1d3b] border-[#8c1d3b] text-white shadow-2xl scale-105" 
                  : "bg-white border-gray-50 text-gray-400 hover:border-[#8c1d3b]/20 hover:text-gray-900"
                }`}
              >
                <item.icon className={`w-10 h-10 mx-auto ${selected.id === item.id ? "animate-pulse" : ""}`} />
                <div>
                   <h3 className="text-lg font-black">{item.label}</h3>
                   <p className={`text-[10px] font-bold ${selected.id === item.id ? "text-white/70" : "text-gray-400"}`}>{item.desc}</p>
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
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
            >
              <div className="lg:col-span-4 space-y-8">
                 <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                       <selected.icon className="w-32 h-32" />
                    </div>
                    <h4 className="text-[#8c1d3b] font-black text-sm mb-6 flex items-center gap-2">
                       <Check className="w-4 h-4" /> رسالة الهدية المقترحة:
                    </h4>
                    <p className="text-2xl font-serif italic text-gray-800 leading-relaxed mb-10">
                       "{selected.message}"
                    </p>
                    <button 
                      onClick={handleCopy}
                      className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 py-4 rounded-2xl font-black text-sm hover:bg-[#8c1d3b] hover:text-white transition-all shadow-sm"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? "تم النسخ!" : "نسخ الرسالة"}
                    </button>
                 </div>
              </div>

              <div className="lg:col-span-8 space-y-8">
                <div className="flex justify-between items-center px-4">
                   <h3 className="text-2xl font-black text-gray-900">أفضل الترشيحات لـ {selected.label}</h3>
                   <span className="text-[#8c1d3b] font-black text-xs uppercase tracking-tighter">Verified Gift Choice</span>
                </div>
                <div className="grid grid-cols-2 gap-8">
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
