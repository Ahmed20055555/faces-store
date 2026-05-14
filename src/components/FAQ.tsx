"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQ_DATA = [
  {
    question: "كيف يمكنني إتمام الطلب من الموقع؟",
    answer: "الأمر بسيط جداً! اختر المنتجات التي تعجبك وأضفها إلى سلة التسوق، ثم اضغط على زر 'إتمام الشراء'. قم بتعبئة بيانات التوصيل واختر طريقة الدفع المفضلة لديك، وسيصلك تأكيد الطلب فوراً عبر البريد الإلكتروني.",
  },
  {
    question: "ما هي طرق الدفع المتاحة؟",
    answer: "نحن نوفر لك خيارات دفع آمنة ومتنوعة تشمل: مدى (Mada)، فيزا (Visa)، ماستركارد (MasterCard)، أبل باي (Apple Pay)، بالإضافة إلى خدمة الدفع عند الاستلام في معظم مدن المملكة.",
  },
  {
    question: "كم تستغرق مدة الشحن والتوصيل؟",
    answer: "نحرص على توصيل طلباتكم في أسرع وقت ممكن! التوصيل داخل الرياض غالباً ما يكون خلال 24 ساعة، وباقي مدن المملكة خلال 2-4 أيام عمل. نوفر أيضاً خدمة التوصيل السريع في نفس اليوم لبعض المناطق.",
  },
  {
    question: "هل المنتجات المعروضة أصلية؟",
    answer: "نعم، جميع منتجاتنا أصلية 100٪ ومضمونة. نحن نتعامل مباشرة مع الوكلاء الرسميين والماركات العالمية لضمان أعلى معايير الجودة لعملائنا.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 bg-white" dir="rtl">
      <div className="max-w-[800px] mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-100 text-[#8c1d3b] text-xs font-black mb-4">
            <HelpCircle className="w-3.5 h-3.5" /> الأسئلة الشائعة
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">لديك استفسار؟ نحن هنا للإجابة</h2>
          <p className="text-gray-500 text-sm">كل ما تحتاج معرفته عن تجربة التسوق في وجوه</p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQ_DATA.map((item, index) => (
            <div 
              key={index}
              className={`border rounded-2xl transition-all duration-300 ${
                openIndex === index ? "border-[#8c1d3b] bg-[#8c1d3b]/[0.02] shadow-sm" : "border-gray-100 bg-gray-50 hover:border-gray-200"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-right outline-none group"
              >
                <span className={`text-[15px] font-black transition-colors ${
                  openIndex === index ? "text-[#8c1d3b]" : "text-gray-900 group-hover:text-[#8c1d3b]"
                }`}>
                  {item.question}
                </span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180 text-[#8c1d3b]" : "text-gray-400"
                }`} />
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
              }`}>
                <div className="px-6 pb-6 text-sm text-gray-600 leading-relaxed font-medium">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Support Footer */}
        <div className="mt-12 p-8 rounded-3xl bg-gray-900 text-center text-white relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-sm font-bold opacity-70 mb-2">لم تجد إجابة لسؤالك؟</p>
            <h4 className="text-xl font-black mb-6">فريق الدعم الفني متاح على مدار الساعة</h4>
            <button className="bg-white text-gray-900 px-8 py-3 rounded-full text-sm font-black hover:bg-[#8c1d3b] hover:text-white transition-all shadow-xl active:scale-95">
              تواصل معنا الآن
            </button>
          </div>
          {/* Abstract pattern decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-white/10 transition-all duration-700"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#8c1d3b]/30 rounded-full -ml-20 -mb-20 blur-3xl group-hover:bg-[#8c1d3b]/40 transition-all duration-700"></div>
        </div>
      </div>
    </section>
  );
}
