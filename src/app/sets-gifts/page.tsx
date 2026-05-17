import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Gift } from "lucide-react";

const GIFT_SETS = [
  { id: "g1", name: "طقم بالمي مسك الفخامة الفاخر", price: "850", image: "/product-21.jpeg", brand: "بالمي | Balmy", rating: 5 },
  { id: "g2", name: "مجموعة هدايا بالمي عود ملكي", price: "1200", image: "/product-2.jpeg", brand: "بالمي | Balmy", rating: 5 },
  { id: "g3", name: "طقم بالمي كشمير وود الراقي", price: "650", image: "/product-22.jpeg", brand: "بالمي | Balmy", rating: 4.9 },
  { id: "g4", name: "مجموعة بالمي رويال توباز الفاخرة", price: "720", image: "/product-24.jpeg", brand: "بالمي | Balmy", rating: 4.8 },
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
