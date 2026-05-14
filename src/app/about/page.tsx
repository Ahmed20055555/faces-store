import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, Droplets, MapPin, Star, History, ChevronDown } from "lucide-react";

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

      {/* ─── Our Essence (Philosophy) ─── */}
      <section className="py-8 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div className="text-right space-y-8">
              <div className="space-y-4">
                <span className="text-[#8c1d3b] font-black tracking-widest text-sm uppercase">جوهرنا</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">حيث يلتقي الفن <br/> بالعطر</h2>
              </div>
              <p className="text-gray-500 text-lg leading-loose font-medium">
                تأسست محلاتنا على يد خبراء يمتلكون "الأنف" القادر على تمييز أندر المكونات. نحن نختار شركاءنا من حقول اللافندر في فرنسا إلى غابات العود في كمبوديا، لنضمن لك تجربة عطرية لا تُنسى.
              </p>
              
              <div className="grid grid-cols-2 gap-10 pt-8 border-t border-gray-100">
                <div>
                  <h4 className="text-4xl font-black text-[#8c1d3b] mb-2">+150</h4>
                  <p className="text-sm font-black text-gray-400 uppercase tracking-tighter">علامة تجارية حصرية</p>
                </div>
                <div>
                  <h4 className="text-4xl font-black text-[#8c1d3b] mb-2">+25</h4>
                  <p className="text-sm font-black text-gray-400 uppercase tracking-tighter">عاماً من الخبرة</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800" 
                  alt="Perfume Craft" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                />
              </div>
              <div className="absolute -top-10 -right-10 w-full h-full bg-[#8c1d3b]/5 rounded-[4rem] -z-10 translate-x-12 translate-y-12"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── The Values (Minimalist Cards) ─── */}
      <section className="py-8 bg-gray-50 rounded-[5rem] mx-4 md:mx-12">
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
      </section>

      {/* ─── Physical Stores (Visual Experience) ─── */}
      <section className="py-8 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12 text-center mb-20">
           <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">تفضل بزيارة عالمنا</h2>
           <p className="text-gray-500 max-w-2xl mx-auto font-medium text-lg">محلاتنا ليست مجرد نقاط بيع، بل هي معارض فنية صُممت لتمنحك رحلة حسية فريدة من نوعها.</p>
        </div>
        
        <div className="flex gap-8 px-4 overflow-x-auto no-scrollbar pb-10">
          {[
            "/IMLDI_BANNER_750x714.avif",
            "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1615526675159-e248c3021d3f?auto=format&fit=crop&q=80&w=800"
          ].map((img, i) => (
            <div key={i} className="min-w-[350px] md:min-w-[500px] h-[400px] rounded-[3rem] overflow-hidden relative group">
              <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all"></div>
            </div>
          ))}
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
