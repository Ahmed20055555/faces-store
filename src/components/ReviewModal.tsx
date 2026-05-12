"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

export default function ReviewModal() {

  return (


    <Dialog>
      <DialogTrigger asChild>
        <button className="border border-gray-900 text-gray-900 bg-white px-6 py-2.5 text-[12px] font-bold uppercase tracking-wide hover:bg-gray-50 transition-colors rounded-sm">
          اكتب مراجعة
        </button>
      </DialogTrigger>
      <DialogContent className="w-[95vw]   sm:max-w-[700px] max-h-[85vh] flex flex-col  overflow-hidden rounded-xl" dir="rtl">
        {/* Header - Fixed at top of modal */}
        <DialogHeader className="border-b border-gray-200 py-4 px-5 md:px-6 flex flex-row items-center justify-start text-right bg-white shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-14 md:w-12 md:h-16 flex items-center justify-center shrink-0">
                <img src="/001717728336_1.jpg" alt="Product" className="max-w-full max-h-full object-contain" />
            </div>
            <div className="flex flex-col gap-0.5">
              <DialogTitle className="text-[13px] md:text-[14px] font-bold text-gray-900 leading-tight">نارسيسو رودريغيز</DialogTitle>
              <DialogDescription className="text-[12px] md:text-[13px] text-gray-600 font-medium">
                ماسك غرينات إنتينس عطر لكلا الجنسين
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        {/* Scrollable Body */}
        <div className="flex-1 min-h-0 flex flex-col gap-6 overflow-y-auto p-5 md:p-6 md:px-8 custom-scrollbar">

          {/* Experience Section */}
          <div className="flex flex-col gap-4 text-right">
            <h4 className="text-[15px] font-bold text-gray-900">أخبرنا عن تجربتك</h4>
            
            <div className="relative">
              <Input placeholder="عنوان المراجعة" className="text-right border-gray-200 rounded-sm focus-visible:ring-1 focus-visible:ring-black h-11 text-[13px] px-4 placeholder:text-gray-400" />
              <div className="text-left mt-1.5 text-[11px] text-gray-400">0/50 الحد الأقصى</div>
            </div>
            
            <div className="relative">
              <Textarea placeholder="تجربتك..." className="min-h-[100px] text-right border-gray-200 rounded-sm focus-visible:ring-1 focus-visible:ring-black resize-y text-[13px] p-4 placeholder:text-gray-400" />
              <div className="text-left mt-1.5 text-[11px] text-gray-400">0/50 الحد الأدنى</div>
            </div>
            
            <div className="flex items-center gap-4 justify-start mt-1">
              <button className="border border-gray-900 bg-white px-5 py-2 text-[11px] font-bold hover:bg-gray-50 uppercase tracking-wide rounded-[3px] text-gray-900 transition-colors">إضافة صورة</button>
              <span className="text-[12px] text-gray-400 font-medium">أضف حتى 6 صور</span>
            </div>
          </div>

          {/* Personal Info */}
          <div className="flex flex-col gap-4 text-right mt-2">
            <h4 className="text-[15px] font-bold text-gray-900">المعلومات الشخصية *</h4>
            
            <div className="relative">
              <Input placeholder="الاسم المستعار *" className="text-right border-gray-200 rounded-sm focus-visible:ring-1 focus-visible:ring-black h-11 text-[13px] px-4 placeholder:text-gray-400" />
              <div className="text-left mt-1.5 text-[11px] text-gray-400">0/4 الحد الأدنى</div>
            </div>
            
            <div className="relative">
              <Input placeholder="البريد الإلكتروني *" type="email" className="text-right border-gray-200 rounded-sm focus-visible:ring-1 focus-visible:ring-black h-11 text-[13px] px-4 placeholder:text-gray-400" />
            </div>
          </div>

          {/* Recommend */}
          <div className="flex flex-col gap-3 text-right mt-4">
            <h4 className="text-[15px] font-bold text-gray-900">هل تنصح بهذا المنتج؟</h4>
            <RadioGroup defaultValue="yes" className="flex items-center gap-8 justify-start mt-1" dir="rtl">
              <div className="flex items-center gap-2 cursor-pointer">
                <RadioGroupItem value="yes" id="r1" className="border-gray-400 text-black" />
                <label htmlFor="r1" className="text-[13px] cursor-pointer text-gray-900">نعم</label>
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <RadioGroupItem value="no" id="r2" className="border-gray-400 text-black" />
                <label htmlFor="r2" className="text-[13px] cursor-pointer text-gray-900">لا</label>
              </div>
            </RadioGroup>
          </div>

          {/* Terms */}
          <div className="flex flex-col gap-3 mt-6 mb-2">
            <div className="flex items-center gap-3">
              <Checkbox id="terms" className="border-gray-400 data-[state=checked]:bg-black data-[state=checked]:border-black rounded-sm" />
              <label htmlFor="terms" className="text-[12px] text-gray-900 cursor-pointer">
                أوافق على <a href="#" className="font-bold underline text-black hover:text-gray-700">الشروط والأحكام</a>
              </label>
            </div>
            
            <p className="text-[10px] text-gray-500 leading-relaxed text-right mt-1">
              قد تتلقى رسائل بريد إلكتروني بخصوص هذا الإرسال. ستتضمن أي رسائل بريد إلكتروني القدرة على إلغاء الاشتراك في المراسلات المستقبلية.
            </p>
          </div>
        </div>

        {/* Footer - Fixed at bottom of modal */}
        <div className="p-6 border-t border-gray-200 bg-white shrink-0">
          <button className="w-full bg-black text-white font-bold text-[13px] py-4 rounded-[3px] hover:bg-gray-900 transition-colors tracking-widest uppercase">
            إرسال المراجعة
          </button>
        </div>
      </DialogContent>
    </Dialog> 

  );
}
