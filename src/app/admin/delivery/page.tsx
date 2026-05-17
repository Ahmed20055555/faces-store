"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Save, Image as ImageIcon, UploadCloud, Type, Truck } from "lucide-react";

export default function DeliveryBannerPage() {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      deliveryTitle: "توصيل مجاني خلال ساعتين في الرياض",
      deliverySubtitle: "عند الطلب قبل 8 مساءً",
      deliveryImage: "",
    }
  });

  const deliveryTitle = watch("deliveryTitle");
  const deliverySubtitle = watch("deliverySubtitle");
  const deliveryImage = watch("deliveryImage");

  const onSubmit = (data: any) => {
    console.log("Delivery Data to backend:", data);
    alert("تم حفظ البيانات وجاهزة للإرسال!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[1600px] mx-auto animate-in fade-in duration-700 space-y-12 pb-20 font-sans" dir="rtl">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* =========================================
            DELIVERY SETTINGS
        ========================================= */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-4 border-r-4 border-[#8c1d3b]">
            <h2 className="text-xl font-black text-gray-900 flex items-center gap-2"><Truck size={24} className="text-[#8c1d3b]" /> إدارة بانر التوصيل</h2>
          </div>
          
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
             <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <Type size={14} /> الرسالة الرئيسية (الجوال)
                  </label>
                  <input
                    type="text"
                    {...register("deliveryTitle")}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-sm font-black focus:bg-white focus:ring-4 focus:ring-[#8c1d3b]/10 focus:border-[#8c1d3b] transition-all outline-none"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <Type size={14} /> الوصف الفرعي (الجوال)
                  </label>
                  <input
                    type="text"
                    {...register("deliverySubtitle")}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-[#8c1d3b]/10 focus:border-[#8c1d3b] transition-all outline-none"
                  />
                </div>
             </div>

             <div className="space-y-2">
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <ImageIcon size={14} /> بانر الديسكتوب
              </label>
              <label className="border-2 border-dashed border-gray-200 rounded-[2rem] p-12 flex flex-col items-center justify-center gap-4 bg-gray-50 hover:bg-[#8c1d3b]/5 hover:border-[#8c1d3b]/30 transition-all cursor-pointer group relative overflow-hidden">
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setValue("deliveryImage", reader.result as string);
                      reader.readAsDataURL(file);
                    }
                  }} 
                />
                {deliveryImage && (
                  <img src={deliveryImage} alt="Delivery" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-20 transition-opacity" />
                )}
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform relative z-10">
                  <UploadCloud size={28} className="text-[#8c1d3b]" />
                </div>
                <div className="text-center relative z-10">
                  <p className="text-sm font-black text-gray-800">{deliveryImage ? "تغيير الصورة" : "اضغط لرفع بانر الديسكتوب"}</p>
                  <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">Thin wide banner recommended</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* =========================================
            LIVE PREVIEW
        ========================================= */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-4 border-r-4 border-gray-300 opacity-0">
            <h2 className="text-xl font-black text-gray-900">المعاينة</h2>
          </div>
          
          <div className="transition-all duration-500 mx-auto w-full space-y-4">
            
            {/* Desktop Preview */}
            <div className="bg-gray-100 rounded-[8px] overflow-hidden relative flex items-center justify-center shadow-md border border-gray-200 h-[100px]">
              <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-md px-2 py-0.5 rounded-sm text-[10px] font-black z-20">ديسكتوب</div>
              {deliveryImage ? (
                <img src={deliveryImage} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center opacity-30">
                    <ImageIcon size={24} className="text-black ml-2" />
                    <span className="text-xs font-black">Desktop Banner Space</span>
                </div>
              )}
            </div>

            {/* Mobile Preview */}
            <div className="bg-[#D4AF37] text-white rounded-[8px] overflow-hidden relative flex items-center justify-center shadow-md border border-[#D4AF37] min-h-[100px] w-[350px] mx-auto p-4">
              <div className="absolute top-2 right-2 bg-white/50 backdrop-blur-md px-2 py-0.5 rounded-sm text-[9px] font-black z-20">جوال</div>
              <div className="w-full text-center relative z-10">
                <h3 className="font-black text-[17px] mb-1">{deliveryTitle || "العنوان هنا"}</h3>
                <p className="font-bold text-[14px]">{deliverySubtitle || "الوصف هنا"}</p>
              </div>
            </div>

          </div>
        </div>

      </div>

      <div className="sticky bottom-8 z-50 flex justify-end">
          <button type="submit" className="bg-black text-white px-12 py-5 rounded-full font-black text-sm flex items-center justify-center gap-3 hover:bg-gray-800 transition-all shadow-2xl shadow-black/20 hover:-translate-y-1 hover:shadow-black/30">
            <Save size={20} />
            حفظ التغييرات
          </button>
      </div>

    </form>
  );
}
