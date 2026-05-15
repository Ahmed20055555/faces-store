"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Package, Truck, CheckCircle2, Droplets, MapPin, Search, Clock, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import OrderConfirmation from '@/components/OrderConfirmation';

const TRACKING_STEPS = [
    {
        id: 1,
        title: "تم استلام الطلب",
        scentText: "عطرك اتسجل عندنا... وبدأنا الحكاية",
        icon: Package,
        time: "الآن",
    },
    {
        id: 2,
        title: "جاري التجهيز",
        scentText: "عطرك بيتحضرلك بكل عناية... بنغلفه بشغف",
        icon: Droplets,
        time: "خلال 5 دقائق",
    },
    {
        id: 3,
        title: "في الطريق",
        scentText: "عطرك في الطريق ليك... جهز نفسك للتجربة",
        icon: Truck,
        time: "خلال 15 دقيقة",
    },
    {
        id: 4,
        title: "تم التوصيل",
        scentText: "عطرك على الباب! استمتع برائحتك الجديدة",
        icon: CheckCircle2,
        time: "قريباً",
    }
];

export default function TrackOrderPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [showCinematic, setShowCinematic] = useState(false);
    const orderNumber = "BALMY-51732";

    useEffect(() => {
        // Auto-progress for demo
        const timer2 = setTimeout(() => setCurrentStep(2), 2000);
        const timer3 = setTimeout(() => setCurrentStep(3), 5000);
        return () => { clearTimeout(timer2); clearTimeout(timer3); };
    }, []);

    // Mock data for the cinematic experience
    const orderData = {
        customerName: "أحمد محمد",
        orderId: orderNumber,
        productName: "Balmy Noir",
        productImage: null,
        collection: "black" as const
    };

    return (
        <div className="min-h-screen flex flex-col font-tajawal dir-rtl bg-gray-50 overflow-x-hidden">
            {/* Cinematic Hero - Fixed and covering everything when active */}
            {showCinematic && (
                <div className="fixed inset-0 z-[9999] animate-in fade-in duration-700">
                    <OrderConfirmation
                        customerName={orderData.customerName}
                        orderId={orderData.orderId}
                        productName={orderData.productName}
                        productImage={orderData.productImage}
                        collection={orderData.collection}
                        onClose={() => setShowCinematic(false)}
                    />
                    {/* Absolute Close for safety */}
                    <button
                        onClick={() => setShowCinematic(false)}
                        className="absolute top-8 left-8 z-[10001] bg-white/10 hover:bg-white/20 text-white w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-xl border border-white/10 transition-all active:scale-90"
                    >
                        <Search size={20} className="rotate-45" />
                    </button>
                </div>
            )}

            <Navbar />

            <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-4 md:py-8 flex flex-col items-center">

                {/* Header */}
                <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="w-16 h-16 bg-[#12b76a]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-8 h-8 text-[#12b76a]" strokeWidth={2.5} />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-[#2B3440] mb-3">تم تأكيد طلبك بنجاح!</h1>
                    <p className="text-gray-500 text-lg max-w-lg mx-auto mb-6">
                        طلبك في الطريق ليك... تابع حالة طلبك هنا.
                    </p>

                    <div className="flex flex-col items-center gap-6 bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 max-w-sm mx-auto">
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">رقم الطلب</span>
                            <span className="text-xl font-black tracking-widest text-black dir-ltr">
                                {orderNumber}
                            </span>
                        </div>

                        <button
                            onClick={() => setShowCinematic(true)}
                            className="w-full flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-2xl font-black text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-black/10 group"
                        >
                            <span>شاهد العرض السينمائي لزجاجتك</span>
                            <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
                                <Search size={14} className="text-white" />
                            </div>
                        </button>
                    </div>
                </div>

                {/* Tracking Card */}
                <div className="w-full bg-white rounded-[2rem] p-8 md:p-12 shadow-xl shadow-black/[0.02] border border-gray-50 relative overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#8c1d3b]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                    <div className="mb-12 text-center relative z-10">
                        <h2 className="text-2xl font-black text-[#8c1d3b]">
                            {TRACKING_STEPS[currentStep - 1]?.scentText}
                        </h2>
                    </div>

                    {/* Vertical Timeline for Mobile, Horizontal for Desktop */}
                    <div className="relative z-10 flex flex-col md:flex-row justify-between mt-16 md:mt-24 gap-8 md:gap-0">

                        {/* Desktop Progress Line */}
                        <div className="hidden md:block absolute top-6 left-[10%] right-[10%] h-0.5 bg-gray-100 -z-10">
                            <div
                                className="bg-[#8c1d3b] h-full transition-all duration-1000 ease-in-out"
                                style={{
                                    width: `${((currentStep - 1) / (TRACKING_STEPS.length - 1)) * 100}%`
                                }}
                            ></div>
                        </div>

                        {TRACKING_STEPS.map((step) => {
                            const isActive = step.id === currentStep;
                            const isPassed = step.id < currentStep;

                            return (
                                <div key={step.id} className="flex md:flex-col items-center gap-4 md:gap-4 relative">

                                    {/* Mobile Progress Line segment */}
                                    <div className="md:hidden absolute right-6 top-12 bottom-[-2rem] w-0.5 bg-gray-100 -z-10">
                                        {(isActive || isPassed) && (
                                            <div className="bg-[#8c1d3b] w-full h-full transition-all duration-1000"></div>
                                        )}
                                    </div>

                                    {/* Icon Circle */}
                                    <div
                                        className={cn(
                                            "w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-700 z-10 border-4",
                                            isActive ? "bg-[#8c1d3b] text-white border-white shadow-[0_0_0_4px_#8c1d3b30] scale-110" :
                                                isPassed ? "bg-[#8c1d3b] text-white border-white" :
                                                    "bg-white text-gray-300 border-gray-100"
                                        )}
                                    >
                                        <step.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                    </div>

                                    {/* Text Content */}
                                    <div className={cn(
                                        "flex flex-col md:items-center text-right md:text-center transition-all duration-700",
                                        isActive ? "opacity-100 transform translate-x-0" :
                                            isPassed ? "opacity-60" : "opacity-30"
                                    )}>
                                        <h3 className={cn("font-black text-lg mb-1", isActive ? "text-[#8c1d3b]" : "text-gray-800")}>
                                            {step.title}
                                        </h3>
                                        <span className={cn("text-[12px] font-bold", isActive ? "text-[#8c1d3b]/70" : "text-gray-400")}>
                                            {step.time}
                                        </span>
                                        {isActive && (
                                            <p className="text-sm font-bold text-gray-500 animate-in fade-in duration-500 max-w-[200px] mt-1">
                                                {step.scentText}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Current Status Detail */}
                    {currentStep === 3 && (
                        <div className="mt-16 bg-[#fcf8f9] rounded-2xl p-6 flex items-start gap-4 border border-[#8c1d3b]/10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-[#8c1d3b]/10 p-3 rounded-full text-[#8c1d3b] shrink-0">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-[#2B3440] mb-1">المندوب في الطريق</h4>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    عطرك دلوقتي مع المندوب وفي طريقه لعنوانك. هيتم التواصل معاك قريباً على رقم الموبايل المسجل.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Order Summary Card */}
                <div className="w-full bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
                    <h3 className="font-black text-[18px] text-gray-900 mb-4 text-right">تفاصيل الطلب</h3>
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center text-[14px] py-2 border-b border-gray-50">
                            <span className="text-gray-800 font-bold dir-ltr">{orderNumber}</span>
                            <span className="text-gray-500 font-bold">رقم الطلب</span>
                        </div>
                        <div className="flex justify-between items-center text-[14px] py-2 border-b border-gray-50">
                            <span className="text-gray-800 font-bold">توصيل سريع</span>
                            <span className="text-gray-500 font-bold">طريقة التوصيل</span>
                        </div>
                        <div className="flex justify-between items-center text-[14px] py-2 border-b border-gray-50">
                            <span className="text-gray-800 font-bold">الدفع عند الاستلام</span>
                            <span className="text-gray-500 font-bold">طريقة الدفع</span>
                        </div>
                        <div className="flex justify-between items-center text-[14px] py-2">
                            <span className="text-[#8c1d3b] font-black text-[16px]">598 ريال</span>
                            <span className="text-gray-500 font-bold">الإجمالي</span>
                        </div>
                    </div>
                </div>

                {/* Help Section */}
                <div className="w-full flex flex-col sm:flex-row gap-4 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-700">
                    <a href="tel:+966500000000" className="flex-1 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4 hover:border-[#8c1d3b]/30 transition-colors cursor-pointer">
                        <div className="bg-[#8c1d3b]/10 p-3 rounded-full text-[#8c1d3b] shrink-0">
                            <Phone size={20} />
                        </div>
                        <div className="text-right">
                            <h4 className="font-bold text-gray-900 text-[14px]">تواصل معانا</h4>
                            <p className="text-[12px] text-gray-500">لو محتاج أي مساعدة</p>
                        </div>
                    </a>
                </div>

            </main>

            <Footer />
        </div>
    );
}
