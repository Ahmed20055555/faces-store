"use client";

import React, { useState } from "react";
import { 
  Save, 
  Globe, 
  ShieldCheck, 
  Bell, 
  CreditCard, 
  Link as LinkIcon,
  Upload
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "general", label: "عام", icon: Globe },
  { id: "security", label: "الأمان", icon: ShieldCheck },
  { id: "notifications", label: "التنبيهات", icon: Bell },
  { id: "payments", label: "الدفع", icon: CreditCard },
  { id: "social", label: "التواصل الاجتماعي", icon: LinkIcon },
];

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">الإعدادات</h1>
          <p className="text-gray-500 font-medium">إدارة إعدادات الموقع، الهوية، والخصوصية.</p>
        </div>
        <button className="w-full md:w-auto bg-black text-white px-10 py-4 rounded-[1.5rem] font-black text-sm flex items-center justify-center gap-2 hover:shadow-2xl transition-all shadow-black/10 group">
          <Save size={20} className="group-hover:scale-110 transition-transform" />
          حفظ التغييرات
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Tabs - Horizontal on mobile, Vertical on Desktop */}
        <div className="lg:col-span-1">
          <div className="flex lg:flex-col gap-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-xs md:text-sm transition-all shrink-0 lg:shrink",
                  activeTab === tab.id 
                    ? "bg-white text-black shadow-sm border border-gray-50 ring-1 ring-black/5" 
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-50/50"
                )}
              >
                <tab.icon size={20} />
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] border border-gray-50 shadow-sm p-6 md:p-12">
            
            {activeTab === "general" && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-gray-400 mr-2 uppercase tracking-widest">اسم المتجر</label>
                    <input 
                      type="text" 
                      defaultValue="بالمي - BALMY"
                      className="w-full bg-gray-50 border-transparent focus:bg-white focus:ring-4 focus:ring-black/5 rounded-2xl py-4 px-6 text-sm font-bold outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-gray-400 mr-2 uppercase tracking-widest">عنوان البريد الإلكتروني</label>
                    <input 
                      type="email" 
                      defaultValue="[EMAIL_ADDRESS]"
                      className="w-full bg-gray-50 border-transparent focus:bg-white focus:ring-4 focus:ring-black/5 rounded-2xl py-4 px-6 text-sm font-bold outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[11px] font-black text-gray-400 mr-2 uppercase tracking-widest">شعار الموقع (Logo)</label>
                  <div className="flex flex-col sm:flex-row items-center gap-6 p-8 border-2 border-dashed border-gray-100 rounded-[2.5rem] hover:border-black transition-colors group cursor-pointer text-center sm:text-right">
                    <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300 group-hover:bg-black/5 transition-all">
                      <Upload size={32} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-gray-900">اضغط لرفع شعار جديد</p>
                      <p className="text-[11px] text-gray-400 font-bold mt-1 leading-relaxed">يفضل استخدام ملفات SVG أو PNG بخلفية شفافة لضمان الجودة.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 mr-2 uppercase tracking-widest">وصف المتجر (SEO Description)</label>
                  <textarea 
                    rows={4}
                    defaultValue="المتجر الرائد لمنتجات التجميل والعطور في السعودية والخليج."
                    className="w-full bg-gray-50 border-transparent focus:bg-white focus:ring-4 focus:ring-black/5 rounded-[2rem] py-4 px-6 text-sm font-bold outline-none transition-all resize-none"
                  />
                </div>
              </motion.div>
            )}

            {activeTab === "social" && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {["Instagram", "Twitter", "Snapchat", "TikTok"].map((platform) => (
                  <div key={platform} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-focus-within:text-black transition-colors">
                      <LinkIcon size={20} />
                    </div>
                    <input 
                      type="text" 
                      placeholder={`رابط ${platform}`}
                      className="flex-grow bg-gray-50 border-transparent focus:bg-white focus:ring-4 focus:ring-black/5 rounded-2xl py-4 px-6 text-sm font-bold outline-none transition-all"
                    />
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
