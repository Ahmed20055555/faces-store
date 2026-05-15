import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Gift } from "lucide-react";

const GIFT_SETS = [
  { id: "g1", name: "صندوق الورد والعطر الملكي", price: "850", image: "https://images.unsplash.com/photo-1549465220-1d8c9d4c4469?auto=format&fit=crop&q=80&w=400", brand: "FACES Exclusive", rating: 5 },
  { id: "g2", name: "مجموعة العناية الفاخرة", price: "420", image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=400", brand: "Luxury Care", rating: 4.8 },
  { id: "g3", name: "باقة العود والمبخرة الذهبية", price: "1200", image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&q=80&w=400", brand: "Arabic Heritage", rating: 5 },
  { id: "g4", name: "طقم السفر الرجالي المتكامل", price: "350", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=400", brand: "Classic Men", rating: 4.7 },
];

export default function GiftSetsPage() {
  return (
    <main className="min-h-screen bg-white" dir="rtl">
      <Navbar />
      
      {/* Header Section */}
      <section className="pt-8 pb-8 bg-[#fafafa]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12 text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 border border-pink-100 text-pink-600 text-xs font-black mb-6">
            <Gift className="w-3.5 h-3.5" /> باقات هدايا جاهزة للمناسبات
          </div>
          <h1 className="text-2xl md:text-4xl font-black text-gray-900 mb-4">مجموعات الهدايا</h1>
          <p className="text-sm md:text-base text-gray-500 max-w-2xl font-medium leading-relaxed">
            اجعل لحظاتهم لا تُنسى مع مجموعاتنا المختارة بعناية. هدايا جاهزة بتغليف فاخر لتناسب جميع مناسباتكم السعيدة.
          </p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-8">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {GIFT_SETS.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
