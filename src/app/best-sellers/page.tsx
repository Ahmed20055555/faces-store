import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

// سنستخدم بيانات تجريبية لهذه الصفحة
const BEST_SELLERS = [
  { id: "1", name: "عطر ديور سوفاج", price: "450", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=400", brand: "Dior", rating: 5 },
  { id: "2", name: "شانيل بلو", price: "520", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=400", brand: "Chanel", rating: 4.8 },
  { id: "3", name: "توم فورد بلاك أوركيد", price: "680", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=400", brand: "Tom Ford", rating: 4.9 },
  { id: "4", name: "لانكوم إيدول", price: "390", image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=400", brand: "Lancome", rating: 4.7 },
];

export default function BestSellersPage() {
  return (
    <main className="min-h-screen bg-white" dir="rtl">
      <Navbar />
      <div className="pt-8 pb-8 max-w-[1400px] mx-auto px-4 md:px-12">
        <h1 className="text-3xl font-black mb-8 text-right">الأكثر مبيعاً</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {BEST_SELLERS.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
