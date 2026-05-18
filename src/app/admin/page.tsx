"use client";

import React, { useEffect, useState } from "react";
import {
  ShoppingBag,
  Users,
  DollarSign,
  BarChart3,
  TrendingUp,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const STATS = [
  { label: "إجمالي المبيعات", value: "١٢٨,٤٥٠ ر.س", change: "+١٢٪", icon: DollarSign, color: "text-green-600", bg: "bg-green-50" },
  { label: "الطلبات الجديدة", value: "٤٣٢", change: "+٥٪", icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "العملاء النشطون", value: "٢,٨٤٠", change: "+١٨٪", icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
  { label: "معدل التحويل", value: "٣.٢٪", change: "+٢٪", icon: BarChart3, color: "text-[#5a8a6a]", bg: "bg-[#accfad]/10" },
];

export default function AdminOverview() {
  const [liveVisitors, setLiveVisitors] = useState(142);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  // Load live visitor changes and dynamic orders
  useEffect(() => {
    const saved = localStorage.getItem("adminOrders");
    if (saved) {
      const parsed = JSON.parse(saved);
      const mapped = parsed.slice(0, 4).map((o: any) => ({
        id: o.id.replace("BALMY-", "#"),
        customer: o.customerName,
        amount: `${o.amount.toLocaleString()} ر.س`,
        status: o.status === 'delivered' ? 'مكتمل' : o.status === 'shipping' ? 'في الطريق' : o.status === 'preparing' ? 'قيد التجهيز' : 'تم الاستلام',
        time: o.time
      }));
      
      const defaults = [
        { id: "#١٢٩٠٤", customer: "أحمد العتيبي", amount: "١,٢٤٠ ر.س", status: "مكتمل", time: "منذ ٥ دقائق" },
        { id: "#١٢٩٠٣", customer: "سارة محمد", amount: "٨٥٠ ر.س", status: "قيد التنفيذ", time: "منذ ١٢ دقيقة" },
        { id: "#١٢٩٠٢", customer: "فهد الحربي", amount: "٢,١٠٠ ر.س", status: "مكتمل", time: "منذ ٣٢ دقيقة" },
        { id: "#١٢٩٠١", customer: "نورة القحطاني", amount: "٤٥٠ ر.س", status: "بانتظار الدفع", time: "منذ ساعة" }
      ];
      const merged = [...mapped, ...defaults.filter(d => !mapped.some((m: any) => m.id === d.id))].slice(0, 4);
      setRecentOrders(merged);
    } else {
      setRecentOrders([
        { id: "#١٢٩٠٤", customer: "أحمد العتيبي", amount: "١,٢٤٠ ر.س", status: "مكتمل", time: "منذ ٥ دقائق" },
        { id: "#١٢٩٠٣", customer: "سارة محمد", amount: "٨٥٠ ر.س", status: "قيد التنفيذ", time: "منذ ١٢ دقيقة" },
        { id: "#١٢٩٠٢", customer: "فهد الحربي", amount: "٢,١٠٠ ر.س", status: "مكتمل", time: "منذ ٣٢ دقيقة" },
        { id: "#١٢٩٠١", customer: "نورة القحطاني", amount: "٤٥٠ ر.س", status: "بانتظار الدفع", time: "منذ ساعة" }
      ]);
    }

    const interval = setInterval(() => {
      setLiveVisitors(prev => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-[1600px] mx-auto animate-in fade-in duration-1000 space-y-8 md:space-y-12 pb-20 px-4 md:px-0" dir="rtl">

      {/* Header Section with Live Status */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight">نظرة عامة على الأداء</h1>
          <p className="text-[10px] md:text-sm font-bold text-gray-400 mt-1 md:mt-2 uppercase tracking-[0.2em]">Balmy Real-time Intelligence</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 md:gap-6 bg-black text-white p-4 md:p-6 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl shadow-black/20 self-start lg:self-auto"
        >
          <div className="relative shrink-0">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full animate-ping absolute inset-0 opacity-75"></div>
            <div className="w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full relative border-2 md:border-4 border-black"></div>
          </div>
          <div className="shrink-0">
            <div className="flex items-center gap-1.5 md:gap-2">
              <span className="text-xl md:text-3xl font-black tabular-nums">{liveVisitors}</span>
              <Users size={16} className="text-[#accfad] md:w-5 md:h-5" />
            </div>
            <p className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5">متسوق الآن</p>
          </div>
          <div className="h-8 md:h-10 w-[1px] bg-white/10 mx-1 md:mx-2"></div>
          <div className="block">
            <p className="text-[10px] md:text-xs font-bold text-[#accfad]">+١٢٪</p>
            <p className="text-[8px] md:text-[10px] font-medium text-gray-500 uppercase">نشاط مرتفع</p>
          </div>
        </motion.div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {STATS.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 ${stat.bg} rounded-full blur-[60px] opacity-0 group-hover:opacity-40 transition-opacity`}></div>
            <div className="flex items-start justify-between mb-4 md:mb-6 relative">
              <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={20} className="md:w-6 md:h-6" />
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[9px] md:text-[11px] font-black text-green-600 bg-green-50 px-2 md:px-3 py-1 rounded-full">{stat.change}</span>
              </div>
            </div>
            <p className="text-[10px] md:text-xs font-black text-gray-400 mb-1 uppercase tracking-tighter relative">{stat.label}</p>
            <h3 className="text-xl md:text-3xl font-black text-gray-900 relative">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity Table Style */}
      <div className="bg-white rounded-[2rem] md:rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 md:p-10 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
          <div>
            <h3 className="text-[15px] md:text-xl font-black text-gray-900">آخر الطلبات</h3>
            <p className="text-[10px] md:text-xs font-bold text-gray-400 mt-1 tracking-tighter">سجل العمليات اللحظي</p>
          </div>
          <Link 
            href="/admin/orders" 
            className="text-[10px] md:text-xs font-black text-[#8c1d3b] hover:underline flex items-center gap-1 md:gap-2"
          >
            مشاهدة الكل <ArrowUpRight size={12} className="md:w-3.5 md:h-3.5" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right min-w-[600px] md:min-w-full">
            <thead>
              <tr className="text-[9px] md:text-[11px] font-black text-gray-400 uppercase tracking-widest">
                <th className="px-6 md:px-10 py-4 md:py-6 text-right">رقم الطلب</th>
                <th className="px-6 md:px-10 py-4 md:py-6">العميل</th>
                <th className="px-6 md:px-10 py-4 md:py-6">المبلغ</th>
                <th className="px-6 md:px-10 py-4 md:py-6">الحالة</th>
                <th className="px-6 md:px-10 py-4 md:py-6 text-left">التوقيت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentOrders.map((order, idx) => (
                <tr key={idx} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 md:px-10 py-4 md:py-6 text-xs md:text-sm font-black text-gray-900 text-right">{order.id}</td>
                  <td className="px-6 md:px-10 py-4 md:py-6">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#8c1d3b]/5 flex items-center justify-center text-[8px] md:text-[10px] font-black text-[#8c1d3b] border border-[#8c1d3b]/10">
                        {order.customer[0]}
                      </div>
                      <span className="text-xs md:text-sm font-bold text-gray-700 truncate max-w-[100px] md:max-w-none">{order.customer}</span>
                    </div>
                  </td>
                  <td className="px-6 md:px-10 py-4 md:py-6 text-xs md:text-sm font-black text-gray-900">{order.amount}</td>
                  <td className="px-6 md:px-10 py-4 md:py-6">
                    <span className={`px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[8px] md:text-[10px] font-black ${
                      order.status === "مكتمل" ? "bg-green-50 text-green-600 border border-green-100" :
                      order.status === "في الطريق" ? "bg-orange-50 text-orange-600 border border-orange-100" :
                      order.status === "قيد التجهيز" ? "bg-purple-50 text-purple-600 border border-purple-100" :
                      order.status === "بانتظار الدفع" ? "bg-amber-50 text-amber-600 border border-amber-100" :
                      "bg-blue-50 text-blue-600 border border-blue-100"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 md:px-10 py-4 md:py-6 text-left">
                    <div className="flex items-center justify-end gap-1 md:gap-2 text-[8px] md:text-[10px] font-bold text-gray-400">
                      <Clock size={10} className="md:w-3 md:h-3" />
                      {order.time}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
