"use client";

import React, { useState, useRef } from "react";
import { Save, Sparkles, UploadCloud, Image as ImageIcon, Trash2, Star, Plus } from "lucide-react";

export default function CelebrityPerfumesPage() {
  const [data, setData] = useState({
    title: "عطور المشاهيرر",
    bannerAlt: "Dior Sauvage - Celebrities' Choice",
    bannerImage: "/product-12.jpeg",
    isActive: true,
    products: [
      { id: "gift_0", brand: "بالمي | Balmy", name: "عطر بالمي أوبالين", price: "531", image: "/product-14.jpeg", celebrity: "عمرو دياب" },
      { id: "gift_1", brand: "بالمي | Balmy", name: "عطر بالمي مسك روز", price: "489", image: "/product-15.jpeg", celebrity: "أنجلينا جولي" },
      { id: "gift_2", brand: "بالمي | Balmy", name: "عطر بالمي سفاري عود", price: "621", image: "/product-16.jpeg", celebrity: "جوني ديب" },
      { id: "gift_3", brand: "بالمي | Balmy", name: "عطر بالمي هيريتج", price: "477", image: "/product-17.jpeg", celebrity: "أحمد عز" },
      { id: "gift_4", brand: "بالمي | Balmy", name: "عطر بالمي رويال توباز", price: "587", image: "/product-18.jpeg", celebrity: "جورجينا" },
      { id: "gift_5", brand: "بالمي | Balmy", name: "عطر بالمي لورين", price: "518", image: "/product-19.jpeg", celebrity: "نادين نجيم" },
    ]
  });

  const [activeProductTab, setActiveProductTab] = useState(0);
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

  const handleProductChange = (index: number, field: string, value: string) => {
    setData((prev) => {
      const updatedProducts = [...prev.products];
      updatedProducts[index] = { ...updatedProducts[index], [field]: value };
      return { ...prev, products: updatedProducts };
    });
  };

  const handleProductImageUpload = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setData((prev) => {
        const updatedProducts = [...prev.products];
        updatedProducts[index] = { ...updatedProducts[index], image: reader.result as string };
        return { ...prev, products: updatedProducts };
      });
    };
    reader.readAsDataURL(file);
  };

  const addProduct = () => {
    const newId = `gift_${Date.now()}`;
    setData((prev) => ({
      ...prev,
      products: [
        ...prev.products,
        { id: newId, brand: "بالمي | Balmy", name: "عطر جديد", price: "0", image: "", celebrity: "اسم المشهور" }
      ]
    }));
    setActiveProductTab(data.products.length);
  };

  const removeProduct = (index: number) => {
    setData((prev) => {
      const updated = prev.products.filter((_, i) => i !== index);
      return { ...prev, products: updated };
    });
    setActiveProductTab((prev) => Math.max(0, prev - 1));
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
    console.log("Celebrity Perfumes Data:", data);
    alert("تم حفظ إعدادات عطور المشاهير والمنتجات بنجاح!");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-[1600px] mx-auto animate-in fade-in duration-700 space-y-6 md:space-y-10 px-4 py-8 md:pb-20 font-sans" dir="rtl">

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
                const nextVal = !data.isActive;
                setData(prev => ({ ...prev, isActive: nextVal }));
                if (typeof window !== "undefined") {
                  localStorage.setItem("celebrityPerfumes_isActive", String(nextVal));
                  window.dispatchEvent(new Event("sectionActiveChanged"));
                }
              }}
              className={`w-11 h-6 rounded-full transition-all relative ${data.isActive ? "bg-[#BE9D72]" : "bg-gray-200"} shrink-0`}
            >
              <div className={`absolute top-[2px] w-5 h-5 bg-white rounded-full transition-all ${data.isActive ? "right-[2px]" : "right-[22px]"}`} />
            </button>
          </div>

          <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl md:rounded-2xl border border-gray-100 shadow-sm self-start sm:self-auto min-w-[220px] sm:min-w-0">
            <div className={`w-2 h-2 rounded-full ${data.isActive ? "bg-[#BE9D72]" : "bg-red-500"} animate-pulse`}></div>
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
              إعدادات قسم عطور المشاهير
            </h3>
          </div>

          <div className="space-y-4">


            <div className="space-y-1">
              <label className="text-[10px] md:text-[11px] font-black text-gray-400 uppercase tracking-widest">صورة البانر الرئيسي</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-gray-200 rounded-2xl md:rounded-[2rem] p-6 md:p-8 flex flex-col items-center justify-center gap-3 bg-gray-50 hover:bg-white hover:border-[#BE9D72] transition-all cursor-pointer group relative overflow-hidden min-h-[160px] md:min-h-[200px]"
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
                        <UploadCloud size={14} className="text-[#BE9D72]" />
                        <span className="text-[10px] font-black text-gray-800">تغيير الصورة</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <UploadCloud size={32} className="text-gray-300 group-hover:text-[#BE9D72] transition-colors" />
                    <p className="text-[11px] font-black text-gray-600 tracking-tighter text-center">
                      اضغط أو اسحب صورة هنا
                      <br />
                      <span className="text-[9px] text-gray-400">المقاس المثالي: 1200x800px</span>
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

            {/* Products Management */}
            <div className="space-y-4 pt-6 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <h4 className="text-xs md:text-sm font-black text-gray-800 flex items-center gap-1.5">
                  <Star size={16} className="text-[#BE9D72]" />
                  منتجات عطور المشاهير ({data.products.length})
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

              {/* Product Selector Tabs */}
              <div className="flex gap-1.5 overflow-x-auto pb-2 no-scrollbar scroll-smooth">
                {data.products.map((prod, idx) => (
                  <button
                    key={prod.id}
                    type="button"
                    onClick={() => setActiveProductTab(idx)}
                    className={`px-3.5 py-2 rounded-xl text-[11px] font-black shrink-0 transition-all ${activeProductTab === idx
                      ? "bg-black text-white shadow-md shadow-black/10"
                      : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                      }`}
                  >
                    العطر {idx + 1}
                  </button>
                ))}
              </div>

              {/* Active Product Form Fields */}
              {data.products.map((prod, idx) => {
                if (activeProductTab !== idx) return null;
                return (
                  <div key={prod.id} className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50 space-y-4 animate-in fade-in duration-300">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100/50">
                      <span className="text-[10px] font-black text-[#BE9D72]">تعديل بيانات العطر #{idx + 1}</span>
                      {data.products.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeProduct(idx)}
                          className="text-red-400 hover:text-red-600 text-[10px] font-bold flex items-center gap-1 transition-colors"
                        >
                          <Trash2 size={12} />
                          حذف هذا العطر
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase">ماركة المنتج</label>
                        <input
                          type="text"
                          value={prod.brand}
                          onChange={(e) => handleProductChange(idx, "brand", e.target.value)}
                          className="w-full bg-white border border-gray-100 rounded-xl px-3.5 py-2.5 text-xs font-black focus:ring-4 focus:ring-[#BE9D72]/10 outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase">اسم المنتج</label>
                        <input
                          type="text"
                          value={prod.name}
                          onChange={(e) => handleProductChange(idx, "name", e.target.value)}
                          className="w-full bg-white border border-gray-100 rounded-xl px-3.5 py-2.5 text-xs font-black focus:ring-4 focus:ring-[#BE9D72]/10 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase">السعر (ريال)</label>
                        <input
                          type="text"
                          value={prod.price}
                          onChange={(e) => handleProductChange(idx, "price", e.target.value)}
                          className="w-full bg-white border border-gray-100 rounded-xl px-3.5 py-2.5 text-xs font-black focus:ring-4 focus:ring-[#BE9D72]/10 outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase text-[#A37F55]">اسم المشهور المفضل لديه</label>
                        <input
                          type="text"
                          value={prod.celebrity || ""}
                          onChange={(e) => handleProductChange(idx, "celebrity", e.target.value)}
                          placeholder="مثال: عمرو دياب"
                          className="w-full bg-white border border-[#BE9D72]/30 focus:border-[#BE9D72] rounded-xl px-3.5 py-2.5 text-xs font-black focus:ring-4 focus:ring-[#BE9D72]/10 outline-none transition-all text-[#A37F55]"
                        />
                      </div>
                    </div>

                    {/* Product Image Upload */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase">صورة المنتج</label>
                      <div
                        onClick={() => {
                          const fileInput = document.getElementById(`prod-file-${idx}`);
                          fileInput?.click();
                        }}
                        className="border border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center gap-2 bg-white hover:border-[#BE9D72] transition-all cursor-pointer relative overflow-hidden min-h-[100px]"
                      >
                        <input
                          type="file"
                          id={`prod-file-${idx}`}
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleProductImageUpload(idx, file);
                          }}
                        />

                        {prod.image ? (
                          <>
                            <img src={prod.image} alt={prod.name} className="w-16 h-16 object-contain" />
                            <p className="text-[9px] font-black text-gray-500 mt-1">تغيير صورة المنتج</p>
                          </>
                        ) : (
                          <>
                            <UploadCloud size={20} className="text-gray-300" />
                            <p className="text-[9px] font-black text-gray-500">اضغط لرفع صورة المنتج</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
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
              <h2 className="text-[12px] md:text-sm font-black text-gray-900">{data.title}</h2>
              <span className="text-[9px] font-bold text-gray-400 underline cursor-pointer">عرض الكل</span>
            </div>

            {/* Two Column Grid mock */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
              {/* Right Side: Main Banner */}
              <div className="relative w-full aspect-[16/10] sm:h-[220px] rounded-xl overflow-hidden shadow-sm bg-gray-100 group">
                {data.bannerImage ? (
                  <img src={data.bannerImage} alt="Preview" className="w-full h-full object-cover" />
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
                {data.products.map((prod) => (
                  <div key={prod.id} className="bg-white p-2 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
                    <div className="aspect-[4/5] bg-gray-50 rounded-lg overflow-hidden relative mb-1.5 flex items-center justify-center">
                      {prod.image ? (
                        <img src={prod.image} alt="Product" className="w-full h-full object-contain" />
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

            <div className={`text-center text-[10px] font-black uppercase tracking-wider ${data.isActive ? "text-[#5a8a6a]" : "text-red-500"} pt-2`}>
              {data.isActive ? "● القسم معروض حالياً في الصفحة الرئيسية" : "● القسم مخفي حالياً في الصفحة الرئيسية"}
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
