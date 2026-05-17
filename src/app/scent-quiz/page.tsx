"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Sun, Moon, TreePine, Coffee, Heart, Share2, RefreshCw } from "lucide-react";

const QUESTIONS = [
  {
    id: 1,
    text: "ما هو وقتك المفضل في اليوم؟",
    options: [
      { id: "fresh", label: "الصباح الباكر", icon: Sun },
      { id: "oriental", label: "المساء الهادئ", icon: Coffee },
      { id: "woody", label: "منتصف الليل", icon: Moon },
    ]
  },
  {
    id: 2,
    text: "أين تقضي عطلتك المثالية؟",
    options: [
      { id: "fresh", label: "على الشاطئ", icon: Sparkles },
      { id: "woody", label: "في الغابة", icon: TreePine },
      { id: "oriental", label: "في مدينة صاخبة", icon: Heart },
    ]
  },
  {
    id: 3,
    text: "كيف تصف شخصيتك بكلمة واحدة؟",
    options: [
      { id: "fresh", label: "مفعم بالحيوية", icon: Sparkles },
      { id: "woody", label: "غامض وهادئ", icon: TreePine },
      { id: "oriental", label: "جريء وقوي", icon: Heart },
    ]
  }
];

const RESULTS: any = {
  fresh: {
    title: "Fresh & Citrus",
    desc: "أنت شخصية حيوية تحب الحرية والانطلاق. الروائح المنعشة من الحمضيات ونسيم البحر هي التي تعبر عن روحك.",
    products: [
      { id: "q1", name: "أكوا دي جيو", price: "380", image: "/product1.png", brand: "Armani", rating: 4.7 },
      { id: "q2", name: "دولتشي آند غابانا لايت بلو", price: "360", image: "/001717728336_1.jpg", brand: "D&G", rating: 4.8 },
    ]
  },
  woody: {
    title: "Mysterious Woody",
    desc: "أنت شخصية عميقة، رصينة وتحب الطبيعة. روائح الخشب والعود والجلود تمنحك الثقة والحضور الطاغي.",
    products: [
      { id: "q3", name: "توم فورد بلاك أوركيد", price: "680", image: "/add-1.jfif", brand: "Tom Ford", rating: 4.9 },
      { id: "q4", name: "عطر ديور سوفاج", price: "450", image: "/slider-1.jfif", brand: "Dior", rating: 5 },
    ]
  },
  oriental: {
    title: "Bold Oriental",
    desc: "أنت شخصية جريئة، دافئة وتحب لفت الأنظار. العطور الشرقية المليئة بالعنبر والتوابل والمسك هي رفيقك المثالي.",
    products: [
      { id: "q5", name: "لانكوم لا في إي بيل", price: "430", image: "/slider-2.png", brand: "Lancôme", rating: 4.9 },
      { id: "q6", name: "واي ايف سان لوران", price: "510", image: "/add-2.jfif", brand: "YSL", rating: 4.8 },
    ]
  }
};

export default function ScentQuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (type: string) => {
    const newAnswers = [...answers, type];
    setAnswers(newAnswers);
    
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const getWinnerType = () => {
    const counts: any = {};
    answers.forEach(a => counts[a] = (counts[a] || 0) + 1);
    return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
  };

  const restart = () => {
    setStep(0);
    setAnswers([]);
    setShowResult(false);
  };

  return (
    <main className="min-h-screen bg-white" dir="rtl">
      <Navbar />
      
      <section className="pt-8 pb-8 px-4">
        <div className="max-w-2xl mx-auto">
          {!showResult ? (
            <div className="text-center">
              <div className="mb-12">
                 <div className="w-full bg-gray-100 h-1 rounded-full mb-8">
                    <motion.div 
                      className="bg-[#8c1d3b] h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                    />
                 </div>
                 <span className="text-xs font-black text-[#8c1d3b] uppercase tracking-widest">السؤال {step + 1} من {QUESTIONS.length}</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-12"
                >
                  <h2 className="text-2xl md:text-4xl font-black text-gray-900 leading-tight">
                    {QUESTIONS[step].text}
                  </h2>

                  <div className="grid grid-cols-1 gap-4">
                    {QUESTIONS[step].options.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleAnswer(opt.id)}
                        className="group flex items-center justify-between p-6 rounded-3xl border-2 border-gray-50 hover:border-[#8c1d3b] hover:bg-gray-50 transition-all duration-300 text-right"
                      >
                        <div className="flex items-center gap-4">
                           <div className="p-3 rounded-2xl bg-gray-50 group-hover:bg-[#8c1d3b] group-hover:text-white transition-colors">
                              <opt.icon className="w-6 h-6" />
                           </div>
                           <span className="text-lg font-bold text-gray-800">{opt.label}</span>
                        </div>
                        <div className="w-6 h-6 rounded-full border-2 border-gray-200 group-hover:border-[#8c1d3b] group-hover:bg-[#8c1d3b] flex items-center justify-center transition-all">
                           <div className="w-2 h-2 rounded-full bg-white opacity-0 group-hover:opacity-100" />
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8 md:space-y-12"
            >
              <div className="bg-[#8c1d3b] text-white p-6 md:p-12 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 md:p-8 opacity-10">
                   <Sparkles className="w-16 h-16 md:w-32 md:h-32" />
                </div>
                <h4 className="text-[10px] md:text-sm font-black uppercase tracking-widest mb-3 md:mb-4 opacity-80">شخصيتك العطرية هي:</h4>
                <h2 className="text-2xl md:text-6xl font-black mb-4 md:mb-8 leading-tight">{RESULTS[getWinnerType()].title}</h2>
                <p className="text-sm md:text-lg leading-relaxed opacity-95 font-medium px-2 md:px-0">
                  {RESULTS[getWinnerType()].desc}
                </p>
                
                <div className="mt-8 md:mt-12 flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
                   <button className="flex items-center justify-center gap-2 bg-white text-[#8c1d3b] px-6 py-3.5 rounded-full font-black text-xs md:text-sm hover:bg-gray-100 transition-all shadow-lg">
                      <Share2 className="w-4 h-4" /> شارك النتيجة
                   </button>
                   <button onClick={restart} className="flex items-center justify-center gap-2 bg-black/20 text-white px-6 py-3.5 rounded-full font-black text-xs md:text-sm hover:bg-black/30 transition-all border border-white/10">
                      <RefreshCw className="w-4 h-4" /> إعادة الاختبار
                   </button>
                </div>
              </div>

              <div className="space-y-8">
                 <h3 className="text-xl md:text-2xl font-black text-gray-900">عطورنا المقترحة لك:</h3>
                 <div className="grid grid-cols-2 gap-6">
                    {RESULTS[getWinnerType()].products.map((p: any) => (
                      <ProductCard key={p.id} {...p} />
                    ))}
                 </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
