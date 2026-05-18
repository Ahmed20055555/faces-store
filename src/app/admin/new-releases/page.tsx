"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Save, Plus, Trash2, Image as ImageIcon, Sparkles, GripVertical, UploadCloud } from "lucide-react";
import { LableInput } from "@/components/lable-input";

interface ReleaseItem {
  id: number;
  title: string;
  image: string;
}

interface FormData {
  releases: ReleaseItem[];
}

const INITIAL_RELEASES: ReleaseItem[] = [
  { id: 1, title: "YSL Gift Set", image: "/ysl-gwp-ksa.avif" },
  { id: 2, title: "Prada Collection", image: "/prada-gwp.avif" },
  { id: 3, title: "Lancôme Exclusive", image: "/lancome-gwp-ksa-2.avif" },
  { id: 4, title: "Issey Miyake", image: "/issey-gwp-uae2.avif" },
];

export default function NewReleasesPage() {
  const [isActive, setIsActive] = useState(true);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Initialize React Hook Form
  const { register, control, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      releases: INITIAL_RELEASES,
    }
  });

  // Manage field arrays for dynamic items and drag reordering
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "releases"
  });

  // Watch the releases array to keep Live Preview in sync instantly
  const watchedReleases = watch("releases") || [];

  // Handle Image Upload via FileReader
  const handleImageUpload = (id: number, file: File, index: number) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setValue(`releases.${index}.image`, reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Add new release
  const addRelease = () => {
    append({ id: Date.now(), title: "إصدار جديد", image: "" });
  };

  // Drag and drop handlers
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

  // Form submit handler
  const onSubmit = (data: FormData) => {
    console.log("New Releases Submitted Data:", data);
    alert("تم حفظ الإصدارات بنجاح!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[1600px] mx-auto animate-in fade-in duration-700 space-y-6 md:space-y-10 px-4 py-8 md:pb-20 font-sans" dir="rtl">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">الإصدارات الجديدة</h1>
          <p className="text-[10px] md:text-sm font-bold text-gray-400 mt-1 uppercase tracking-[0.2em]">New Arrivals & Drops</p>
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
        
        {/* Edit Panel */}
        <div className="bg-white p-5 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-gray-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-gray-50 pb-4 gap-4">
            <h3 className="text-base md:text-lg font-black text-gray-900 tracking-tight flex items-center gap-2">
              <Sparkles size={20} className="text-[#BE9D72]" />
              إدارة الإصدارات
            </h3>
            <button
              type="button"
              onClick={addRelease}
              className="bg-black text-white px-4 py-2 rounded-full text-[10px] md:text-xs font-black flex items-center gap-1.5 hover:bg-gray-800 transition-all shrink-0"
            >
              <Plus size={14} /> إضافة إصدار
            </button>
          </div>

          <div className="space-y-3 max-h-[450px] md:max-h-[600px] overflow-y-auto pr-1 no-scrollbar">
            {fields.map((field, index) => {
              const currentRelease = watchedReleases[index] || field;
              const currentImage = currentRelease.image;

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
                        ? "border-[#BE9D72]/50 bg-[#BE9D72]/5 shadow-lg scale-[1.02]"
                        : "bg-gray-50/50 border-gray-100 hover:bg-white hover:shadow-md"
                    }
                  `}
                >
                  {/* Drag Handle */}
                  <div className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 transition-colors shrink-0">
                    <GripVertical size={18} />
                  </div>

                  {/* Image Upload Input (Standardized using LableInput type="file") */}
                  <label className="w-14 h-14 md:w-20 md:h-20 bg-white border border-gray-100 rounded-xl flex items-center justify-center overflow-hidden shrink-0 cursor-pointer relative shadow-sm group/img">
                    <LableInput
                      type="file"
                      accept="image/*"
                      containerClassName="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(currentRelease.id, file, index);
                      }}
                    />
                    {currentImage ? (
                      <>
                        <img src={currentImage} alt={currentRelease.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                          <UploadCloud size={14} className="text-white" />
                        </div>
                      </>
                    ) : (
                      <ImageIcon size={20} className="text-gray-200" />
                    )}
                  </label>

                  {/* Release Name Input */}
                  <div className="flex-1 min-w-0">
                    <LableInput
                      label={`عنوان الإصدار #${index + 1}`}
                      error={errors.releases?.[index]?.title?.message}
                      placeholder="أدخل عنوان الإصدار..."
                      {...register(`releases.${index}.title` as const, { required: "حقل عنوان الإصدار إجباري" })}
                    />
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-gray-300 hover:text-red-500 p-2 transition-colors bg-white rounded-full shadow-sm border border-gray-100 shrink-0 sm:opacity-0 sm:group-hover:opacity-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
            <GripVertical size={14} className="text-gray-300" />
            <p className="text-[10px] font-bold text-gray-400">اسحب للترتيب · اضغط الأيقونة لرفع صورة</p>
          </div>
        </div>

        {/* Live Preview */}
        <div className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-gray-200 shadow-sm relative overflow-hidden h-fit self-start min-h-[300px] flex flex-col justify-center">
          <div className="absolute top-4 right-6 text-[9px] font-black text-gray-200 uppercase tracking-widest">Scroller Preview</div>
          <h4 className="text-base md:text-xl font-black mb-4 tracking-tight mt-4">إصدارات جديدة</h4>
          <div className="grid grid-cols-2 gap-4">
            {watchedReleases.slice(0, 4).map((release, idx) => {
              if (!release) return null;
              return (
                <div key={release.id || idx} className="space-y-2 animate-in fade-in zoom-in duration-500">
                  <div className="aspect-square bg-gray-50 rounded-2xl border border-gray-50 overflow-hidden relative shadow-sm">
                    {release.image ? (
                      <img src={release.image} alt={release.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon size={28} className="text-gray-200 opacity-20" />
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] md:text-xs font-black text-gray-700 text-center truncate">{release.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* FIXED SAVE BUTTON ON MOBILE */}
      <div className="fixed md:sticky bottom-6 left-4 right-4 md:bottom-8 md:left-auto md:right-auto z-50 flex justify-center md:justify-end">
        <button type="submit" className="w-full md:w-auto bg-black text-white px-10 md:px-12 py-4 md:py-5 rounded-full font-black text-sm flex items-center justify-center gap-3 shadow-2xl shadow-black/20 hover:scale-105 transition-all">
          <Save size={20} />
          حفظ التغييرات
        </button>
      </div>

    </form>
  );
}
