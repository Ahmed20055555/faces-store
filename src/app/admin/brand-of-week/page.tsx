"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Save, Star, UploadCloud, Image as ImageIcon, Plus, Trash2, GripVertical } from "lucide-react";
import { LableInput } from "@/components/lable-input";

interface BrandProduct {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
}

interface FormData {
  brandName: string;
  bannerImage: string;
  products: BrandProduct[];
}

const INITIAL_PRODUCTS: BrandProduct[] = [
  { id: 1, title: "عطر بالمي إليكسير", description: "إكسير الفخامة والتميز الفواح", price: "444", image: "/product-20.jpeg" },
  { id: 2, title: "عطر بالمي مسك الفخامة", description: "روعة المسك الفاخر للرجال والنساء", price: "460", image: "/product-21.jpeg" },
  { id: 3, title: "عطر بالمي كشمير وود", description: "أخشاب الكشمير الدافئة بنفحات صيفية", price: "537", image: "/product-22.jpeg" },
];

export default function BrandOfWeekPage() {
  const [isActive, setIsActive] = useState(true);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Initialize React Hook Form
  const { register, control, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      brandName: "ايسي مياكي",
      bannerImage: "/product-28.jpeg",
      products: INITIAL_PRODUCTS,
    }
  });

  // Manage field arrays for dynamic items and drag reordering
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "products"
  });

  // Watch values for real-time live preview synchronization
  const watchedBrandName = watch("brandName");
  const watchedBannerImage = watch("bannerImage");
  const watchedProducts = watch("products") || [];

  // Handle Banner Image Upload via FileReader
  const handleBannerUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setValue("bannerImage", reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Handle Product Image Upload
  const handleProductImageUpload = (id: number, file: File, index: number) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setValue(`products.${index}.image`, reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Add new product
  const addProduct = () => {
    append({ id: Date.now(), title: "عطر جديد", description: "وصف العطر الجديد...", price: "0", image: "" });
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
    console.log("Brand of Week Submitted Data:", data);
    alert("تم حفظ حملة عطور بوص بنجاح!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[1600px] mx-auto animate-in fade-in duration-700 space-y-8 md:space-y-12 pb-20 font-sans px-4 md:px-0" dir="rtl">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">عطور بوص</h1>
          <p className="text-[10px] md:text-sm font-bold text-gray-400 mt-1 uppercase tracking-[0.2em]">Featured Brand Spotlight</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-start">

        {/* Edit Panel */}
        <div className="bg-white p-5 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-gray-200 shadow-sm space-y-6 md:space-y-8">
          <div className="flex justify-between items-center border-b border-gray-50 pb-4">
            <h3 className="text-base md:text-lg font-black text-gray-900 tracking-tight flex items-center gap-2">
              <Star size={20} className="text-[#BE9D72] fill-[#BE9D72]" />
              إدارة الحملة
            </h3>
          </div>

          {/* Brand Name Input */}
          <div className="grid grid-cols-1 gap-4">
            <LableInput
              label="اسم الماركة المتميزة"
              error={errors.brandName?.message}
              placeholder="مثال: ايسي مياكي"
              {...register("brandName", { required: "حقل اسم الماركة إجباري" })}
            />
          </div>

          {/* Campaign Banner Upload */}
          <div className="space-y-1">
            <label className="text-[10px] md:text-[11px] font-black text-gray-400 uppercase tracking-widest">صورة الحملة</label>
            <div
              onClick={() => {
                const input = document.getElementById("brand-banner-input");
                input?.click();
              }}
              className="border-2 border-dashed border-gray-200 rounded-2xl md:rounded-[2rem] p-6 md:p-8 flex flex-col items-center justify-center gap-3 bg-gray-50 hover:bg-white hover:border-[#BE9D72] transition-all cursor-pointer group relative overflow-hidden min-h-[140px] md:min-h-[180px]"
            >
              <input
                type="file"
                id="brand-banner-input"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleBannerUpload(file);
                }}
              />
              {watchedBannerImage ? (
                <>
                  <img src={watchedBannerImage} alt="Campaign Banner" className="w-full h-full object-cover absolute inset-0" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                    <div className="bg-white/90 backdrop-blur-md rounded-full px-4 py-1.5 flex items-center gap-2">
                      <UploadCloud size={14} className="text-[#BE9D72]" />
                      <span className="text-[10px] font-black text-gray-800">تغيير صورة البانر</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <UploadCloud size={32} className="text-gray-300 group-hover:text-[#BE9D72] transition-colors" />
                  <p className="text-[11px] font-black text-gray-600 tracking-tighter text-center">
                    اضغط لرفع صورة الحملة
                    <br /><span className="text-[9px] text-gray-400">المقاس الموصى به: 1:1 أو 1200x800px</span>
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Products List */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <label className="text-xs md:text-sm font-black text-gray-800 flex items-center gap-1.5">
                <Star size={16} className="text-[#BE9D72]" />
                عطور الماركة المتميزة ({fields.length})
              </label>
              <button type="button" onClick={addProduct} className="bg-black text-white px-4 py-2 rounded-full text-[10px] md:text-xs font-black flex items-center gap-1.5 hover:bg-gray-800 transition-all shrink-0">
                <Plus size={14} /> إضافة عطر
              </button>
            </div>

            <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1 no-scrollbar">
              {fields.map((field, index) => {
                const currentProd = watchedProducts[index] || field;
                const currentImage = currentProd.image;

                return (
                  <div
                    key={field.id}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDrop={(e) => handleDrop(e, index)}
                    onDragEnd={() => { setDraggedIndex(null); setDragOverIndex(null); }}
                    className={`
                      flex flex-col sm:flex-row items-center gap-3 md:gap-4 p-4 rounded-2xl border group transition-all duration-300 select-none
                      ${draggedIndex === index
                        ? "opacity-40 scale-95 border-dashed border-gray-300 bg-gray-100"
                        : dragOverIndex === index
                          ? "border-[#BE9D72]/50 bg-[#BE9D72]/5 shadow-lg scale-[1.02]"
                          : "bg-gray-50/50 border-gray-100 hover:bg-white hover:shadow-md"
                      }
                    `}
                  >
                    <div className="flex items-center justify-between sm:flex-col sm:justify-center gap-2 shrink-0">
                      {/* Drag Handle */}
                      <div className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 transition-colors">
                        <GripVertical size={18} />
                      </div>

                      {/* Remove Button */}
                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-gray-300 hover:text-red-500 p-1.5 transition-colors bg-white rounded-full shadow-sm border border-gray-100"
                          title="حذف العطر"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>

                    {/* Product Image Upload Block */}
                    <label className="w-16 h-16 bg-white border border-gray-100 rounded-xl flex items-center justify-center overflow-hidden shrink-0 cursor-pointer relative shadow-sm group/img mx-auto sm:mx-0">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleProductImageUpload(currentProd.id, file, index);
                        }}
                      />
                      {currentImage ? (
                        <>
                          <img src={currentImage} alt={currentProd.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                            <UploadCloud size={14} className="text-white" />
                          </div>
                        </>
                      ) : (
                        <ImageIcon size={18} className="text-gray-200" />
                      )}
                    </label>

                    {/* Form Input fields */}
                    <div className="flex-1 w-full grid grid-cols-2 gap-3">
                      <LableInput
                        label="اسم العطر"
                        error={errors.products?.[index]?.title?.message}
                        placeholder="اسم العطر..."
                        {...register(`products.${index}.title` as const, { required: "اسم العطر إجباري" })}
                      />

                      <LableInput
                        label="وصف العطر"
                        error={errors.products?.[index]?.description?.message}
                        placeholder="وصف العطر..."
                        {...register(`products.${index}.description` as const, { required: "وصف العطر إجباري" })}
                      />

                      <div className="col-span-2 max-w-[200px]">
                        <LableInput
                          label="السعر (ريال)"
                          error={errors.products?.[index]?.price?.message}
                          placeholder="أدخل السعر..."
                          {...register(`products.${index}.price` as const, { required: "السعر إجباري" })}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
            <GripVertical size={14} className="text-gray-300" />
            <p className="text-[10px] font-bold text-gray-400">اسحب للترتيب · اضغط الأيقونة لرفع صورة العطر</p>
          </div>

          {/* Form submit button */}
          <button type="submit" className="w-full bg-black text-white py-4 rounded-xl md:rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-xl shadow-black/10">
            <Save size={18} />
            تأكيد وحفظ عطور بوص
          </button>
        </div>

        {/* Live Preview */}
        <div className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-gray-200 shadow-sm flex flex-col justify-center items-center group relative overflow-hidden h-fit self-start min-h-[300px]">
          <div className="absolute top-4 right-6 text-[9px] font-black text-gray-200 uppercase tracking-widest">Mockup Preview</div>
          <h4 className="text-base md:text-2xl font-black text-gray-900 tracking-tight text-center mb-6 md:mb-8 mt-4">عطور بوص - {watchedBrandName}</h4>

          <div className="aspect-square bg-gray-50 rounded-3xl overflow-hidden border border-gray-50 max-w-[250px] md:max-w-sm mx-auto w-full relative mb-6 md:mb-8">
            {watchedBannerImage ? (
              <img src={watchedBannerImage} alt="Campaign Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center"><ImageIcon size={48} className="text-gray-200 opacity-20" /></div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
          </div>

          <div className="w-full grid grid-cols-3 gap-3 md:gap-4">
            {watchedProducts.slice(0, 3).map((product, idx) => (
              <div key={product.id || idx} className="space-y-1">
                <div className="aspect-square bg-gray-50 rounded-xl border border-gray-50 overflow-hidden shadow-sm">
                  {product.image ? (
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center"><ImageIcon size={20} className="text-gray-200 opacity-20" /></div>
                  )}
                </div>
                <p className="text-[8px] md:text-[10px] font-black text-gray-900 text-center truncate">{product.title || "اسم العطر"}</p>
                <p className="text-[7px] md:text-[8px] font-bold text-gray-400 text-center truncate">{product.description || "الوصف"}</p>
                <p className="text-[7px] md:text-[9px] font-black text-[#BE9D72] text-center">{product.price ? `${product.price} ريال` : "السعر"}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </form>
  );
}
