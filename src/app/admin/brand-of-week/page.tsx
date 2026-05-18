"use client";

import React, { useState, useRef } from "react";
import { Save, Star, UploadCloud, Image as ImageIcon, Plus, Trash2, GripVertical } from "lucide-react";

interface BrandProduct {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
}

const INITIAL_PRODUCTS: BrandProduct[] = [
  { id: 1, title: "", description: "", price: "", image: "" },
  { id: 2, title: "", description: "", price: "", image: "" },
  { id: 3, title: "", description: "", price: "", image: "" },
];

export default function BrandOfWeekPage() {
  const [isActive, setIsActive] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("brandOfWeek_isActive");
      return saved === null ? true : saved === "true";
    }
    return true;
  });
  const [brandName, setBrandName] = useState("ايسي مياكي");
  const [bannerImage, setBannerImage] = useState("");
  const [products, setProducts] = useState<BrandProduct[]>(INITIAL_PRODUCTS);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const bannerInputRef = useRef<HTMLInputElement | null>(null);
  const productFileRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  const handleBannerUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => setBannerImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleProductImageUpload = (id: number, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setProducts(prev => prev.map(p => p.id === id ? { ...p, image: reader.result as string } : p));
    };
    reader.readAsDataURL(file);
  };

  const handleProductTitle = (id: number, value: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, title: value } : p));
  };

  const handleProductDescription = (id: number, value: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, description: value } : p));
  };

  const handleProductPrice = (id: number, value: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, price: value } : p));
  };

  const addProduct = () => {
    setProducts(prev => [...prev, { id: Date.now(), title: "", description: "", price: "", image: "" }]);
  };

  const removeProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
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
    setProducts(prev => {
      const updated = [...prev];
      const [dragged] = updated.splice(draggedIndex, 1);
      updated.splice(dropIndex, 0, dragged);
      return updated;
    });
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Brand of Week Data:", { brandName, bannerImage, products });
    alert("تم حفظ حملة عطور بوص!");
  };

  return (
    <form onSubmit={onSubmit} className="max-w-[1600px] mx-auto animate-in fade-in duration-700 space-y-8 md:space-y-12 pb-20 font-sans px-4 md:px-0" dir="rtl">

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
                  localStorage.setItem("brandOfWeek_isActive", String(nextVal));
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
              <Star size={20} className="text-[#accfad] fill-[#accfad]" />
              إدارة الحملة
            </h3>
          </div>


          {/* Campaign Banner Upload */}
          <div className="space-y-1">
            <label className="text-[10px] md:text-[11px] font-black text-gray-400 uppercase tracking-widest">صورة الحملة</label>
            <div
              onClick={() => bannerInputRef.current?.click()}
              className="border-2 border-dashed border-gray-200 rounded-2xl md:rounded-[2rem] p-6 md:p-8 flex flex-col items-center justify-center gap-3 bg-gray-50 hover:bg-white hover:border-[#accfad] transition-all cursor-pointer group relative overflow-hidden min-h-[140px] md:min-h-[180px]"
            >
              <input type="file" ref={bannerInputRef} accept="image/*" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) handleBannerUpload(file); }} />
              {bannerImage ? (
                <>
                  <img src={bannerImage} alt="Banner" className="w-full h-full object-cover absolute inset-0" />
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
                    اضغط لرفع صورة الحملة
                    <br /><span className="text-[9px] text-gray-400">المقاس الموصى به: 1:1</span>
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Products List */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-[10px] md:text-[11px] font-black text-gray-400 uppercase tracking-widest">عطور بوص</label>
              <button type="button" onClick={addProduct} className="bg-black text-white px-4 py-2 rounded-full text-[10px] md:text-xs font-black flex items-center gap-1.5 hover:bg-gray-800 transition-all shrink-0">
                <Plus size={14} /> إضافة
              </button>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1 no-scrollbar">
              {products.map((product, index) => (
                <div
                  key={product.id}
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
                  <div className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 transition-colors shrink-0">
                    <GripVertical size={18} />
                  </div>

                  <div
                    onClick={() => productFileRefs.current[product.id]?.click()}
                    className="w-12 h-12 md:w-14 md:h-14 bg-white border border-gray-100 rounded-xl flex items-center justify-center overflow-hidden shrink-0 cursor-pointer relative shadow-sm"
                  >
                    <input type="file" accept="image/*" ref={(el) => { productFileRefs.current[product.id] = el; }} className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) handleProductImageUpload(product.id, file); }} />
                    {product.image ? (
                      <>
                        <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <UploadCloud size={14} className="text-white" />
                        </div>
                      </>
                    ) : (
                      <ImageIcon size={18} className="text-gray-200" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 space-y-2">
                    {/* Title Input */}
                    <input
                      type="text"
                      value={product.title}
                      onChange={(e) => handleProductTitle(product.id, e.target.value)}
                      className="w-full bg-white border border-gray-100 rounded-xl text-[12px] md:text-sm font-black focus:border-black focus:ring-4 focus:ring-black/5 p-2 md:p-2.5 text-gray-900 outline-none transition-all shadow-sm"
                      placeholder="اسم العطر..."
                    />

                    {/* Description Input */}
                    <input
                      type="text"
                      value={product.description}
                      onChange={(e) => handleProductDescription(product.id, e.target.value)}
                      className="w-full bg-white border border-gray-100 rounded-xl text-[12px] md:text-sm font-bold focus:border-black focus:ring-4 focus:ring-black/5 p-2 md:p-2.5 text-gray-500 outline-none transition-all shadow-sm"
                      placeholder="وصف العطر (مثال: عطر بالمي إليكسير)..."
                    />

                    {/* Price Input */}
                    <div className="relative max-w-[150px]">
                      <input
                        type="text"
                        value={product.price}
                        onChange={(e) => handleProductPrice(product.id, e.target.value)}
                        className="w-full bg-white border border-gray-100 rounded-xl text-[12px] md:text-sm font-black focus:border-black focus:ring-4 focus:ring-black/5 pl-10 pr-3 py-2 md:py-2.5 text-gray-900 outline-none transition-all shadow-sm text-right"
                        placeholder="السعر..."
                      />
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[9px] font-black text-gray-400">ريال</span>
                    </div>
                  </div>

                  <button type="button" onClick={() => removeProduct(product.id)} className="text-gray-300 hover:text-red-500 p-2 transition-colors sm:opacity-0 sm:group-hover:opacity-100">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
            <GripVertical size={14} className="text-gray-300" />
            <p className="text-[10px] font-bold text-gray-400">اسحب للترتيب · اضغط الأيقونة لرفع صورة</p>
          </div>

          <button type="submit" className="w-full bg-black text-white py-4 rounded-xl md:rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-xl shadow-black/10">
            <Save size={18} />
            تأكيد عطور بوص
          </button>
        </div>

        {/* Live Preview */}
        <div className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-gray-200 shadow-sm flex flex-col justify-center items-center group relative overflow-hidden h-fit self-start min-h-[300px]">
          <div className="absolute top-4 right-6 text-[9px] font-black text-gray-200 uppercase tracking-widest">Mockup Preview</div>
          <h4 className="text-base md:text-2xl font-black text-gray-900 tracking-tight text-center mb-6 md:mb-8 mt-4">عطور بوص - {brandName}</h4>

          <div className="aspect-square bg-gray-50 rounded-3xl overflow-hidden border border-gray-50 max-w-[250px] md:max-w-sm mx-auto w-full relative mb-6 md:mb-8">
            {bannerImage ? (
              <img src={bannerImage} alt="Campaign" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center"><ImageIcon size={48} className="text-gray-200 opacity-20" /></div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
          </div>

          <div className="w-full grid grid-cols-3 gap-3 md:gap-4">
            {products.slice(0, 3).map((product) => (
              <div key={product.id} className="space-y-1">
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
