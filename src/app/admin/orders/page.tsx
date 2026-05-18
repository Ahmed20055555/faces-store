"use client";

import React, { useState, useEffect, useRef } from "react";
import {
    Search,
    Filter,
    X,
    CreditCard,
    Banknote,
    User,
    Phone,
    MapPin,
    Package,
    Check,
    Calendar,
    RefreshCw,
    ExternalLink,
    ChevronLeft,
    Clock,
    Sparkles,
    Printer,
    Send,
    CheckCircle2,
    AlertCircle,
    ChevronDown,
    Trash2,
    DollarSign,
    Eye
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface OrderItem {
    id: number;
    name: string;
    price: string;
    quantity: number;
    image: string;
    engravedName?: string | null;
}

interface Order {
    id: string;
    customerName: string;
    phone: string;
    address: string;
    items: OrderItem[];
    amount: number;
    paymentMethod: 'online' | 'cod';
    paymentStatus: 'paid' | 'cod' | 'collected';
    status: 'received' | 'preparing' | 'shipping' | 'delivered';
    time: string;
    date: string;
}

interface Toast {
    id: string;
    message: string;
    type: 'success' | 'info' | 'warning';
}

const DEFAULT_MOCK_ORDERS: Order[] = [
    {
        id: "BALMY-98402",
        customerName: "سلطان بن عبد العزيز",
        phone: "0501234567",
        address: "الرياض، حي الملقا، شارع أنس بن مالك، مبنى 14",
        items: [
            { id: 1, name: "Balmy Noir", price: "299", quantity: 1, image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=400", engravedName: "SULTAN" },
            { id: 2, name: "Balmy Gold Essence", price: "299", quantity: 1, image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=400", engravedName: null }
        ],
        amount: 598,
        paymentMethod: "online",
        paymentStatus: "paid",
        status: "shipping",
        time: "منذ 10 دقائق",
        date: "2026-05-18"
    },
    {
        id: "BALMY-57291",
        customerName: "رنا القحطاني",
        phone: "0559876543",
        address: "جدة، حي النعيم، شارع حراء، مبنى 45",
        items: [
            { id: 3, name: "Amouage Reflection", price: "450", quantity: 1, image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=400", engravedName: "RANA" }
        ],
        amount: 450,
        paymentMethod: "cod",
        paymentStatus: "cod",
        status: "received",
        time: "منذ 25 دقيقة",
        date: "2026-05-18"
    },
    {
        id: "BALMY-12049",
        customerName: "عبد الله الشمري",
        phone: "0544556677",
        address: "الدمام، حي الشاطئ، طريق الخليج، مبنى 9",
        items: [
            { id: 4, name: "Hugo Boss Bottled", price: "380", quantity: 2, image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=400", engravedName: null }
        ],
        amount: 760,
        paymentMethod: "online",
        paymentStatus: "paid",
        status: "delivered",
        time: "منذ ساعتين",
        date: "2026-05-18"
    }
];

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [paymentFilter, setPaymentFilter] = useState<string>("all");
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [toasts, setToasts] = useState<Toast[]>([]);
    const [activeFulfillmentDropdownId, setActiveFulfillmentDropdownId] = useState<string | null>(null);
    const [activePaymentDropdownId, setActivePaymentDropdownId] = useState<string | null>(null);
    const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
    const [whatsappMessage, setWhatsappMessage] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Load orders
    useEffect(() => {
        const savedOrders = localStorage.getItem("adminOrders");
        if (savedOrders) {
            const parsed = JSON.parse(savedOrders) as Order[];
            const uniqueMock = DEFAULT_MOCK_ORDERS.filter(mock => !parsed.some(p => p.id === mock.id));
            setOrders([...parsed, ...uniqueMock]);
        } else {
            setOrders(DEFAULT_MOCK_ORDERS);
        }
    }, []);

    // Handle outside click to close dropdowns
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setActiveFulfillmentDropdownId(null);
                setActivePaymentDropdownId(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Show luxury toast
    const showToast = (message: string, type: Toast['type'] = 'success') => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3500);
    };

    // Update order status
    const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
        const updated = orders.map(order => {
            if (order.id === orderId) {
                return { ...order, status: newStatus };
            }
            return order;
        });
        setOrders(updated);

        // Save back to localStorage
        const savedOrders = localStorage.getItem("adminOrders");
        const parsed = savedOrders ? (JSON.parse(savedOrders) as Order[]) : [];
        const index = parsed.findIndex(p => p.id === orderId);
        
        if (index !== -1) {
            parsed[index].status = newStatus;
            localStorage.setItem("adminOrders", JSON.stringify(parsed));
        } else {
            const mockToSave = orders.find(o => o.id === orderId);
            if (mockToSave) {
                const newSaved = { ...mockToSave, status: newStatus };
                parsed.unshift(newSaved);
                localStorage.setItem("adminOrders", JSON.stringify(parsed));
            }
        }

        // Keep active selection in sync
        if (selectedOrder && selectedOrder.id === orderId) {
            setSelectedOrder({ ...selectedOrder, status: newStatus });
        }

        // Notify client tracking simulator via localStorage
        localStorage.setItem("activeOrderFulfillmentStatus", newStatus);

        showToast(`تم تحديث حالة الطلب ${orderId} إلى "${getStatusLabel(newStatus)}" بنجاح! ✨`);
        setActiveFulfillmentDropdownId(null);
    };

    // Update Payment status
    const updatePaymentStatus = (orderId: string, newStatus: Order['paymentStatus']) => {
        const updated = orders.map(order => {
            if (order.id === orderId) {
                return { ...order, paymentStatus: newStatus };
            }
            return order;
        });
        setOrders(updated);

        const savedOrders = localStorage.getItem("adminOrders");
        const parsed = savedOrders ? (JSON.parse(savedOrders) as Order[]) : [];
        const index = parsed.findIndex(p => p.id === orderId);
        
        if (index !== -1) {
            parsed[index].paymentStatus = newStatus;
            localStorage.setItem("adminOrders", JSON.stringify(parsed));
        } else {
            const mockToSave = orders.find(o => o.id === orderId);
            if (mockToSave) {
                const newSaved = { ...mockToSave, paymentStatus: newStatus };
                parsed.unshift(newSaved);
                localStorage.setItem("adminOrders", JSON.stringify(parsed));
            }
        }

        if (selectedOrder && selectedOrder.id === orderId) {
            setSelectedOrder({ ...selectedOrder, paymentStatus: newStatus });
        }

        // Notify client tracking simulator
        localStorage.setItem("paymentStatus", newStatus === 'paid' || newStatus === 'collected' ? 'paid' : 'cod');

        let statusLabel = "بانتظار التحصيل 💵";
        if (newStatus === 'paid') statusLabel = "مدفوع إلكترونياً ✅";
        if (newStatus === 'collected') statusLabel = "تم التحصيل نقداً 💵";

        showToast(`تم تعديل حالة الدفع للطلب ${orderId} إلى "${statusLabel}" بنجاح! 💳`);
        setActivePaymentDropdownId(null);
    };

    // Delete order
    const deleteOrder = (orderId: string) => {
        if (!confirm("هل أنت متأكد من حذف هذا الطلب نهائياً من النظام؟")) return;

        const updated = orders.filter(order => order.id !== orderId);
        setOrders(updated);

        const savedOrders = localStorage.getItem("adminOrders");
        if (savedOrders) {
            const parsed = JSON.parse(savedOrders) as Order[];
            const filtered = parsed.filter(p => p.id !== orderId);
            localStorage.setItem("adminOrders", JSON.stringify(filtered));
        }

        setSelectedOrder(null);
        showToast(`تم حذف الطلب ${orderId} نهائياً من السجلات.`, 'warning');
    };

    // Filter orders
    const filteredOrders = orders.filter(order => {
        const matchesSearch = 
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.phone.includes(searchTerm);
        
        const matchesStatus = statusFilter === "all" || order.status === statusFilter;
        
        let matchesPayment = true;
        if (paymentFilter !== "all") {
            if (paymentFilter === "online") matchesPayment = order.paymentMethod === 'online';
            if (paymentFilter === "cod") matchesPayment = order.paymentMethod === 'cod' && order.paymentStatus === 'cod';
            if (paymentFilter === "collected") matchesPayment = order.paymentStatus === 'collected';
        }

        return matchesSearch && matchesStatus && matchesPayment;
    });

    const getStatusLabel = (status: Order['status']) => {
        switch (status) {
            case "received": return "تم الاستلام";
            case "preparing": return "جاري التجهيز";
            case "shipping": return "في الطريق";
            case "delivered": return "تم التوصيل";
        }
    };

    const getStatusColor = (status: Order['status']) => {
        switch (status) {
            case "received": return "bg-blue-50 text-blue-600 border border-blue-100";
            case "preparing": return "bg-purple-50 text-purple-600 border border-purple-100";
            case "shipping": return "bg-orange-50 text-orange-600 border border-orange-100";
            case "delivered": return "bg-green-50 text-green-600 border border-green-100";
        }
    };

    const getPaymentBadge = (status: Order['paymentStatus']) => {
        if (status === 'paid') {
            return (
                <span className="flex items-center gap-1.5 text-[11px] bg-green-50 text-green-600 px-3 py-1.5 rounded-full border border-green-100 font-black cursor-pointer hover:bg-green-100 transition-all select-none">
                    <CheckCircle2 size={12} />
                    مدفوع إلكترونياً
                </span>
            );
        } else if (status === 'collected') {
            return (
                <span className="flex items-center gap-1.5 text-[11px] bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-100 font-black cursor-pointer hover:bg-emerald-100 transition-all select-none">
                    <DollarSign size={12} />
                    تم التحصيل نقداً
                </span>
            );
        } else {
            return (
                <span className="flex items-center gap-1.5 text-[11px] bg-amber-50 text-amber-600 px-3 py-1.5 rounded-full border border-amber-100 font-black cursor-pointer hover:bg-amber-100 transition-all select-none">
                    <Clock size={12} />
                    بانتظار التحصيل
                </span>
            );
        }
    };

    // Open simulated WhatsApp Modal
    const handleWhatsAppAlert = (order: Order) => {
        const itemsList = order.items.map(item => `- ${item.name} (${item.quantity} حبة)${item.engravedName ? ` [حفر ذهبي باسم: ${item.engravedName}]` : ''}`).join('\n');
        const text = `مرحباً يا أستاذ ${order.customerName} ✨\n\nيسعدنا إبلاغك بأن طلبك ذو الرقم *${order.id}* قد تغيرت حالته الآن إلى: *[${getStatusLabel(order.status)}]* 🚚.\n\n📦 محتويات الشحنة:\n${itemsList}\n\n📍 عنوان التوصيل:\n${order.address}\n\nنشكرك لاختيارك Balmy! ونأمل أن تنال عطورنا الفاخرة إعجابك. 🖤⚜️`;
        setWhatsappMessage(text);
        setIsWhatsAppModalOpen(true);
    };

    // Print Receipt function
    const handlePrintReceipt = (order: Order) => {
        const printWindow = window.open("", "_blank");
        if (!printWindow) return;
        
        printWindow.document.write(`
            <html>
            <head>
                <title>فاتورة Balmy - ${order.id}</title>
                <style>
                    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; direction: rtl; text-align: right; padding: 40px; color: #222; }
                    .header { text-align: center; border-bottom: 2px solid #eaeaea; padding-bottom: 20px; margin-bottom: 30px; }
                    .brand { font-size: 28px; font-weight: 900; letter-spacing: 2px; }
                    .subtitle { font-size: 11px; color: #888; font-weight: bold; margin-top: 5px; }
                    .order-info { display: flex; justify-content: space-between; margin-bottom: 30px; font-size: 14px; }
                    .section-title { font-size: 16px; font-weight: 900; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 5px; }
                    table { w-full: 100%; border-collapse: collapse; margin-bottom: 30px; width: 100%; }
                    th, td { padding: 12px; border-bottom: 1px solid #eee; font-size: 13px; }
                    th { font-weight: 900; background: #f9f9f9; }
                    .total-box { background: #fafafa; border: 1px solid #eee; padding: 20px; border-radius: 12px; margin-right: auto; width: 300px; font-size: 14px; }
                    .total-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
                    .grand-total { font-weight: 900; color: #8c1d3b; border-top: 1px solid #ddd; pt: 10px; margin-top: 10px; font-size: 16px; }
                    .footer { text-align: center; font-size: 12px; color: #999; margin-top: 60px; border-top: 1px solid #eee; pt: 20px; }
                </style>
            </head>
            <body>
                <div class="header">
                    <div class="brand">BALMY PERFUMES</div>
                    <div class="subtitle">فاتورة بيع رسمية فاخرة</div>
                </div>
                <div class="order-info">
                    <div>
                        <strong>رقم الفاتورة:</strong> ${order.id}<br>
                        <strong>تاريخ الطلب:</strong> ${order.date || 'اليوم'}
                    </div>
                    <div>
                        <strong>العميل:</strong> ${order.customerName}<br>
                        <strong>الجوال:</strong> ${order.phone}
                    </div>
                </div>
                
                <div class="section-title">عنوان الشحن والتوصيل</div>
                <p style="font-size: 13px; line-height: 1.6; margin-bottom: 30px;">${order.address}</p>

                <div class="section-title">المنتجات المطلوبة</div>
                <table>
                    <thead>
                        <tr>
                            <th>المنتج</th>
                            <th>الاسم المحفور</th>
                            <th>السعر</th>
                            <th>الكمية</th>
                            <th style="text-align: left;">المجموع</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${order.items.map(item => `
                            <tr>
                                <td><strong>${item.name}</strong></td>
                                <td style="color: #8c1d3b; font-weight: bold; letter-spacing: 1px;">${item.engravedName || '-'}</td>
                                <td>${item.price} ريال</td>
                                <td>${item.quantity}</td>
                                <td style="text-align: left; font-weight: bold;">${(parseFloat(item.price) * item.quantity).toLocaleString()} ريال</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>

                <div class="total-box">
                    <div class="total-row">
                        <span>المجموع الفرعي:</span>
                        <span>${order.amount} ريال</span>
                    </div>
                    <div class="total-row">
                        <span>الشحن والتوصيل:</span>
                        <span style="color: green; font-weight: bold;">مجاني</span>
                    </div>
                    <div class="total-row grand-total">
                        <span>الإجمالي شامل الضريبة:</span>
                        <span>${order.amount} ريال</span>
                    </div>
                </div>

                <div class="footer">
                    شكراً لتسوقكم من Balmy Perfumes. نسعد دائماً بخدمتكم.<br>
                    الرقم الضريبي: 30012485900003
                </div>
                <script>window.print();</script>
            </body>
            </html>
        `);
        printWindow.document.close();
        showToast("جاري إعداد وتحضير الفاتورة الفاخرة للطباعة... 🖨️");
    };

    return (
        <div className="max-w-[1600px] mx-auto space-y-6 md:space-y-10 pb-20 px-4 md:px-0 text-right relative" dir="rtl">
            
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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-gray-900 flex items-center gap-3">
                        مركز التحكم في الطلبات والمبيعات
                        <Sparkles className="text-yellow-500 animate-pulse hidden md:block" size={24} />
                    </h1>
                    <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-wider">Supercharged Interactive E-commerce Center</p>
                </div>
                
                {/* Stats recap cards */}
                <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                    <div className="bg-white px-5 py-3 rounded-2xl border border-gray-100 shadow-sm text-center min-w-[100px]">
                        <span className="text-[10px] font-black text-gray-400">الكل</span>
                        <p className="text-xl font-black text-gray-900 mt-0.5">{orders.length}</p>
                    </div>
                    <div className="bg-white px-5 py-3 rounded-2xl border border-gray-100 shadow-sm text-center min-w-[100px]">
                        <span className="text-[10px] font-black text-blue-500">الجديدة</span>
                        <p className="text-xl font-black text-blue-600 mt-0.5">
                            {orders.filter(o => o.status === 'received').length}
                        </p>
                    </div>
                    <div className="bg-white px-5 py-3 rounded-2xl border border-gray-100 shadow-sm text-center min-w-[100px]">
                        <span className="text-[10px] font-black text-orange-500">في الطريق</span>
                        <p className="text-xl font-black text-orange-600 mt-0.5">
                            {orders.filter(o => o.status === 'shipping').length}
                        </p>
                    </div>
                    <div className="bg-white px-5 py-3 rounded-2xl border border-gray-100 shadow-sm text-center min-w-[100px]">
                        <span className="text-[10px] font-black text-green-500">تم تسليمها</span>
                        <p className="text-xl font-black text-green-600 mt-0.5">
                            {orders.filter(o => o.status === 'delivered').length}
                        </p>
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
                        placeholder="ابحث برقم الطلب، اسم العميل، أو الجوال..."
                        className="w-full bg-gray-50 border-transparent focus:bg-white focus:border-black focus:ring-4 focus:ring-black/5 rounded-xl py-3 pr-11 pl-4 text-xs font-bold outline-none transition-all"
                    />
                </div>

                {/* Filter selects */}
                <div className="flex flex-wrap md:flex-nowrap gap-3 w-full lg:w-auto">
                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100 w-full md:w-auto">
                        <Filter size={14} className="text-gray-400" />
                        <span className="text-[11px] font-black text-gray-400 min-w-max">حالة الطلب</span>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="bg-transparent text-xs font-bold text-gray-800 outline-none cursor-pointer pr-4"
                        >
                            <option value="all">الكل</option>
                            <option value="received">تم الاستلام</option>
                            <option value="preparing">جاري التجهيز</option>
                            <option value="shipping">في الطريق</option>
                            <option value="delivered">تم التوصيل</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100 w-full md:w-auto">
                        <CreditCard size={14} className="text-gray-400" />
                        <span className="text-[11px] font-black text-gray-400 min-w-max">حالة الدفع</span>
                        <select
                            value={paymentFilter}
                            onChange={(e) => setPaymentFilter(e.target.value)}
                            className="bg-transparent text-xs font-bold text-gray-800 outline-none cursor-pointer pr-4"
                        >
                            <option value="all">الكل</option>
                            <option value="online">مدفوع إلكترونياً</option>
                            <option value="cod">بانتظار التحصيل (COD)</option>
                            <option value="collected">تم التحصيل نقداً</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden" ref={dropdownRef}>
                <div className="overflow-x-auto">
                    <table className="w-full text-right min-w-[950px]">
                        <thead>
                            <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-5">رقم الطلب</th>
                                <th className="px-6 py-5">العميل</th>
                                <th className="px-6 py-5">التوقيت</th>
                                <th className="px-6 py-5">المبلغ الإجمالي</th>
                                <th className="px-6 py-5">حالة الدفع (انقر للتبديل 🔄)</th>
                                <th className="px-6 py-5">حالة التوصيل الفورية</th>
                                <th className="px-6 py-5 text-center">الإجراءات التفاعلية</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-16 text-gray-400 font-bold text-xs">
                                        لم يتم العثور على أي طلبات مطابقة لخيارات البحث.
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map((order) => (
                                    <tr 
                                        key={order.id} 
                                        onClick={() => setSelectedOrder(order)}
                                        className="group hover:bg-gray-50/70 transition-all duration-300 cursor-pointer"
                                    >
                                        <td className="px-6 py-5 text-xs font-black text-gray-900 group-hover:text-[#8c1d3b] transition-colors">{order.id}</td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-[#8c1d3b]/5 text-[#8c1d3b] flex items-center justify-center font-black text-xs border border-[#8c1d3b]/10">
                                                    {order.customerName[0]}
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black text-gray-800">{order.customerName}</p>
                                                    <p className="text-[10px] text-gray-400 font-bold mt-0.5">{order.phone}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-xs font-bold text-gray-500">{order.time}</td>
                                        <td className="px-6 py-5 text-xs font-black text-gray-900">{order.amount.toLocaleString()} ريال</td>
                                        
                                        {/* Clickable Payment Status Popover */}
                                        <td className="px-6 py-5 relative" onClick={(e) => {
                                            e.stopPropagation();
                                            setActivePaymentDropdownId(activePaymentDropdownId === order.id ? null : order.id);
                                            setActiveFulfillmentDropdownId(null);
                                        }}>
                                            <div className="inline-flex items-center gap-1 hover:brightness-95 active:scale-95 transition-all">
                                                {getPaymentBadge(order.paymentStatus)}
                                                <ChevronDown size={12} className="text-gray-400" />
                                            </div>

                                            {/* Sleek inline payment dropdown overlay */}
                                            <AnimatePresence>
                                                {activePaymentDropdownId === order.id && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: 10 }}
                                                        className="absolute right-6 top-12 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2.5 w-36 z-[100] text-right"
                                                    >
                                                        <button 
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                updatePaymentStatus(order.id, 'paid');
                                                            }} 
                                                            className="w-full text-right px-3 py-2 text-[10px] font-bold text-green-600 hover:bg-green-50 transition-colors flex items-center justify-start gap-1.5"
                                                        >
                                                            <CheckCircle2 size={12} className="shrink-0" />
                                                            <span>مدفوع إلكترونياً</span>
                                                        </button>
                                                        <button 
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                updatePaymentStatus(order.id, 'collected');
                                                            }} 
                                                            className="w-full text-right px-3 py-2 text-[10px] font-bold text-emerald-700 hover:bg-emerald-50 transition-colors flex items-center justify-start gap-1.5"
                                                        >
                                                            <DollarSign size={12} className="shrink-0" />
                                                            <span>تم التحصيل نقداً</span>
                                                        </button>
                                                        <button 
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                updatePaymentStatus(order.id, 'cod');
                                                            }} 
                                                            className="w-full text-right px-3 py-2 text-[10px] font-bold text-amber-600 hover:bg-amber-50 transition-colors flex items-center justify-start gap-1.5"
                                                        >
                                                            <Clock size={12} className="shrink-0" />
                                                            <span>بانتظار التحصيل</span>
                                                        </button>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </td>

                                        {/* Clickable Fulfillment Status Popover */}
                                        <td className="px-6 py-5 relative" onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveFulfillmentDropdownId(activeFulfillmentDropdownId === order.id ? null : order.id);
                                            setActivePaymentDropdownId(null);
                                        }}>
                                            <div className="inline-flex items-center gap-1 hover:brightness-95 active:scale-95 transition-all">
                                                <span className={cn(
                                                    "px-3 py-1.5 rounded-full text-[10px] font-black inline-block cursor-pointer select-none",
                                                    getStatusColor(order.status)
                                                )}>
                                                    {getStatusLabel(order.status)}
                                                </span>
                                                <ChevronDown size={12} className="text-gray-400" />
                                            </div>

                                            {/* Sleek inline dropdown overlay */}
                                            <AnimatePresence>
                                                {activeFulfillmentDropdownId === order.id && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: 10 }}
                                                        className="absolute right-6 top-12 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2.5 w-36 z-[100] text-right"
                                                    >
                                                        <button onClick={() => updateOrderStatus(order.id, 'received')} className="w-full text-right px-4 py-2 text-[11px] font-bold text-blue-600 hover:bg-blue-50 transition-colors">تم الاستلام</button>
                                                        <button onClick={() => updateOrderStatus(order.id, 'preparing')} className="w-full text-right px-4 py-2 text-[11px] font-bold text-purple-600 hover:bg-purple-50 transition-colors">جاري التجهيز</button>
                                                        <button onClick={() => updateOrderStatus(order.id, 'shipping')} className="w-full text-right px-4 py-2 text-[11px] font-bold text-orange-600 hover:bg-orange-50 transition-colors">في الطريق</button>
                                                        <button onClick={() => updateOrderStatus(order.id, 'delivered')} className="w-full text-right px-4 py-2 text-[11px] font-bold text-green-600 hover:bg-green-50 transition-colors">تم التوصيل</button>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </td>

                                        {/* Actions quick shortcuts */}
                                        <td className="px-6 py-5 text-center" onClick={(e) => e.stopPropagation()}>
                                            <div className="flex gap-2 justify-center items-center">
                                                <button
                                                    onClick={() => setSelectedOrder(order)}
                                                    className="p-2 text-[#8c1d3b] bg-[#8c1d3b]/5 hover:bg-[#8c1d3b]/10 rounded-xl transition-all border border-[#8c1d3b]/10"
                                                    title="عرض تفاصيل الطلب"
                                                >
                                                    <Eye size={14} />
                                                </button>
                                                <button
                                                    onClick={() => handleWhatsAppAlert(order)}
                                                    className="p-2 text-green-600 bg-green-50 hover:bg-green-100 rounded-xl transition-all border border-green-100"
                                                    title="إرسال إشعار WhatsApp"
                                                >
                                                    <Send size={14} />
                                                </button>
                                                <button
                                                    onClick={() => handlePrintReceipt(order)}
                                                    className="p-2 text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all border border-gray-100"
                                                    title="طباعة الفاتورة"
                                                >
                                                    <Printer size={14} />
                                                </button>
                                                <button
                                                    onClick={() => deleteOrder(order.id)}
                                                    className="p-2 text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition-all border border-red-100"
                                                    title="حذف الطلب"
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

            {/* Sliding Premium Detail Overlay Drawer */}
            <AnimatePresence>
                {selectedOrder && (
                    <>
                        {/* Backdrop overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedOrder(null)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
                        />

                        {/* Sliding Panel */}
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 220 }}
                            className="fixed left-0 top-0 bottom-0 w-full max-w-xl bg-white z-[201] shadow-2xl flex flex-col border-r border-gray-100 overflow-y-auto no-scrollbar"
                        >
                            {/* Panel Header */}
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-10">
                                <button 
                                    onClick={() => setSelectedOrder(null)}
                                    className="p-2 text-gray-400 hover:text-black transition-colors rounded-full hover:bg-gray-50"
                                >
                                    <X size={20} />
                                </button>
                                <div className="text-right">
                                    <h3 className="text-lg font-black text-gray-900">تفاصيل الطلب الفاخر</h3>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider dir-ltr text-right">{selectedOrder.id}</p>
                                </div>
                            </div>

                            {/* Panel Body */}
                            <div className="p-6 space-y-8 flex-grow">
                                
                                {/* Status Control Dashboard */}
                                <div className="bg-gray-50 p-5 rounded-[2rem] border border-gray-100">
                                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-4">التحكم الفوري والسريع في حالة التوصيل</h4>
                                    
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                        <button
                                            onClick={() => updateOrderStatus(selectedOrder.id, 'received')}
                                            className={cn(
                                                "py-2.5 px-1 rounded-xl text-[10px] font-black border transition-all flex flex-col items-center justify-center gap-1.5",
                                                selectedOrder.status === 'received' 
                                                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/10' 
                                                    : 'bg-white text-gray-600 border-gray-100 hover:border-gray-200'
                                            )}
                                        >
                                            <Clock size={14} />
                                            <span>تم الاستلام</span>
                                        </button>
                                        <button
                                            onClick={() => updateOrderStatus(selectedOrder.id, 'preparing')}
                                            className={cn(
                                                "py-2.5 px-1 rounded-xl text-[10px] font-black border transition-all flex flex-col items-center justify-center gap-1.5",
                                                selectedOrder.status === 'preparing' 
                                                    ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/10' 
                                                    : 'bg-white text-gray-600 border-gray-100 hover:border-gray-200'
                                            )}
                                        >
                                            <Package size={14} />
                                            <span>جاري التجهيز</span>
                                        </button>
                                        <button
                                            onClick={() => updateOrderStatus(selectedOrder.id, 'shipping')}
                                            className={cn(
                                                "py-2.5 px-1 rounded-xl text-[10px] font-black border transition-all flex flex-col items-center justify-center gap-1.5",
                                                selectedOrder.status === 'shipping' 
                                                    ? 'bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-600/10' 
                                                    : 'bg-white text-gray-600 border-gray-100 hover:border-gray-200'
                                            )}
                                        >
                                            <RefreshCw size={14} className={selectedOrder.status === 'shipping' ? "animate-spin" : ""} />
                                            <span>في الطريق</span>
                                        </button>
                                        <button
                                            onClick={() => updateOrderStatus(selectedOrder.id, 'delivered')}
                                            className={cn(
                                                "py-2.5 px-1 rounded-xl text-[10px] font-black border transition-all flex flex-col items-center justify-center gap-1.5",
                                                selectedOrder.status === 'delivered' 
                                                    ? 'bg-green-600 text-white border-green-600 shadow-md shadow-green-600/10' 
                                                    : 'bg-white text-gray-600 border-gray-100 hover:border-gray-200'
                                            )}
                                        >
                                            <Check size={14} />
                                            <span>تم التوصيل</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Status Control: Payment status dashboard */}
                                <div className="bg-gray-50 p-5 rounded-[2rem] border border-gray-100">
                                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-4">التحكم الفوري في حالة الدفع والمعاملات</h4>
                                    <div className="grid grid-cols-3 gap-2">
                                        <button
                                            onClick={() => updatePaymentStatus(selectedOrder.id, 'paid')}
                                            className={cn(
                                                "py-3 rounded-xl text-[10px] font-black border transition-all flex flex-col items-center gap-1",
                                                selectedOrder.paymentStatus === 'paid' 
                                                    ? 'bg-green-600 text-white border-green-600' 
                                                    : 'bg-white text-gray-600 border-gray-100'
                                            )}
                                        >
                                            <CreditCard size={14} />
                                            <span>مدفوع إلكترونياً</span>
                                        </button>
                                        <button
                                            onClick={() => updatePaymentStatus(selectedOrder.id, 'collected')}
                                            className={cn(
                                                "py-3 rounded-xl text-[10px] font-black border transition-all flex flex-col items-center gap-1",
                                                selectedOrder.paymentStatus === 'collected' 
                                                    ? 'bg-emerald-600 text-white border-emerald-600' 
                                                    : 'bg-white text-gray-600 border-gray-100'
                                            )}
                                        >
                                            <DollarSign size={14} />
                                            <span>تم التحصيل نقداً</span>
                                        </button>
                                        <button
                                            onClick={() => updatePaymentStatus(selectedOrder.id, 'cod')} // Cycle back
                                            className={cn(
                                                "py-3 rounded-xl text-[10px] font-black border transition-all flex flex-col items-center gap-1",
                                                selectedOrder.paymentStatus === 'cod' 
                                                    ? 'bg-amber-600 text-white border-amber-600' 
                                                    : 'bg-white text-gray-600 border-gray-100'
                                            )}
                                        >
                                            <Clock size={14} />
                                            <span>بانتظار التحصيل</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Customer Details card */}
                                <div className="space-y-4">
                                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider">تفاصيل مستلم الطلب</h4>
                                    <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-500 shrink-0">
                                                <User size={18} />
                                            </div>
                                            <div>
                                                <span className="text-[9px] font-black text-gray-400 uppercase block">الاسم بالكامل</span>
                                                <span className="text-xs font-black text-gray-800">{selectedOrder.customerName}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-500 shrink-0">
                                                <Phone size={18} />
                                            </div>
                                            <div>
                                                <span className="text-[9px] font-black text-gray-400 uppercase block">رقم الجوال</span>
                                                <span className="text-xs font-black text-gray-800 dir-ltr inline-block">{selectedOrder.phone}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-500 shrink-0">
                                                <MapPin size={18} />
                                            </div>
                                            <div>
                                                <span className="text-[9px] font-black text-gray-400 uppercase block">عنوان التوصيل / الاستلام</span>
                                                <span className="text-xs font-bold text-gray-700 leading-relaxed">{selectedOrder.address}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Ordered items list */}
                                <div className="space-y-4">
                                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider">المنتجات المطلوبة</h4>
                                    <div className="space-y-3">
                                        {selectedOrder.items.map((item, idx) => (
                                            <div key={idx} className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4 items-center">
                                                <img 
                                                    src={item.image || "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=400"} 
                                                    alt={item.name} 
                                                    className="w-16 h-16 object-cover rounded-xl border border-gray-50 shrink-0" 
                                                />
                                                <div className="flex-grow">
                                                    <h5 className="text-xs font-black text-gray-800">{item.name}</h5>
                                                    <p className="text-[10px] text-gray-400 font-bold mt-1">الكمية: {item.quantity} × {item.price} ريال</p>
                                                    
                                                    {/* Engraved Bottle visual tag */}
                                                    {item.engravedName && (
                                                        <div className="mt-2.5 inline-flex items-center gap-1.5 bg-[#fcf8f9] border border-[#8c1d3b]/10 px-2 py-1 rounded-lg">
                                                            <Sparkles size={11} className="text-[#8c1d3b]" />
                                                            <span className="text-[9px] font-black text-gray-400">حفر اسم ذهبي:</span>
                                                            <span className="text-[10px] font-black text-[#8c1d3b] font-sans tracking-widest uppercase">{item.engravedName}</span>
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

                                {/* Financial break-up */}
                                <div className="space-y-4">
                                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider">تفاصيل الحساب والفاتورة</h4>
                                    <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5 space-y-3.5">
                                        <div className="flex justify-between items-center text-xs font-bold text-gray-500">
                                            <span>المجموع الجزئي</span>
                                            <span className="text-gray-700">{selectedOrder.amount.toLocaleString()} ريال</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs font-bold text-gray-500">
                                            <span>الشحن والتوصيل</span>
                                            <span className="text-green-600">مجاناً</span>
                                        </div>
                                        <div className="h-[1px] bg-gray-200/60 my-2"></div>
                                        <div className="flex justify-between items-center text-xs font-black text-gray-900">
                                            <span>الإجمالي شامل الضريبة</span>
                                            <span className="text-sm text-[#8c1d3b]">{selectedOrder.amount.toLocaleString()} ريال</span>
                                        </div>
                                        
                                        <div className="pt-2 flex justify-between items-center">
                                            <span className="text-[10px] font-black text-gray-400">طريقة الدفع الفورية</span>
                                            {getPaymentBadge(selectedOrder.paymentStatus)}
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* Panel Footer Action Buttons */}
                            <div className="p-6 border-t border-gray-100 bg-white flex gap-3 sticky bottom-0 z-10">
                                <button
                                    onClick={() => handleWhatsAppAlert(selectedOrder)}
                                    className="flex-1 bg-green-50 text-green-600 py-3.5 rounded-xl font-bold text-xs hover:bg-green-100 transition-colors border border-green-100 flex items-center justify-center gap-1.5"
                                >
                                    <Send size={14} />
                                    <span>إشعار واتساب</span>
                                </button>
                                <button
                                    onClick={() => handlePrintReceipt(selectedOrder)}
                                    className="flex-1 bg-gray-50 text-gray-600 py-3.5 rounded-xl font-bold text-xs hover:bg-gray-100 transition-colors border border-gray-200 flex items-center justify-center gap-1.5"
                                >
                                    <Printer size={14} />
                                    <span>طباعة الفاتورة</span>
                                </button>
                                <button
                                    onClick={() => deleteOrder(selectedOrder.id)}
                                    className="flex-1 bg-red-50 text-red-500 py-3.5 rounded-xl font-bold text-xs hover:bg-red-100 transition-colors"
                                >
                                    حذف الطلب
                                </button>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Immersive WhatsApp Alert Modal */}
            <AnimatePresence>
                {isWhatsAppModalOpen && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-[2.5rem] p-6 max-w-lg w-full shadow-2xl relative border border-gray-100 overflow-hidden"
                        >
                            <button
                                onClick={() => setIsWhatsAppModalOpen(false)}
                                className="absolute top-6 left-6 text-gray-400 hover:text-black transition-all"
                            >
                                <X size={20} />
                            </button>

                            <div className="text-right space-y-4">
                                <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                                    <Send className="text-green-600" size={22} />
                                    محاكي إشعار WhatsApp الفاخر للعميل
                                </h3>
                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Simulated WhatsApp Customer Notification</p>

                                <div className="bg-emerald-50/50 border border-emerald-100 rounded-3xl p-5 relative">
                                    <div className="absolute top-4 left-4 text-[9px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full uppercase">نموذج الإرسال</div>
                                    <textarea
                                        value={whatsappMessage}
                                        onChange={(e) => setWhatsappMessage(e.target.value)}
                                        rows={8}
                                        className="w-full bg-transparent border-none text-xs font-bold text-gray-800 outline-none leading-relaxed resize-none focus:ring-0"
                                    />
                                </div>

                                <button
                                    onClick={() => {
                                        setIsWhatsAppModalOpen(false);
                                        showToast("تم إرسال إشعار WhatsApp الفاخر بنجاح إلى جوال العميل! 🚀📱");
                                    }}
                                    className="w-full bg-green-600 text-white font-black py-4 rounded-2xl text-xs hover:bg-green-700 transition-all shadow-lg flex items-center justify-center gap-2"
                                >
                                    <Send size={14} />
                                    تأكيد الإرسال الفوري للعميل
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
}
