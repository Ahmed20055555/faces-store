"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Save, Image as ImageIcon, Plus, Trash2, GripVertical, Upload } from "lucide-react";
import { LableInput } from "@/components/lable-input";

interface TrendItem {
  id: number;
  title: string;
  image: string;
}

interface FormData {
  trends: TrendItem[];
}

const INITIAL_TRENDS: TrendItem[] = [
  { id: 1, title: "نفحات ربيعية فاخرة", image: "/DK-SUB-Fragrance_KSA-1.avif" },
  { id: 2, title: "أحدث عطور النيش", image: "/DK-SUB-Skincare_UAE-1.avif" },
  { id: 3, title: "خشبيات الصباح", image: "/DK-SUB.avif" },
];

export default function SpringTrendsPage() {
  const [isActive, setIsActive] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("springTrends_isActive");
      return saved === null ? true : saved === "true";
    }
    return true;
  });

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Initialize React Hook Form
  const { register, control, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      trends: INITIAL_TRENDS,
    }
  });

  // Manage field arrays for dynamic items and drag reordering
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "trends"
  });

  // Watch the trends array to update Live Preview instantly
  const watchedTrends = watch("trends");

  const handleImageUpload = (id: number, file: File, index: number) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setValue(`trends.${index}.image`, result);
    };
    reader.readAsDataURL(file);
  };

  const addTrend = () => {
    append({ id: Date.now(), title: "صيحة جديدة", image: "" });
  };

  const removeTrend = (index: number) => {
    remove(index);
  };

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
    move(draggedIndex, dropIndex);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const onSubmit = (data: FormData) => {
    console.log("Spring Trends Data:", data);
    alert("تم حفظ الصيحات!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[1600px] mx-auto animate-in fade-in duration-700 space-y-8 md:space-y-12 pb-20 font-sans px-4 md:px-0" dir="rtl">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">عطور اموج </h1>
          <p className="text-[10px] md:text-sm font-bold text-gray-400 mt-1 uppercase tracking-[0.2em]">Seasonal Trends & Curations</p>
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
                  localStorage.setItem("springTrends_isActive", String(nextVal));
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-start">

        {/* EDIT PANEL */}
        <div className="bg-white p-5 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-gray-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-gray-50 pb-4 md:pb-6 gap-4">
            <h3 className="text-base md:text-lg font-black text-gray-900 tracking-tight">إدارة الصيحات</h3>
            <button
              type="button"
              onClick={addTrend}
              className="bg-black text-white px-4 py-2 rounded-full text-[10px] md:text-xs font-black flex items-center gap-2 hover:bg-gray-800 transition-all shrink-0"
            >
              <Plus size={14} /> إضافة
            </button>
          </div>

          <div className="space-y-3 max-h-[450px] md:max-h-[600px] overflow-y-auto pr-1 no-scrollbar">
            {fields.map((field, index) => {
              const currentTrend = watchedTrends[index] || field;
              const currentImage = currentTrend.image;

              return (
                <div
                  key={field.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragEnd={() => { setDraggedIndex(null); setDragOverIndex(null); }}
                  className={`
                    p-3 md:p-4 rounded-2xl md:rounded-[1.5rem] border flex items-center gap-3 md:gap-4 group transition-all duration-300 select-none
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

                  {/* Rounded Image Upload (using LableInput type="file") */}
                  <label className="w-14 h-14 md:w-20 md:h-20 bg-white border border-gray-100 rounded-xl flex items-center justify-center overflow-hidden shrink-0 cursor-pointer relative shadow-sm group/img">
                    <LableInput
                      type="file"
                      accept="image/*"
                      containerClassName="hidden"
                      onChange={(e) => { 
                        const file = e.target.files?.[0]; 
                        if (file) handleImageUpload(currentTrend.id, file, index); 
                      }}
                    />
                    {currentImage ? (
                      <>
                        <img src={currentImage} alt={currentTrend.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                          <Upload size={14} className="text-white" />
                        </div>
                      </>
                    ) : (
                      <ImageIcon size={20} className="text-gray-200" />
                    )}
                  </label>

                  {/* Trend Name Input Component Integration */}
                  <div className="flex-1 min-w-0">
                    <LableInput
                      label={`عنوان الصيحة #${index + 1}`}
                      error={errors.trends?.[index]?.title?.message}
                      placeholder="أدخل عنوان الصيحة..."
                      {...register(`trends.${index}.title` as const, { required: "حقل عنوان الصيحة إجباري" })}
                    />
                  </div>

                  {/* Remove Button */}
                  <div className="flex items-center gap-1 shrink-0 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <button type="button" onClick={() => removeTrend(index)} className="text-gray-300 hover:text-red-500 p-2 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
            <GripVertical size={14} className="text-gray-300" />
            <p className="text-[10px] font-bold text-gray-400">اسحب للترتيب · اضغط الأيقونة لرفع صورة</p>
          </div>
        </div>

        {/* LIVE PREVIEW SECTION */}
        <div className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-gray-200 shadow-sm relative overflow-hidden h-fit self-start">
          <div className="absolute top-4 right-6 text-[9px] font-black text-gray-200 uppercase tracking-widest">Live Preview</div>
          <div className="grid grid-cols-3 gap-3 md:gap-4 mt-6">
            {watchedTrends.slice(0, 3).map((trend, idx) => {
              if (!trend) return null;
              return (
                <div key={trend.id || idx} className="space-y-2 md:space-y-3">
                  <div className="aspect-[3/4] bg-gray-50 rounded-xl md:rounded-2xl border border-gray-50 overflow-hidden relative shadow-sm">
                    {trend.image ? (
                      <img src={trend.image} alt={trend.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center"><ImageIcon size={20} className="text-gray-200" /></div>
                    )}
                  </div>
                  <h5 className="text-[8px] md:text-[11px] font-black text-gray-900 text-center leading-tight uppercase tracking-tighter">
                    {trend.title}
                  </h5>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* FIXED SAVE BUTTON */}
      <div className="fixed md:sticky bottom-6 left-4 right-4 md:bottom-8 md:left-auto md:right-auto z-50 flex justify-center md:justify-start">
        <button type="submit" className="w-full md:w-auto bg-black text-white px-10 md:px-12 py-4 md:py-5 rounded-full font-black text-sm flex items-center justify-center gap-3 shadow-2xl shadow-black/20 hover:scale-105 transition-all">
          <Save size={20} />
          حفظ الصيحات
        </button>
      </div>

    </form>
  );
}
