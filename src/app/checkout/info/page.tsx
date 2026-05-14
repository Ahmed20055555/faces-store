'use client';

import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from 'next/navigation';
import { User, Phone, MapPin, Home, Building2, ChevronLeft, ShieldCheck } from 'lucide-react';

const CITIES = [
    "الرياض", "جدة", "مكة المكرمة", "المدينة المنورة", "الدمام",
    "تبوك", "حائل", "حفر الباطن", "نجران", "جازان",
    "خميس مشيط", "الباحة", "بريدة", "عنيزة", "الطائف",
    "ينبع", "القطيف", "الأحساء", "أبها", "سكاكا"
];

export default function CustomerInfoPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        city: '',
        district: '',
        street: '',
        buildingNo: '',
        notes: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error on change
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.firstName.trim()) newErrors.firstName = 'الاسم الأول مطلوب';
        if (!formData.lastName.trim()) newErrors.lastName = 'الاسم الأخير مطلوب';
        if (!formData.phone.trim()) {
            newErrors.phone = 'رقم الجوال مطلوب';
        } else {
            const cleanPhone = formData.phone.replace(/\D/g, '');
            // Handle cases like 9665... or 05... or 5...
            const isSaudi = /^(966|0)?5\d{8}$/.test(cleanPhone);
            if (!isSaudi) {
                newErrors.phone = 'رقم جوال غير صحيح (مثال: 05XXXXXXXX)';
            }
        }
        if (!formData.city) newErrors.city = 'المدينة مطلوبة';
        if (!formData.district.trim()) newErrors.district = 'الحي مطلوب';
        if (!formData.street.trim()) newErrors.street = 'اسم الشارع مطلوب';
        return newErrors;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        // Store form data for checkout page (in real app, use context/store)
        localStorage.setItem('customerInfo', JSON.stringify(formData));
        router.push('/checkout');
    };

    return (
        <main className="min-h-screen bg-[#faf9f8]" dir="rtl">
            <Navbar />

            <div className="max-w-[800px] mx-auto px-4 md:px-6 py-10 font-sans">

                {/* Progress Steps */}
                <div className="flex items-center justify-center gap-4 mb-10">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#8c1d3b] text-white rounded-full flex items-center justify-center text-[14px] font-black">1</div>
                        <span className="text-[14px] font-bold text-[#8c1d3b]">بيانات العميل</span>
                    </div>
                    <div className="w-12 h-[2px] bg-gray-200"></div>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-200 text-gray-400 rounded-full flex items-center justify-center text-[14px] font-black">2</div>
                        <span className="text-[14px] font-bold text-gray-400">الدفع والتوصيل</span>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h1 className="text-[24px] font-black text-gray-900 text-right">بيانات العميل</h1>
                        <p className="text-gray-500 text-[14px] mt-1 text-right">أدخل بياناتك وعنوانك عشان نقدر نوصلك طلبك بسرعة</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6">

                        {/* Personal Info Section */}
                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-5">
                                <User className="w-5 h-5 text-[#8c1d3b]" />
                                <h2 className="text-[16px] font-black text-gray-900">البيانات الشخصية</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* First Name */}
                                <div>
                                    <label className="block text-[13px] font-bold text-gray-600 mb-1.5 text-right">الاسم الأول *</label>
                                    <input
                                        type="text"
                                        value={formData.firstName}
                                        onChange={(e) => handleChange('firstName', e.target.value)}
                                        placeholder="مثال: أحمد"
                                        className={`w-full px-4 py-3 border rounded-sm text-right text-[14px] font-medium outline-none transition-colors ${errors.firstName ? 'border-red-400 bg-red-50/50' : 'border-gray-200 focus:border-[#8c1d3b]'}`}
                                        dir="rtl"
                                    />
                                    {errors.firstName && <p className="text-red-500 text-[12px] mt-1 text-right">{errors.firstName}</p>}
                                </div>

                                {/* Last Name */}
                                <div>
                                    <label className="block text-[13px] font-bold text-gray-600 mb-1.5 text-right">الاسم الأخير *</label>
                                    <input
                                        type="text"
                                        value={formData.lastName}
                                        onChange={(e) => handleChange('lastName', e.target.value)}
                                        placeholder="مثال: محمد"
                                        className={`w-full px-4 py-3 border rounded-sm text-right text-[14px] font-medium outline-none transition-colors ${errors.lastName ? 'border-red-400 bg-red-50/50' : 'border-gray-200 focus:border-[#8c1d3b]'}`}
                                        dir="rtl"
                                    />
                                    {errors.lastName && <p className="text-red-500 text-[12px] mt-1 text-right">{errors.lastName}</p>}
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="mt-4">
                                <label className="block text-[13px] font-bold text-gray-600 mb-1.5 text-right">رقم الجوال *</label>
                                <div className="relative">
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => handleChange('phone', e.target.value)}
                                        placeholder="05XXXXXXXX"
                                        className={`w-full px-4 py-3 border rounded-sm text-right text-[14px] font-medium outline-none transition-colors pr-14 ${errors.phone ? 'border-red-400 bg-red-50/50' : 'border-gray-200 focus:border-[#8c1d3b]'}`}
                                        dir="ltr"
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                        <Phone className="w-4 h-4 text-gray-400" />
                                        <span className="text-[12px] text-gray-400 font-bold">+966</span>
                                    </div>
                                </div>
                                {errors.phone && <p className="text-red-500 text-[12px] mt-1 text-right">{errors.phone}</p>}
                            </div>
                        </div>

                        {/* Address Section */}
                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-5">
                                <MapPin className="w-5 h-5 text-[#8c1d3b]" />
                                <h2 className="text-[16px] font-black text-gray-900">عنوان التوصيل</h2>
                            </div>

                            {/* City */}
                            <div className="mb-4">
                                <label className="block text-[13px] font-bold text-gray-600 mb-1.5 text-right">المدينة *</label>
                                <select
                                    value={formData.city}
                                    onChange={(e) => handleChange('city', e.target.value)}
                                    className={`w-full px-4 py-3 border rounded-sm text-right text-[14px] font-medium outline-none transition-colors bg-white appearance-none ${errors.city ? 'border-red-400 bg-red-50/50' : 'border-gray-200 focus:border-[#8c1d3b]'}`}
                                    dir="rtl"
                                >
                                    <option value="">اختر المدينة</option>
                                    {CITIES.map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                                {errors.city && <p className="text-red-500 text-[12px] mt-1 text-right">{errors.city}</p>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* District */}
                                <div>
                                    <label className="block text-[13px] font-bold text-gray-600 mb-1.5 text-right">الحي *</label>
                                    <input
                                        type="text"
                                        value={formData.district}
                                        onChange={(e) => handleChange('district', e.target.value)}
                                        placeholder="مثال: حي البلدية"
                                        className={`w-full px-4 py-3 border rounded-sm text-right text-[14px] font-medium outline-none transition-colors ${errors.district ? 'border-red-400 bg-red-50/50' : 'border-gray-200 focus:border-[#8c1d3b]'}`}
                                        dir="rtl"
                                    />
                                    {errors.district && <p className="text-red-500 text-[12px] mt-1 text-right">{errors.district}</p>}
                                </div>

                                {/* Street */}
                                <div>
                                    <label className="block text-[13px] font-bold text-gray-600 mb-1.5 text-right">اسم الشارع *</label>
                                    <input
                                        type="text"
                                        value={formData.street}
                                        onChange={(e) => handleChange('street', e.target.value)}
                                        placeholder="مثال: شارع الملك فيصل"
                                        className={`w-full px-4 py-3 border rounded-sm text-right text-[14px] font-medium outline-none transition-colors ${errors.street ? 'border-red-400 bg-red-50/50' : 'border-gray-200 focus:border-[#8c1d3b]'}`}
                                        dir="rtl"
                                    />
                                    {errors.street && <p className="text-red-500 text-[12px] mt-1 text-right">{errors.street}</p>}
                                </div>
                            </div>

                            {/* Building No */}
                            <div className="mt-4">
                                <label className="block text-[13px] font-bold text-gray-600 mb-1.5 text-right">رقم المبنى (اختياري)</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={formData.buildingNo}
                                        onChange={(e) => handleChange('buildingNo', e.target.value)}
                                        placeholder="رقم المبنى أو الشقة"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-sm text-right text-[14px] font-medium outline-none focus:border-[#8c1d3b] transition-colors pr-12"
                                        dir="rtl"
                                    />
                                    <Building2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                </div>
                            </div>

                            {/* Notes */}
                            <div className="mt-4">
                                <label className="block text-[13px] font-bold text-gray-600 mb-1.5 text-right">ملاحظات إضافية (اختياري)</label>
                                <textarea
                                    value={formData.notes}
                                    onChange={(e) => handleChange('notes', e.target.value)}
                                    placeholder="مثال: بجانب مسجد الحي، الدور الثاني..."
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-sm text-right text-[14px] font-medium outline-none focus:border-[#8c1d3b] transition-colors resize-none"
                                    dir="rtl"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#8c1d3b] text-white py-4 rounded-sm font-black text-[18px] flex items-center justify-center gap-3 hover:bg-[#7a1934] transition-all shadow-lg shadow-[#8c1d3b]/10"
                        >
                            <ShieldCheck className="w-6 h-6" />
                            متابعة للدفع والتوصيل
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <p className="text-center text-[12px] text-gray-400 mt-4 font-medium">
                            بياناتك محمية ومؤمنة بالكامل 🔒
                        </p>
                    </form>
                </div>
            </div>

            <Footer />
        </main>
    );
}
