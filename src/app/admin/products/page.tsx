"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  ChevronRight,
  ChevronLeft,
  ShoppingBag,
  Image as ImageIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProductFormModal from "@/components/admin/ProductFormModal";

interface Product {
  id: string;
  name: string;
  brand: string;
  price: string;
  stock: number;
  image: string;
  status: string;
  description?: string;
  category?: string;
}

const INITIAL_PRODUCTS: Product[] = [
  { id: "1", name: "عطر ليبر لو بارفان", brand: "إيف سان لوران", price: "489 ر.س", stock: 24, image: "/product-14.jpeg", status: "نشط", description: "عطر حرية المرأة من إيف سان لوران بنفحات اللافندر الفاخرة." },
  { id: "2", name: "آيدول ناو", brand: "لانكوم", price: "531", stock: 12, image: "/product-15.jpeg", status: "نشط", description: "عطر التميز والتألق الأنثوي بنسمات الورد الجوري وأخشاب الكشمير." },
  { id: "3", name: "لوميير ديسي", brand: "إيسي مياكي", price: "537 ر.س", stock: 0, image: "/product-16.jpeg", status: "منتهي", description: "نفحات الضوء والصفاء مع أخشاب الصندل الفاخرة والمسك النقي." },
  { id: "4", name: "عطر ميوتين", brand: "ميو ميو", price: "572 ر.س", stock: 8, image: "/product-17.jpeg", status: "نشط", description: "عطر عصري وجريء يعبر عن الهوية الأنثوية المستقلة والراقية." },
];

export default function AdminProducts() {
  const [productsList, setProductsList] = useState<Product[]>(INITIAL_PRODUCTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");

  // Handle opening modal for adding new product
  const handleAddNew = () => {
    setSelectedProduct(undefined);
    setIsModalOpen(true);
  };

  // Handle opening modal for editing an existing product
  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Handle saving product (both adding new and editing existing)
  const handleSaveProduct = (savedProduct: any) => {
    if (selectedProduct) {
      // Edit mode
      setProductsList(prev => prev.map(p => p.id === savedProduct.id ? savedProduct : p));
    } else {
      // Add mode
      setProductsList(prev => [savedProduct, ...prev]);
    }
    setIsModalOpen(false);
  };

  // Handle deleting a product
  const handleDeleteProduct = (id: string) => {
    if (confirm("هل أنت متأكد من رغبتك في حذف هذا المنتج نهائياً؟")) {
      setProductsList(prev => prev.filter(p => p.id !== id));
    }
  };

  // Filter products list based on search query in real-time
  const filteredProducts = productsList.filter(product => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      product.name.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query) ||
      (product.description && product.description.toLowerCase().includes(query))
    );
  });

  return (
    <div className="space-y-8 font-sans" dir="rtl">
      
      {/* Product Form Modal (Used for both add and edit actions) */}
      <ProductFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={selectedProduct}
        onSave={handleSaveProduct}
      />

      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">إدارة المنتجات</h1>
          <p className="text-xs md:text-sm font-bold text-gray-400 mt-1">
            لديك حالياً <span className="text-black font-black">{productsList.length}</span> منتج معروض في المتجر.
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="bg-black text-white px-8 py-4 rounded-[1.5rem] font-black text-sm flex items-center gap-2 hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-black/20 group shrink-0"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          إضافة منتج جديد
        </button>
      </div>

      {/* Filters & Search Actions */}
      <div className="bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-grow w-full">
          <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث باسم المنتج، الماركة، أو الوصف..."
            className="w-full bg-gray-50 border-none focus:bg-white focus:ring-4 focus:ring-black/5 rounded-2xl py-4 pr-14 pl-6 text-sm font-bold text-gray-800 outline-none transition-all"
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button type="button" className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-50 text-gray-600 rounded-2xl font-black text-sm hover:bg-gray-100 transition-all shrink-0">
            <Filter size={18} />
            تصفية
          </button>
          <button type="button" className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-50 text-gray-600 rounded-2xl font-black text-sm hover:bg-gray-100 transition-all shrink-0">
            تصدير
          </button>
        </div>
      </div>

      {/* Products Table Card */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right" dir="rtl">
            <thead className="bg-gray-50/50 border-b border-gray-100">
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
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, idx) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    {/* Product Name & Image */}
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gray-50 rounded-2xl overflow-hidden p-2 group-hover:scale-105 transition-transform shrink-0 border border-gray-100 flex items-center justify-center">
                          {product.image ? (
                            <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                          ) : (
                            <ImageIcon className="text-gray-300" size={20} />
                          )}
                        </div>
                        <div className="min-w-0">
                          <span className="font-black text-sm text-gray-900 block truncate">{product.name}</span>
                          {product.description && (
                            <span className="text-[10px] text-gray-400 font-bold block truncate mt-0.5 max-w-[250px]">
                              {product.description}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Brand */}
                    <td className="px-8 py-5">
                      <span className="text-sm font-black text-gray-500">{product.brand}</span>
                    </td>

                    {/* Price */}
                    <td className="px-8 py-5">
                      <span className="text-sm font-black text-gray-900">
                        {product.price ? (String(product.price).includes("ر.س") || String(product.price).includes("ريال") ? product.price : `${product.price} ر.س`) : "غير محدد"}
                      </span>
                    </td>

                    {/* Stock */}
                    <td className="px-8 py-5">
                      <span className={`text-sm font-black ${product.stock === 0 ? "text-red-500" : "text-gray-900"}`}>
                        {product.stock === 0 ? "نفذت الكمية" : `${product.stock} قطعة`}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${product.status === "نشط" && product.stock > 0 ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                        {product.stock === 0 ? "منتهي" : product.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-8 py-5 text-left">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleEditProduct(product)}
                          className="p-2 text-gray-400 hover:text-[#BE9D72] hover:bg-gray-50 rounded-xl transition-all"
                          title="تعديل المنتج"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                          title="حذف المنتج"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-8 py-16 text-center">
                    <div className="flex flex-col items-center justify-center gap-3 text-gray-300">
                      <ShoppingBag size={48} className="opacity-40" />
                      <p className="text-sm font-black text-gray-400">لا توجد منتجات مطابقة لعملية البحث</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
