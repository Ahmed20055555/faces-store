"use client";

import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Save, Image as ImageIcon, Plus, Trash2, GripVertical, UploadCloud, Link as LinkIcon } from "lucide-react";

interface SlideItem {
  id: number;
  title: string;
  image: string;
  link?: string;
}

interface PromoItem {
  id: number;
  title: string;
  image: string;
  link?: string;
}

interface FormData {
  heroSlides: SlideItem[];
  promoSlides: PromoItem[];
}

const INITIAL_HERO: SlideItem[] = [
  { id: 1, title: "نفحات ترتقي بالحواس", image: "/IMLDI_BANNER_750x714.avif", link: "/category/perfumes" },
  { id: 2, title: "أيقونات عطرية", image: "/hero.png", link: "/new-arrivals" },
];

const INITIAL_PROMOS: PromoItem[] = [
  { id: 1, title: "موسم يزهر بالجمال", image: "/DK-Promo.avif", link: "/offers" },
  { id: 2, title: "عروض حصرية", image: "/DK-Promo-EN-1.avif", link: "/exclusive" },
];

export default function HeroAndPromoPage() {
  const { handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: {
      heroSlides: INITIAL_HERO,
      promoSlides: INITIAL_PROMOS,
    },
  });

  const heroSlides = watch("heroSlides");
  const promoSlides = watch("promoSlides");

  const [heroDragIndex, setHeroDragIndex] = useState<number | null>(null);
  const [heroDragOver, setHeroDragOver] = useState<number | null>(null);
  const [promoDragIndex, setPromoDragIndex] = useState<number | null>(null);
  const [promoDragOver, setPromoDragOver] = useState<number | null>(null);

  const heroFileRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});
  const promoFileRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  const handleImageUpload = (section: "heroSlides" | "promoSlides", id: number, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const items = watch(section);
      setValue(section, items.map((item) => item.id === id ? { ...item, image: reader.result as string } : item));
    };
    reader.readAsDataURL(file);
  };

  const handleTitleUpdate = (section: "heroSlides" | "promoSlides", id: number, value: string) => {
    const items = watch(section);
    setValue(section, items.map((item) => item.id === id ? { ...item, title: value } : item));
  };

  const handleLinkUpdate = (section: "heroSlides" | "promoSlides", id: number, value: string) => {
    const items = watch(section);
    setValue(section, items.map((item) => item.id === id ? { ...item, link: value } : item));
  };

  const addItem = (section: "heroSlides" | "promoSlides", defaultTitle: string) => {
    const items = watch(section);
    setValue(section, [...items, { id: Date.now(), title: defaultTitle, image: "", link: "#" }]);
  };

  const removeItem = (section: "heroSlides" | "promoSlides", id: number) => {
    const items = watch(section);
    setValue(section, items.filter((item) => item.id !== id));
  };

  const makeDragHandlers = (
    section: "heroSlides" | "promoSlides",
    dragIndex: number | null,
    setDragIndex: (v: number | null) => void,
    setDragOverIdx: (v: number | null) => void
  ) => ({
    onDragStart: (index: number) => setDragIndex(index),
    onDragOver: (e: React.DragEvent, index: number) => {
      e.preventDefault();
      if (dragIndex === null || dragIndex === index) return;
      setDragOverIdx(index);
    },
    onDrop: (e: React.DragEvent, dropIndex: number) => {
      e.preventDefault();
      if (dragIndex === null || dragIndex === dropIndex) {
        setDragIndex(null);
        setDragOverIdx(null);
        return;
      }
      const items = [...watch(section)];
      const [dragged] = items.splice(dragIndex, 1);
      items.splice(dropIndex, 0, dragged);
      setValue(section, items);
      setDragIndex(null);
      setDragOverIdx(null);
    },
    onDragEnd: () => {
      setDragIndex(null);
      setDragOverIdx(null);
    },
  });

  const heroDrag = makeDragHandlers("heroSlides", heroDragIndex, setHeroDragIndex, setHeroDragOver);
  const promoDrag = makeDragHandlers("promoSlides", promoDragIndex, setPromoDragIndex, setPromoDragOver);

  const onSubmit = (data: FormData) => {
    console.log("Hero & Promo Data:", data);
    alert("تم حفظ البيانات!");
  };

  const renderList = (
    items: (SlideItem | PromoItem)[],
    section: "heroSlides" | "promoSlides",
    dragHandlers: ReturnType<typeof makeDragHandlers>,
    dragIdx: number | null,
    dragOverIdx: number | null,
    fileRefs: React.MutableRefObject<{ [key: number]: HTMLInputElement | null }>,
    accentColor: string,
  ) => (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={item.id}
          draggable
          onDragStart={() => dragHandlers.onDragStart(index)}
          onDragOver={(e) => dragHandlers.onDragOver(e, index)}
          onDrop={(e) => dragHandlers.onDrop(e, index)}
          onDragEnd={dragHandlers.onDragEnd}
          className={`
            flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 md:p-4 rounded-[2rem] md:rounded-[1.5rem] border group transition-all duration-300 select-none
            ${dragIdx === index
              ? "opacity-40 scale-95 border-dashed border-gray-300 bg-gray-100"
              : dragOverIdx === index
                ? `border-gray-400 bg-gray-50 shadow-lg scale-[1.02]`
                : "bg-gray-50/50 border-gray-100 hover:bg-white hover:shadow-md"
            }
          `}
          style={dragOverIdx === index ? { borderColor: accentColor + "80" } : {}}
        >
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 transition-colors shrink-0">
              <GripVertical size={20} />
            </div>

            <div
              onClick={() => fileRefs.current[item.id]?.click()}
              className="w-20 h-20 bg-white border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center overflow-hidden shrink-0 cursor-pointer group/img hover:border-gray-400 transition-all relative"
            >
              <input
                type="file"
                accept="image/*"
                ref={(el) => { fileRefs.current[item.id] = el; }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(section, item.id, file);
                }}
                className="hidden"
              />
              {item.image ? (
                <>
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 sm:group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                    <UploadCloud size={20} className="text-white" />
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-1">
                  <ImageIcon size={24} className="text-gray-300" />
                  <span className="text-[10px] font-bold text-gray-300">رفع صورة</span>
                </div>
              )}
            </div>
            
            <div className="sm:hidden flex-1 flex justify-end">
              <button
                type="button"
                onClick={() => removeItem(section, item.id)}
                className="text-red-500 p-3 transition-colors bg-white rounded-full shadow-sm border border-gray-100"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          <div className="flex-1 space-y-4 w-full min-w-0">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">العنوان</label>
              <input
                type="text"
                value={item.title}
                onChange={(e) => handleTitleUpdate(section, item.id, e.target.value)}
                className="w-full bg-transparent border-b border-gray-100 focus:border-black text-[15px] font-black focus:ring-0 p-1 text-gray-900 outline-none transition-colors"
                placeholder="أدخل العنوان..."
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">الرابط (URL)</label>
              <div className="flex items-center gap-2 bg-white px-3 py-2.5 rounded-xl border border-gray-100 focus-within:border-gray-300 transition-colors">
                <LinkIcon size={14} className="text-gray-400 shrink-0" />
                <input
                  type="text"
                  value={item.link || ""}
                  onChange={(e) => handleLinkUpdate(section, item.id, e.target.value)}
                  className="w-full bg-transparent text-[13px] font-bold focus:ring-0 p-0 outline-none"
                  placeholder="https://balmy.com/..."
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => removeItem(section, item.id)}
            className="hidden sm:block text-gray-300 hover:text-red-500 p-2 transition-colors bg-white rounded-full shadow-sm border border-gray-100 opacity-0 group-hover:opacity-100"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[1600px] mx-auto animate-in fade-in duration-700 space-y-8 md:space-y-12 pb-20 font-sans px-4 md:px-0" dir="rtl">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
        
        {/* HERO SECTION */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-4 border-r-4 border-black">
            <h2 className="text-lg md:text-xl font-black text-gray-900">السلايدر الرئيسي</h2>
            <button
              type="button"
              onClick={() => addItem("heroSlides", "سلايد جديد")}
              className="bg-black/10 text-black px-4 py-2 rounded-full text-[10px] md:text-xs font-black hover:bg-black/20 transition-all flex items-center gap-2"
            >
              <Plus size={14} /> إضافة
            </button>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-[2rem] border border-gray-100 shadow-sm space-y-4 max-h-[500px] md:max-h-[600px] overflow-y-auto no-scrollbar">
            {renderList(heroSlides, "heroSlides", heroDrag, heroDragIndex, heroDragOver, heroFileRefs, "#000000")}
          </div>
        </div>

        {/* PROMO SECTION */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-4 border-r-4 border-[#5a8a6a]">
            <h2 className="text-lg md:text-xl font-black text-gray-900">الإعلانات</h2>
            <button
              type="button"
              onClick={() => addItem("promoSlides", "إعلان جديد")}
              className="bg-[#5a8a6a]/10 text-[#5a8a6a] px-4 py-2 rounded-full text-[10px] md:text-xs font-black hover:bg-[#5a8a6a]/20 transition-all flex items-center gap-2"
            >
              <Plus size={14} /> إضافة
            </button>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-[2rem] border border-gray-100 shadow-sm space-y-4 max-h-[500px] md:max-h-[600px] overflow-y-auto no-scrollbar">
            {renderList(promoSlides, "promoSlides", promoDrag, promoDragIndex, promoDragOver, promoFileRefs, "#5a8a6a")}
          </div>
        </div>

      </div>

      <div className="fixed md:sticky bottom-6 left-4 right-4 md:bottom-8 md:left-auto md:right-auto z-50 flex justify-center md:justify-end">
        <button type="submit" className="w-full md:w-auto bg-black text-white px-10 md:px-12 py-4 md:py-5 rounded-full font-black text-sm flex items-center justify-center gap-3 hover:bg-gray-800 transition-all shadow-2xl shadow-black/20">
          <Save size={20} />
          حفظ التغييرات
        </button>
      </div>

    </form>
  );
}
