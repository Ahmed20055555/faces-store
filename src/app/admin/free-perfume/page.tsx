"use client";

import React, { useState, useRef } from "react";
import { Save, Gift, UploadCloud, Image as ImageIcon, Trash2 } from "lucide-react";

export default function FreePerfumePage() {
  const [data, setData] = useState({
    title: "مجاناً عطر بالحجم الكامل",
    bannerAlt: "Black Opium Offer Banner",
    bannerImage: "",
    isActive: true,
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setData((prev) => ({ ...prev, bannerImage: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      handleImageUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeImage = () => {
    setData((prev) => ({ ...prev, bannerImage: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Free Perfume Data:", data);
    alert("تم حفظ بيانات العرض الترويجي!");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-[1600px] mx-auto animate-in fade-in duration-700 space-y-6 md:space-y-10 px-4 py-8 md:pb-20 font-sans" dir="rtl">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">عرض العطر المجاني</h1>
          <p className="text-[10px] md:text-sm font-bold text-gray-400 mt-1 uppercase tracking-[0.2em]">Promotional Gift Banner</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl md:rounded-2xl border border-gray-100 shadow-sm self-start">
          <div className="w-2 h-2 rounded-full bg-[#5a8a6a] animate-pulse"></div>
          <span className="text-[10px] md:text-[12px] font-black text-gray-700">وضع التحرير المباشر</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-start">
        
        {/* Editor Panel */}
        <div className="bg-white p-5 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-gray-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-gray-50 pb-4">
            <h3 className="text-base md:text-lg font-black text-gray-900 tracking-tight flex items-center gap-2">
              <Gift size={20} className="text-[#accfad]" />
              إعدادات العرض الترويجي
            </h3>
            <button
              type="button"
              onClick={() => setData(prev => ({ ...prev, isActive: !prev.isActive }))}
              className={`w-12 h-6 md:w-14 md:h-7 rounded-full transition-all relative ${data.isActive ? "bg-[#accfad]" : "bg-gray-200"} shrink-0`}
            >
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${data.isActive ? "right-0.5" : "right-6 md:right-8"}`} />
            </button>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] md:text-[11px] font-black text-gray-400 uppercase tracking-widest">عنوان العرض</label>
              <input 
                type="text" 
                name="title" 
                value={data.title} 
                onChange={handleChange} 
                className="w-full bg-gray-50 border border-gray-100 rounded-xl md:rounded-2xl px-4 py-3 md:px-5 md:py-3.5 text-[13px] md:text-sm font-black focus:bg-white focus:ring-4 focus:ring-[#accfad]/10 transition-all outline-none" 
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-[10px] md:text-[11px] font-black text-gray-400 uppercase tracking-widest">صورة البانر</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-gray-200 rounded-2xl md:rounded-[2rem] p-6 md:p-8 flex flex-col items-center justify-center gap-3 bg-gray-50 hover:bg-white hover:border-[#accfad] transition-all cursor-pointer group relative overflow-hidden min-h-[160px] md:min-h-[200px]"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => { const file = e.target.files?.[0]; if (file) handleImageUpload(file); }}
                />

                {data.bannerImage ? (
                  <>
                    <img src={data.bannerImage} alt="Banner" className="w-full h-full object-cover absolute inset-0" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                      <div className="bg-white/90 backdrop-blur-md rounded-full px-4 py-1.5 flex items-center gap-2">
                        <UploadCloud size={14} className="text-[#accfad]" />
                        <span className="text-[10px] font-black text-gray-800">تغيير الصورة</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <UploadCloud size={32} className="text-gray-300 group-hover:text-[#accfad] transition-colors" />
                    <p className="text-[11px] font-black text-gray-600 tracking-tighter text-center">
                      اضغط أو اسحب صورة هنا
                      <br/>
                      <span className="text-[9px] text-gray-400">المقاس المثالي: 1200x400px</span>
                    </p>
                  </>
                )}
              </div>

              {data.bannerImage && (
                <button
                  type="button"
                  onClick={removeImage}
                  className="flex items-center gap-1.5 text-[11px] font-bold text-red-400 hover:text-red-600 transition-colors mt-2"
                >
                  <Trash2 size={13} />
                  حذف الصورة
                </button>
              )}
            </div>
          </div>

          <button type="submit" className="w-full bg-black text-white py-4 rounded-xl md:rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-xl shadow-black/10">
            <Save size={18} />
            تحديث بيانات العرض
          </button>
        </div>

        {/* Live Mockup */}
        <div className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-gray-200 shadow-sm relative overflow-hidden h-fit self-start min-h-[250px] md:min-h-[350px] flex flex-col justify-center">
           <div className="absolute top-4 right-4 text-[9px] font-black text-gray-200 uppercase tracking-widest">Mockup Preview</div>
           <div className="w-full space-y-4 md:space-y-6 mt-4">
             <h4 className="text-base md:text-2xl font-black text-gray-900 tracking-tight text-center">{data.title}</h4>
             <div className="w-full aspect-[16/9] sm:aspect-[21/9] bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center border border-gray-50 relative">
                {data.bannerImage ? (
                  <img src={data.bannerImage} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <ImageIcon size={40} className="text-gray-200 opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#accfad]/5 to-transparent"></div>
                  </>
                )}
             </div>
             <div className={`text-center text-[9px] font-black uppercase tracking-widest ${data.isActive ? "text-[#accfad]" : "text-red-400"}`}>
               {data.isActive ? "● العرض مفعّل في المتجر" : "● العرض متوقف"}
             </div>
           </div>
        </div>

      </div>

    </form>
  );
}
