"use client";

import React from 'react';
import { Phone, MessageCircle, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black text-white pt-12 pb-6 font-cairo" dir="rtl">
            <div className="max-w-[1400px] mx-auto px-4 md:px-6">
                
                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
                    
                    {/* Col 1: Contact Info */}
                    <div className="lg:col-span-1">
                        <h1 className="text-3xl font-black tracking-widest mb-6">FACES</h1>
                        <h4 className="font-bold text-[15px] mb-4">بحاجة للمساعدة؟</h4>
                        
                        <div className="space-y-4 mb-6">
                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 opacity-80" />
                                <div>
                                    <p className="text-[12px] text-gray-400">اتصل بنا</p>
                                    <p className="text-[14px] font-bold" dir="ltr">+9668001111568</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <MessageCircle className="w-5 h-5 opacity-80" />
                                <div>
                                    <p className="text-[12px] text-gray-400">للتواصل عبر الواتساب:</p>
                                    <p className="text-[14px] font-bold" dir="ltr">+971563299902</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 opacity-80" />
                                <div>
                                    <p className="text-[13px] font-bold hover:underline cursor-pointer">أرسل لنا استفسار</p>
                                </div>
                            </div>
                        </div>

                        <div className="text-[11px] text-gray-400 space-y-2 leading-relaxed">
                            <p className="font-bold text-white text-[12px]">توقيت خدمة العملاء:</p>
                            <p>واتساب: من 10:00 صباحاً إلى 10:00 مساءً (من الإثنين إلى الأحد)</p>
                            <p>الاتصال الهاتفي: من 10:00 صباحاً إلى 10:00 مساءً (من الإثنين إلى الأحد)</p>
                        </div>
                    </div>

                    {/* Col 2: Trending Categories */}
                    <div>
                        <h4 className="font-bold text-[15px] mb-5 text-gray-200">الفئات الرائجة</h4>
                        <ul className="space-y-3 text-[13px] text-gray-400">
                            <li className="hover:text-white cursor-pointer transition-colors">الماركات</li>
                            <li className="hover:text-white cursor-pointer transition-colors">وصل حديثاً</li>
                            <li className="hover:text-white cursor-pointer transition-colors">الأكثر مبيعاً</li>
                            <li className="hover:text-white cursor-pointer transition-colors">اشتر بطاقة هدية</li>
                            <li className="hover:text-white cursor-pointer transition-colors">عطور</li>
                            <li className="hover:text-white cursor-pointer transition-colors">المكياج</li>
                            <li className="hover:text-white cursor-pointer transition-colors">العناية بالبشرة</li>
                            <li className="hover:text-white cursor-pointer transition-colors">للإستحمام والجسم</li>
                            <li className="hover:text-white cursor-pointer transition-colors">العناية بالشعر</li>
                        </ul>
                    </div>

                    {/* Col 3: Trending Brands */}
                    <div>
                        <h4 className="font-bold text-[15px] mb-5 text-gray-200">الماركات الرائجة</h4>
                        <ul className="space-y-3 text-[13px] text-gray-400">
                            <li className="hover:text-white cursor-pointer transition-colors">شانيل</li>
                            <li className="hover:text-white cursor-pointer transition-colors">ديور</li>
                            <li className="hover:text-white cursor-pointer transition-colors">بربري</li>
                            <li className="hover:text-white cursor-pointer transition-colors">إيف سان لوران</li>
                            <li className="hover:text-white cursor-pointer transition-colors">لانكوم</li>
                            <li className="hover:text-white cursor-pointer transition-colors">جيفنشي</li>
                            <li className="hover:text-white cursor-pointer transition-colors">ميك اب فور ايفر</li>
                            <li className="hover:text-white cursor-pointer transition-colors">كلارنس</li>
                        </ul>
                    </div>

                    {/* Col 4: Help & FAQ */}
                    <div>
                        <h4 className="font-bold text-[15px] mb-5 text-gray-200">المساعدة والأسئلة الأكثر شيوعاً</h4>
                        <ul className="space-y-3 text-[13px] text-gray-400">
                            <li className="hover:text-white cursor-pointer transition-colors">حسابك</li>
                            <li className="hover:text-white cursor-pointer transition-colors">الطلبات</li>
                            <li className="hover:text-white cursor-pointer transition-colors">الأسئلة الأكثر شيوعاً</li>
                            <li className="hover:text-white cursor-pointer transition-colors">الدفع</li>
                            <li className="hover:text-white cursor-pointer transition-colors">شارك مع أصدقائك</li>
                            <li className="hover:text-white cursor-pointer transition-colors">التوصيل</li>
                            <li className="hover:text-white cursor-pointer transition-colors">الإرجاع</li>
                            <li className="hover:text-white cursor-pointer transition-colors">تتبع طلبك</li>
                            <li className="hover:text-white cursor-pointer transition-colors">محدد المتاجر</li>
                        </ul>
                    </div>

                    {/* Col 5: About Us */}
                    <div>
                        <h4 className="font-bold text-[15px] mb-5 text-gray-200">معلومات عنا</h4>
                        <ul className="space-y-3 text-[13px] text-gray-400">
                            <li className="hover:text-white cursor-pointer transition-colors">حول وجوه</li>
                            <li className="hover:text-white cursor-pointer transition-colors">خدمات المعارض</li>
                            <li className="hover:text-white cursor-pointer transition-colors">تواصل معنا</li>
                            <li className="hover:text-white cursor-pointer transition-colors">منصة شبكة الشركاء</li>
                            <li className="hover:text-white cursor-pointer transition-colors">انضموا لفريقنا</li>
                            <li className="hover:text-white cursor-pointer transition-colors">برنامج الولاء ميوز</li>
                            <li className="hover:text-white cursor-pointer transition-colors">الوظائف</li>
                            <li className="hover:text-white cursor-pointer transition-colors">الشروط و الأحكام</li>
                            <li className="hover:text-white cursor-pointer transition-colors">سياسة الخصوصية</li>
                        </ul>
                        <div className="mt-4 text-[11px] text-gray-400 leading-relaxed">
                            <p>رقم السجل التجاري:</p>
                            <p>7013320481 - صادر من وزارة التجارة</p>
                        </div>
                    </div>

                    {/* Col 6: App Download & VAT */}
                    <div>
                        <h4 className="font-bold text-[15px] mb-5 text-gray-200">حمل تطبيقنا</h4>
                        <div className="space-y-3 mb-6">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-10 cursor-pointer" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10 cursor-pointer" />
                        </div>
                        <div className="bg-white/10 w-16 h-16 rounded-md flex flex-col items-center justify-center p-2 text-center text-[10px] font-black leading-tight border border-gray-600">
                            <span className="text-green-500">ضريبة</span>
                            <span className="text-green-500">القيمة</span>
                            <span className="text-green-500">المضافة</span>
                            <span className="text-white mt-1 bg-green-600 px-2 rounded-sm">VAT</span>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar: Payments & Social */}
                <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
                    
                    {/* Social Icons */}
                    <div className="flex items-center gap-4 order-2 md:order-1">
                        <svg className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                        </svg>
                        <svg className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                        <svg className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
                            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                        </svg>
                        <svg className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>
                    </div>

                    {/* Payment Icons */}
                    <div className="flex items-center gap-3 flex-wrap justify-center order-1 md:order-2 opacity-60">
                        <div className="bg-white rounded-sm px-1 py-0.5"><img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" alt="Apple Pay" className="h-3" /></div>
                        <div className="bg-white rounded-sm px-1 py-0.5"><img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Mada_Logo.svg" alt="Mada" className="h-3" /></div>
                        <div className="bg-white rounded-sm px-1 py-0.5"><img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-3" /></div>
                        <div className="bg-white rounded-sm px-1 py-0.5"><img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" /></div>
                        <div className="bg-white rounded-sm px-1 py-0.5"><img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" className="h-3" /></div>
                        <div className="bg-[#12b76a] text-white text-[10px] font-bold px-1 py-0.5 rounded-sm">tamara</div>
                        <div className="bg-[#00FFAA] text-black text-[10px] font-bold px-1 py-0.5 rounded-sm">tabby</div>
                    </div>
                    
                </div>

                {/* Copyright */}
                <div className="text-center mt-6 text-[11px] text-gray-500 pb-4">
                    <p>© 2026 شركة مشاريع متضامنة ذ.م.م، المعروفة تجارياً باسم "وجوه". جميع الحقوق محفوظة</p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
