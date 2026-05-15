"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import BottleFillAnimation from '@/components/BottleFillAnimation';
import { Package, Truck, CheckCircle2, Clock } from 'lucide-react';

export default function TrackPage() {
    const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

    const steps = [
        { id: 1, title: 'تم استلام الطلب', icon: Clock, time: '10:30 AM' },
        { id: 2, title: 'جاري التجهيز', icon: Package, time: '11:15 AM' },
        { id: 3, title: 'في الطريق', icon: Truck, time: '1:45 PM' },
        { id: 4, title: 'تم التوصيل', icon: CheckCircle2, time: '---' }
    ];

    return (
        <main className="min-h-screen bg-white" dir="rtl">
            <Navbar />
            
            <div className="max-w-2xl mx-auto pt-32 px-6 pb-20">
                <header className="mb-12 text-center">
                    <h1 className="text-3xl font-bold mb-4 tracking-tight">تتبع طلبك</h1>
                    <p className="text-gray-500">رقم الطلب: #BLM-992384</p>
                </header>

                {/* Tracking Timeline */}
                <div className="relative space-y-12">
                    {/* Progress Line */}
                    <div className="absolute top-0 right-[23px] bottom-0 w-[2px] bg-gray-100 z-0">
                        <div 
                            className="absolute top-0 right-0 w-full bg-black transition-all duration-1000"
                            style={{ height: `${((step - 1) / 3) * 100}%` }}
                        />
                    </div>

                    {steps.map((s) => {
                        const Icon = s.icon;
                        const isActive = step >= s.id;
                        
                        return (
                            <div key={s.id} className="relative z-10 flex items-start gap-6 group">
                                <div className={`
                                    w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors duration-500
                                    ${isActive ? 'bg-black border-black text-white' : 'bg-white border-gray-100 text-gray-300'}
                                `}>
                                    <Icon size={20} />
                                </div>
                                
                                <div className="flex-1 pt-1">
                                    <h3 className={`font-bold transition-colors duration-500 ${isActive ? 'text-black' : 'text-gray-300'}`}>
                                        {s.title}
                                    </h3>
                                    <p className={`text-sm transition-colors duration-500 ${isActive ? 'text-gray-500' : 'text-gray-200'}`}>
                                        {s.time}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Control Panel (For demo) */}
                <div className="mt-20 p-8 border border-gray-100 rounded-2xl bg-gray-50/50">
                    <h4 className="text-sm font-bold mb-6 text-center uppercase tracking-widest text-gray-400">تحديث الحالة (للتجربة)</h4>
                    <div className="grid grid-cols-4 gap-3">
                        {[1, 2, 3, 4].map((i) => (
                            <button
                                key={i}
                                onClick={() => setStep(i as any)}
                                className={`
                                    py-3 text-sm font-bold rounded-xl transition-all
                                    ${step === i ? 'bg-black text-white shadow-xl scale-105' : 'bg-white text-gray-400 border border-gray-100 hover:border-gray-300'}
                                `}
                            >
                                الخطوة {i}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* The Bottle Animation Component */}
            <BottleFillAnimation currentStep={step} orderComplete={step === 4} />
        </main>
    );
}
