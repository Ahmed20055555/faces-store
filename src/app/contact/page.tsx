import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, Send, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white" dir="rtl">
      <Navbar />
      
      <section className="pt-8 pb-8">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Contact Info */}
            <div className="text-right">
              <div className="mb-12">
                <h1 className="text-4xl font-black text-gray-900 mb-6 tracking-tight">تواصل معنا</h1>
                <p className="text-gray-500 text-lg font-medium leading-relaxed">
                  نحن هنا للإجابة على استفساراتك ومساعدتك في اختيار الأنسب لك. لا تتردد في مراسلتنا في أي وقت.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-6 p-6 rounded-3xl bg-gray-50 border border-gray-100 hover:border-[#8c1d3b] transition-all group">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-[#8c1d3b] group-hover:bg-[#8c1d3b] group-hover:text-white transition-all">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 mb-1">رقم الهاتف</h4>
                    <p className="text-gray-500 font-bold tracking-wider" dir="ltr">+966 500 000 000</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 p-6 rounded-3xl bg-gray-50 border border-gray-100 hover:border-[#8c1d3b] transition-all group">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-[#8c1d3b] group-hover:bg-[#8c1d3b] group-hover:text-white transition-all">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 mb-1">البريد الإلكتروني</h4>
                    <p className="text-gray-500 font-bold">support@balmy-perfumes.com</p>
                  </div>
                </div>

                <Link href="/branches" className="block">
                  <div className="flex items-center gap-6 p-6 rounded-3xl bg-gray-50 border border-gray-100 hover:border-[#8c1d3b] transition-all group cursor-pointer">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-[#8c1d3b] group-hover:bg-[#8c1d3b] group-hover:text-white transition-all">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 mb-1">الموقع</h4>
                      <p className="text-gray-500 font-bold">الرياض، المملكة العربية السعودية (اضغط لعرض الفروع)</p>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Social or Map Placeholder */}
              <Link href="/branches" className="block mt-12">
                <div className="rounded-[2.5rem] overflow-hidden h-64 bg-gray-100 relative group grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer">
                  <img 
                    src="/IMLDI_BANNER_750x714.avif" 
                    className="w-full h-full object-cover" 
                    alt="Our Store" 
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-full font-black text-sm text-gray-900 shadow-xl group-hover:bg-[#8c1d3b] group-hover:text-white transition-all">
                      عرض الخريطة التفاعلية
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-gray-100 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-[#8c1d3b]"></div>
              <div className="mb-10 text-right">
                <h3 className="text-2xl font-black text-gray-900 mb-2">أرسل لنا رسالة</h3>
                <p className="text-gray-500 font-medium">سنقوم بالرد عليك خلال أقل من 24 ساعة.</p>
              </div>

              <form className="space-y-6 text-right">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 mr-2">الاسم بالكامل</label>
                    <input type="text" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#8c1d3b]/20 transition-all font-bold" placeholder="أحمد محمد" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 mr-2">رقم الجوال</label>
                    <input type="tel" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#8c1d3b]/20 transition-all font-bold text-right" dir="ltr" placeholder="+966 5..." />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 mr-2">البريد الإلكتروني</label>
                  <input type="email" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#8c1d3b]/20 transition-all font-bold" placeholder="name@example.com" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 mr-2">موضوع الرسالة</label>
                  <select className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#8c1d3b]/20 transition-all font-bold appearance-none">
                    <option>استفسار عام</option>
                    <option>حجز موعد</option>
                    <option>شكوى أو اقتراح</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 mr-2">رسالتك</label>
                  <textarea rows={4} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#8c1d3b]/20 transition-all font-bold" placeholder="كيف يمكننا مساعدتك؟"></textarea>
                </div>

                <button className="w-full py-5 bg-[#8c1d3b] text-white rounded-2xl font-black text-lg hover:bg-black transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#8c1d3b]/20">
                  <Send className="w-5 h-5 transform rotate-180" />
                  إرسال الرسالة
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
