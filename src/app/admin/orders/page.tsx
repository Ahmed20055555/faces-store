"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
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
    Eye,
    Save,
    Edit,
    TrendingUp,
    Activity,
    FileSpreadsheet,
    PlayCircle,
    PauseCircle
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
    estimatedDelivery?: string;
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

    const { register, handleSubmit, setValue, watch, reset } = useForm({
        defaultValues: {
            orderId: "",
            status: "received" as Order['status'],
            paymentStatus: "cod" as Order['paymentStatus'],
            estimatedDelivery: "خلال 24 ساعة"
        }
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Watch status fields to dynamically style button selections in the drawer
    const formStatus = watch("status");
    const formPaymentStatus = watch("paymentStatus");
    const formEstimatedDelivery = watch("estimatedDelivery");

    // Load form with fresh active values when selectedOrder is set
    useEffect(() => {
        if (selectedOrder) {
            reset({
                orderId: selectedOrder.id,
                status: selectedOrder.status,
                paymentStatus: selectedOrder.paymentStatus,
                estimatedDelivery: selectedOrder.estimatedDelivery || "خلال 24 ساعة"
            });
        }
    }, [selectedOrder, reset]);

    const onFormSubmit = (data: any) => {
        setIsSubmitting(true);
        setTimeout(() => {
            const updated = orders.map(order => {
                if (order.id === data.orderId) {
                    return { 
                        ...order, 
                        status: data.status, 
                        paymentStatus: data.paymentStatus,
                        estimatedDelivery: data.estimatedDelivery
                    };
                }
                return order;
            });
            setOrders(updated);

            // Save to localStorage
            const savedOrders = localStorage.getItem("adminOrders");
            const parsed = savedOrders ? (JSON.parse(savedOrders) as Order[]) : [];
            const index = parsed.findIndex(p => p.id === data.orderId);
            
            if (index !== -1) {
                parsed[index].status = data.status;
                parsed[index].paymentStatus = data.paymentStatus;
                parsed[index].estimatedDelivery = data.estimatedDelivery;
                localStorage.setItem("adminOrders", JSON.stringify(parsed));
            } else {
                const mockToSave = orders.find(o => o.id === data.orderId);
                if (mockToSave) {
                    const newSaved = { 
                        ...mockToSave, 
                        status: data.status, 
                        paymentStatus: data.paymentStatus,
                        estimatedDelivery: data.estimatedDelivery
                    };
                    parsed.unshift(newSaved);
                    localStorage.setItem("adminOrders", JSON.stringify(parsed));
                }
            }

            // Sync client trackers
            localStorage.setItem("activeOrderFulfillmentStatus", data.status);
            localStorage.setItem("paymentStatus", data.paymentStatus === 'paid' || data.paymentStatus === 'collected' ? 'paid' : 'cod');
            localStorage.setItem("estimatedDeliveryTime", data.estimatedDelivery);

            // Keep selected order state synchronized
            if (selectedOrder && selectedOrder.id === data.orderId) {
                setSelectedOrder({
                    ...selectedOrder,
                    status: data.status,
                    paymentStatus: data.paymentStatus,
                    estimatedDelivery: data.estimatedDelivery
                });
            }

            setIsSubmitting(false);
            showToast(`تم حفظ وتحديث بيانات الطلب ${data.orderId} بنجاح وإرسالها للباك إند! 🚀📦`);
        }, 1000);
    };

    const [isLive, setIsLive] = useState(true);
    const [isExporting, setIsExporting] = useState(false);

    // Live Simulator Effect: periodically simulate real-time new incoming orders or sync changes
    useEffect(() => {
        if (!isLive) return;
        
        const interval = setInterval(() => {
            const savedOrders = localStorage.getItem("adminOrders");
            if (savedOrders) {
                const parsed = JSON.parse(savedOrders) as Order[];
                const uniqueMock = DEFAULT_MOCK_ORDERS.filter(mock => !parsed.some(p => p.id === mock.id));
                setOrders(prev => {
                    const combined = [...parsed, ...uniqueMock];
                    if (combined.length > prev.length) {
                        showToast("تحديث حي: تم رصد واستلام طلب جديد بنجاح! 🔔✨", "success");
                    }
                    return combined;
                });
            }
        }, 15000);

        return () => clearInterval(interval);
    }, [isLive]);

    // Handle Premium Data Export
    const handleExportData = () => {
        setIsExporting(true);
        showToast("جاري إعداد واستخلاص التقرير الإداري الشامل... 📊", "success");
        
        setTimeout(() => {
            const headers = "رقم الطلب,العميل,الهاتف,المبلغ,حالة الدفع,حالة التوصيل,الوقت\n";
            const rows = orders.map(o => 
                `"${o.id}","${o.customerName}","${o.phone}",${o.amount},"${o.paymentStatus === 'paid' ? 'مدفوع' : o.paymentStatus === 'collected' ? 'محصل كاش' : 'الدفع عند الاستلام'}","${getStatusLabel(o.status)}","${o.time}"`
            ).join("\n");
            
            const blob = new Blob(["\ufeff" + headers + rows], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.setAttribute("href", url);
            link.setAttribute("download", `تقرير_مبيعات_faces_store_${new Date().toISOString().split('T')[0]}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            setIsExporting(false);
            showToast("تم تصدير وتنزيل التقرير المالي الموحد بنجاح! 🏆📂", "success");
        }, 1500);
    };

    // Calculate real-time high-end analytics metrics
    const totalSales = orders.reduce((sum, o) => {
        if (o.paymentStatus === 'paid' || o.paymentStatus === 'collected' || o.status === 'delivered') {
            return sum + o.amount;
        }
        return sum;
    }, 0);

    const pendingRevenue = orders.reduce((sum, o) => {
        if (o.paymentStatus === 'cod' && o.status !== 'delivered') {
            return sum + o.amount;
        }
        return sum;
    }, 0);

    const deliveredCount = orders.filter(o => o.status === 'delivered').length;
    const successRate = orders.length > 0 ? Math.round((deliveredCount / orders.length) * 100) : 0;
    const averageOrderValue = orders.length > 0 ? Math.round(orders.reduce((sum, o) => sum + o.amount, 0) / orders.length) : 0;

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
        const deliveryTimeText = order.estimatedDelivery ? `\n\n⏰ موعد التوصيل المتوقع:\n*${order.estimatedDelivery}*` : '';
        const text = `مرحباً يا أستاذ ${order.customerName} ✨\n\nيسعدنا إبلاغك بأن طلبك ذو الرقم *${order.id}* قد تغيرت حالته الآن إلى: *[${getStatusLabel(order.status)}]* 🚚.${deliveryTimeText}\n\n📦 محتويات الشحنة:\n${itemsList}\n\n📍 عنوان التوصيل:\n${order.address}\n\nنشكرك لاختيارك Balmy! ونأمل أن تنال عطورنا الفاخرة إعجابك. 🖤⚜️`;
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
                        مركز التحكم في الطلبات والمبيعات
                    </h1>
                </div>
                
                {/* Advanced Live Controls & Export Button */}
                <div className="flex flex-wrap items-center gap-3">
                    {/* Live indicator toggle button */}
                    <button
                        onClick={() => {
                            setIsLive(!isLive);
                            showToast(isLive ? "تم إيقاف المزامنة الحية للطلب 🛑" : "تم تفعيل البث المباشر للطلبات! 🟢 Live Sync Active", "success");
                        }}
                        className={cn(
                            "px-4 py-2.5 rounded-2xl text-[11px] font-black transition-all flex items-center gap-2 border select-none active:scale-95",
                            isLive 
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200/50 shadow-sm shadow-emerald-100" 
                                : "bg-gray-50 text-gray-500 border-gray-200"
                        )}
                    >
                        <span className="relative flex h-2 w-2">
                            {isLive && (
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            )}
                            <span className={cn("relative inline-flex rounded-full h-2 w-2", isLive ? "bg-emerald-500" : "bg-gray-400")}></span>
                        </span>
                        <span>{isLive ? "تحديث حي نشط" : "تفعيل المزامنة الحية"}</span>
                    </button>

                    {/* Export Action Button */}
                    <button
                        onClick={handleExportData}
                        disabled={isExporting}
                        className="px-4 py-2.5 rounded-2xl bg-black hover:bg-black/95 text-white text-[11px] font-black transition-all flex items-center gap-2 shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-50 select-none"
                    >
                        {isExporting ? (
                            <RefreshCw size={12} className="animate-spin text-yellow-500" />
                        ) : (
                            <FileSpreadsheet size={12} className="text-yellow-500" />
                        )}
                        <span>{isExporting ? "جاري التصدير..." : "تصدير التقرير المالي"}</span>
                    </button>
                </div>
            </div>

            {/* Master Analytics Grid Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* 1. Total Sales */}
                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#8c1d3b]/5 to-transparent rounded-bl-full group-hover:scale-110 transition-transform" />
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">إجمالي المبيعات المحصلة</span>
                            <h3 className="text-2xl font-black text-gray-900 mt-1.5">{totalSales.toLocaleString()} ريال</h3>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-[#8c1d3b]/5 border border-[#8c1d3b]/10 flex items-center justify-center text-[#8c1d3b] group-hover:scale-105 transition-transform">
                            <TrendingUp size={20} />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-1.5">
                        <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                            +12.5%
                        </span>
                        <span className="text-[9px] font-bold text-gray-400">مقارنة بالأسبوع الماضي</span>
                    </div>
                </div>

                {/* 2. Average Order Value */}
                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/5 to-transparent rounded-bl-full group-hover:scale-110 transition-transform" />
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">متوسط قيمة الطلب (AOV)</span>
                            <h3 className="text-2xl font-black text-gray-900 mt-1.5">{averageOrderValue.toLocaleString()} ريال</h3>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex items-center justify-center text-amber-600 group-hover:scale-105 transition-transform">
                            <Activity size={20} />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-1.5">
                        <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                            مستقر
                        </span>
                        <span className="text-[9px] font-bold text-gray-400">حجم السلة الشرائية ممتاز</span>
                    </div>
                </div>

                {/* 3. Pending Cash on Delivery */}
                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-orange-500/5 to-transparent rounded-bl-full group-hover:scale-110 transition-transform" />
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">بانتظار التحصيل (COD)</span>
                            <h3 className="text-2xl font-black text-orange-600 mt-1.5">{pendingRevenue.toLocaleString()} ريال</h3>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-orange-500/5 border border-orange-500/10 flex items-center justify-center text-orange-600 group-hover:scale-105 transition-transform">
                            <Clock size={20} />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-1.5">
                        <span className="text-[9px] font-bold text-gray-400">بانتظار تحصيل المندوبين نقداً</span>
                    </div>
                </div>

                {/* 4. Delivery Success Rate */}
                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-500/5 to-transparent rounded-bl-full group-hover:scale-110 transition-transform" />
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">معدل نجاح تسليم الطلبات</span>
                            <h3 className="text-2xl font-black text-emerald-600 mt-1.5">{successRate}%</h3>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform">
                            <CheckCircle2 size={20} />
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${successRate}%` }} />
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

            {/* Orders Table (Desktop only) */}
            <div className="hidden md:block bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden" ref={dropdownRef}>
                <div className="overflow-x-auto">
                    <table className="w-full text-right min-w-[950px]">
                        <thead>
                            <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-5">رقم الطلب</th>
                                <th className="px-6 py-5">العميل</th>
                                <th className="px-6 py-5">التوقيت</th>
                                <th className="px-6 py-5">المبلغ الإجمالي</th>
                                <th className="px-6 py-5">حالة الدفع </th>
                                <th className="px-6 py-5">حالة التوصيل </th>
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
                                        
                                        {/* Static Payment Status display */}
                                        <td className="px-6 py-5">
                                            <div className="inline-flex items-center select-none">
                                                {getPaymentBadge(order.paymentStatus)}
                                            </div>
                                        </td>

                                        {/* Static Fulfillment Status display */}
                                        <td className="px-6 py-5">
                                            <div className="inline-flex items-center select-none">
                                                <span className={cn(
                                                    "px-3 py-1.5 rounded-full text-[10px] font-black inline-block",
                                                    getStatusColor(order.status)
                                                )}>
                                                    {getStatusLabel(order.status)}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Actions quick shortcuts */}
                                        <td className="px-6 py-5 text-center" onClick={(e) => e.stopPropagation()}>
                                            <div className="flex gap-2 justify-center items-center">
                                                <button
                                                    onClick={() => setSelectedOrder(order)}
                                                    className="p-2 text-[#8c1d3b] bg-[#8c1d3b]/5 hover:bg-[#8c1d3b]/10 rounded-xl transition-all border border-[#8c1d3b]/10"
                                                    title="تعديل وتفاصيل الطلب"
                                                >
                                                    <Edit size={14} />
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

            {/* Orders Cards List (Mobile/Tablet only) */}
            <div className="md:hidden space-y-4">
                {filteredOrders.length === 0 ? (
                    <div className="bg-white rounded-[2rem] border border-gray-100 p-12 text-center text-gray-400 font-bold text-xs shadow-sm">
                        لم يتم العثور على أي طلبات مطابقة لخيارات البحث.
                    </div>
                ) : (
                    filteredOrders.map((order) => (
                        <div 
                            key={order.id} 
                            onClick={() => setSelectedOrder(order)}
                            className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm active:scale-[0.98] transition-all duration-300 flex flex-col gap-4 cursor-pointer"
                        >
                            {/* Card Header: Order ID & Date */}
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-black text-gray-900">{order.id}</span>
                                <span className="text-[10px] font-bold text-gray-400">{order.time}</span>
                            </div>

                            {/* Card Body: Customer details & Amount */}
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#8c1d3b]/5 text-[#8c1d3b] flex items-center justify-center font-black text-xs border border-[#8c1d3b]/10 shrink-0">
                                    {order.customerName[0]}
                                </div>
                                <div className="flex-grow">
                                    <p className="text-xs font-black text-gray-800">{order.customerName}</p>
                                    <p className="text-[10px] text-gray-400 font-bold mt-0.5">{order.phone}</p>
                                </div>
                                <div className="text-left shrink-0">
                                    <p className="text-[9px] font-bold text-gray-400">الإجمالي</p>
                                    <p className="text-xs font-black text-gray-900 mt-0.5">{order.amount.toLocaleString()} ر.س</p>
                                </div>
                            </div>

                            {/* Card Footer: Badges & Actions */}
                            <div className="flex justify-between items-center pt-3 border-t border-gray-50 flex-wrap gap-2">
                                <div className="flex gap-1.5 flex-wrap">
                                    <span className={cn(
                                        "px-2.5 py-1 rounded-full text-[9px] font-black inline-block",
                                        getStatusColor(order.status)
                                    )}>
                                        {getStatusLabel(order.status)}
                                    </span>
                                    <div className="inline-flex items-center">
                                        {getPaymentBadge(order.paymentStatus)}
                                    </div>
                                </div>

                                <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                                    <button
                                        onClick={() => setSelectedOrder(order)}
                                        className="p-2 text-[#8c1d3b] bg-[#8c1d3b]/5 hover:bg-[#8c1d3b]/10 rounded-xl transition-all border border-[#8c1d3b]/10"
                                        title="تعديل وتفاصيل الطلب"
                                    >
                                        <Edit size={14} />
                                    </button>
                                    <button
                                        onClick={() => deleteOrder(order.id)}
                                        className="p-2 text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition-all border border-red-100"
                                        title="حذف الطلب"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
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
                            <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col h-full min-h-full">
                                {/* Panel Header */}
                                <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-10">
                                    <button 
                                        type="button"
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
                                    
                                    {/* Immersive Order Progress Timeline Tracker */}
                                    <div className="bg-gradient-to-r from-gray-50 to-white p-5 rounded-[2rem] border border-gray-100/85 shadow-inner">
                                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-5 flex items-center justify-between">
                                            <span>الخط الزمني الفعلي لتتبع الشحن</span>
                                            <span className="text-[9px] bg-[#8c1d3b]/10 text-[#8c1d3b] px-2 py-0.5 rounded-full font-black">تحديث مباشر</span>
                                        </h4>
                                        <div className="relative flex items-center justify-between px-2">
                                            {/* Progress Track Line Background */}
                                            <div className="absolute left-6 right-6 top-[15px] h-1 z-0">
                                                 <div className="w-full h-full bg-gray-100 rounded-full" />
                                                 
                                                 {/* Active Progress Track Overlay Line */}
                                                 <div 
                                                     className="absolute right-0 top-0 h-full bg-gradient-to-l from-[#8c1d3b] to-emerald-500 rounded-full transition-all duration-700" 
                                                     style={{ 
                                                         width: formStatus === 'received' ? '0%' :
                                                                formStatus === 'preparing' ? '33.33%' :
                                                                formStatus === 'shipping' ? '66.66%' : '100%'
                                                     }}
                                                 />
                                             </div>
                                             
                                             {/* Step 1: Received */}
                                            <div className="flex flex-col items-center z-10">
                                                <div className={cn(
                                                    "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                                                    formStatus === 'received' || formStatus === 'preparing' || formStatus === 'shipping' || formStatus === 'delivered'
                                                        ? "bg-[#8c1d3b] border-[#8c1d3b] text-white shadow-lg shadow-[#8c1d3b]/20"
                                                        : "bg-white border-gray-200 text-gray-400"
                                                )}>
                                                    <Clock size={12} />
                                                </div>
                                                <span className="text-[9px] font-black text-gray-800 mt-2">تم الاستلام</span>
                                            </div>

                                            {/* Step 2: Preparing */}
                                            <div className="flex flex-col items-center z-10">
                                                <div className={cn(
                                                    "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                                                    formStatus === 'preparing' || formStatus === 'shipping' || formStatus === 'delivered'
                                                        ? "bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-600/20"
                                                        : "bg-white border-gray-200 text-gray-400"
                                                )}>
                                                    <Package size={12} />
                                                </div>
                                                <span className="text-[9px] font-black text-gray-800 mt-2">جاري التجهيز</span>
                                            </div>

                                            {/* Step 3: Shipping */}
                                            <div className="flex flex-col items-center z-10">
                                                <div className={cn(
                                                    "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                                                    formStatus === 'shipping' || formStatus === 'delivered'
                                                        ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20"
                                                        : "bg-white border-gray-200 text-gray-400"
                                                )}>
                                                    <RefreshCw size={12} className={formStatus === 'shipping' ? "animate-spin" : ""} />
                                                </div>
                                                <span className="text-[9px] font-black text-gray-800 mt-2">في الطريق</span>
                                            </div>

                                            {/* Step 4: Delivered */}
                                            <div className="flex flex-col items-center z-10">
                                                <div className={cn(
                                                    "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                                                    formStatus === 'delivered'
                                                        ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                                                        : "bg-white border-gray-200 text-gray-400"
                                                )}>
                                                    <Check size={12} />
                                                </div>
                                                <span className="text-[9px] font-black text-gray-800 mt-2">تم التوصيل</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status Control Dashboard */}
                                    <div className="bg-gray-50 p-5 rounded-[2rem] border border-gray-100">
                                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-4">التحكم الفوري والسريع في حالة التوصيل</h4>
                                        
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setValue("status", 'received')}
                                                className={cn(
                                                    "py-2.5 px-1 rounded-xl text-[10px] font-black border transition-all flex flex-col items-center justify-center gap-1.5",
                                                    formStatus === 'received' 
                                                        ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/10' 
                                                        : 'bg-white text-gray-600 border-gray-100 hover:border-gray-200'
                                                )}
                                            >
                                                <Clock size={14} />
                                                <span>تم الاستلام</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setValue("status", 'preparing')}
                                                className={cn(
                                                    "py-2.5 px-1 rounded-xl text-[10px] font-black border transition-all flex flex-col items-center justify-center gap-1.5",
                                                    formStatus === 'preparing' 
                                                        ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/10' 
                                                        : 'bg-white text-gray-600 border-gray-100 hover:border-gray-200'
                                                )}
                                            >
                                                <Package size={14} />
                                                <span>جاري التجهيز</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setValue("status", 'shipping')}
                                                className={cn(
                                                    "py-2.5 px-1 rounded-xl text-[10px] font-black border transition-all flex flex-col items-center justify-center gap-1.5",
                                                    formStatus === 'shipping' 
                                                        ? 'bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-600/10' 
                                                        : 'bg-white text-gray-600 border-gray-100 hover:border-gray-200'
                                                )}
                                            >
                                                <RefreshCw size={14} className={formStatus === 'shipping' ? "animate-spin" : ""} />
                                                <span>في الطريق</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setValue("status", 'delivered')}
                                                className={cn(
                                                    "py-2.5 px-1 rounded-xl text-[10px] font-black border transition-all flex flex-col items-center justify-center gap-1.5",
                                                    formStatus === 'delivered' 
                                                        ? 'bg-green-600 text-white border-green-600 shadow-md shadow-green-600/10' 
                                                        : 'bg-white text-gray-600 border-gray-100 hover:border-gray-200'
                                                )}
                                            >
                                                <Check size={14} />
                                                <span>تم التوصيل</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Estimated Delivery Time Input (Scheduled Delivery Time Picker) */}
                                    <AnimatePresence>
                                        {formStatus !== 'delivered' && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="bg-gradient-to-br from-[#8c1d3b]/5 via-white to-gray-50/50 p-5 rounded-[2rem] border border-[#8c1d3b]/10 space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <h4 className="text-xs font-black text-[#8c1d3b] uppercase tracking-wider flex items-center gap-2">
                                                            <Clock size={14} className="animate-pulse" />
                                                            <span>تحديد موعد التوصيل المتوقع بدقة</span>
                                                        </h4>
                                                        <span className="text-[9px] font-black text-gray-400">يظهر للعميل في صفحة التتبع</span>
                                                    </div>

                                                    {/* Day Selector Preset */}
                                                    <div className="space-y-1.5">
                                                        <label className="text-[9px] font-black text-gray-400 uppercase">1. اختر يوم التوصيل المفضل:</label>
                                                        <div className="grid grid-cols-3 gap-2">
                                                            {[
                                                                { label: "اليوم 📅", value: "اليوم" },
                                                                { label: "غداً 🌅", value: "غداً" },
                                                                { label: "بعد غد 📦", value: "بعد غد" }
                                                            ].map((day) => {
                                                                const isActive = formEstimatedDelivery.startsWith(day.value);
                                                                return (
                                                                    <button
                                                                        key={day.value}
                                                                        type="button"
                                                                        onClick={() => {
                                                                            // Get current time slot part if exists
                                                                            const parts = formEstimatedDelivery.split(" - ");
                                                                            const timeSlot = parts.length > 1 ? parts[1] : "خلال ساعتين ⚡";
                                                                            setValue("estimatedDelivery", `${day.value} - ${timeSlot}`);
                                                                        }}
                                                                        className={cn(
                                                                            "py-2 px-3 rounded-xl text-[10px] font-black border transition-all text-center select-none active:scale-95",
                                                                            isActive
                                                                                ? "bg-black text-white border-black shadow-md"
                                                                                : "bg-white text-gray-600 border-gray-100 hover:border-gray-200"
                                                                        )}
                                                                    >
                                                                        {day.label}
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>

                                                    {/* Hour / Time Slot Selector Preset */}
                                                    <div className="space-y-1.5">
                                                        <label className="text-[9px] font-black text-gray-400 uppercase">2. حدد فترة التوصيل المناسبة:</label>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            {[
                                                                { label: "تسليم فوري (خلال ساعتين) ⚡", value: "خلال ساعتين ⚡" },
                                                                { label: "الفترة الصباحية (9ص - 12م) ☀️", value: "من 9ص إلى 12م ☀️" },
                                                                { label: "فترة الظهيرة (12م - 4م) 🌤️", value: "من 12م إلى 4م 🌤️" },
                                                                { label: "الفترة المسائية (4م - 9م) 🌙", value: "من 4م إلى 9م 🌙" }
                                                            ].map((time) => {
                                                                const isActive = formEstimatedDelivery.includes(time.value);
                                                                return (
                                                                    <button
                                                                        key={time.value}
                                                                        type="button"
                                                                        onClick={() => {
                                                                            // Get current day part
                                                                            const parts = formEstimatedDelivery.split(" - ");
                                                                            const dayPart = parts.length > 0 && ["اليوم", "غداً", "بعد غد"].includes(parts[0]) ? parts[0] : "اليوم";
                                                                            setValue("estimatedDelivery", `${dayPart} - ${time.value}`);
                                                                        }}
                                                                        className={cn(
                                                                            "py-2 px-3 rounded-xl text-[10px] font-black border transition-all text-center select-none active:scale-95 leading-relaxed",
                                                                            isActive
                                                                                ? "bg-[#8c1d3b] text-white border-[#8c1d3b] shadow-md shadow-[#8c1d3b]/10"
                                                                                : "bg-white text-gray-600 border-gray-100 hover:border-gray-200"
                                                                        )}
                                                                    >
                                                                        {time.label}
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>

                                                    {/* Custom text field input */}
                                                    <div className="space-y-1.5 pt-1">
                                                        <label className="text-[9px] font-black text-gray-400 uppercase">أو كتابة موعد مخصص بدقة:</label>
                                                        <div className="relative">
                                                            <input
                                                                type="text"
                                                                {...register("estimatedDelivery")}
                                                                placeholder="مثال: غداً الساعة 4 عصراً"
                                                                className="w-full bg-white border border-gray-200 focus:border-black focus:ring-4 focus:ring-black/5 rounded-xl py-3 px-4 text-xs font-black outline-none transition-all text-right"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    
                                                                        {/* Status Control: Payment status dashboard */}
                                    <div className="bg-gray-50 p-5 rounded-[2rem] border border-gray-100">
                                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-4">التحكم الفوري في حالة الدفع والمعاملات</h4>
                                        <div className="grid grid-cols-3 gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setValue("paymentStatus", 'paid')}
                                                className={cn(
                                                    "py-3 rounded-xl text-[10px] font-black border transition-all flex flex-col items-center gap-1",
                                                    formPaymentStatus === 'paid' 
                                                        ? 'bg-green-600 text-white border-green-600' 
                                                        : 'bg-white text-gray-600 border-gray-100'
                                                )}
                                            >
                                                <CreditCard size={14} />
                                                <span>مدفوع إلكترونياً</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setValue("paymentStatus", 'collected')}
                                                className={cn(
                                                    "py-3 rounded-xl text-[10px] font-black border transition-all flex flex-col items-center gap-1",
                                                    formPaymentStatus === 'collected' 
                                                        ? 'bg-emerald-600 text-white border-emerald-600' 
                                                        : 'bg-white text-gray-600 border-gray-100'
                                                )}
                                            >
                                                <DollarSign size={14} />
                                                <span>تم التحصيل نقداً</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setValue("paymentStatus", 'cod')}
                                                className={cn(
                                                    "py-3 rounded-xl text-[10px] font-black border transition-all flex flex-col items-center gap-1",
                                                    formPaymentStatus === 'cod' 
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
                                <div className="p-6 border-t border-gray-100 bg-white flex flex-col gap-3 sticky bottom-0 z-10">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-[#8c1d3b] text-white py-4 rounded-2xl font-black text-xs hover:bg-[#8c1d3b]/95 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 select-none"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <RefreshCw className="animate-spin w-4 h-4" />
                                                <span>جاري تحديث    ...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Save size={14} />
                                                <span>حفظ التعديلات    </span>
                                            </>
                                        )}
                                    </button>
                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() => handleWhatsAppAlert(selectedOrder)}
                                            className="flex-1 bg-green-50 text-green-600 py-3.5 rounded-xl font-bold text-xs hover:bg-green-100 transition-colors border border-green-100 flex items-center justify-center gap-1.5"
                                        >
                                            <Send size={14} />
                                            <span>إشعار واتساب</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handlePrintReceipt(selectedOrder)}
                                            className="flex-1 bg-gray-50 text-gray-600 py-3.5 rounded-xl font-bold text-xs hover:bg-gray-100 transition-colors border border-gray-200 flex items-center justify-center gap-1.5"
                                        >
                                            <Printer size={14} />
                                            <span>طباعة الفاتورة</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => deleteOrder(selectedOrder.id)}
                                            className="flex-1 bg-red-50 text-red-500 py-3.5 rounded-xl font-bold text-xs hover:bg-red-100 transition-colors"
                                        >
                                            حذف الطلب
                                        </button>
                                    </div>
                                </div>
                            </form>
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
