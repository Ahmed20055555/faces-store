import { Truck, ShieldCheck, RotateCcw, Headset } from 'lucide-react';

const FEATURES = [
  {
    icon: Truck,
    title: "شحن سريع",
    subtitle: "توصيل خلال 24-48 ساعة",
  },
  {
    icon: ShieldCheck,
    title: "دفع آمن",
    subtitle: "جميع طرق الدفع مؤمّنة",
  },
  {
    icon: RotateCcw,
    title: "إرجاع سهل",
    subtitle: "إرجاع مجاني خلال 14 يوم",
  },
  {
    icon: Headset,
    title: "دعم 24/7",
    subtitle: "فريقنا دائماً في خدمتكم",
  },
];

export default function FeaturesBar() {
  return (
    <section className="bg-white py-6 border-y border-gray-100" dir="rtl">
      <div className="max-w-[1400px] mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {FEATURES.map((feat, i) => (
          <div 
            key={i} 
            className="flex items-center gap-3 md:gap-4 bg-gray-50 border border-gray-100 rounded-xl p-3 md:p-4 hover:bg-white hover:shadow-xl hover:shadow-black/[0.05] hover:-translate-y-0.5 transition-all duration-300 cursor-default"
          >
            <span className="text-[#2B3440] ">
              <feat.icon size={32}  />
            </span>
            <div className="flex flex-col gap-0.5 overflow-hidden">
              <p className="text-xs md:text-[14px] font-black text-gray-900 truncate">
                {feat.title}
              </p>
              <p className="hidden sm:block text-[10px] md:text-[11.5px] font-bold text-gray-400 truncate">
                {feat.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
