"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Save, Sparkles, UploadCloud, Image as ImageIcon, Trash2, Star, Plus, GripVertical } from "lucide-react";
import { LableInput } from "@/components/lable-input";

interface CelebrityProduct {
  id: string;
  brand: string;
  name: string;
  price: string;
  image: string;
  celebrity: string;
}

interface FormData {
  title: string;
  bannerAlt: string;
  bannerImage: string;
  products: CelebrityProduct[];
}

const INITIAL_PRODUCTS: CelebrityProduct[] = [
  { id: "gift_0", brand: "بالمي | Balmy", name: "عطر بالمي أوبالين", price: "531", image: "/product-14.jpeg", celebrity: "عمرو دياب" },
  { id: "gift_1", brand: "بالمي | Balmy", name: "عطر بالمي مسك روز", price: "489", image: "/product-15.jpeg", celebrity: "أنجلينا جولي" },
  { id: "gift_2", brand: "بالمي | Balmy", name: "عطر بالمي سفاري عود", price: "621", image: "/product-16.jpeg", celebrity: "جوني ديب" },
  { id: "gift_3", brand: "بالمي | Balmy", name: "عطر بالمي هيريتج", price: "477", image: "/product-17.jpeg", celebrity: "أحمد عز" },
  { id: "gift_4", brand: "بالمي | Balmy", name: "عطر بالمي رويال توباز", price: "587", image: "/product-18.jpeg", celebrity: "جورجينا" },
  { id: "gift_5", brand: "بالمي | Balmy", name: "عطر بالمي لورين", price: "518", image: "/product-19.jpeg", celebrity: "نادين نجيم" },
];

