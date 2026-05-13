"use client";

import React, { useState, useRef } from "react";
import { 
  X, 
  Upload, 
  Check, 
  ImageIcon,
  Plus
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CategoryFormModal({ isOpen, onClose }: CategoryFormModalProps) {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
          >
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col relative font-sans"
              dir="rtl"
            >
              {/* Header */}
              <div className="p-6 md:p-8 border-b border-gray-50 flex justify-between items-center bg-white sticky top-0 z-10">
                <div>
                  <h2 className="text-xl font-black text-gray-900">إضافة فئة جديدة</h2>
                  <p className="text-xs font-bold text-gray-400 mt-1">أنشئ قسماً جديداً لتنظيم منتجاتك.</p>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-400 hover:text-black transition-all"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 mr-2 uppercase tracking-wider">اسم الفئة</label>
                  <input type="text" placeholder="مثلاً: العناية بالشعر..." className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold outline-none focus:ring-4 focus:ring-black/5 transition-all" />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 mr-2 uppercase tracking-wider">صورة الغلاف</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="relative aspect-video rounded-3xl border-2 border-dashed border-gray-100 bg-gray-50 overflow-hidden group cursor-pointer hover:border-black transition-all flex flex-col items-center justify-center gap-3"
                  >
                    {image ? (
                      <>
                        <img src={image} className="w-full h-full object-cover" alt="Preview" />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="bg-white p-2 rounded-full shadow-lg text-black"><Upload size={20} /></div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-300 shadow-sm group-hover:bg-black group-hover:text-white transition-all">
                          <ImageIcon size={24} />
                        </div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">اضغط لاختيار صورة</p>
                      </>
                    )}
                  </div>
                  <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-6 md:p-8 bg-gray-50/50 border-t border-gray-50 flex flex-col-reverse sm:flex-row justify-end gap-3">
                <button 
                  onClick={onClose}
                  className="px-8 py-4 bg-white border border-gray-100 text-gray-500 rounded-2xl font-black text-sm hover:bg-gray-50 transition-all"
                >
                  إلغاء
                </button>
                <button 
                  className="px-8 py-4 bg-black text-white rounded-2xl font-black text-sm hover:shadow-2xl transition-all shadow-black/20 flex items-center justify-center gap-2"
                >
                  حفظ الفئة
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
