"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Save, Truck, ShieldCheck, Gift, CreditCard, GripVertical } from "lucide-react";
import { LableInput } from "@/components/lable-input";
import { SelectLable } from "@/components/select.-lable";

const ICON_OPTIONS = [
  { value: "ShieldCheck", label: "حماية" },
  { value: "Truck", label: "توصيل" },
  { value: "Gift", label: "هدية" },
  { value: "CreditCard", label: "دفع" },
];

const INITIAL_FEATURES = [
  { id: 1, title: "منتجات أصلية 100%", icon: "ShieldCheck" },
  { id: 2, title: "توصيل مجاني", icon: "Truck" },
  { id: 3, title: "عروض حصرية", icon: "Gift" },
  { id: 4, title: "دفع آمن", icon: "CreditCard" },
];

interface FeatureItem {
  id: number;
  title: string;
  icon: string;
}

interface FormData {
  features: FeatureItem[];
}

export default function FeaturesPage() {
  const [isActive, setIsActive] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("features_isActive");
      return saved === null ? true : saved === "true";
    }
    return true;
  });

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Initialize React Hook Form
  const { register, control, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      features: INITIAL_FEATURES,
    }
  });

  // Manage field arrays for dynamic items and drag reordering
  const { fields, move } = useFieldArray({
    control,
    name: "features"
  });

  // Watch the features array to update the Live Preview instantly
  const watchedFeatures = watch("features");

  const handleDragStart = (index: number) => setDraggedIndex(index);
  
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }
    // Reorder using React Hook Form's built-in array mover
    move(draggedIndex, dropIndex);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const renderIcon = (iconName: string, size = 20) => {
    switch (iconName) {
      case "ShieldCheck": return <ShieldCheck size={size} />;
      case "Truck": return <Truck size={size} />;
      case "Gift": return <Gift size={size} />;
      case "CreditCard": return <CreditCard size={size} />;
      default: return <ShieldCheck size={size} />;
    }
  };

  // Exact onSubmit handler style requested by the user
  const onSubmit = (data: FormData) => {
    console.log("Hero & Promo Data:", data);
    alert("تم حفظ البيانات!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[1600px] mx-auto animate-in fade-in duration-700 space-y-6 md:space-y-10 px-4 py-8 md:pb-20" dir="rtl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">شريط المميزات</h1>
          <p className="text-[10px] md:text-sm font-bold text-gray-400 mt-1 uppercase tracking-[0.2em]">Service Excellence Strip</p>
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
                  localStorage.setItem("features_isActive", String(nextVal));
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-start">
        {/* Editor */}
        <div className="bg-white p-5 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-gray-200 shadow-sm space-y-6">
          <h3 className="text-md md:text-lg font-black text-gray-900 border-b border-gray-50 pb-4">إدارة المميزات</h3>

          <div className="space-y-4">
            {fields.map((field, index) => {
              const currentIcon = watchedFeatures[index]?.icon || "ShieldCheck";
              return (
                <div
                  key={field.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragEnd={() => { setDraggedIndex(null); setDragOverIndex(null); }}
                  className={`
                    flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-2xl border group transition-all duration-300 select-none
                    ${draggedIndex === index
                      ? "opacity-40 scale-95 border-dashed border-gray-300 bg-gray-100"
                      : dragOverIndex === index
                        ? "border-[#accfad] bg-[#accfad]/10 shadow-lg scale-[1.02]"
                        : "bg-gray-50/50 border-gray-100 hover:bg-white hover:shadow-md"
                    }
                  `}
                >
                  {/* Drag Handle */}
                  <div className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 transition-colors shrink-0">
                    <GripVertical size={18} />
                  </div>

                  {/* Icon Preview Box */}
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-[#accfad]/10 rounded-xl md:rounded-2xl flex items-center justify-center text-[#5a8a6a] border border-[#accfad]/20 shrink-0">
                    {renderIcon(currentIcon, 20)}
                  </div>

                  {/* Unified Inputs (Title Input & SelectLable Component) */}
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 min-w-0">
                    <LableInput
                      label={`اسم الميزة #${index + 1}`}
                      error={errors.features?.[index]?.title?.message}
                      placeholder="أدخل اسم الميزة..."
                      {...register(`features.${index}.title` as const, { required: "حقل اسم الميزة إجباري" })}
                    />
                    <SelectLable
                      label="أيقونة الميزة"
                      options={ICON_OPTIONS}
                      error={errors.features?.[index]?.icon?.message}
                      {...register(`features.${index}.icon` as const)}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <button type="submit" className="w-full bg-black text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-xl shadow-black/10 mt-4">
            <Save size={18} />
            حفظ التغييرات
          </button>
        </div>

        {/* Live Preview */}
        <div className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-gray-200 shadow-sm relative group h-fit self-start">
           <div className="absolute top-4 right-4 md:top-6 md:right-6 text-[9px] font-black text-gray-200 uppercase tracking-widest">Live Preview</div>
           <div className="grid grid-cols-2 gap-4 md:gap-8 mt-6">
              {watchedFeatures.map((feature, idx) => {
                if (!feature) return null;
                return (
                  <div key={feature.id || idx} className="flex flex-col items-center text-center gap-3 md:gap-4 p-5 md:p-6 bg-gray-50 rounded-[1.5rem] md:rounded-[2rem] border border-gray-100">
                    <div className="text-black opacity-80 scale-100 md:scale-125">{renderIcon(feature.icon, 24)}</div>
                    <span className="text-[10px] md:text-[11px] font-black text-gray-900 leading-tight uppercase tracking-tighter">{feature.title}</span>
                  </div>
                );
              })}
           </div>
        </div>

      </div>
    </form>
  );
}