export default function CelebrityPerfumesPage() {
  const [isActive, setIsActive] = useState(true);

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Initialize React Hook Form with stored data or defaults
  const { register, control, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      title: "عطور المشاهير",
      bannerAlt: "Dior Sauvage - Celebrities' Choice",
      bannerImage: "/product-12.jpeg",
      products: INITIAL_PRODUCTS,
    }
  });

  // Manage field arrays for dynamic items and drag reordering
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "products"
  });

  // Watch values for real-time live preview synchronization
  const watchedTitle = watch("title");
  const watchedBannerAlt = watch("bannerAlt");
  const watchedBannerImage = watch("bannerImage");
  const watchedProducts = watch("products") || [];

  // Handle Banner Image File Upload via FileReader
  const handleBannerImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setValue("bannerImage", reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Handle individual product image upload
  const handleProductImageUpload = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setValue(`products.${index}.image`, reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Add new celebrity perfume product
  const addProduct = () => {
    append({
      id: `gift_${Date.now()}`,
      brand: "بالمي | Balmy",
      name: "عطر جديد",
      price: "0",
      image: "",
      celebrity: "اسم المشهور"
    });
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
    console.log("Celebrity Perfumes Submitted Data:", data);
    alert("تم حفظ إعدادات عطور المشاهير والمنتجات بنجاح!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[1600px] mx-auto animate-in fade-in duration-700 space-y-6 md:space-y-10 px-4 py-8 md:pb-20 font-sans" dir="rtl">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">إدارة عطور المشاهير</h1>
          <p className="text-[10px] md:text-sm font-bold text-gray-400 mt-1 uppercase tracking-[0.2em]">Celebrities' Perfumes Control Panel</p>
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

        {/* Editor Panel */}
        <div className="bg-white p-5 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-gray-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-gray-50 pb-4">
            <h3 className="text-base md:text-lg font-black text-gray-900 tracking-tight flex items-center gap-2">
              <Sparkles size={20} className="text-[#BE9D72]" />
              إعدادات البانر والقسم
            </h3>
          </div>

          <div className="space-y-4">
            {/* Title & Banner Alt Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <LableInput
                label="عنوان القسم"
                error={errors.title?.message}
                placeholder="أدخل عنوان القسم... مثال: عطور المشاهير"
                {...register("title", { required: "عنوان القسم إجباري" })}
              />

              <LableInput
                label="الوصف البديل للبانر (Alt Text)"
                error={errors.bannerAlt?.message}
                placeholder="أدخل الوصف البديل للبانر..."
                {...register("bannerAlt")}
              />
            </div>

            {/* Banner Image Uploader */}
            <div className="space-y-1">
              <label className="text-[10px] md:text-[11px] font-black text-gray-400 uppercase tracking-widest">صورة البانر الرئيسي</label>
              <div
                onClick={() => {
                  const input = document.getElementById("banner-upload-input");
                  input?.click();
                }}
                className="border-2 border-dashed border-gray-200 rounded-2xl md:rounded-[2rem] p-6 md:p-8 flex flex-col items-center justify-center gap-3 bg-gray-50 hover:bg-white hover:border-[#BE9D72] transition-all cursor-pointer group relative overflow-hidden min-h-[160px] md:min-h-[200px]"
              >
                <input
                  type="file"
                  id="banner-upload-input"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleBannerImageUpload(file);
                  }}
                />

                {watchedBannerImage ? (
                  <>
                    <img src={watchedBannerImage} alt="Banner Preview" className="w-full h-full object-cover absolute inset-0" />
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
                      اضغط لرفع صورة البانر
                      <br />
                      <span className="text-[9px] text-gray-400">المقاس المثالي: 1200x800px</span>
                    </p>
                  </>
                )}
              </div>

              {watchedBannerImage && (
                <button
                  type="button"
                  onClick={() => setValue("bannerImage", "")}
                  className="flex items-center gap-1.5 text-[11px] font-bold text-red-400 hover:text-red-600 transition-colors mt-2"
                >
                  <Trash2 size={13} />
                  حذف الصورة
                </button>
              )}
            </div>

            {/* Products Drag and Drop List */}
            <div className="space-y-4 pt-6 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <h4 className="text-xs md:text-sm font-black text-gray-800 flex items-center gap-1.5">
                  <Star size={16} className="text-[#BE9D72]" />
                  منتجات عطور المشاهير ({fields.length})
                </h4>
                <button
                  type="button"
                  onClick={addProduct}
                  className="bg-black text-white px-3.5 py-1.5 rounded-full text-[10px] font-black flex items-center gap-1 hover:bg-gray-800 transition-all shadow-sm shrink-0"
                >
                  <Plus size={12} />
                  إضافة عطر جديد
                </button>
              </div>

              {/* Drag and Drop Product Cards List */}
              <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1 no-scrollbar">
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
                        p-4 rounded-2xl border flex flex-col sm:flex-row gap-4 group transition-all duration-300 select-none relative
                        ${draggedIndex === index
                          ? "opacity-40 scale-95 border-dashed border-gray-300 bg-gray-100"
                          : dragOverIndex === index
                            ? "border-[#BE9D72]/50 bg-[#BE9D72]/5 shadow-lg scale-[1.01]"
                            : "bg-gray-50/50 border-gray-100 hover:bg-white hover:shadow-md"
                        }
                      `}
                    >
                      {/* Left/Right controls container */}
                      <div className="flex items-center justify-between sm:flex-col sm:justify-center gap-2 shrink-0">
                        {/* Drag Handle */}
                        <div className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 p-1 transition-colors">
                          <GripVertical size={18} />
                        </div>

                        {/* Remove Button */}
                        {fields.length > 1 && (
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-gray-300 hover:text-red-500 p-1.5 transition-colors bg-white rounded-full shadow-sm border border-gray-100"
                            title="حذف المنتج"
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>

                      {/* Product Image Uploader */}
                      <label className="w-20 h-20 bg-white border border-gray-100 rounded-xl flex items-center justify-center overflow-hidden shrink-0 cursor-pointer relative shadow-sm group/img mx-auto sm:mx-0">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleProductImageUpload(index, file);
                          }}
                        />
                        {currentImage ? (
                          <>
                            <img src={currentImage} alt={currentProd.name || "Product Image"} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                              <UploadCloud size={14} className="text-white" />
                            </div>
                          </>
                        ) : (
                          <ImageIcon size={20} className="text-gray-200" />
                        )}
                      </label>

                      {/* Form inputs grid */}
                      <div className="flex-1 grid grid-cols-2 gap-3">
                        <LableInput
                          label="الماركة"
                          error={errors.products?.[index]?.brand?.message}
                          placeholder="مثال: بالمي | Balmy"
                          {...register(`products.${index}.brand` as const, { required: "حقل الماركة إجباري" })}
                        />

                        <LableInput
                          label="اسم المنتج"
                          error={errors.products?.[index]?.name?.message}
                          placeholder="أدخل اسم العطر..."
                          {...register(`products.${index}.name` as const, { required: "حقل الاسم إجباري" })}
                        />

                        <LableInput
                          label="السعر (ريال)"
                          error={errors.products?.[index]?.price?.message}
                          placeholder="أدخل السعر..."
                          {...register(`products.${index}.price` as const, { required: "السعر إجباري" })}
                        />

                        <LableInput
                          label="اسم المشهور"
                          error={errors.products?.[index]?.celebrity?.message}
                          placeholder="مثال: عمرو دياب"
                          {...register(`products.${index}.celebrity` as const, { required: "اسم المشهور إجباري" })}
                          inputClassName="text-[#A37F55] border-[#BE9D72]/20 focus:border-[#BE9D72]"
                          labelClassName="text-[#A37F55]"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
                <GripVertical size={14} className="text-gray-300" />
                <p className="text-[10px] font-bold text-gray-400">اسحب لترتيب المنتجات · اضغط الأيقونة لرفع صورة المنتج</p>
              </div>
            </div>
          </div>
        </div>

        {/* Live Mockup */}
        <div className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-gray-200 shadow-sm relative overflow-hidden h-fit lg:col-span-1">
          <div className="absolute top-4 right-4 text-[9px] font-black text-gray-300 uppercase tracking-widest">Live Section Preview</div>
          <h4 className="text-sm md:text-base font-black text-gray-900 mb-6 border-b border-gray-50 pb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#BE9D72] animate-pulse"></span>
            معاينة القسم المباشرة
          </h4>

          {/* Section Preview Layout */}
          <div className="border border-gray-100 rounded-2xl p-4 md:p-6 bg-gray-50/50 space-y-4">
            {/* Header */}
            <div className="flex justify-between items-center w-full pb-2">
              <h2 className="text-[12px] md:text-sm font-black text-gray-900">{watchedTitle || "عطور المشاهير"}</h2>
              <span className="text-[9px] font-bold text-gray-400 underline cursor-pointer">عرض الكل</span>
            </div>

            {/* Two Column Grid mock */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
              {/* Right Side: Main Banner */}
              <div className="relative w-full aspect-[16/10] sm:h-[220px] rounded-xl overflow-hidden shadow-sm bg-gray-100 group">
                {watchedBannerImage ? (
                  <img src={watchedBannerImage} alt={watchedBannerAlt || "Banner Preview"} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                    <ImageIcon size={32} />
                    <span className="text-[10px] font-black mt-2">لا توجد صورة للبانر</span>
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-[#BE9D72] text-[8px] font-black px-2 py-1 rounded-full border border-[#BE9D72]/30 flex items-center gap-1">
                  <span>اختيار الصفوة والمشاهير</span>
                </div>
              </div>

              {/* Left Side: Mock Products Grid */}
              <div className="grid grid-cols-2 gap-2 max-h-[350px] overflow-y-auto pr-1 no-scrollbar">
                {watchedProducts.map((prod) => (
                  <div key={prod.id} className="bg-white p-2 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
                    <div className="aspect-[4/5] bg-gray-50 rounded-lg overflow-hidden relative mb-1.5 flex items-center justify-center">
                      {prod.image ? (
                        <img src={prod.image} alt={prod.name} className="w-full h-full object-contain" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center"><ImageIcon size={18} className="text-gray-200" /></div>
                      )}
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-[8px] font-black text-gray-400">{prod.brand || "البراند"}</p>
                      <p className="text-[9px] font-black text-gray-800 truncate">{prod.name || "الاسم"}</p>
                      {prod.celebrity && (
                        <div className="inline-flex items-center gap-1 bg-[#BE9D72]/10 rounded px-1 py-0.5 text-[7px] font-bold text-[#A37F55] mt-1 w-full truncate">
                          <span className="w-1 h-1 rounded-full bg-[#BE9D72] shrink-0"></span>
                          <span className="truncate">عطر يفضله: {prod.celebrity}</span>
                        </div>
                      )}
                      <p className="text-[9px] font-black text-gray-900 mt-1">{prod.price || "0"} ريال</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`text-center text-[10px] font-black uppercase tracking-wider ${isActive ? "text-[#5a8a6a]" : "text-red-500"} pt-2`}>
              {isActive ? "● القسم معروض حالياً في الصفحة الرئيسية" : "● القسم مخفي حالياً في الصفحة الرئيسية"}
            </div>
          </div>
        </div>

      </div>

      {/* FIXED SAVE BUTTON ON MOBILE */}
      <div className="fixed md:sticky bottom-6 left-4 right-4 md:bottom-8 md:left-auto md:right-auto z-50 flex justify-center md:justify-start">
        <button type="submit" className="w-full md:w-auto bg-black text-white px-10 md:px-12 py-4 md:py-5 rounded-full font-black text-sm flex items-center justify-center gap-3 shadow-2xl shadow-black/20 hover:scale-105 transition-all">
          <Save size={20} />
          تحديث بيانات القسم
        </button>
      </div>

    </form>
  );
}
