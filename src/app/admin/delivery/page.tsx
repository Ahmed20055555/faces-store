"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Save, Type, Truck } from "lucide-react";
import { LableInput } from "@/components/lable-input";

interface FormData {
  deliveryTitle: string;
  deliverySubtitle: string;
}

export default function DeliveryBannerPage() {
  const [isActive, setIsActive] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("delivery_isActive");
      return saved === null ? true : saved === "true";
    }
    return true;
  });

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      deliveryTitle: "توصيل مجاني خلال ساعتين في الرياض",
      deliverySubtitle: "عند الطلب قبل 8 مساءً",
    }
  });

  const deliveryTitle = watch("deliveryTitle");
  const deliverySubtitle = watch("deliverySubtitle");

  const onSubmit = (data: FormData) => {
    console.log("Delivery Data to backend:", data);
    alert("تم حفظ البيانات وجاهزة للإرسال!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[1600px] mx-auto animate-in fade-in duration-700 space-y-12 pb-20 font-sans px-4 md:px-0" dir="rtl">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">بانر التوصيل</h1>
          <p className="text-[10px] md:text-sm font-bold text-gray-400 mt-1 uppercase tracking-[0.2em]">Store Delivery Banner Customization</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto self-start sm:self-auto">
          {/* Toggle Switch */}
          <div className="flex items-center justify-between gap-4 bg-white px-4 py-2.5 rounded-xl md:rounded-2xl border border-gray-100 shadow-sm min-w-[220px]">
            <span className="text-[11px] md:text-[12px] font-black text-gray-700">تفعيل القسم في المتجر</span>
            <button
              type="button"
              onClick={() => {
                const nextVal = !isActive;
                setIsActive(nextVal);
                if (typeof window !== "undefined") {
                  localStorage.setItem("delivery_isActive", String(nextVal));
                  window.dispatchEvent(new Event("sectionActiveChanged"));
                }
              }}
              className={`w-11 h-6 rounded-full transition-all relative ${isActive ? "bg-[#BE9D72]" : "bg-gray-200"} shrink-0`}
            >
              <div className={`absolute top-[2px] w-5 h-5 bg-white rounded-full transition-all ${isActive ? "right-[2px]" : "right-[22px]"}`} />
            </button>
          </div>

          <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl md:rounded-2xl border border-gray-100 shadow-sm self-start sm:self-auto min-w-[220px] sm:min-w-0">
            <div className={`w-2 h-2 rounded-full ${isActive ? "bg-[#BE9D72]" : "bg-red-500"} animate-pulse`}></div>
            <span className="text-[11px] md:text-[12px] font-black text-gray-700">وضع التحرير المباشر</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* =========================================
            DELIVERY SETTINGS
        ========================================= */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-4 border-r-4 border-[#0b412b]">
            <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
              <Truck size={24} className="text-[#0b412b]" /> إدارة بانر التوصيل
            </h2>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
            <div className="space-y-4">
              <LableInput
                label="الرسالة الرئيسية"
                error={errors.deliveryTitle?.message}
                placeholder="أدخل الرسالة الرئيسية..."
                icon={Type}
                iconPosition="start"
                {...register("deliveryTitle", { required: "حقل الرسالة الرئيسية إجباري" })}
              />

              <LableInput
                label="الوصف الفرعي"
                error={errors.deliverySubtitle?.message}
                placeholder="أدخل الوصف الفرعي..."
                icon={Type}
                iconPosition="start"
                {...register("deliverySubtitle", { required: "حقل الوصف الفرعي إجباري" })}
              />
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

          <div className="transition-all duration-500 mx-auto w-full space-y-4 flex flex-col items-center justify-center min-h-[200px]">

            {/* Mobile Preview */}
            <div className="bg-[#BE9D72] text-white rounded-[8px] overflow-hidden relative flex items-center justify-center shadow-md border border-[#BE9D72] min-h-[100px] w-full max-w-[500px] p-6">
              <div className="absolute top-2 right-2 bg-white/30 backdrop-blur-md px-2 py-0.5 rounded-sm text-[9px] font-black z-20">معاينة البانر</div>
              <div className="w-full text-center relative z-10">
                <h3 className="font-black text-[17px] mb-1">{deliveryTitle || "العنوان هنا"}</h3>
                <p className="font-bold text-[14px] text-white/90">{deliverySubtitle || "الوصف هنا"}</p>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* FIXED SAVE BUTTON ON MOBILE */}
      <div className="fixed md:sticky bottom-6 left-4 right-4 md:bottom-8 md:left-auto md:right-auto z-50 flex justify-center md:justify-start">
        <button type="submit" className="w-full md:w-auto bg-black text-white px-10 md:px-12 py-4 md:py-5 rounded-full font-black text-sm flex items-center justify-center gap-3 shadow-2xl shadow-black/20 hover:scale-105 transition-all">
          <Save size={20} />
          حفظ التغييرات
        </button>
      </div>

    </form>
  );
}
