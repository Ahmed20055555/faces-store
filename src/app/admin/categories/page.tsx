"use client";

import React, { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  ImageIcon,
  MoreVertical
} from "lucide-react";
import { motion } from "framer-motion";
import CategoryFormModal from "@/components/admin/CategoryFormModal";

const initialCategories = [
  { id: "1", name: "العطور", count: 124, image: "/DK-SUB-Fragrance_KSA-1.avif" },
  { id: "2", name: "البشرة", count: 86, image: "/DK-SUB-Skincare_UAE-1.avif" },
  { id: "3", name: "المكياج", count: 210, image: "/DK-SUB.avif" },
  { id: "4", name: "أطقم هدايا", count: 45, image: "/DK-SUB-Fragrance_KSA-1.avif" },
  { id: "5", name: "الجمال الكوري", count: 32, image: "/DK-SUB-Skincare_UAE-1.avif" },
  { id: "6", name: "للرجال", count: 98, image: "/DK-SUB.avif" },
];

export default function AdminCategories() {
  const [categories] = useState(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      <CategoryFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">إدارة الفئات</h1>
          <p className="text-gray-500 font-medium">تحكم في أقسام الموقع وصورها التعريفية.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white px-8 py-4 rounded-[1.5rem] font-black text-sm flex items-center gap-2 hover:shadow-2xl transition-all shadow-black/20 group"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          إضافة فئة جديدة
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white rounded-[2.5rem] border border-gray-50 shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-500"
          >
            {/* Image Preview Area */}
            <div className="relative aspect-video overflow-hidden bg-gray-100">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button className="p-3 bg-white text-black rounded-2xl font-black text-xs flex items-center gap-2 hover:bg-[#8c1d3b] hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300">
                  <ImageIcon size={16} />
                  تغيير الصورة
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-black text-gray-900">{cat.name}</h3>
                  <p className="text-xs font-bold text-gray-400 mt-1">{cat.count} منتج متوفر</p>
                </div>
                <button className="p-2 text-gray-300 hover:text-black transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>

              <div className="flex gap-2">
                <button className="flex-grow py-3 bg-gray-50 text-gray-900 rounded-xl font-black text-xs hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                  <Edit2 size={14} />
                  تعديل
                </button>
                <button className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-all">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Add Card */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="border-2 border-dashed border-gray-100 rounded-[2.5rem] p-10 flex flex-col items-center justify-center gap-4 hover:border-black hover:bg-gray-50/50 transition-all group min-h-[300px]"
        >
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 group-hover:bg-black group-hover:text-white transition-all">
            <Plus size={32} />
          </div>
          <p className="text-sm font-black text-gray-400 group-hover:text-black">أضف فئة جديدة</p>
        </button>
      </div>
    </div>
  );
}
