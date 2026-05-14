'use client';

import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { removeItem, updateQuantity } from '@/lib/features/cartSlice';
import { ShoppingBag, Trash2, Minus, Plus, Gift, Tag, ChevronDown, CheckCircle2, ShieldCheck, HelpCircle, ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from '@/lib/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useRouter } from 'next/navigation';

export default function CartPage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { items } = useSelector((state: RootState) => state.cart);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

    return (
        <main className="min-h-screen bg-[#faf9f8]" dir="rtl">
            <Navbar isSticky={true} />

            <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-10 font-sans">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                    <h1 className="text-[32px] md:text-[40px] font-black text-gray-900">عربتك ({totalItems})</h1>
                    <Link href="/" className="flex items-center gap-2 text-[15px] font-bold text-[#8c1d3b] hover:underline transition-all">
                        <ChevronRight className="w-4 h-4" />
                        <span>مواصلة التسوق</span>
                    </Link>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    
                    {/* Right Column: Items (Main Content - Right in RTL) */}
                    <div className="flex-1 w-full flex flex-col gap-6 order-1">
                        {items.length === 0 ? (
                            <div className="bg-white p-20 rounded-sm border border-gray-100 flex flex-col items-center gap-6 shadow-sm">
                                <ShoppingBag className="w-24 h-24 text-gray-100" strokeWidth={1} />
                                <h2 className="text-xl font-bold text-gray-400">عربتك فارغة حالياً</h2>
                                <a href="/" className="bg-black text-white px-12 py-4 rounded-sm font-black transition-transform active:scale-95">استمر في التسوق</a>
                            </div>
                        ) : (
                            <>
                                {/* Items List */}
                                <div className="flex flex-col gap-4">
                                    {items.map((item) => (
                                        <div key={item.id} className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm relative flex flex-col md:flex-row gap-6">
                                            <Link href={`/product/${item.id}`} className="w-full md:w-40 h-48 bg-gray-50 rounded-sm p-4 shrink-0 block">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                                            </Link>
                                            
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div className="flex justify-between items-start">
                                                    <Link href={`/product/${item.id}`} className="text-right hover:opacity-80 transition-opacity flex-1">
                                                        <span className="text-[15px] font-black text-gray-900 block mb-1">{item.brand}</span>
                                                        <h3 className="text-[17px] font-bold text-gray-600 mb-2 leading-tight">{item.name}</h3>
                                                        <p className="text-[13px] text-gray-400">الحجم: 100ml</p>
                                                    </Link>
                                                    <div className="text-left flex flex-col items-end">
                                                        <span className="text-[20px] font-black text-gray-900 whitespace-nowrap">{item.price} ريال</span>
                                                        <span className="text-[11px] text-gray-400 font-bold mt-1">تم بيعها من قبل فيسز</span>
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap items-center justify-between mt-6 gap-4">
                                                    <div className="bg-gray-100 text-[11px] font-bold px-3 py-1.5 rounded-sm">وصل حديثاً</div>
                                                    
                                                    <div className="flex items-center gap-6">
                                                        <div className="flex items-center border border-gray-200 rounded-sm overflow-hidden h-10">
                                                            <button 
                                                                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                                                                className="px-3 hover:bg-gray-50"
                                                            >
                                                                <Plus className="w-4 h-4" />
                                                            </button>
                                                            <span className="w-10 text-center font-black">{item.quantity}</span>
                                                            <button 
                                                                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                                                                className="px-3 hover:bg-gray-50"
                                                            >
                                                                <Minus className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                        <button 
                                                            onClick={() => dispatch(removeItem(item.id))}
                                                            className="text-gray-400 hover:text-red-600 p-2"
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Gift Checkbox Section */}
                                <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <HelpCircle className="w-5 h-5 text-gray-400" />
                                        <span className="text-[16px] font-black text-gray-900">هذا الطلب هدية</span>
                                    </div>
                                    <div className="w-6 h-6 border-2 border-gray-200 rounded-md cursor-pointer flex items-center justify-center">
                                        <div className="w-3 h-3 bg-white"></div>
                                    </div>
                                </div>

                                {/* Choose Gift Section */}
                                <div className="bg-white p-8 rounded-sm border border-gray-100 shadow-sm">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                                        <h3 className="text-[20px] font-black text-gray-900">اختر هديتك - 0 / 3 عينة مختارة</h3>
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <ChevronDown className="w-5 h-5" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                                        {[
                                            { brand: "جيرلان", name: "مجاناً جيرلان أبسولو", image: "/001717728336_1.jpg" },
                                            { brand: "إيسي مياكي", name: "مجاناً ايسي مياكي عطر", image: "/001717728336_1.jpg" },
                                            { brand: "باور اوف يو", name: "مجاناً باور اوف يو 1.5 مل", image: "/001717728336_1.jpg" },
                                            { brand: "ميو ميو", name: "مجاناً عطر ميو ميو", image: "/001717728336_1.jpg" },
                                            { brand: "فالنتينو", name: "مجاناً عطر دونا بورن", image: "/001717728336_1.jpg" },
                                            { brand: "فالنتينو", name: "مجاناً عطر دونا بورن ريوايت", image: "/001717728336_1.jpg" },
                                        ].map((gift, idx) => (
                                            <div key={idx} className="flex flex-col items-center gap-3 text-center group">
                                                <div className="aspect-square w-full bg-gray-50 rounded-sm p-4 overflow-hidden relative">
                                                    <img src={gift.image} alt={gift.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform" />
                                                </div>
                                                <p className="text-[11px] font-bold text-gray-600 line-clamp-2 min-h-[32px] leading-tight">{gift.name}</p>
                                                <button className="w-full border border-black py-2 text-[13px] font-black rounded-sm hover:bg-black hover:text-white transition-all">أضف</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Left Column: Sidebar Summary (Secondary Content - Left in RTL) */}
                    <div className="w-full lg:w-[380px] shrink-0 flex flex-col gap-6 order-2">
                        <div className="bg-white rounded-sm border border-gray-200 overflow-hidden shadow-sm">
                            <Accordion className="w-full">
                                <AccordionItem value="promo" className="border-b">
                                    <AccordionTrigger className="px-6 py-4 hover:no-underline font-black text-gray-900">
                                        <div className="flex items-center gap-3">
                                            <Tag className="w-5 h-5 text-gray-400 rotate-90" />
                                            <span>هل لديك كود خصم؟</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-6 pb-6 pt-2">
                                        <div className="flex gap-2">
                                            <input type="text" placeholder="ادخل الكود" className="flex-1 border p-2 rounded-sm outline-none focus:border-black" />
                                            <button className="bg-black text-white px-4 py-2 rounded-sm font-bold">تطبيق</button>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="qitaf" className="border-b">
                                    <AccordionTrigger className="px-6 py-4 hover:no-underline font-black text-gray-900">
                                         <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-[8px] font-bold text-[#8c1d3b]">FACES</div>
                                            <span>قطاف</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-6 pb-6 pt-2">
                                        سجل دخولك لاستبدال نقاط قطاف.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>

                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 bg-[#8c1d3b] text-white flex items-center justify-center font-bold text-[10px] rounded-sm">M</div>
                                        <span className="text-[14px] font-black text-gray-900">استبدل نقاط ميوز</span>
                                    </div>
                                </div>
                                <p className="text-[12px] text-gray-500 mb-4 leading-relaxed">
                                    اكسب 3587 نقاط ( <span className="font-bold text-black font-sans">35.87 ريال</span> ) من هذا الطلب.
                                    <br />
                                    <span className="text-[#8c1d3b] font-bold cursor-pointer hover:underline">انضم إلى ميوز أو اربط حسابك</span> لجمع واسترداد النقاط (يستغرق 60 ثانية)
                                </p>

                                <div className="border-t pt-6 flex flex-col gap-4">
                                    <div className="flex justify-between items-center text-[14px] text-gray-500 font-bold">
                                        <span>المجموع الجزئي</span>
                                        <span className="font-sans text-black">{subtotal.toLocaleString()} ريال</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[14px] text-gray-500 font-bold">
                                        <div className="flex items-center gap-1">
                                            <span>التوصيل</span>
                                            <HelpCircle className="w-4 h-4" />
                                        </div>
                                        <span className="text-gray-400">مجاناً</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2">
                                        <div className="flex flex-col items-start">
                                            <span className="text-[18px] font-black text-gray-900">إجمالي</span>
                                            <span className="text-[10px] text-gray-400">(شامل ضريبة القيمة المضافة بنسبة 15%)</span>
                                        </div>
                                        <span className="text-[24px] font-black text-gray-900 font-sans">{subtotal.toLocaleString()} ريال</span>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => router.push('/checkout/info')}
                                    className="w-full bg-[#8c1d3b] text-white py-4 mt-8 rounded-sm font-black text-[18px] flex items-center justify-center gap-3 hover:bg-[#7a1934] transition-all shadow-lg shadow-[#8c1d3b]/10"
                                >
                                    <ShieldCheck className="w-6 h-6" />
                                    الدفع الآمن
                                </button>

                                <div className="mt-8">
                                    <div className="flex items-center justify-center gap-3 flex-wrap opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
                                        <div className="bg-white border rounded-sm px-1.5 py-0.5"><img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" alt="Apple Pay" className="h-4" /></div>
                                        <div className="bg-white border rounded-sm px-1.5 py-0.5"><img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Mada_Logo.svg" alt="Mada" className="h-4" /></div>
                                        <div className="bg-white border rounded-sm px-1.5 py-0.5"><img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4" /></div>
                                        <div className="bg-white border rounded-sm px-1.5 py-0.5"><img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" /></div>
                                        <div className="bg-[#12b76a] text-white text-[10px] font-bold px-2 py-1 rounded-sm">tamara</div>
                                        <div className="bg-[#00FFAA] text-black text-[10px] font-bold px-2 py-1 rounded-sm">tabby</div>
                                    </div>
                                </div>
                                <p className="text-center text-[12px] text-gray-400 mt-6 font-bold">لديك أي استفسار؟ <a href="#" className="underline">تواصل معنا هنا.</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
