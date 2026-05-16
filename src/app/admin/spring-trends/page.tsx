"use client";

import React, { useState, useRef, useCallback } from "react";
import { Save, Image as ImageIcon, Plus, Trash2, GripVertical, Upload, X } from "lucide-react";

interface TrendItem {
  id: number;
  title: string;
  image: string;
}

const INITIAL_TRENDS: TrendItem[] = [
  { id: 1, title: "نفحات ربيعية فاخرة", image: "/DK-SUB-Fragrance_KSA-1.avif" },
  { id: 2, title: "أحدث عطور النيش", image: "/DK-SUB-Skincare_UAE-1.avif" },
  { id: 3, title: "خشبيات الصباح", image: "/DK-SUB.avif" },
];

export default function SpringTrendsPage() {
  const [trends, setTrends] = useState<TrendItem[]>(INITIAL_TRENDS);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  const handleImageUpload = useCallback((id: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setTrends(prev => prev.map(t => t.id === id ? { ...t, image: result } : t));
    };
    reader.readAsDataURL(file);
  }, []);

  const triggerFileInput = (id: number) => {
    fileInputRefs.current[id]?.click();
  };

  const removeImage = (id: number) => {
    setTrends(prev => prev.map(t => t.id === id ? { ...t, image: "" } : t));
  };

  const handleUpdate = (id: number, value: string) => {
    setTrends(prev => prev.map(t => t.id === id ? { ...t, title: value } : t));
  };

  const addTrend = () => {
    setTrends(prev => [...prev, { id: Date.now(), title: "صيحة جديدة", image: "" }]);
  };

  const removeTrend = (id: number) => {
    setTrends(prev => prev.filter(t => t.id !== id));
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
    setTrends(prev => {
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
    console.log("Spring Trends Data:", trends);
    alert("تم حفظ الصيحات!");
  };

  return (
    <form onSubmit={onSubmit} className="max-w-[1600px] mx-auto animate-in fade-in duration-700 space-y-8 md:space-y-12 pb-20 font-sans px-4 md:px-0" dir="rtl">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">صيحات الربيع</h1>
          <p className="text-[10px] md:text-sm font-bold text-gray-400 mt-1 uppercase tracking-[0.2em]">Seasonal Trends & Curations</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl md:rounded-2xl border border-gray-100 shadow-sm self-start">
          <div className="w-2 h-2 rounded-full bg-[#5a8a6a] animate-pulse"></div>
          <span className="text-[10px] md:text-[12px] font-black text-gray-700">وضع التحرير المباشر</span>
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
            {trends.map((trend, index) => (
              <div
                key={trend.id}
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
                <div className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 transition-colors shrink-0">
                  <GripVertical size={18} />
                </div>

                <div
                  onClick={() => triggerFileInput(trend.id)}
                  className="w-14 h-14 md:w-20 md:h-20 bg-white border border-gray-100 rounded-xl flex items-center justify-center overflow-hidden shrink-0 cursor-pointer relative shadow-sm"
                >
                  <input
                    type="file"
                    accept="image/*"
                    ref={(el) => { fileInputRefs.current[trend.id] = el; }}
                    onChange={(e) => { const file = e.target.files?.[0]; if (file) handleImageUpload(trend.id, file); }}
                    className="hidden"
                  />
                  {trend.image ? (
                    <>
                      <img src={trend.image} alt={trend.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Upload size={14} className="text-white" />
                      </div>
                    </>
                  ) : (
                    <ImageIcon size={20} className="text-gray-200" />
                  )}
                </div>

                <div className="flex-1 space-y-0.5 min-w-0">
                  <label className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest">Trend #{index + 1}</label>
                  <input
                    type="text"
                    value={trend.title}
                    onChange={(e) => handleUpdate(trend.id, e.target.value)}
                    className="w-full bg-transparent border-none text-[13px] md:text-sm font-black focus:ring-0 p-0 text-gray-900 outline-none"
                  />
                </div>

                <div className="flex items-center gap-1 shrink-0 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <button type="button" onClick={() => removeTrend(trend.id)} className="text-gray-300 hover:text-red-500 p-2 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
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
            {trends.slice(0, 3).map((trend) => (
              <div key={trend.id} className="space-y-2 md:space-y-3">
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
            ))}
          </div>
        </div>

      </div>

      {/* FIXED SAVE BUTTON */}
      <div className="fixed md:sticky bottom-6 left-4 right-4 md:bottom-8 md:left-auto md:right-auto z-50 flex justify-center md:justify-end">
        <button type="submit" className="w-full md:w-auto bg-black text-white px-10 md:px-12 py-4 md:py-5 rounded-full font-black text-sm flex items-center justify-center gap-3 shadow-2xl shadow-black/20 hover:scale-105 transition-all">
          <Save size={20} />
          حفظ الصيحات
        </button>
      </div>

    </form>
  );
}
