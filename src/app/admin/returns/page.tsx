"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { 
    RotateCcw, 
    CheckCircle2, 
    XCircle, 
    AlertCircle, 
    TrendingUp, 
    Activity, 
    Clock, 
    Search, 
    Filter, 
    DollarSign, 
    Package, 
    Eye, 
    Trash2, 
    User, 
    Phone, 
    ArrowLeftRight, 
    Sparkles, 
    ShieldAlert,
    Check,
    X,
    MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

// Types representing a Return Request
interface ReturnItem {
    id: number;
    name: string;
    price: string;
    quantity: number;
    image: string;
    engravedName: string | null;
}

interface ReturnRequest {
    id: string;
    orderId: string;
    customerName: string;
    phone: string;
    items: ReturnItem[];
    amount: number;
    reason: string;
    status: 'pending' | 'approved' | 'rejected';
    date: string;
    time: string;
    refundMethod: 'online' | 'wallet';
    customerNotes?: string;
    adminNotes?: string;
    rejectReason?: string;
}

interface Toast {
    id: number;
    message: string;
    type?: 'success' | 'warning' | 'info';
}

// Highly customized luxury brand mock return requests
const DEFAULT_MOCK_RETURNS: ReturnRequest[] = [
    {
        id: "RET-90812",
        orderId: "BALMY-98402",
        customerName: "سارة أحمد",
        phone: "0512345678",
        items: [
            { id: 1, name: "Balmy Noir - عطر غامض فاخر", price: "299", quantity: 1, image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=400", engravedName: "Sra" }
        ],
        amount: 299,
        reason: "حفر الاسم غير صحيح (تم حفر 'Sra' بدلاً من 'Sara')",
        status: "pending",
        date: "2026-05-19",
        time: "منذ ساعة",
        refundMethod: "online",
        customerNotes: "الرجاء إعادة المبلغ أو تصنيع زجاجة جديدة بالاسم الصحيح، الحفر مكتوب بشكل خاطئ تماماً عن المطلوب."
    },
    {
        id: "RET-89402",
        orderId: "BALMY-12049",
        customerName: "عبد الله الشمري",
        phone: "0544556677",
        items: [
            { id: 4, name: "Hugo Boss Bottled", price: "380", quantity: 1, image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=400", engravedName: null }
        ],
        amount: 380,
        reason: "رائحة العطر مختلفة عن المعتاد للمنتج الأصلي",
        status: "approved",
        date: "2026-05-18",
        time: "أمس",
        refundMethod: "online",
        adminNotes: "تم استلام الشحنة وفحصها، وتأكيد استرداد المبلغ إلكترونياً للبطاقة."
    },
    {
        id: "RET-78301",
        orderId: "BALMY-51732",
        customerName: "فيصل بن خالد",
        phone: "0599887766",
        items: [
            { id: 2, name: "Balmy Golden Cap - عطر ذهبي", price: "299", quantity: 1, image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=400", engravedName: "KHALID" }
        ],
        amount: 299,
        reason: "تلف في البخاخ الزجاجي الفاخر أثناء الشحن والتوصيل",
        status: "pending",
        date: "2026-05-17",
        time: "منذ يومين",
        refundMethod: "online",
        customerNotes: "وصلت العبوة وهناك كسر بسيط في فوهة البخاخ الذهبي يجعل العطر يتسرب عند الاستخدام."
    },
    {
        id: "RET-75392",
        orderId: "BALMY-48201",
        customerName: "نورة العتيبي",
        phone: "0533221100",
        items: [
            { id: 3, name: "Aoud Imperial - عود ملكي", price: "420", quantity: 1, image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=400", engravedName: null }
        ],
        amount: 420,
        reason: "تغيير رأي (العلبة مغلقة بالكامل ولم تفتح)",
        status: "rejected",
        date: "2026-05-16",
        time: "منذ 3 أيام",
        refundMethod: "wallet",
        rejectReason: "تم فحص الشحنة المرتجعة وتبين أن الغلاف البلاستيكي الخارجي ممزق والعطر مستخدم بالفعل (غير مطابق لسياسة الاسترجاع للمنتجات السليمة)."
    }
];

export default function AdminReturnsPage() {
    const [returns, setReturns] = useState<ReturnRequest[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [selectedReturn, setSelectedReturn] = useState<ReturnRequest | null>(null);
    const [toasts, setToasts] = useState<Toast[]>([]);

    const { register, handleSubmit, setValue, watch, reset } = useForm({
        defaultValues: {
            requestId: "",
            status: "pending" as ReturnRequest['status'],
            adminNotes: "",
            rejectReason: "",
            refundMethod: "online" as ReturnRequest['refundMethod']
        }
    });

    const formStatus = watch("status");

    // Load initial returns from localStorage or mock
    useEffect(() => {
        const savedReturns = localStorage.getItem("adminReturns");
        if (savedReturns) {
            const parsed = JSON.parse(savedReturns) as ReturnRequest[];
            const uniqueMock = DEFAULT_MOCK_RETURNS.filter(mock => !parsed.some(p => p.id === mock.id));
            setReturns([...parsed, ...uniqueMock]);
        } else {
            setReturns(DEFAULT_MOCK_RETURNS);
        }
    }, []);

    const showToast = (message: string, type: Toast['type'] = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 4000);
    };

    // Load form with values when selectedReturn changes
    useEffect(() => {
        if (selectedReturn) {
            reset({
                requestId: selectedReturn.id,
                status: selectedReturn.status,
                adminNotes: selectedReturn.adminNotes || "",
                rejectReason: selectedReturn.rejectReason || "",
                refundMethod: selectedReturn.refundMethod || "online"
            });
        }
    }, [selectedReturn, reset]);

    // Handle Return Action processing
    const onFormSubmit = (data: any) => {
        const updated = returns.map(ret => {
            if (ret.id === data.requestId) {
                return {
                    ...ret,
                    status: data.status,
                    adminNotes: data.adminNotes,
                    rejectReason: data.status === 'rejected' ? data.rejectReason : "",
                    refundMethod: data.refundMethod
                };
            }
            return ret;
        });

        setReturns(updated);
        localStorage.setItem("adminReturns", JSON.stringify(updated));

        // Sync back-end / mock notifications
        if (selectedReturn) {
            setSelectedReturn({
                ...selectedReturn,
                status: data.status,
                adminNotes: data.adminNotes,
                rejectReason: data.status === 'rejected' ? data.rejectReason : "",
                refundMethod: data.refundMethod
            });
        }

        if (data.status === 'approved') {
            showToast(`تمت الموافقة على طلب الاسترجاع ${data.requestId} وإرجاع مبلغ ${selectedReturn?.amount} ريال بنجاح! 💳💸`, "success");
        } else if (data.status === 'rejected') {
            showToast(`تم رفض طلب المرتجع ${data.requestId} وتوثيق السبب في السجل الإداري 🛑`, "warning");
        } else {
            showToast(`تم تحديث ملاحظات الطلب المرتجع ${data.requestId} قيد المراجعة 📝`, "info");
        }
    };

    // Quick delete return request (simulate cleanup)
    const deleteReturn = (id: string) => {
        if (confirm("هل أنت متأكد من رغبتك في حذف طلب المرتجع هذا بالكامل من السجلات؟")) {
            const filtered = returns.filter(r => r.id !== id);
            setReturns(filtered);
            localStorage.setItem("adminReturns", JSON.stringify(filtered));
            setSelectedReturn(null);
            showToast("تم حذف سجل طلب المرتجع بالكامل 🗑️", "warning");
        }
    };

    // Filter logic
    const filteredReturns = returns.filter(ret => {
        const matchesSearch = 
            ret.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ret.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ret.customerName.includes(searchTerm) ||
            ret.phone.includes(searchTerm);
        
        const matchesStatus = statusFilter === 'all' || ret.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // Helper functions for badges and styling
    const getStatusLabel = (status: ReturnRequest['status']) => {
        switch (status) {
            case 'pending': return 'قيد المراجعة';
            case 'approved': return 'تمت الموافقة والاسترداد';
            case 'rejected': return 'مرفوض';
        }
    };

    const getStatusColor = (status: ReturnRequest['status']) => {
        switch (status) {
            case 'pending': return 'bg-amber-50 text-amber-600 border border-amber-100';
            case 'approved': return 'bg-emerald-50 text-emerald-600 border border-emerald-100';
            case 'rejected': return 'bg-red-50 text-red-600 border border-red-100';
        }
    };

    const getMethodLabel = (method: ReturnRequest['refundMethod']) => {
        return method === 'online' ? 'استرداد للبطاقة (إلكتروني)' : 'إيداع في محفظة العميل';
    };

    // Calculations
    const totalRequests = returns.length;
    const pendingCount = returns.filter(r => r.status === 'pending').length;
    const approvedCount = returns.filter(r => r.status === 'approved').length;
    const totalRefunded = returns.filter(r => r.status === 'approved').reduce((sum, r) => sum + r.amount, 0);

    return (
        <div className="max-w-[1600px] mx-auto space-y-6 md:space-y-10 pb-20 px-4 md:px-8 text-right relative" dir="rtl">
            
            {/* Elegant Luxury Toasts Container */}
            <div className="fixed top-6 left-6 z-[9999] space-y-3 pointer-events-none max-w-sm w-full">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, x: -100, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -100, scale: 0.9 }}
                            className={cn(
                                "p-4 rounded-2xl shadow-xl flex items-start gap-3 pointer-events-auto border backdrop-blur-md",
                                toast.type === 'success' ? "bg-black/95 text-white border-gold/10" :
                                toast.type === 'warning' ? "bg-red-950/90 text-red-100 border-red-500/20" :
                                "bg-blue-950/90 text-blue-100 border-blue-500/20"
                            )}
                        >
                            <div className="mt-0.5 shrink-0">
                                {toast.type === 'success' ? <CheckCircle2 className="text-yellow-500 w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                            </div>
                            <div className="flex-1 text-xs font-bold leading-relaxed">{toast.message}</div>
                            <button onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))} className="text-white/40 hover:text-white transition-colors shrink-0">
                                <X size={14} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Header section */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-gray-100 pb-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-gray-900 flex items-center gap-3">
                        إدارة طلبات المرتجعات والاسترداد المالي
                    </h1>
                </div>
                <div className="text-sm font-bold text-gray-400">
                    مراجعة طلبات استرجاع العطور الفاخرة وإدارة عمليات الشحن العكسي
                </div>
            </div>

            {/* Master Analytics Grid Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* 1. Total return requests */}
                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/5 to-transparent rounded-bl-full group-hover:scale-110 transition-transform" />
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">إجمالي طلبات الاسترجاع</span>
                            <h3 className="text-2xl font-black text-gray-900 mt-1.5">{totalRequests} طلبات</h3>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex items-center justify-center text-amber-600">
                            <RotateCcw size={20} />
                        </div>
                    </div>
                    <div className="mt-4">
                        <span className="text-[9px] font-bold text-gray-400">كافة طلبات الشحن العكسي الواردة</span>
                    </div>
                </div>

                {/* 2. Pending Requests */}
                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-orange-500/5 to-transparent rounded-bl-full group-hover:scale-110 transition-transform" />
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">طلبات بانتظار المراجعة</span>
                            <h3 className={cn("text-2xl font-black mt-1.5", pendingCount > 0 ? "text-orange-600" : "text-gray-900")}>{pendingCount} طلبات</h3>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-orange-500/5 border border-orange-500/10 flex items-center justify-center text-orange-600">
                            <Clock size={20} />
                        </div>
                    </div>
                    <div className="mt-4">
                        <span className="text-[9px] font-bold text-gray-400">تتطلب فحصاً للمنتج واسترداداً مالياً</span>
                    </div>
                </div>

                {/* 3. Refunded Amount */}
                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-500/5 to-transparent rounded-bl-full group-hover:scale-110 transition-transform" />
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">إجمالي المبالغ المستردة</span>
                            <h3 className="text-2xl font-black text-emerald-600 mt-1.5">{totalRefunded.toLocaleString()} ريال</h3>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center text-emerald-600">
                            <DollarSign size={20} />
                        </div>
                    </div>
                    <div className="mt-4">
                        <span className="text-[9px] font-bold text-gray-400">تمت إعادتها للعملاء بنجاح</span>
                    </div>
                </div>

                {/* 4. Delivery success rate or processed returns */}
                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/5 to-transparent rounded-bl-full group-hover:scale-110 transition-transform" />
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">الطلبات المكتمل معالجتها</span>
                            <h3 className="text-2xl font-black text-blue-600 mt-1.5">{approvedCount} من {totalRequests}</h3>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-blue-50/5 border border-blue-500/10 flex items-center justify-center text-blue-600">
                            <CheckCircle2 size={20} />
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{ width: `${totalRequests > 0 ? (approvedCount / totalRequests) * 100 : 0}%` }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter and Search Box */}
            <div className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col lg:flex-row gap-4 items-center">
                {/* Search Bar */}
                <div className="relative w-full lg:flex-1">
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="ابحث برقم المرتجع، رقم الطلب، أو اسم العميل..."
                        className="w-full bg-gray-50 border-transparent focus:bg-white focus:border-black focus:ring-4 focus:ring-black/5 rounded-xl py-3 pr-11 pl-4 text-xs font-bold outline-none transition-all text-right"
                    />
                </div>

                {/* Filter select */}
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100 w-full lg:w-auto">
                    <Filter size={14} className="text-gray-400" />
                    <span className="text-[11px] font-black text-gray-400 min-w-max">حالة طلب الاسترجاع</span>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-transparent text-xs font-bold text-gray-800 outline-none cursor-pointer pr-4"
                    >
                        <option value="all">الكل</option>
                        <option value="pending">قيد المراجعة</option>
                        <option value="approved">تمت الموافقة والاسترداد</option>
                        <option value="rejected">مرفوض</option>
                    </select>
                </div>
            </div>

            {/* Desktop Table (Visible on md and up) */}
            <div className="hidden md:block bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-right min-w-[1000px]">
                        <thead>
                            <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-5">رقم المرتجع</th>
                                <th className="px-6 py-5">رقم الطلب الأصلي</th>
                                <th className="px-6 py-5">العميل</th>
                                <th className="px-6 py-5">المنتج المرتجع</th>
                                <th className="px-6 py-5">قيمة الاسترداد</th>
                                <th className="px-6 py-5">سبب الاسترجاع الرئيسي</th>
                                <th className="px-6 py-5">الحالة الإدارية</th>
                                <th className="px-6 py-5 text-center">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredReturns.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="text-center py-16 text-gray-400 font-bold text-xs">
                                        لم يتم العثور على أي طلبات استرجاع مطابقة.
                                    </td>
                                </tr>
                            ) : (
                                filteredReturns.map((ret) => (
                                    <tr 
                                        key={ret.id} 
                                        onClick={() => setSelectedReturn(ret)}
                                        className="group hover:bg-gray-50/70 transition-all duration-300 cursor-pointer"
                                    >
                                        <td className="px-6 py-5 text-xs font-black text-gray-900 group-hover:text-[#8c1d3b] transition-colors">{ret.id}</td>
                                        <td className="px-6 py-5 text-xs font-bold text-gray-500">{ret.orderId}</td>
                                        <td className="px-6 py-5">
                                            <div>
                                                <p className="text-xs font-black text-gray-800">{ret.customerName}</p>
                                                <p className="text-[10px] text-gray-400 font-bold mt-0.5">{ret.phone}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                <img src={ret.items[0].image} alt={ret.items[0].name} className="w-8 h-8 rounded-lg object-cover border border-gray-100" />
                                                <span className="text-xs font-bold text-gray-700 truncate max-w-[150px]">{ret.items[0].name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-xs font-black text-gray-900">{ret.amount.toLocaleString()} ريال</td>
                                        <td className="px-6 py-5 text-xs font-bold text-gray-500 max-w-[200px] truncate">{ret.reason}</td>
                                        <td className="px-6 py-5">
                                            <span className={cn("px-3 py-1.5 rounded-full text-[10px] font-black inline-block", getStatusColor(ret.status))}>
                                                {getStatusLabel(ret.status)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-center" onClick={(e) => e.stopPropagation()}>
                                            <div className="flex gap-2 justify-center items-center">
                                                <button
                                                    onClick={() => setSelectedReturn(ret)}
                                                    className="p-2 text-[#8c1d3b] bg-[#8c1d3b]/5 hover:bg-[#8c1d3b]/10 rounded-xl transition-all border border-[#8c1d3b]/10"
                                                    title="معالجة طلب الاسترجاع"
                                                >
                                                    <Eye size={14} />
                                                </button>
                                                <button
                                                    onClick={() => deleteReturn(ret.id)}
                                                    className="p-2 text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition-all border border-red-100"
                                                    title="حذف السجل"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Cards (Visible below md) */}
            <div className="md:hidden space-y-4">
                {filteredReturns.length === 0 ? (
                    <div className="bg-white rounded-[2rem] border border-gray-100 p-12 text-center text-gray-400 font-bold text-xs shadow-sm">
                        لم يتم العثور على أي طلبات استرجاع مطابقة.
                    </div>
                ) : (
                    filteredReturns.map((ret) => (
                        <div 
                            key={ret.id} 
                            onClick={() => setSelectedReturn(ret)}
                            className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm active:scale-[0.98] transition-all duration-300 flex flex-col gap-4 cursor-pointer"
                        >
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-black text-gray-900">{ret.id}</span>
                                <span className="text-[10px] font-bold text-gray-400">{ret.time}</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <img src={ret.items[0].image} alt={ret.items[0].name} className="w-10 h-10 rounded-xl object-cover border border-gray-50 shrink-0" />
                                <div className="flex-grow min-w-0">
                                    <p className="text-xs font-black text-gray-800 truncate">{ret.customerName}</p>
                                    <p className="text-[10px] text-gray-400 font-bold mt-0.5">طلب: {ret.orderId}</p>
                                </div>
                                <div className="text-left shrink-0">
                                    <p className="text-[9px] font-bold text-gray-400">مبلغ الاسترداد</p>
                                    <p className="text-xs font-black text-[#8c1d3b] mt-0.5">{ret.amount.toLocaleString()} ر.س</p>
                                </div>
                            </div>

                            <p className="text-[11px] font-bold text-gray-500 bg-gray-50 p-3 rounded-xl border border-gray-100/50 leading-relaxed text-right">
                                <span className="font-black text-gray-700 block mb-0.5 text-[9px] uppercase tracking-wider">سبب المرتجع:</span>
                                {ret.reason}
                            </p>

                            <div className="flex justify-between items-center pt-3 border-t border-gray-50 flex-wrap gap-2">
                                <span className={cn("px-2.5 py-1 rounded-full text-[9px] font-black inline-block", getStatusColor(ret.status))}>
                                    {getStatusLabel(ret.status)}
                                </span>

                                <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                                    <button
                                        onClick={() => setSelectedReturn(ret)}
                                        className="p-2 text-[#8c1d3b] bg-[#8c1d3b]/5 hover:bg-[#8c1d3b]/10 rounded-xl transition-all border border-[#8c1d3b]/10"
                                    >
                                        <Eye size={14} />
                                    </button>
                                    <button
                                        onClick={() => deleteReturn(ret.id)}
                                        className="p-2 text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition-all border border-red-100"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Sliding Premium Detail Drawer */}
            <AnimatePresence>
                {selectedReturn && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedReturn(null)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
                        />

                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 220 }}
                            className="fixed left-0 top-0 bottom-0 w-full max-w-xl bg-white z-[201] shadow-2xl flex flex-col border-r border-gray-100 overflow-y-auto no-scrollbar"
                        >
                            <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col h-full min-h-full">
                                {/* Header */}
                                <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-10">
                                    <button 
                                        type="button"
                                        onClick={() => setSelectedReturn(null)}
                                        className="p-2 text-gray-400 hover:text-black transition-colors rounded-full hover:bg-gray-50"
                                    >
                                        <X size={20} />
                                    </button>
                                    <div className="text-right">
                                        <h3 className="text-lg font-black text-gray-900">معالجة طلب استرجاع عطر</h3>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider dir-ltr text-right">{selectedReturn.id}</p>
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="p-6 space-y-8 flex-grow">
                                    
                                    {/* Action Form Status Selector */}
                                    <div className="bg-gray-50 p-5 rounded-[2rem] border border-gray-100">
                                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-4">اتخاذ القرار والمعالجة الفورية</h4>
                                        <div className="grid grid-cols-2 gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setValue("status", 'approved')}
                                                className={cn(
                                                    "py-3 rounded-xl text-[10px] font-black border transition-all flex flex-col items-center justify-center gap-1.5",
                                                    formStatus === 'approved' 
                                                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/10' 
                                                        : 'bg-white text-gray-600 border-gray-100 hover:border-gray-200'
                                                )}
                                            >
                                                <CheckCircle2 size={16} />
                                                <span>قبول واسترداد المالي</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setValue("status", 'rejected')}
                                                className={cn(
                                                    "py-3 rounded-xl text-[10px] font-black border transition-all flex flex-col items-center justify-center gap-1.5",
                                                    formStatus === 'rejected' 
                                                        ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-600/10' 
                                                        : 'bg-white text-gray-600 border-gray-100 hover:border-gray-200'
                                                )}
                                            >
                                                <XCircle size={16} />
                                                <span>رفض طلب الاسترجاع</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Refund options (Shown only when approved) */}
                                    <AnimatePresence>
                                        {formStatus === 'approved' && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="bg-emerald-50/30 p-5 rounded-[2rem] border border-emerald-100 space-y-4">
                                                    <h4 className="text-[10px] font-black text-emerald-800 uppercase tracking-wider">حدد طريقة استرداد المبلغ المالي للعميل:</h4>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => setValue("refundMethod", 'online')}
                                                            className={cn(
                                                                "py-2.5 px-3 rounded-xl text-[10px] font-black border transition-all text-center",
                                                                watch("refundMethod") === 'online'
                                                                    ? "bg-black text-white border-black"
                                                                    : "bg-white text-gray-600 border-gray-100 hover:border-gray-200"
                                                            )}
                                                        >
                                                            بوابة الدفع (إلكتروني) 💳
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => setValue("refundMethod", 'wallet')}
                                                            className={cn(
                                                                "py-2.5 px-3 rounded-xl text-[10px] font-black border transition-all text-center",
                                                                watch("refundMethod") === 'wallet'
                                                                    ? "bg-black text-white border-black"
                                                                    : "bg-white text-gray-600 border-gray-100 hover:border-gray-200"
                                                            )}
                                                        >
                                                            محفظة العطور بالمتجر 💰
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Reject reason input (Shown only when rejected) */}
                                    <AnimatePresence>
                                        {formStatus === 'rejected' && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="bg-red-50/30 p-5 rounded-[2rem] border border-red-100 space-y-3">
                                                    <h4 className="text-[10px] font-black text-red-800 uppercase tracking-wider">سبب رفض طلب الاسترجاع للعميل:</h4>
                                                    <textarea
                                                        {...register("rejectReason")}
                                                        rows={3}
                                                        placeholder="مثال: تبين فتح عبوة العطر الفاخرة واستخدامها..."
                                                        className="w-full bg-white border border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-500/5 rounded-xl py-3 px-4 text-xs font-black outline-none transition-all text-right"
                                                    />
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Admin notes */}
                                    <div className="space-y-1.5">
                                        <label className="text-[9px] font-black text-gray-400 uppercase">ملاحظات الفحص الإداري الداخلية:</label>
                                        <textarea
                                            {...register("adminNotes")}
                                            rows={3}
                                            placeholder="اكتب أي تفاصيل بخصوص حالة المنتج عند استلامه للتأكد الإداري..."
                                            className="w-full bg-white border border-gray-200 focus:border-black focus:ring-4 focus:ring-black/5 rounded-xl py-3 px-4 text-xs font-black outline-none transition-all text-right"
                                        />
                                    </div>

                                    {/* Client reason and request details card */}
                                    <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
                                        <h4 className="text-xs font-black text-gray-800 border-b border-gray-50 pb-2">سجل العميل وبلاغ الاسترجاع</h4>
                                        <div className="flex gap-4 items-center">
                                            <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-500 shrink-0">
                                                <User size={18} />
                                            </div>
                                            <div>
                                                <span className="text-[9px] font-black text-gray-400 uppercase block">العميل وصاحب الطلب</span>
                                                <span className="text-xs font-black text-gray-800">{selectedReturn.customerName}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-500 shrink-0">
                                                <Phone size={18} />
                                            </div>
                                            <div>
                                                <span className="text-[9px] font-black text-gray-400 uppercase block">رقم الجوال</span>
                                                <span className="text-xs font-black text-gray-800">{selectedReturn.phone}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 items-start">
                                            <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-500 shrink-0 mt-0.5">
                                                <MessageSquare size={18} />
                                            </div>
                                            <div>
                                                <span className="text-[9px] font-black text-gray-400 uppercase block">تفاصيل بلاغ العميل</span>
                                                <p className="text-xs font-bold text-gray-700 leading-relaxed mt-1">{selectedReturn.customerNotes || "لا توجد أي تفاصيل إضافية مكتوبة."}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Returned Products info */}
                                    <div className="space-y-4">
                                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider">المنتجات المراد استرجاعها</h4>
                                        <div className="space-y-3">
                                            {selectedReturn.items.map((item, idx) => (
                                                <div key={idx} className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4 items-center">
                                                    <img 
                                                        src={item.image} 
                                                        alt={item.name} 
                                                        className="w-16 h-16 object-cover rounded-xl border border-gray-50 shrink-0" 
                                                    />
                                                    <div className="flex-grow">
                                                        <h5 className="text-xs font-black text-gray-800">{item.name}</h5>
                                                        <p className="text-[10px] text-gray-400 font-bold mt-1">الكمية المسترجعة: {item.quantity} × {item.price} ريال</p>
                                                        
                                                        {item.engravedName && (
                                                            <div className="mt-2 inline-flex items-center gap-1.5 bg-[#fcf8f9] border border-[#8c1d3b]/10 px-2 py-1 rounded-lg">
                                                                <Sparkles size={11} className="text-[#8c1d3b]" />
                                                                <span className="text-[9px] font-black text-gray-400">حفر اسم ذهبي:</span>
                                                                <span className="text-[10px] font-black text-[#8c1d3b] tracking-wider uppercase">{item.engravedName}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="text-left shrink-0">
                                                        <span className="text-xs font-black text-gray-900">{(parseFloat(item.price) * item.quantity).toLocaleString()} ريال</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Footer buttons */}
                                <div className="p-6 border-t border-gray-100 bg-white flex flex-col gap-3 sticky bottom-0 z-10">
                                    <button
                                        type="submit"
                                        className="w-full bg-[#8c1d3b] text-white py-4 rounded-2xl font-black text-xs hover:bg-[#8c1d3b]/95 transition-all shadow-lg flex items-center justify-center gap-2 select-none"
                                    >
                                        <span>حفظ وحسم قرار الطلب المرتجع</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedReturn(null)}
                                        className="w-full bg-gray-50 text-gray-500 py-3 rounded-xl font-bold text-xs hover:bg-gray-100 transition-colors border border-gray-200 flex items-center justify-center"
                                    >
                                        إغلاق التفاصيل
                                    </button>
                                </div>
                            </form>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

        </div>
    );
}
