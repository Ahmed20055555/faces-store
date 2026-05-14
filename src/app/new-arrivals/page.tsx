import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

const NEW_ARRIVALS = [
  { id: "5", name: "أرماني كود الجديد", price: "410", image: "https://images.unsplash.com/photo-1595475241949-0f02b288d61a?auto=format&fit=crop&q=80&w=400", brand: "Armani", rating: 5 },
  { id: "6", name: "عطر ايف سان لوران", price: "480", image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&q=80&w=400", brand: "YSL", rating: 4.9 },
];

export default function NewArrivalsPage() {
  return (
    <main className="min-h-screen bg-white" dir="rtl">
      <Navbar />
      <div className="pt-8 pb-8 max-w-[1400px] mx-auto px-4 md:px-12">
        <h1 className="text-3xl font-black mb-8 text-right">وصل حديثاً</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {NEW_ARRIVALS.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
