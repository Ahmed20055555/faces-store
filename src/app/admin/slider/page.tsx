"use client";

import React, { useState, useRef } from "react";
import {
  Plus,
  Image as ImageIcon,
  Trash2,
  Move,
  Eye,
  Upload,
  CheckCircle2,
  Monitor,
  Layout,
  Type
} from "lucide-react";
import { motion, Reorder, AnimatePresence } from "framer-motion";

const initialHeroSliders = [
  { id: "1", title: "مجموعة الربيع", image: "/DK-Hero.avif", type: "Hero" },
  { id: "2", title: "عرض لوريال", image: "/DK-Hero-Loreal-EN-3.avif", type: "Hero" },
];

const initialPromoAds = [
  { id: "101", title: "بانر التوصيل المجاني", image: "/DK-Promo.avif", type: "Promo" },
  { id: "102", title: "عرض إيسي مياكي", image: "/MB-Hero-Issey-Miyake-UAE-EN-2.avif", type: "Promo" },
];

export default function AdminSlider() {
  const [heroSliders, setHeroSliders] = useState(initialHeroSliders);
  const [promoAds, setPromoAds] = useState(initialPromoAds);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">إدارة الواجهة البصرية</h1>
          <p className="text-gray-500 font-medium">تحكم في الصور المتحركة (Slider) والبانرات الترويجية (Ads).</p>
        </div>
        <div className="flex gap-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
          <button
            onClick={handleImageClick}
            className="bg-black text-white px-8 py-4 rounded-[1.5rem] font-black text-sm flex items-center gap-2 hover:shadow-2xl transition-all shadow-black/20"
          >
            <Upload size={20} />
            رفع محتوى جديد
          </button>
        </div>
      </div>

      {/* Image Preview / Picker (Visible only when image selected) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white p-8 rounded-[3rem] border-2 border-black border-dashed flex flex-col items-center gap-6"
          >
            <div className="w-full max-w-2xl aspect-video rounded-2xl overflow-hidden shadow-2xl relative group">
              <img src={selectedImage} className="w-full h-full object-cover" alt="Preview" />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-lg"
              >
                <Trash2 size={20} />
              </button>
            </div>
            <div className="flex gap-4 w-full max-w-md">
              <div className="flex-grow space-y-2">
                <label className="text-xs font-black text-gray-400 mr-2 uppercase">عنوان المحتوى</label>
                <input type="text" placeholder="مثلاً: عرض العيد الوطني" className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 text-sm font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 mr-2 uppercase">النوع</label>
                <select className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 text-sm font-bold">
                  <option>سلايدر رئيسي</option>
                  <option>إعلان ترويجي</option>
                </select>
              </div>
            </div>
            <button className="bg-green-500 text-white px-12 py-3 rounded-xl font-black text-sm shadow-lg shadow-green-500/20">تأكيد الإضافة</button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">

        {/* Section 1: Hero Slider */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#8c1d3b]/10 text-[#8c1d3b] rounded-xl">
              <Monitor size={24} />
            </div>
            <h2 className="text-xl font-black text-gray-900">سلايدر الهيرو الرئيسي (Slider)</h2>
          </div>

          <Reorder.Group axis="y" values={heroSliders} onReorder={setHeroSliders} className="space-y-4">
            {heroSliders.map((slider) => (
              <Reorder.Item
                key={slider.id}
                value={slider}
                className="bg-white p-5 rounded-[2rem] border border-gray-50 shadow-sm flex items-center gap-6 group cursor-grab active:cursor-grabbing hover:border-black/10 transition-colors"
              >
                <div className="p-1 text-gray-200 group-hover:text-black transition-colors"><Move size={18} /></div>
                <div className="w-32 h-20 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
                  <img src={slider.image} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <span className="text-[10px] font-black text-[#8c1d3b] uppercase tracking-widest mb-1 block">Hero Slider</span>
                  <h4 className="font-black text-gray-900 text-sm">{slider.title}</h4>
                </div>
                <div className="flex gap-2">
                  <button className="p-2.5 text-gray-400 hover:text-black hover:bg-gray-50 rounded-xl"><Eye size={18} /></button>
                  <button className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl"><Trash2 size={18} /></button>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>

        {/* Section 2: Promo Ads */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <Layout size={24} />
            </div>
            <h2 className="text-xl font-black text-gray-900">الإعلانات والبانرات (Ads)</h2>
          </div>

          <Reorder.Group axis="y" values={promoAds} onReorder={setPromoAds} className="space-y-4">
            {promoAds.map((ad) => (
              <Reorder.Item
                key={ad.id}
                value={ad}
                className="bg-white p-5 rounded-[2rem] border border-gray-50 shadow-sm flex items-center gap-6 group cursor-grab active:cursor-grabbing hover:border-blue-100 transition-colors"
              >
                <div className="p-1 text-gray-200 group-hover:text-black transition-colors"><Move size={18} /></div>
                <div className="w-32 h-20 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
                  <img src={ad.image} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1 block">Promo Ad</span>
                  <h4 className="font-black text-gray-900 text-sm">{ad.title}</h4>
                </div>
                <div className="flex gap-2">
                  <button className="p-2.5 text-gray-400 hover:text-black hover:bg-gray-50 rounded-xl"><Eye size={18} /></button>
                  <button className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl"><Trash2 size={18} /></button>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>

      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
