"use client";

import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { 
  X, 
  UploadCloud, 
  Check, 
  ChevronDown, 
  Plus, 
  Image as ImageIcon,
  Trash2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LableInput } from "@/components/lable-input";

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: any;
  onSave: (product: any) => void;
}

interface FormData {
  name: string;
  brand: string;
  price: string;
  stock: number;
  description: string;
  category: string;
  status: string;
  images: string[];
}

export default function ProductFormModal({ isOpen, onClose, product, onSave }: ProductFormModalProps) {
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize React Hook Form
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      name: "",
      brand: "لانكوم",
      price: "",
      stock: 0,
      description: "",
      category: "العطور",
      status: "نشط",
      images: [],
    }
  });

  // Reset form values when product prop changes or modal opens
  useEffect(() => {
    if (isOpen) {
      if (product) {
        const parsedPrice = product.price ? String(product.price).replace(" ر.س", "").replace(" ريال", "").trim() : "";
        reset({
          name: product.name || "",
          brand: product.brand || "لانكوم",
          price: parsedPrice,
          stock: typeof product.stock === "number" ? product.stock : 0,
          description: product.description || "",
          category: product.category || "العطور",
          status: product.status || "نشط",
          images: product.image ? [product.image] : [],
        });
        setImages(product.image ? [product.image] : []);
      } else {
        reset({
          name: "",
          brand: "لانكوم",
          price: "",
          stock: 0,
          description: "",
          category: "العطور",
          status: "نشط",
          images: [],
        });
        setImages([]);
      }
    }
  }, [product, isOpen, reset]);

  // Handle multiple image uploads via FileReader
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const uploadPromises = Array.from(files).map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(uploadPromises).then((base64Images) => {
        const updatedImages = [...images, ...base64Images].slice(0, 5);
        setImages(updatedImages);
        setValue("images", updatedImages);
      });
    }
  };

  // Remove an image from the previews list
  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    setValue("images", updatedImages);
  };

  // Submit handler
  const onSubmit = (data: FormData) => {
    const savedProduct = {
      id: product?.id || String(Date.now()),
      name: data.name,
      brand: data.brand,
      price: `${data.price} ر.س`,
      stock: Number(data.stock),
      description: data.description,
      category: data.category,
      status: data.status,
      image: images[0] || "/product-14.jpeg", // use first image or default fallback
    };
    onSave(savedProduct);
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
                  <h2 className="text-xl md:text-2xl font-black text-gray-900">
                    {product ? "تعديل تفاصيل المنتج" : "إضافة منتج جديد"}
                  </h2>
                  <p className="text-xs font-bold text-gray-400 mt-1">
                    أدخل تفاصيل ومواصفات المنتج ليتم عرضه وتحديثه بالمتجر.
                  </p>
                </div>
                <button 
                  type="button"
                  onClick={onClose}
                  className="p-2.5 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-400 hover:text-black transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit(onSubmit)} className="flex-grow overflow-y-auto flex flex-col">
                <div className="p-6 md:p-8 space-y-8 flex-grow">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* Right Column: Basic Information */}
                    <div className="space-y-6">
                      <LableInput
                        label="اسم المنتج"
                        error={errors.name?.message}
                        placeholder="مثال: عطر ليبر لو بارفان"
                        {...register("name", { required: "اسم المنتج إجباري" })}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        {/* Brand Select */}
                        <div className="space-y-2">
                          <label className="text-[11px] font-black text-gray-400 mr-2 uppercase tracking-wider">الماركة</label>
                          <div className="relative">
                            <select 
                              className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-black appearance-none outline-none focus:ring-4 focus:ring-black/5 transition-all text-gray-800"
                              {...register("brand", { required: "الماركة إجبارية" })}
                            >
                              <option value="إيف سان لوران">إيف سان لوران</option>
                              <option value="لانكوم">لانكوم</option>
                              <option value="إيسي مياكي">إيسي مياكي</option>
                              <option value="ميو ميو">ميو ميو</option>
                              <option value="بالمي | Balmy">بالمي | Balmy</option>
                            </select>
                            <ChevronDown size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                          </div>
                        </div>

                        {/* Price Input */}
                        <LableInput
                          label="السعر (ريال)"
                          error={errors.price?.message}
                          placeholder="مثال: 489"
                          {...register("price", { required: "السعر إجباري" })}
                        />
                      </div>

                      {/* Description Input */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-black text-gray-400 mr-2 uppercase tracking-wider">وصف المنتج</label>
                        <textarea 
                          rows={4} 
                          placeholder="اكتب وصفاً جذاباً للمنتج ومكوناته العطرية..." 
                          className="w-full bg-gray-50 border-none rounded-[1.5rem] py-4 px-6 text-sm font-bold text-gray-800 outline-none resize-none focus:ring-4 focus:ring-black/5 transition-all"
                          {...register("description")}
                        />
                      </div>
                    </div>

                    {/* Left Column: Media & Inventory */}
                    <div className="space-y-6">
                      
                      {/* Multiple Image Dropzone */}
                      <div className="space-y-3">
                        <label className="text-[11px] font-black text-gray-400 mr-2 uppercase tracking-wider">
                          صور المنتج ({images.length}/5)
                        </label>
                        
                        <div className="grid grid-cols-3 gap-3">
                          {images.map((img, idx) => (
                            <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden shadow-sm group border border-gray-100 bg-gray-50">
                              <img src={img} className="w-full h-full object-cover" alt={`Product Image ${idx + 1}`} />
                              <button 
                                type="button"
                                onClick={() => removeImage(idx)} 
                                className="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                                title="حذف الصورة"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          ))}

                          {images.length < 5 && (
                            <button 
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="aspect-square border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-300 hover:border-[#BE9D72] hover:text-[#BE9D72] hover:bg-gray-50 transition-all gap-1.5"
                            >
                              <Plus size={20} />
                              <span className="text-[9px] font-black">إضافة صورة</span>
                            </button>
                          )}
                          <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleImageUpload} 
                            className="hidden" 
                            accept="image/*" 
                            multiple 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {/* Category Select */}
                        <div className="space-y-2">
                          <label className="text-[11px] font-black text-gray-400 mr-2 uppercase tracking-wider">الفئة</label>
                          <div className="relative">
                            <select 
                              className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-black appearance-none outline-none focus:ring-4 focus:ring-black/5 transition-all text-gray-800"
                              {...register("category")}
                            >
                              <option value="العطور">العطور</option>
                              <option value="عطور الشعر">عطور الشعر</option>
                              <option value="الهدايا">الهدايا</option>
                            </select>
                            <ChevronDown size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                          </div>
                        </div>

                        {/* Inventory/Stock Input */}
                        <LableInput
                          label="المخزون (الكمية)"
                          type="number"
                          error={errors.stock?.message}
                          placeholder="مثال: 24"
                          {...register("stock", { required: "المخزون إجباري", min: 0 })}
                        />
                      </div>

                      {/* Status Toggle/Select */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-black text-gray-400 mr-2 uppercase tracking-wider">حالة المنتج</label>
                        <div className="relative">
                          <select 
                            className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-black appearance-none outline-none focus:ring-4 focus:ring-black/5 transition-all text-gray-800"
                            {...register("status")}
                          >
                            <option value="نشط">نشط (متوفر في المتجر)</option>
                            <option value="منتهي">منتهي (غير متوفر)</option>
                          </select>
                          <ChevronDown size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="p-6 md:p-8 bg-gray-50 border-t border-gray-50 flex flex-col-reverse md:flex-row justify-end gap-4 sticky bottom-0 z-10">
                  <button 
                    type="button"
                    onClick={onClose}
                    className="px-10 py-4 bg-white border border-gray-200 text-gray-500 rounded-[1.5rem] font-black text-sm hover:bg-gray-50 transition-all w-full md:w-auto"
                  >
                    إلغاء
                  </button>
                  <button 
                    type="submit"
                    className="px-10 py-4 bg-black text-white rounded-[1.5rem] font-black text-sm hover:shadow-2xl hover:scale-[1.02] transition-all shadow-black/20 flex items-center justify-center gap-2 w-full md:w-auto"
                  >
                    {product ? "حفظ وتعديل المنتج" : "حفظ ونشر المنتج"}
                    <Check size={18} />
                  </button>
                </div>
              </form>

            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
