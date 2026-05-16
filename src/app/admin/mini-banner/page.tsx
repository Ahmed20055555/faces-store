"use client";

import React, { useState } from "react";
import { Save, Palette } from "lucide-react";

export default function MiniBannerPage() {
  const [data, setData] = useState({
    title: "توصيل مجاني خلال ساعتين",
    subtitle: "في الرياض عند الطلب قبل 8 مساءً",
    bgColor: "#aed2b4",
    textColor: "#0b412b",
    isActive: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Mini Banner Data:", data);
    alert("تم حفظ إعدادات البانر بنجاح!");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-[1600px] mx-auto animate-in fade-in duration-700 space-y-6 md:space-y-10 px-4 py-8 md:pb-20 font-sans" dir="rtl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">البانر الصغير</h1>
          <p className="text-[10px] md:text-sm font-bold text-gray-400 mt-1 uppercase tracking-[0.2em]">Secondary Banner Promotion</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl md:rounded-2xl border border-gray-100 shadow-sm self-start">
          <div className="w-2 h-2 rounded-full bg-[#5a8a6a] animate-pulse"></div>
          <span className="text-[10px] md:text-[12px] font-black text-gray-700">وضع التحرير المباشر</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-start">
        {/* Editor Form */}
        <div className="bg-white p-5 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-gray-200 shadow-sm space-y-6">
          <h3 className="text-md md:text-lg font-black text-gray-900 border-b border-gray-50 pb-4">الإعدادات</h3>
          
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] md:text-[11px] font-black text-gray-400 uppercase tracking-widest">العنوان الرئيسي</label>
              <input
                type="text"
                name="title"
                value={data.title}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl md:rounded-2xl px-4 py-3 md:px-5 md:py-3.5 text-[13px] md:text-sm font-black focus:bg-white focus:ring-4 focus:ring-[#accfad]/10 transition-all outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] md:text-[11px] font-black text-gray-400 uppercase tracking-widest">العنوان الفرعي</label>
              <input
                type="text"
                name="subtitle"
                value={data.subtitle}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl md:rounded-2xl px-4 py-3 md:px-5 md:py-3.5 text-[13px] md:text-sm font-bold focus:bg-white focus:ring-4 focus:ring-[#accfad]/10 transition-all outline-none"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <label className="text-[10px] md:text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Palette size={12} /> الخلفية
                </label>
                <input type="color" name="bgColor" value={data.bgColor} onChange={handleChange} className="w-full h-[45px] md:h-[52px] rounded-xl md:rounded-2xl cursor-pointer border border-gray-100 p-1 bg-gray-50" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] md:text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Palette size={12} /> لون النص
                </label>
                <input type="color" name="textColor" value={data.textColor} onChange={handleChange} className="w-full h-[45px] md:h-[52px] rounded-xl md:rounded-2xl cursor-pointer border border-gray-100 p-1 bg-gray-50" />
              </div>
            </div>
          </div>
          
          <button type="submit" className="w-full bg-black text-white py-4 rounded-xl md:rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-xl shadow-black/10">
            <Save size={18} />
            حفظ إعدادات البانر
          </button>
        </div>

        {/* Live Mockup */}
        <div className="flex flex-col items-center justify-center bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 border border-gray-100 relative group overflow-hidden min-h-[250px] md:min-h-[300px]">
           <div className="absolute top-4 right-4 text-[9px] font-black text-gray-300 uppercase tracking-widest">Mockup Preview</div>
           <div 
              className="w-full max-w-sm rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 text-center shadow-xl md:shadow-2xl transition-all duration-700 animate-in zoom-in h-fit"
              style={{ backgroundColor: data.bgColor, color: data.textColor }}
           >
              <h4 className="font-black text-base md:text-xl mb-2 md:mb-3 tracking-tight leading-tight">{data.title}</h4>
              <p className="text-[10px] md:text-[12px] font-black opacity-80 uppercase tracking-widest">{data.subtitle}</p>
           </div>
        </div>
      </div>
    </form>
  );
}
