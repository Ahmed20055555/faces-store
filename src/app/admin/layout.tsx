"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Image as ImageIcon,
  Layers,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  Truck,
  Sparkles,
  Gift,
  CreditCard,
  MessageCircle,
  Star,
  Monitor,
  CheckCircle2,
  Wind,
  RotateCcw
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const sidebarItems: Array<{
  icon: React.ElementType;
  label: string;
  href: string;
  subItems?: { label: string; href: string }[];
}> = [
    { icon: LayoutDashboard, label: "نظرة عامة", href: "/admin" },
    { icon: CreditCard, label: "الطلبات والمبيعات", href: "/admin/orders" },
    { icon: RotateCcw, label: "طلبات المرتجعات", href: "/admin/returns" },
    { icon: ImageIcon, label: "البانر الرئيسي", href: "/admin/hero" },
    { icon: CheckCircle2, label: "شريط المميزات", href: "/admin/features" },
    { icon: Layers, label: "التصنيفات", href: "/admin/categories" },
    { icon: Truck, label: "بانر التوصيل", href: "/admin/delivery" },
    { icon: Wind, label: "عطور اموج", href: "/admin/spring-trends" },
    { icon: Gift, label: "عطور مشاهير", href: "/admin/celebrity-perfumes" },
    { icon: Sparkles, label: "إصدارات جديدة", href: "/admin/new-releases" },
    { icon: Star, label: "عطور بوص", href: "/admin/brand-of-week" },
    { icon: Package, label: "المنتجات", href: "/admin/products" },
    { icon: Settings, label: "الإعدادات", href: "/admin/settings" },
  ];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const SidebarContent = () => (
    <>
      <div className="p-8 border-b border-gray-50 flex items-center justify-between">
        <div className="flex flex-col items-center flex-grow">
          <Link href="/"><img src="/logo.svg" alt="BALMY ADMIN" className="h-8 w-auto" /></Link>
          <p className="text-[10px] font-black text-gray-400 mt-2 tracking-[0.3em] uppercase">لوحة التحكم</p>
        </div>
        <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-gray-400">
          <X size={20} />
        </button>
      </div>

      <nav className="flex-grow p-4 space-y-1 mt-4 overflow-y-auto no-scrollbar">
        {sidebarItems.map((item) => (
          <div key={item.href} className="space-y-1">
            <Link
              href={item.href}
              onClick={() => !item.subItems && setIsSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-bold text-sm",
                pathname === item.href
                  ? "bg-black text-white shadow-lg shadow-black/10"
                  : "text-gray-500 hover:bg-gray-50 hover:text-black"
              )}
            >
              <item.icon size={20} strokeWidth={pathname === item.href ? 2.5 : 1.5} />
              {item.label}
            </Link>

            {/* Sub Items Rendering */}
            {item.subItems && (
              <div className="mr-9 space-y-1 border-r border-gray-100 pr-4 py-1">
                {item.subItems.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    className="block py-2 text-[11px] font-bold text-gray-400 hover:text-[#5a8a6a] transition-colors"
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-50">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 transition-all font-bold text-sm">
          <LogOut size={20} />
          تسجيل الخروج
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col lg:flex-row-reverse font-sans" dir="rtl">

      {/* Mobile Header */}
      <header className="lg:hidden h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 sticky top-0 z-[100]">
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-gray-600">
          <Menu size={24} />
        </button>
        <img src="/logo.svg" alt="balmy" className="h-6 w-auto" />
        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white text-[10px] font-bold">AD</div>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 flex-shrink-0 bg-white border-l border-gray-100 flex-col sticky top-0 h-screen z-50">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] lg:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-72 bg-white z-[201] flex flex-col lg:hidden shadow-2xl"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-w-0">
        {/* Desktop Search Header */}
        <header className="hidden lg:flex h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40 px-8 items-center justify-between">
          <div className="relative w-96">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="ابحث هنا..."
              className="w-full bg-gray-50 border-transparent focus:bg-white focus:ring-4 focus:ring-black/5 rounded-2xl py-2.5 pr-12 pl-6 text-sm outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2.5 bg-gray-50 text-gray-500 rounded-full hover:bg-gray-100 relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 mr-2">
              <div className="text-left hidden xl:block">
                <p className="text-xs font-black text-gray-900">أحمد محمد</p>
                <p className="text-[10px] font-bold text-gray-400">مدير النظام</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center text-white font-bold text-xs shadow-lg">AD</div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="p-4 md:p-8 lg:p-10 max-w-full overflow-x-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
