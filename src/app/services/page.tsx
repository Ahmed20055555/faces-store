import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, Droplets, FlaskConical, Gift, ChevronLeft, Search, Star } from "lucide-react";

const PERFUME_SERVICES = [
    {
        title: "تصميم عطرك الخاص (Bespoke)",
        description: "جلسة ابتكارية مع خبراء العطور لدينا لاختيار المكونات العليا والوسطى والقاعدية لتصميم عطر يعبر عن شخصيتك وحدك.",
        price: "850 ريال",
        duration: "90 دقيقة",
        icon: FlaskConical,
        color: "bg-amber-50 text-amber-600",
        image: "https://images.unsplash.com/photo-1615526675159-e248c3021d3f?auto=format&fit=crop&q=80&w=800",
    },
    {
        title: "ورشة دمج العطور (Layering)",
        description: "تعلم فن دمج الروائح المختلفة لخلق بصمة عطرية فريدة. نكشف لك أسرار الثبات والفوحان.",
        price: "300 ريال",
        duration: "45 دقيقة",
        icon: Droplets,
        color: "bg-blue-50 text-blue-600",
        image: "https://images.unsplash.com/photo-1595475241949-0f02b288d61a?auto=format&fit=crop&q=80&w=800",
    },
    {
        title: "تحليل الشخصية العطرية",
        description: "باستخدام تقنياتنا الحديثة، نساعدك في اكتشاف العائلة العطرية التي تناسب كيمياء جسمك ونمط حياتك.",
        price: "مجاناً مع أي شراء",
        duration: "20 دقيقة",
        icon: Search,
        color: "bg-emerald-50 text-emerald-600",
        image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&q=80&w=800",
    },
    {
        title: "تغليف الهدايا الملكي",
        description: "حوّل هديتك إلى تحفة فنية بلمساتنا الفاخرة من المخمل والختم الشمعي وتنسيق الزهور.",
        price: "75 ريال",
        duration: "15 دقيقة",
        icon: Gift,
        color: "bg-[#8c1d3b]/10 text-[#8c1d3b]",
        image: "https://images.unsplash.com/photo-1549465220-1d8c9d4c4469?auto=format&fit=crop&q=80&w=800",
    },
];

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-white" dir="rtl">
            <Navbar />

            {/* ─── Hero Header ─── */}
            <section className="pt-8 pb-8 bg-white overflow-hidden">
                <div className="max-w-[1400px] mx-auto px-4 md:px-12">
                    <div className="text-center space-y-6 max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-50 border border-gray-100 text-[#8c1d3b] text-xs font-black tracking-widest uppercase">
                            <Star className="w-3.5 h-3.5 fill-[#8c1d3b]" /> تجارب حسية لا تُنسى
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">خدماتنا العطرية الفاخرة</h1>
                        <p className="text-gray-500 font-medium text-lg md:text-xl leading-relaxed">
                            في وجوه، لا نكتفي ببيع العطور؛ بل نمنحك الأدوات والخبرة لتصنع هويتك العطرية الخاصة.
                        </p>
                    </div>
                </div>
            </section>

            {/* ─── Services List ─── */}
            <section className="py-8 bg-white">
                <div className="max-w-[1400px] mx-auto px-4 md:px-12 space-y-16">
                    {PERFUME_SERVICES.map((service, index) => (
                        <div
                            key={index}
                            className={`flex flex-col md:flex-row gap-12 items-center p-6 md:p-10 rounded-[3.5rem] border border-gray-50 hover:border-gray-100 bg-white hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] transition-all duration-700 group ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Image with Floating Effect */}
                            <div className="w-full md:w-1/2 aspect-[4/3] rounded-[2.8rem] overflow-hidden shadow-2xl relative">
                                <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>

                            {/* Content */}
                            <div className="w-full md:w-1/2 text-right space-y-6 px-4">
                                <div className={`w-16 h-16 ${service.color} rounded-[1.5rem] flex items-center justify-center shadow-sm`}>
                                    <service.icon className="w-8 h-8" />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-gray-900">{service.title}</h2>
                                <p className="text-gray-500 text-lg leading-relaxed font-medium">{service.description}</p>

                                <div className="flex flex-wrap gap-4 pt-4">
                                    <div className="px-5 py-2.5 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-2">
                                        <span className="text-xs font-black text-gray-400 uppercase tracking-tighter">السعر:</span>
                                        <span className="text-sm font-black text-[#8c1d3b]">{service.price}</span>
                                    </div>
                                    <div className="px-5 py-2.5 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-2">
                                        <span className="text-xs font-black text-gray-400 uppercase tracking-tighter">المدة:</span>
                                        <span className="text-sm font-black text-gray-900">{service.duration}</span>
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <button className="px-10 py-4 bg-gray-900 text-white rounded-full font-black text-sm hover:bg-[#8c1d3b] transition-all flex items-center gap-3 group/btn shadow-xl">
                                        احجز موعدك الآن
                                        <ChevronLeft className="w-4 h-4 group-hover/btn:-translate-x-2 transition-transform duration-300" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── Ingredients Discovery (New Creative Section) ─── */}
            <section className="py-8 bg-gray-50 rounded-[4rem] mx-4 md:mx-12 mb-24 overflow-hidden relative">
                <div className="max-w-[1400px] mx-auto px-4 md:px-12 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                        <div className="text-right space-y-8">
                            <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">اكتشف أسرار <br /> المكونات النادرة</h2>
                            <p className="text-gray-600 text-lg font-medium leading-relaxed">
                                نحن نسافر حول العالم لجلب أنقى الخلاصات العطرية. من فانيليا مدغشقر إلى خشب الصندل في ميسور، نضع بين يديك أجود ما جادت به الطبيعة.
                            </p>
                            <div className="flex flex-col gap-4">
                                {["زيوت عطرية أصلية 100%", "مكونات مستدامة وصديقة للبيئة", "ثبات يمتد لأكثر من 24 ساعة"].map((feat, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                            <Sparkles className="w-3.5 h-3.5 text-green-600" />
                                        </div>
                                        <span className="text-sm font-black text-gray-700">{feat}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4 pt-12">
                                <div className="aspect-square rounded-[2rem] overflow-hidden shadow-lg"><img src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" /></div>
                                <div className="aspect-[3/4] rounded-[2rem] overflow-hidden shadow-lg"><img src="https://images.unsplash.com/photo-1563170351-be39c88ea276?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" /></div>
                            </div>
                            <div className="space-y-4">
                                <div className="aspect-[3/4] rounded-[2rem] overflow-hidden shadow-lg"><img src="https://images.unsplash.com/photo-1616984748474-24256bc74797?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" /></div>
                                <div className="aspect-square rounded-[2rem] overflow-hidden shadow-lg"><img src="https://images.unsplash.com/photo-1615526675159-e248c3021d3f?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" /></div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Abstract Glow */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-amber-200/20 blur-[100px] -z-10"></div>
            </section>

            <Footer />
        </main>
    );
}
