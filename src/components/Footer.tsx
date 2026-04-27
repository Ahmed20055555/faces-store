"use client";

import React from 'react';
import { Instagram, Facebook, Twitter, Youtube, Share2, Globe, Send } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black text-white pt-16 pb-8 font-cairo">
            <div className="max-w-[1440px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {/* About */}
                <div className="text-right">
                    <h1 className="text-3xl font-black tracking-widest mb-6">FACES</h1>
                    <p className="text-sm text-gray-400 leading-relaxed mb-6">
                        وجهتك الأولى للتسوق الإلكتروني لمواد التجميل والعطور في الشرق الأوسط. نحن نوفر لك أفضل الماركات العالمية بضمان 100%.
                    </p>
                    <div className="flex gap-4 justify-start flex-row-reverse">
                        <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition-all text-[10px] font-bold">IG</div>
                        <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition-all text-[10px] font-bold">FB</div>
                        <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition-all text-[10px] font-bold">TW</div>
                        <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition-all text-[10px] font-bold">YT</div>
                    </div>
                </div>

                {/* Links 1 */}
                <div className="text-right">
                    <h4 className="font-bold text-sm uppercase tracking-widest mb-6">خدمة العملاء</h4>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li className="hover:text-white cursor-pointer transition-colors">تتبع طلبك</li>
                        <li className="hover:text-white cursor-pointer transition-colors">الشحن والتوصيل</li>
                        <li className="hover:text-white cursor-pointer transition-colors">سياسة الاسترجاع</li>
                        <li className="hover:text-white cursor-pointer transition-colors">الأسئلة الشائعة</li>
                    </ul>
                </div>

                {/* Links 2 */}
                <div className="text-right">
                    <h4 className="font-bold text-sm uppercase tracking-widest mb-6">عن وجوه</h4>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li className="hover:text-white cursor-pointer transition-colors">من نحن</li>
                        <li className="hover:text-white cursor-pointer transition-colors">مواقع المتاجر</li>
                        <li className="hover:text-white cursor-pointer transition-colors">برنامج المكافآت</li>
                        <li className="hover:text-white cursor-pointer transition-colors">انضم إلينا</li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div className="text-right">
                    <h4 className="font-bold text-sm uppercase tracking-widest mb-6">اشترك في نشرتنا</h4>
                    <p className="text-xs text-gray-400 mb-4">احصل على آخر العروض والتحديثات مباشرة في بريدك.</p>
                    <div className="flex flex-row-reverse border border-gray-800 rounded-sm overflow-hidden">
                        <input
                            type="email"
                            placeholder="بريدك الإلكتروني"
                            className="flex-1 bg-transparent px-4 py-3 text-sm focus:outline-none text-right"
                        />
                        <button className="bg-white text-black px-6 py-3 text-sm font-bold hover:bg-gray-200 transition-colors">إرسال</button>
                    </div>
                </div>
            </div>

            <div className="max-w-[1440px] mx-auto px-4 md:px-8 mt-16 pt-8 border-t border-gray-900 flex flex-col md:flex-row-reverse justify-between items-center gap-6 text-center md:text-right">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">© 2026 FACES. جميع الحقوق محفوظة.</p>
                <div className="flex gap-6 opacity-30 grayscale transition-all hover:grayscale-0 hover:opacity-100">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
