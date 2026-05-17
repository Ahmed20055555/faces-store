"use client";

import React, { useState, useRef } from "react";
import { 
  X, 
  Upload, 
  Check, 
  DollarSign, 
  Package, 
  Tag, 
  Info,
  ChevronDown,
  Plus
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductFormModal({ isOpen, onClose }: ProductFormModalProps) {
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && images.length < 5) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImages(prev => [...prev, reader.result as string].slice(0, 5));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 md:p-6"
          >
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col relative font-sans"
              dir="rtl"
            >
              {/* Header */}
              <div className="p-6 md:p-8 border-b border-gray-50 flex justify-between items-center bg-white sticky top-0 z-10">
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-gray-900">إضافة منتج جديد</h2>
                  <p className="text-xs font-bold text-gray-400 mt-1">أدخل تفاصيل المنتج ليتم نشره في المتجر.</p>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-400 hover:text-black transition-all"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-8 no-scrollbar">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Right: Basic Info */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-gray-400 mr-2 uppercase tracking-wider">اسم المنتج</label>
                      <input type="text" placeholder="عطر ليبر لو بارفان..." className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold outline-none focus:ring-4 focus:ring-black/5 transition-all" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[11px] font-black text-gray-400 mr-2 uppercase tracking-wider">الماركة</label>
                        <div className="relative">
                          <select className="w-full bg-gray-50 border-none rounded-xl py-4 px-6 text-sm font-bold appearance-none outline-none">
                            <option>لانكوم</option>
                            <option>إيف سان لوران</option>
                            <option>ميو ميو</option>
                          </select>
                          <ChevronDown size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-black text-gray-400 mr-2 uppercase tracking-wider">السعر (ر.س)</label>
                        <input type="number" placeholder="0.00" className="w-full bg-gray-50 border-none rounded-xl py-4 px-6 text-sm font-bold outline-none" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-gray-400 mr-2 uppercase tracking-wider">وصف المنتج</label>
                      <textarea rows={4} placeholder="اكتب وصفاً جذاباً..." className="w-full bg-gray-50 border-none rounded-[1.5rem] py-4 px-6 text-sm font-bold outline-none resize-none" />
                    </div>
                  </div>

                  {/* Left: Media & Inventory */}
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <label className="text-[11px] font-black text-gray-400 mr-2 uppercase tracking-wider">الصور ({images.length}/5)</label>
                      <div className="grid grid-cols-3 gap-3">
                        {images.map((img, idx) => (
                          <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden shadow-sm group">
                            <img src={img} className="w-full h-full object-cover" />
                            <button onClick={() => removeImage(idx)} className="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <X size={20} />
                            </button>
                          </div>
                        ))}
                        {images.length < 5 && (
                          <button 
                            onClick={() => fileInputRef.current?.click()}
                            className="aspect-square border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center text-gray-300 hover:border-black hover:bg-gray-50 transition-all"
                          >
                            <Plus size={24} />
                          </button>
                        )}
                        <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" multiple />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[11px] font-black text-gray-400 mr-2 uppercase tracking-wider">الفئة</label>
                        <select className="w-full bg-gray-50 border-none rounded-xl py-4 px-6 text-sm font-bold outline-none">
                          <option>العطور</option>
                          <option>عطور الشعر</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-black text-gray-400 mr-2 uppercase tracking-wider">المخزون</label>
                        <input type="number" placeholder="0" className="w-full bg-gray-50 border-none rounded-xl py-4 px-6 text-sm font-bold outline-none" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-6 md:p-8 bg-gray-50/50 border-t border-gray-50 flex flex-col-reverse md:flex-row justify-end gap-4 sticky bottom-0 z-10">
                <button 
                  onClick={onClose}
                  className="px-10 py-4 bg-white border border-gray-100 text-gray-500 rounded-[1.5rem] font-black text-sm hover:bg-gray-50 transition-all"
                >
                  إلغاء
                </button>
                <button 
                  className="px-10 py-4 bg-black text-white rounded-[1.5rem] font-black text-sm hover:shadow-2xl transition-all shadow-black/20 flex items-center justify-center gap-2"
                >
                  حفظ ونشر المنتج
                  <Check size={18} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
