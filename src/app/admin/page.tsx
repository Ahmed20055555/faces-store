"use client";

import React from "react";
import {
  TrendingUp,
  Users,
  ShoppingBag,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { label: "إجمالي المبيعات", value: "45,231 ر.س", icon: DollarSign, trend: "+12.5%", positive: true },
  { label: "الطلبات النشطة", value: "156", icon: ShoppingBag, trend: "+8.2%", positive: true },
  { label: "العملاء الجدد", value: "2,345", icon: Users, trend: "-3.1%", positive: false },
  { label: "معدل التحويل", value: "4.2%", icon: TrendingUp, trend: "+1.4%", positive: true },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-10">
      {/* Welcome Section - Removed the Add Button */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">أهلاً بك يا مدير </h1>
          <p className="text-gray-500 font-medium">إليك ما يحدث في متجرك اليوم.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-[2.5rem] border border-gray-50 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-gray-50 rounded-2xl text-black">
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-black px-2 py-1 rounded-full ${stat.positive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                {stat.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.trend}
              </div>
            </div>
            <p className="text-gray-500 text-sm font-bold mb-1">{stat.label}</p>
            <h3 className="text-2xl font-black text-gray-900">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] border border-gray-50 shadow-sm h-[400px] flex items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white -z-10" />
          <div className="text-center">
            <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="text-black" size={32} />
            </div>
            <h3 className="text-xl font-black mb-2">رسم بياني للمبيعات</h3>
            <p className="text-gray-400 text-sm">سيتم ربط البيانات الحقيقية قريباً</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[3rem] border border-gray-50 shadow-sm">
          <h3 className="text-xl font-black mb-6">أحدث الطلبات</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center font-bold text-gray-400">
                  #{item}
                </div>
                <div className="flex-grow">
                  <p className="text-sm font-black text-gray-900">أحمد محمد</p>
                  <p className="text-xs text-gray-400">منذ 10 دقائق</p>
                </div>
                <div className="text-sm font-black text-green-600">+120 ر.س</div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 bg-gray-50 text-gray-900 rounded-2xl font-black text-xs hover:bg-gray-100 transition-all">
            عرض كل الطلبات
          </button>
        </div>
      </div>
    </div>
  );
}
