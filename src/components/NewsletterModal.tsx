'use client';

import React, { useState, useEffect } from 'react';
import { X, Mail, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function NewsletterModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    useEffect(() => {
        const hasSeen = localStorage.getItem('balmy-newsletter-seen');
        if (!hasSeen) {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        localStorage.setItem('balmy-newsletter-seen', 'true');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        setTimeout(() => {
            setStatus('success');
            setTimeout(handleClose, 2000);
        }, 1500);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-500" dir="rtl">
            <div className="relative bg-white max-w-[850px] w-full rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl animate-in zoom-in-95 duration-500">

                {/* Left Side: Image */}
                <div className="hidden md:block w-1/2 relative">
                    <img
                        src="/DK-SUB-Skincare_UAE-1.avif"
                        alt="Newsletter"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-8 right-8 text-white">
                        <h3 className="text-2xl font-black mb-2">انضمي إلينا</h3>
                        <p className="text-sm opacity-90">اكتشفي أحدث صيحات الجمال والعروض الحصرية</p>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center text-center">
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="w-16 h-16 bg-[#8c1d3b]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#8c1d3b]">
                        <Mail className="w-8 h-8" />
                    </div>

                    {status === 'success' ? (
                        <div className="animate-in zoom-in duration-500">
                            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                            <h2 className="text-2xl font-black text-gray-900 mb-2">شكراً لانضمامك!</h2>
                            <p className="text-gray-500">تم تسجيل بريدك بنجاح، ترقبي مفاجآتنا.</p>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 tracking-tight">احصلي على خصم 15%</h2>
                            <p className="text-gray-500 mb-8 leading-relaxed">
                                اشتركي في نشرتنا الإخبارية وكوني أول من يعرف عن المنتجات الجديدة والعروض الحصرية، واحصلي على خصم فوري على طلبك القادم.
                            </p>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                                <input
                                    type="email"
                                    required
                                    placeholder="بريدك الإلكتروني"
                                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-[#8c1d3b] focus:bg-white transition-all text-center md:text-right"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button
                                    disabled={status === 'submitting'}
                                    className="w-full bg-black text-white py-4 rounded-xl font-black text-[15px] hover:bg-[#8c1d3b] transition-all duration-300 disabled:opacity-50"
                                >
                                    {status === 'submitting' ? 'جاري التسجيل...' : 'اشتركي الآن'}
                                </button>
                            </form>
                            <p className="text-[11px] text-gray-400 mt-6 font-bold uppercase tracking-widest">لا تقلقي، نحن لا نرسل رسائل مزعجة</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
