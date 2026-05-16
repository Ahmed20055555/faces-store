"use client";

import React, { useState } from "react";
import { Save, Plus, Trash2, Image as ImageIcon, GripVertical, UploadCloud } from "lucide-react";

const INITIAL_CATEGORIES = [
  { id: 1, name: "عطور نسائية", image: "" },
  { id: 2, name: "عطور رجالية", image: "" },
  { id: 3, name: "عطور النيش", image: "" },
  { id: 4, name: "عطور الشعر", image: "" },
  { id: 5, name: "أطقم هدايا", image: "" },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleUpdateName = (id: number, value: string) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, name: value } : c));
  };

  const handleImageUpload = (id: number, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setCategories(prev => prev.map(c => c.id === id ? { ...c, image: reader.result as string } : c));
    };
    reader.readAsDataURL(file);
  };

  const removeCategory = (id: number) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  const addCategory = () => {
    setCategories(prev => [...prev, { id: Date.now(), name: "تصنيف جديد", image: "" }]);
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
    setCategories(prev => {
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
    console.log("Categories Data:", categories);
    alert("تم حفظ التصنيفات!");
  };

  return (
    <form onSubmit={onSubmit} className="max-w-[1600px] mx-auto animate-in fade-in duration-700 space-y-8 md:space-y-12 pb-20 font-sans px-4 md:px-0" dir="rtl">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-start">
        
        {/* CATEGORIES LIST SECTION */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-4 border-r-4 border-[#8c1d3b]">
            <h2 className="text-base md:text-xl font-black text-gray-900 leading-tight">إدارة التصنيفات</h2>
            <button 
              type="button"
              onClick={addCategory} 
              className="bg-[#8c1d3b]/10 text-[#8c1d3b] px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[9px] md:text-xs font-black hover:bg-[#8c1d3b]/20 transition-all flex items-center gap-1.5 md:gap-2 shrink-0"
            >
              <Plus className="w-3 h-3 md:w-3.5 md:h-3.5" /> إضافة
            </button>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-[2rem] border border-gray-100 shadow-sm space-y-4 max-h-[500px] md:max-h-[600px] overflow-y-auto no-scrollbar">
            {categories.map((cat, index) => (
              <div
                key={cat.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={() => { setDraggedIndex(null); setDragOverIndex(null); }}
                className={`
                  flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-2xl md:rounded-[1.5rem] border group transition-all duration-300 select-none
                  ${draggedIndex === index
                    ? "opacity-40 scale-95 border-dashed border-gray-300 bg-gray-100"
                    : dragOverIndex === index
                      ? "border-[#8c1d3b]/50 bg-[#8c1d3b]/5 shadow-lg scale-[1.02]"
                      : "bg-gray-50/50 border-gray-100 hover:bg-white hover:shadow-md"
                  }
                `}
              >
                <div className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 transition-colors shrink-0">
                  <GripVertical size={18} />
                </div>

                <label className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 relative overflow-hidden shrink-0 cursor-pointer shadow-sm">
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => { if (e.target.files?.[0]) handleImageUpload(cat.id, e.target.files[0]); }} />
                  {cat.image ? (
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                  ) : (
                    <UploadCloud size={18} className="md:w-5 md:h-5" />
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="text-[8px] font-black text-white">تغيير</span>
                  </div>
                </label>

                <div className="flex-1 space-y-0.5 min-w-0">
                  <label className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest">اسم التصنيف</label>
                  <input
                    type="text"
                    value={cat.name}
                    onChange={(e) => handleUpdateName(cat.id, e.target.value)}
                    className="w-full bg-transparent border-b border-transparent focus:border-black text-[13px] md:text-sm font-black focus:ring-0 p-0.5 text-gray-900 outline-none transition-colors"
                    placeholder="أدخل الاسم..."
                  />
                </div>

                <button type="button" onClick={() => removeCategory(cat.id)} className="text-gray-300 hover:text-red-500 p-2 transition-colors bg-white rounded-full shadow-sm border border-gray-100 opacity-0 group-hover:opacity-100 sm:opacity-100">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 px-5 py-3 bg-gray-50 rounded-2xl border border-gray-100">
            <GripVertical size={16} className="text-gray-300" />
            <p className="text-[10px] font-bold text-gray-400 uppercase">اسحب للترتيب · اضغط الأيقونة لرفع صورة</p>
          </div>
        </div>

        {/* PREVIEW SECTION */}
        <div className="space-y-6">
          <div className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-gray-200 shadow-sm flex flex-col justify-center items-center relative overflow-hidden h-fit self-start">
             <div className="absolute top-4 right-6 text-[9px] font-black text-gray-200 uppercase tracking-widest">Preview Mode</div>
             
             <div className="w-full grid grid-cols-4 sm:grid-cols-5 gap-3 md:gap-6 mt-6">
                {categories.slice(0, 5).map((cat) => (
                  <div key={cat.id} className="flex flex-col items-center gap-2 shrink-0 group/cat">
                    <div className="w-12 h-12 md:w-20 md:h-20 rounded-full border border-gray-50 bg-white shadow-sm overflow-hidden relative transition-transform duration-300">
                      {cat.image ? (
                        <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-gray-200">
                           <ImageIcon size={18} className="md:w-6 md:h-6" />
                        </div>
                      )}
                    </div>
                    <span className="text-[8px] md:text-[11px] font-black text-gray-900 text-center max-w-[60px] leading-tight">
                      {cat.name}
                    </span>
                  </div>
                ))}
             </div>
             {categories.length > 5 && (
               <p className="text-[9px] font-bold text-gray-300 mt-6">+ {categories.length - 5} تصنيفات أخرى</p>
             )}
          </div>
        </div>
      </div>

      {/* FIXED SAVE BUTTON ON MOBILE */}
      <div className="fixed md:sticky bottom-6 left-4 right-4 md:bottom-8 md:left-auto md:right-auto z-50 flex justify-center md:justify-end">
        <button type="submit" className="w-full md:w-auto bg-black text-white px-10 md:px-12 py-4 md:py-5 rounded-full font-black text-sm flex items-center justify-center gap-3 shadow-2xl shadow-black/20 hover:scale-105 transition-all">
          <Save size={20} />
          حفظ التصنيفات
        </button>
      </div>

    </form>
  );
}
