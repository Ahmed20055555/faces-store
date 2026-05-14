import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, Droplets, MapPin, Star, History, ChevronDown, Navigation } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white" dir="rtl">
      <Navbar />
      
      {/* ─── Luxury Perfume Hero ─── */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        {/* Background Image with Parallax-like feel */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=2000" 
            alt="Luxury Perfume" 
            className="w-full h-full object-cover grayscale-[20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/40 to-transparent"></div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 md:px-12 relative z-10 w-full">
          <div className="max-w-2xl text-right text-white">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-black mb-8 animate-fade-in">
              <span className="w-2 h-2 bg-[#8c1d3b] rounded-full animate-pulse"></span>
              إرث يمتد لسنوات في عالم العطور
            </div>
            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tighter">
              نحن لا نبيع العطور، <br/> 
              <span className="text-[#8c1d3b]">نصنع الذكريات</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-medium mb-12 max-w-xl">
              في "وجوه"، نؤمن أن كل قطرة عطر تحمل حكاية، وكل زجاجة تخفي سراً ينتظر من يكتشفه. رحلتنا بدأت بشغف البحث عن النادر، لتصل إليك في أبهى صورة.
            </p>
            
            <div className="flex items-center gap-6">
               <button className="px-10 py-5 bg-[#8c1d3b] hover:bg-white hover:text-black transition-all duration-500 rounded-full font-black text-sm shadow-2xl shadow-[#8c1d3b]/30">
                  اكتشف مجموعتنا
               </button>
               <div className="hidden md:flex flex-col items-start gap-1 opacity-60">
                  <span className="text-xs font-black uppercase tracking-widest">انزل لتعرف أكثر</span>
                  <ChevronDown className="w-4 h-4 animate-bounce" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── The Values (Minimalist Cards) ─── */}
      {/* <section className="py-8 bg-gray-50 rounded-[5rem] mx-4 md:mx-12">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12">
          <div className="text-center mb-24 space-y-4">
             <h2 className="text-3xl md:text-5xl font-black text-gray-900">قيمنا الراسخة</h2>
             <div className="w-20 h-1.5 bg-[#8c1d3b] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Sparkles, title: "الجودة المطلقة", desc: "لا نقبل بأقل من الامتياز في كل زجاجة تصل إليك." },
              { icon: Droplets, title: "نقاء المكونات", desc: "نستخدم زيوت عطرية أصلية تضمن ثباتاً يدوم طويلاً." },
              { icon: Star, title: "التميز الحصري", desc: "نوفر لك مجموعات لن تجدها في أي مكان آخر في العالم." }
            ].map((value, i) => (
              <div key={i} className="bg-white p-12 rounded-[3.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-gray-100 text-center group">
                <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-[#8c1d3b] group-hover:text-white transition-all duration-500">
                  <value.icon className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black mb-4 text-gray-900">{value.title}</h3>
                <p className="text-gray-500 leading-relaxed font-medium">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ─── Luxury Showrooms Section (Branches) ─── */}
      <section className="py-16 md:py-24 bg-white" id="branches">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12">
          <div className="text-center mb-12 md:mb-20 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8c1d3b]/5 text-[#8c1d3b] text-[10px] md:text-xs font-black uppercase tracking-widest border border-[#8c1d3b]/10">
              <MapPin className="w-3.5 h-3.5" /> فروعنا حول المملكة
            </div>
            <h2 className="text-3xl md:text-6xl font-black text-gray-900 leading-tight">تفضل بزيارة عالمنا</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-lg font-medium leading-relaxed">
              محلاتنا ليست مجرد نقاط بيع، بل هي معارض فنية صُممت لتمنحك رحلة حسية فريدة من نوعها.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
            {STORES.map((store) => (
              <div 
                key={store.id} 
                className="group relative bg-gray-50 rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-10 border border-transparent hover:border-[#8c1d3b]/20 hover:bg-white hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-24 h-24 md:w-32 md:h-32 bg-[#8c1d3b]/5 rounded-full blur-2xl md:blur-3xl group-hover:bg-[#8c1d3b]/10 transition-all"></div>
                
                <div className="relative z-10 space-y-3 md:space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="w-8 h-8 md:w-14 md:h-14 bg-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-sm text-[#8c1d3b] group-hover:bg-[#8c1d3b] group-hover:text-white transition-all duration-500">
                      <MapPin className="w-4 h-4 md:w-6 md:h-6" />
                    </div>
                    <span className="text-[8px] md:text-[10px] font-black text-gray-300 tracking-widest uppercase">#{store.id}</span>
                  </div>

                  <div>
                    <h3 className="text-sm md:text-2xl font-black text-gray-900 mb-1 group-hover:text-[#8c1d3b] transition-colors leading-tight">{store.name}</h3>
                    <p className="text-[10px] md:text-sm text-gray-500 font-bold leading-relaxed min-h-[30px] md:min-h-[48px] line-clamp-2 md:line-clamp-none">
                      {store.address}
                    </p>
                  </div>

                  <div className="pt-3 md:pt-6 border-t border-gray-100 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                    <div className="text-right hidden md:block">
                       <p className="text-[10px] font-black text-gray-400 uppercase mb-1">المشرف</p>
                       <p className="text-sm font-black text-gray-700">{store.supervisor}</p>
                    </div>
                    <a 
                      href={store.mapLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 px-3 md:px-5 py-2 md:py-2.5 rounded-full text-[9px] md:text-xs font-black text-gray-900 hover:bg-black hover:text-white transition-all shadow-sm"
                    >
                      الموقع <Navigation className="w-3 md:w-3.5 h-3 md:h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Footer Section ─── */}
      <section className="py-8 bg-gray-900 text-white text-center mx-4 md:mx-12 mb-24 rounded-[4rem] relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">هل أنت جاهز لتجد <br/> عطرك المميز؟</h2>
          <p className="text-gray-400 mb-12 font-medium">سواء كنت تبحث عن الأناقة الكلاسيكية أو الجرأة العصرية، لدينا ما يناسب شخصيتك.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-10 py-5 bg-[#8c1d3b] rounded-full font-black text-sm hover:scale-105 transition-transform shadow-xl">تسوق الآن</button>
            <button className="px-10 py-5 bg-white/10 backdrop-blur-md rounded-full font-black text-sm hover:bg-white/20 transition-all border border-white/10">مواقع الفروع</button>
          </div>
        </div>
        {/* Abstract Glows */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#8c1d3b] rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#8c1d3b] rounded-full blur-[120px] opacity-20"></div>
      </section>

      <Footer />
    </main>
  );
}

const STORES = [
  { id: "101", name: "حفر الباطن", supervisor: "رمزي الصادق", address: "حفر الباطن، حي البلدية، طريق الملك فيصل", mapLink: "https://maps.app.goo.gl/VuwReHUBDeJUfMS59" },
  { id: "102", name: "تبوك الموسى", supervisor: "ماجد المجاهد", address: "تبوك، حي العليا", mapLink: "https://maps.app.goo.gl/3jw5Zjk11caTP2fM8" },
  { id: "103", name: "تبوك ميلاغرو", supervisor: "نادر جسار", address: "تبوك، حي المطار، العليا الجديدة", mapLink: "https://maps.app.goo.gl/aLU1jdBFuYGRnjsi9" },
  { id: "105", name: "تبوك بارك", supervisor: "محمد دهمش", address: "تبوك، مول بارك", mapLink: "https://maps.app.goo.gl/vDpEnRMvK67JaeDCA" },
  { id: "106", name: "حائل الأمير سلطان", supervisor: "وسيم", address: "حائل، حي الوسيطاء، طريق الأمير سلطان", mapLink: "https://maps.app.goo.gl/Td7zfySRDwzbmin77" },
  { id: "107", name: "حائل سكوير", supervisor: "وهيب", address: "حائل، حي الوسيطاء، مجمع اسكوير", mapLink: "https://maps.app.goo.gl/gQgHfW3P8hAV4dfX9" },
  { id: "109", name: "الرياض أطياف مول", supervisor: "وليد محمد", address: "الرياض، حي اليرموك، اليرموك أطياف مول", mapLink: "https://maps.app.goo.gl/aeDDYczaFm6cZUHY7" },
  { id: "110", name: "نجران رويال سنتر", supervisor: "الجود الهمامي", address: "نجران، رويال سنتر، طريق الملك عبد العزيز", mapLink: "https://maps.app.goo.gl/bD2932B1Fm7i8ALy8" },
  { id: "111", name: "جيزان كادي مول", supervisor: "فارس", address: "جازان، حي الشاطئ، كادي مول", mapLink: "https://maps.app.goo.gl/F5DubFCuwVkrcyi9" },
  { id: "112", name: "خميس مشيط", supervisor: "محمد طربوش", address: "خميس مشيط، حي أم سرار، طريق المطار", mapLink: "https://maps.app.goo.gl/NEgfpaa9JGTXAajt5" },
  { id: "113", name: "نجران الخالدية", supervisor: "بندر جسار", address: "نجران، حي الخالدية، طريق الملك عبد العزيز", mapLink: "https://maps.app.goo.gl/kfc1bfCQPaWfwhFy5" },
  { id: "114", name: "نجران الفيصلية", supervisor: "بندر منتصر", address: "نجران، حي الفيصلية، طريق الملك عبد العزيز", mapLink: "https://maps.app.goo.gl/fbFiQANPeika1z77" },
  { id: "115", name: "نجران العزام مول", supervisor: "فراس", address: "نجران، حي الفيصلية، طريق الملك عبد العزيز", mapLink: "https://maps.app.goo.gl/uJLmpBs47ha9cLir9" },
  { id: "119", name: "حائل النقرة", supervisor: "محمد وليد", address: "حائل، حي النقرة، طريق فهد العلي", mapLink: "https://maps.app.goo.gl/4Y24m5u1CpaMHKV76" },
  { id: "121", name: "نجران بارك", supervisor: "محمد المساواة", address: "نجران، حي الأثيبة، طريق الملك عبد العزيز", mapLink: "https://maps.app.goo.gl/CwC4MjfvussAHHAl9" },
  { id: "122", name: "حفر الباطن (2)", supervisor: "وضحي البديري", address: "حفر الباطن، حي البلدية، طريق الملك فيصل", mapLink: "https://maps.app.goo.gl/JUWPi3wiQJwqXAh9" },
  { id: "123", name: "حائل زون", supervisor: "محمد سيف", address: "حائل، حي النقرة، مجمع حائل زون", mapLink: "https://maps.app.goo.gl/VafzoX3zULox183u8" },
  { id: "124", name: "الباحة", supervisor: "وضاح", address: "الباحة، حي الشفاء، الغنيم مول مقابل البوليفارد", mapLink: "https://maps.app.goo.gl/Cr5ck22CGL3KaAFVA" },
];

