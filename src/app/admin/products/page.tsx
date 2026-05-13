"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit2,
  Trash2,
  ExternalLink,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { motion } from "framer-motion";
import ProductFormModal from "@/components/admin/ProductFormModal";

const products = [
  { id: "1", name: "عطر ليبر لو بارفان", brand: "إيف سان لوران", price: "489 ر.س", stock: 24, image: "/001717728336_1.jpg", status: "نشط" },
  { id: "2", name: "آيدول ناو", brand: "لانكوم", price: "531 ر.س", stock: 12, image: "/001717728336_1.jpg", status: "نشط" },
  { id: "3", name: "لوميير ديسي", brand: "إيسي مياكي", price: "537 ر.س", stock: 0, image: "/001717728336_1.jpg", status: "منتهي" },
  { id: "4", name: "عطر ميوتين", brand: "ميو ميو", price: "572 ر.س", stock: 8, image: "/001717728336_1.jpg", status: "نشط" },
];

export default function AdminProducts() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      <ProductFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">إدارة المنتجات</h1>
          <p className="text-gray-500 font-medium">لديك حالياً {products.length} منتج في المخزن.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white px-8 py-4 rounded-[1.5rem] font-black text-sm flex items-center gap-2 hover:shadow-2xl transition-all shadow-black/20 group"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          إضافة منتج جديد
        </button>
      </div>

      {/* Filters & Actions */}
      <div className="bg-white p-4 rounded-[2rem] border border-gray-50 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-grow w-full">
          <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="ابحث باسم المنتج، الماركة، أو الـ SKU..." 
            className="w-full bg-gray-50 border-none focus:bg-white focus:ring-4 focus:ring-black/5 rounded-2xl py-4 pr-14 pl-6 text-sm font-bold outline-none transition-all"
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex items-center gap-2 px-6 py-3 bg-gray-50 text-gray-600 rounded-2xl font-bold text-sm hover:bg-gray-100 transition-all">
            <Filter size={18} />
            تصفية
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-gray-50 text-gray-600 rounded-2xl font-bold text-sm hover:bg-gray-100 transition-all">
            تصدير
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-[2.5rem] border border-gray-50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right" dir="rtl">
            <thead className="bg-gray-50/50 border-b border-gray-50">
              <tr>
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">المنتج</th>
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">الماركة</th>
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">السعر</th>
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">المخزون</th>
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">الحالة</th>
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest text-left">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((product, idx) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gray-50 rounded-2xl overflow-hidden p-2 group-hover:scale-110 transition-transform">
                        <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                      </div>
                      <span className="font-black text-sm text-gray-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-bold text-gray-500">{product.brand}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-black text-gray-900">{product.price}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-black text-gray-900">{product.stock} قطعة</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${product.status === "نشط" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-left">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-xl transition-all">
                        <Edit2 size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
