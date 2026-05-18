"use client";

import React, { useState, useRef } from "react";
import { 
  Save, 
  Globe, 
  ShieldCheck, 
  Bell, 
  CreditCard, 
  Link as LinkIcon,
  Upload,
  Eye,
  EyeOff,
  Smartphone,
  Laptop,
  CheckCircle,
  HelpCircle,
  Lock,
  SmartphoneIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "general", label: "عام", icon: Globe },
  { id: "security", label: "الأمان", icon: ShieldCheck },
  { id: "notifications", label: "التنبيهات", icon: Bell },
  { id: "payments", label: "الدفع والضرائب", icon: CreditCard },
  { id: "social", label: "التواصل الاجتماعي", icon: LinkIcon },
];

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general");

  // General Settings States
  const [storeName, setStoreName] = useState("بالمي - BALMY");
  const [storeEmail, setStoreEmail] = useState("info@balmy.sa");
  const [storePhone, setStorePhone] = useState("+966 50 000 0000");
  const [storeCurrency, setStoreCurrency] = useState("SAR");
  const [storeLogo, setStoreLogo] = useState("");
  const [storeFavicon, setStoreFavicon] = useState("");
  const [seoDescription, setSeoDescription] = useState("المتجر الرائد لمنتجات التجميل والعطور في السعودية والخليج.");

  // Security Settings States
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  // Notification Settings States
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifySMS, setNotifySMS] = useState(true);
  const [notifyMarketing, setNotifyMarketing] = useState(false);
  const [stockThreshold, setStockThreshold] = useState("5");

  // Payment Settings States
  const [enableMada, setEnableMada] = useState(true);
  const [enableApplePay, setEnableApplePay] = useState(true);
  const [enableCOD, setEnableCOD] = useState(false);
  const [merchantId, setMerchantId] = useState("mid_balmy_993412");
  const [secretKey, setSecretKey] = useState("sk_live_51N8xxxxxxxxxxxxxx");
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [taxRate, setTaxRate] = useState("15");

  // Social Links States
  const [socialLinks, setSocialLinks] = useState({
    instagram: "https://instagram.com/balmy",
    twitter: "https://twitter.com/balmy",
    snapchat: "https://snapchat.com/add/balmy",
    tiktok: "https://tiktok.com/@balmy",
    whatsapp: "https://wa.me/966500000000",
  });

  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const logoInputRef = useRef<HTMLInputElement | null>(null);
  const faviconInputRef = useRef<HTMLInputElement | null>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setStoreLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleFaviconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setStoreFavicon(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 4000);
  };

  // Custom Toggle Switch Component
  const ToggleSwitch = ({ 
    checked, 
    onChange, 
    label, 
    sublabel 
  }: { 
    checked: boolean; 
    onChange: (val: boolean) => void; 
    label: string; 
    sublabel?: string 
  }) => (
    <div className="flex items-center justify-between gap-4 py-3 bg-gray-50/50 hover:bg-gray-50 px-5 rounded-2xl border border-gray-100/50 transition-all">
      <div className="flex flex-col text-right">
        <span className="text-xs md:text-sm font-black text-gray-900">{label}</span>
        {sublabel && <span className="text-[10px] text-gray-400 font-bold mt-0.5 leading-relaxed">{sublabel}</span>}
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={cn(
          "w-12 h-6 rounded-full relative transition-all duration-300 ease-out outline-none shrink-0",
          checked ? "bg-black" : "bg-gray-200"
        )}
      >
        <span
          className={cn(
            "w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-300 ease-out shadow-sm",
            checked ? "left-7" : "left-1"
          )}
        />
      </button>
    </div>
  );

  return (
    <form onSubmit={handleSave} className="max-w-[1600px] mx-auto animate-in fade-in duration-700 space-y-8 md:space-y-12 pb-20 font-sans px-4 md:px-0" dir="rtl">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-xl md:text-3xl font-black text-gray-900 mb-1.5 md:mb-2">الإعدادات العامة</h1>
          <p className="text-[10px] md:text-sm font-bold text-gray-400 mt-1 uppercase tracking-[0.2em]">System Preferences & Brand Settings</p>
        </div>
        <button 
          type="submit" 
          className="w-full md:w-auto bg-black text-white px-10 py-4 rounded-[1.5rem] font-black text-sm flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-xl shadow-black/10 group active:scale-95"
        >
          <Save size={20} className="group-hover:scale-110 transition-transform" />
          حفظ التغييرات
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <div className="flex lg:flex-col gap-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0 scroll-smooth">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-xs md:text-sm transition-all shrink-0 lg:shrink text-right border",
                  activeTab === tab.id 
                    ? "bg-black text-white border-black shadow-lg shadow-black/5" 
                    : "bg-white text-gray-400 hover:text-gray-600 hover:bg-gray-50 border-gray-100"
                )}
              >
                <tab.icon size={18} className={cn(activeTab === tab.id ? "text-[#BE9D72]" : "text-gray-400")} />
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Pane */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] border border-gray-200 shadow-sm p-6 md:p-10 min-h-[480px]">
            
            <AnimatePresence mode="wait">
              {/* Tab 1: General (عام) */}
              {activeTab === "general" && (
                <motion.div 
                  key="general"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6 md:space-y-8"
                >
                  <div className="border-b border-gray-50 pb-4">
                    <h3 className="text-base md:text-lg font-black text-gray-900">هوية المتجر</h3>
                    <p className="text-[10px] md:text-xs font-bold text-gray-400 mt-1">تعديل معلومات وتفاصيل المتجر الظاهرة للعملاء.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 mr-2 uppercase tracking-widest">اسم المتجر</label>
                      <input 
                        type="text" 
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-100 focus:bg-white focus:border-black focus:ring-4 focus:ring-black/5 rounded-2xl py-4 px-6 text-sm font-bold outline-none transition-all"
                        placeholder="اسم المتجر..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 mr-2 uppercase tracking-widest">عنوان البريد الرسمي</label>
                      <input 
                        type="email" 
                        value={storeEmail}
                        onChange={(e) => setStoreEmail(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-100 focus:bg-white focus:border-black focus:ring-4 focus:ring-black/5 rounded-2xl py-4 px-6 text-sm font-bold outline-none transition-all text-left"
                        placeholder="example@store.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 mr-2 uppercase tracking-widest">رقم خدمة العملاء</label>
                      <input 
                        type="text" 
                        value={storePhone}
                        onChange={(e) => setStorePhone(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-100 focus:bg-white focus:border-black focus:ring-4 focus:ring-black/5 rounded-2xl py-4 px-6 text-sm font-bold outline-none transition-all text-left"
                        placeholder="+966 50 000 0000"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 mr-2 uppercase tracking-widest">العملة الافتراضية</label>
                      <div className="relative">
                        <select 
                          value={storeCurrency}
                          onChange={(e) => setStoreCurrency(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-100 focus:bg-white focus:border-black focus:ring-4 focus:ring-black/5 rounded-2xl py-4 px-6 text-sm font-bold outline-none transition-all appearance-none cursor-pointer"
                        >
                          <option value="SAR">ريال سعودي (SAR)</option>
                          <option value="AED">درهم إماراتي (AED)</option>
                          <option value="KWD">دينار كويتي (KWD)</option>
                          <option value="BHD">دينار بحريني (BHD)</option>
                          <option value="USD">دولار أمريكي (USD)</option>
                        </select>
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 font-bold text-xs">▼</div>
                      </div>
                    </div>
                  </div>

                  {/* Logo and Favicon Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                    
                    {/* Logo upload */}
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-black text-gray-400 mr-2 uppercase tracking-widest">شعار الموقع (Logo)</label>
                      <input 
                        type="file" 
                        accept="image/*" 
                        ref={logoInputRef}
                        onChange={handleLogoUpload}
                        className="hidden" 
                      />
                      <div 
                        onClick={() => logoInputRef.current?.click()}
                        className="flex flex-col sm:flex-row items-center gap-6 p-6 border-2 border-dashed border-gray-100 rounded-[2rem] hover:border-black transition-colors group cursor-pointer text-center sm:text-right"
                      >
                        <div className="w-20 h-20 bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center text-gray-300 group-hover:bg-black/5 transition-all border border-gray-100 shrink-0">
                          {storeLogo ? (
                            <img src={storeLogo} alt="Logo" className="w-full h-full object-contain p-1" />
                          ) : (
                            <Upload size={28} />
                          )}
                        </div>
                        <div>
                          <p className="text-xs md:text-sm font-black text-gray-900">اضغط لرفع شعار جديد</p>
                          <p className="text-[9px] md:text-[10px] text-gray-400 font-bold mt-1 leading-relaxed">يفضل استخدام ملفات SVG أو PNG بخلفية شفافة لضمان الجودة الفائقة.</p>
                        </div>
                      </div>
                    </div>

                    {/* Favicon upload */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 mr-2 uppercase tracking-widest">أيقونة المتجر (Favicon)</label>
                      <input 
                        type="file" 
                        accept="image/*" 
                        ref={faviconInputRef}
                        onChange={handleFaviconUpload}
                        className="hidden" 
                      />
                      <div 
                        onClick={() => faviconInputRef.current?.click()}
                        className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-100 rounded-[2rem] hover:border-black transition-colors group cursor-pointer text-center h-[124px]"
                      >
                        {storeFavicon ? (
                          <div className="w-10 h-10 rounded-xl overflow-hidden border border-gray-100 bg-gray-50 mb-1">
                            <img src={storeFavicon} alt="Favicon" className="w-full h-full object-contain p-1" />
                          </div>
                        ) : (
                          <Upload size={20} className="text-gray-300 mb-1 group-hover:scale-110 transition-transform" />
                        )}
                        <span className="text-[10px] font-black text-gray-900 mt-1">تحديث Favicon</span>
                        <span className="text-[8px] text-gray-400 font-bold mt-0.5">بمقاس 32x32 بكسل</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4">
                    <label className="text-[10px] font-black text-gray-400 mr-2 uppercase tracking-widest">وصف المتجر (SEO Description)</label>
                    <textarea 
                      rows={4}
                      value={seoDescription}
                      onChange={(e) => setSeoDescription(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-100 focus:bg-white focus:border-black focus:ring-4 focus:ring-black/5 rounded-[2rem] py-4 px-6 text-sm font-bold outline-none transition-all resize-none leading-relaxed"
                      placeholder="اكتب وصفاً يعكس طابع وهوية متجرك لمحركات البحث..."
                    />
                  </div>
                </motion.div>
              )}

              {/* Tab 2: Security (الأمان) */}
              {activeTab === "security" && (
                <motion.div 
                  key="security"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6 md:space-y-8"
                >
                  <div className="border-b border-gray-50 pb-4">
                    <h3 className="text-base md:text-lg font-black text-gray-900">الأمان والحماية</h3>
                    <p className="text-[10px] md:text-xs font-bold text-gray-400 mt-1">تحديث كلمات المرور وتأمين حسابات لوحة التحكم.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Change Password Form */}
                    <div className="space-y-4">
                      <h4 className="text-xs md:text-sm font-black text-gray-900 flex items-center gap-2">
                        <Lock size={16} className="text-[#BE9D72]" />
                        تغيير كلمة المرور
                      </h4>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 mr-2 uppercase tracking-widest">كلمة المرور الحالية</label>
                        <div className="relative">
                          <input 
                            type={showCurrentPassword ? "text" : "password"}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-100 focus:bg-white focus:border-black focus:ring-4 focus:ring-black/5 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold outline-none transition-all text-left"
                            placeholder="••••••••"
                          />
                          <button 
                            type="button" 
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                          >
                            {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 mr-2 uppercase tracking-widest">كلمة المرور الجديدة</label>
                        <div className="relative">
                          <input 
                            type={showNewPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-100 focus:bg-white focus:border-black focus:ring-4 focus:ring-black/5 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold outline-none transition-all text-left"
                            placeholder="••••••••"
                          />
                          <button 
                            type="button" 
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                          >
                            {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 mr-2 uppercase tracking-widest">تأكيد كلمة المرور الجديدة</label>
                        <input 
                          type="password" 
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-100 focus:bg-white focus:border-black focus:ring-4 focus:ring-black/5 rounded-2xl py-4 px-6 text-sm font-bold outline-none transition-all text-left"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>

                    {/* Additional Security Options & Active Sessions */}
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <h4 className="text-xs md:text-sm font-black text-gray-900 flex items-center gap-2">
                          <ShieldCheck size={16} className="text-[#BE9D72]" />
                          إجراءات إضافية
                        </h4>
                        
                        <ToggleSwitch 
                          checked={twoFactorAuth}
                          onChange={setTwoFactorAuth}
                          label="التحقق الثنائي (2FA)"
                          sublabel="حماية حسابك برمز تحقق إضافي يتم إرساله إلى هاتفك."
                        />
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-xs md:text-sm font-black text-gray-900 flex items-center gap-2">
                          <SmartphoneIcon size={16} className="text-[#BE9D72]" />
                          الأجهزة المتصلة حالياً
                        </h4>

                        <div className="space-y-3">
                          {/* Device 1 */}
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-600 shadow-sm">
                                <Laptop size={18} />
                              </div>
                              <div className="text-right">
                                <p className="text-xs font-black text-gray-900">Chrome (Windows 11)</p>
                                <p className="text-[9px] text-gray-400 font-bold mt-0.5">الرياض، السعودية · 192.168.1.45</p>
                              </div>
                            </div>
                            <span className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 rounded-full text-[9px] font-black">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                              نشط الآن
                            </span>
                          </div>

                          {/* Device 2 */}
                          <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-gray-100/50">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-400">
                                <Smartphone size={18} />
                              </div>
                              <div className="text-right">
                                <p className="text-xs font-black text-gray-400">Safari (iPhone 15 Pro)</p>
                                <p className="text-[9px] text-gray-400 font-bold mt-0.5">جدة، السعودية · 82.203.4.11</p>
                              </div>
                            </div>
                            <span className="text-[9px] font-bold text-gray-400 px-2">قبل 3 ساعات</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 3: Notifications (التنبيهات) */}
              {activeTab === "notifications" && (
                <motion.div 
                  key="notifications"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6 md:space-y-8"
                >
                  <div className="border-b border-gray-50 pb-4">
                    <h3 className="text-base md:text-lg font-black text-gray-900">تفضيلات التنبيهات</h3>
                    <p className="text-[10px] md:text-xs font-bold text-gray-400 mt-1">تحديد متى وكيف تتلقى الإشعارات حول أنشطة متجرك.</p>
                  </div>

                  <div className="space-y-4 max-w-2xl">
                    <ToggleSwitch 
                      checked={notifyEmail}
                      onChange={setNotifyEmail}
                      label="تنبيهات البريد الإلكتروني"
                      sublabel="استلام ملخص مبيعات يومي وإشعارات بالطلبات الجديدة فوراً."
                    />

                    <ToggleSwitch 
                      checked={notifySMS}
                      onChange={setNotifySMS}
                      label="رسائل الـ SMS للعملاء"
                      sublabel="تحديث حالة الطلب تلقائياً لعملائك برسائل نصية ترحيبية وتتبع الشحنات."
                    />

                    <ToggleSwitch 
                      checked={notifyMarketing}
                      onChange={setNotifyMarketing}
                      label="الحملات التسويقية الموجهة"
                      sublabel="إعلام عملائك بأحدث العروض والخصومات بشكل مبرمج وتلقائي."
                    />

                    <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 mt-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="text-right">
                          <h4 className="text-xs md:text-sm font-black text-gray-900">تنبيه انخفاض المخزون</h4>
                          <p className="text-[10px] text-gray-400 font-bold mt-0.5 leading-relaxed">أقل كمية للمنتج بالمخزن ليتم تنبيهك فوراً لتفادي نفاد الكمية.</p>
                        </div>
                        <div className="flex items-center bg-white border border-gray-200 rounded-xl px-3 py-1.5 shadow-sm">
                          <input 
                            type="number"
                            value={stockThreshold}
                            onChange={(e) => setStockThreshold(e.target.value)}
                            className="w-10 text-center text-sm font-black outline-none border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <span className="text-[10px] font-black text-gray-400 mr-1.5">قطع</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 4: Payments and Taxes (الدفع والضرائب) */}
              {activeTab === "payments" && (
                <motion.div 
                  key="payments"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6 md:space-y-8"
                >
                  <div className="border-b border-gray-50 pb-4">
                    <h3 className="text-base md:text-lg font-black text-gray-900">إعدادات الدفع والضرائب</h3>
                    <p className="text-[10px] md:text-xs font-bold text-gray-400 mt-1">تهيئة بوابات الدفع الإلكتروني وتحديد ضريبة القيمة المضافة.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Payment Gateways */}
                    <div className="space-y-4">
                      <h4 className="text-xs md:text-sm font-black text-gray-900 flex items-center gap-2">
                        <CreditCard size={16} className="text-[#BE9D72]" />
                        بوابات الدفع المفعلة
                      </h4>

                      <ToggleSwitch 
                        checked={enableMada}
                        onChange={setEnableMada}
                        label="بطاقة مدى / البطاقات الائتمانية"
                        sublabel="قبول المدفوعات عبر مada، فيزا، وماستركارد."
                      />

                      <ToggleSwitch 
                        checked={enableApplePay}
                        onChange={setEnableApplePay}
                        label="خدمة Apple Pay"
                        sublabel="تفعيل الشراء السريع بلمسة واحدة لمستخدمي أجهزة Apple."
                      />

                      <ToggleSwitch 
                        checked={enableCOD}
                        onChange={setEnableCOD}
                        label="الدفع عند الاستلام (COD)"
                        sublabel="إتاحة خيار تسوية الفواتير يدوياً عند تسليم الطلبات للمنزل."
                      />
                    </div>

                    {/* API keys & Tax setup */}
                    <div className="space-y-6">
                      
                      {/* API credentials block */}
                      <div className="space-y-4">
                        <h4 className="text-xs md:text-sm font-black text-gray-900 flex items-center gap-2">
                          <Lock size={16} className="text-[#BE9D72]" />
                          إعدادات بوابة الدفع (Stripe)
                        </h4>

                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 mr-2 uppercase tracking-widest">معرف التاجر (Merchant ID)</label>
                          <input 
                            type="text" 
                            value={merchantId}
                            onChange={(e) => setMerchantId(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-100 focus:bg-white focus:border-black focus:ring-4 focus:ring-black/5 rounded-2xl py-4 px-6 text-sm font-bold outline-none transition-all text-left"
                            placeholder="mid_xxxxxxxxxx"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 mr-2 uppercase tracking-widest">المفتاح السري (Secret Key)</label>
                          <div className="relative">
                            <input 
                              type={showSecretKey ? "text" : "password"}
                              value={secretKey}
                              onChange={(e) => setSecretKey(e.target.value)}
                              className="w-full bg-gray-50 border border-gray-100 focus:bg-white focus:border-black focus:ring-4 focus:ring-black/5 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold outline-none transition-all text-left"
                              placeholder="sk_live_••••••••"
                            />
                            <button 
                              type="button" 
                              onClick={() => setShowSecretKey(!showSecretKey)}
                              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                            >
                              {showSecretKey ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Tax Settings block */}
                      <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="text-right">
                            <h4 className="text-xs md:text-sm font-black text-gray-900">ضريبة القيمة المضافة (VAT)</h4>
                            <p className="text-[10px] text-gray-400 font-bold mt-0.5 leading-relaxed">النسبة المضافة تلقائياً لأسعار السلة عند الدفع.</p>
                          </div>
                          <div className="flex items-center bg-white border border-gray-200 rounded-xl px-3 py-1.5 shadow-sm">
                            <input 
                              type="number"
                              value={taxRate}
                              onChange={(e) => setTaxRate(e.target.value)}
                              className="w-8 text-center text-sm font-black outline-none border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <span className="text-[10px] font-black text-gray-400 mr-1.5">%</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 5: Social Media (التواصل الاجتماعي) */}
              {activeTab === "social" && (
                <motion.div 
                  key="social"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6 md:space-y-8"
                >
                  <div className="border-b border-gray-50 pb-4">
                    <h3 className="text-base md:text-lg font-black text-gray-900">حسابات التواصل الاجتماعي</h3>
                    <p className="text-[10px] md:text-xs font-bold text-gray-400 mt-1">ربط المتجر بحساباتك الرسمية لتسهيل التواصل والوصول.</p>
                  </div>

                  <div className="space-y-4 max-w-2xl">
                    {/* Instagram */}
                    <div className="flex items-center gap-4 group">
                      <div className="w-12 h-12 bg-gray-50 group-focus-within:bg-pink-50 group-focus-within:text-pink-600 rounded-2xl border border-gray-100 flex items-center justify-center text-gray-400 transition-all shrink-0">
                        <LinkIcon size={18} />
                      </div>
                      <div className="flex-1 space-y-1">
                        <label className="text-[9px] font-black text-gray-400 mr-1 uppercase tracking-widest">إنستقرام (Instagram)</label>
                        <input 
                          type="text" 
                          value={socialLinks.instagram}
                          onChange={(e) => setSocialLinks(prev => ({ ...prev, instagram: e.target.value }))}
                          className="w-full bg-gray-50 border border-gray-100 focus:bg-white focus:border-black focus:ring-4 focus:ring-black/5 rounded-2xl py-3.5 px-5 text-xs md:text-sm font-bold outline-none transition-all text-left"
                          placeholder="https://instagram.com/..."
                        />
                      </div>
                    </div>

                    {/* Twitter / X */}
                    <div className="flex items-center gap-4 group">
                      <div className="w-12 h-12 bg-gray-50 group-focus-within:bg-black group-focus-within:text-white rounded-2xl border border-gray-100 flex items-center justify-center text-gray-400 transition-all shrink-0">
                        <LinkIcon size={18} />
                      </div>
                      <div className="flex-1 space-y-1">
                        <label className="text-[9px] font-black text-gray-400 mr-1 uppercase tracking-widest">منصة إكس (Twitter / X)</label>
                        <input 
                          type="text" 
                          value={socialLinks.twitter}
                          onChange={(e) => setSocialLinks(prev => ({ ...prev, twitter: e.target.value }))}
                          className="w-full bg-gray-50 border border-gray-100 focus:bg-white focus:border-black focus:ring-4 focus:ring-black/5 rounded-2xl py-3.5 px-5 text-xs md:text-sm font-bold outline-none transition-all text-left"
                          placeholder="https://twitter.com/..."
                        />
                      </div>
                    </div>

                    {/* Snapchat */}
                    <div className="flex items-center gap-4 group">
                      <div className="w-12 h-12 bg-gray-50 group-focus-within:bg-yellow-50 group-focus-within:text-yellow-600 rounded-2xl border border-gray-100 flex items-center justify-center text-gray-400 transition-all shrink-0">
                        <LinkIcon size={18} />
                      </div>
                      <div className="flex-1 space-y-1">
                        <label className="text-[9px] font-black text-gray-400 mr-1 uppercase tracking-widest">سناب شات (Snapchat)</label>
                        <input 
                          type="text" 
                          value={socialLinks.snapchat}
                          onChange={(e) => setSocialLinks(prev => ({ ...prev, snapchat: e.target.value }))}
                          className="w-full bg-gray-50 border border-gray-100 focus:bg-white focus:border-black focus:ring-4 focus:ring-black/5 rounded-2xl py-3.5 px-5 text-xs md:text-sm font-bold outline-none transition-all text-left"
                          placeholder="https://snapchat.com/add/..."
                        />
                      </div>
                    </div>

                    {/* TikTok */}
                    <div className="flex items-center gap-4 group">
                      <div className="w-12 h-12 bg-gray-50 group-focus-within:bg-gray-900 group-focus-within:text-white rounded-2xl border border-gray-100 flex items-center justify-center text-gray-400 transition-all shrink-0">
                        <LinkIcon size={18} />
                      </div>
                      <div className="flex-1 space-y-1">
                        <label className="text-[9px] font-black text-gray-400 mr-1 uppercase tracking-widest">تيك توك (TikTok)</label>
                        <input 
                          type="text" 
                          value={socialLinks.tiktok}
                          onChange={(e) => setSocialLinks(prev => ({ ...prev, tiktok: e.target.value }))}
                          className="w-full bg-gray-50 border border-gray-100 focus:bg-white focus:border-black focus:ring-4 focus:ring-black/5 rounded-2xl py-3.5 px-5 text-xs md:text-sm font-bold outline-none transition-all text-left"
                          placeholder="https://tiktok.com/@..."
                        />
                      </div>
                    </div>

                    {/* WhatsApp */}
                    <div className="flex items-center gap-4 group">
                      <div className="w-12 h-12 bg-gray-50 group-focus-within:bg-green-50 group-focus-within:text-green-600 rounded-2xl border border-gray-100 flex items-center justify-center text-gray-400 transition-all shrink-0">
                        <LinkIcon size={18} />
                      </div>
                      <div className="flex-1 space-y-1">
                        <label className="text-[9px] font-black text-gray-400 mr-1 uppercase tracking-widest">رابط الواتساب (WhatsApp Direct Link)</label>
                        <input 
                          type="text" 
                          value={socialLinks.whatsapp}
                          onChange={(e) => setSocialLinks(prev => ({ ...prev, whatsapp: e.target.value }))}
                          className="w-full bg-gray-50 border border-gray-100 focus:bg-white focus:border-black focus:ring-4 focus:ring-black/5 rounded-2xl py-3.5 px-5 text-xs md:text-sm font-bold outline-none transition-all text-left"
                          placeholder="https://wa.me/..."
                        />
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>

      {/* Toast Notification Alert */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-6 left-6 bg-black text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#BE9D72]/20 z-50 max-w-sm"
          >
            <div className="w-8 h-8 rounded-full bg-[#BE9D72]/10 flex items-center justify-center text-[#BE9D72] shrink-0">
              <CheckCircle size={18} />
            </div>
            <div className="text-right">
              <p className="text-xs font-black">تم حفظ الإعدادات بنجاح</p>
              <p className="text-[10px] text-gray-400 font-bold mt-0.5">تم تحديث تفضيلات النظام وتطبيق التغييرات فوراً.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </form>
  );
}
