import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BRANDS = [
  { 
    name: "Chanel", 
    svg: (
      <div className="flex flex-col items-center gap-3">
        <svg className="w-12 h-12 fill-black text-black" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M 48 20 C 31.33 20 18 33.33 18 50 C 18 66.67 31.33 80 48 80 C 56.67 80 64.5 76.5 70 71 L 61 62 C 57.5 65.5 53 67.5 48 67.5 C 38.33 67.5 30.5 59.67 30.5 50 C 30.5 40.33 38.33 32.5 48 32.5 C 53 32.5 57.5 34.5 61 38 L 70 29 C 64.5 23.5 56.67 20 48 20 Z" />
          <path d="M 52 20 C 43.33 20 35.5 23.5 30 29 L 39 38 C 42.5 34.5 47 32.5 52 32.5 C 61.67 32.5 69.5 40.33 69.5 50 C 69.5 59.67 61.67 67.5 52 67.5 C 47 67.5 42.5 65.5 39 62 L 30 71 C 35.5 76.5 43.33 80 52 80 C 68.67 80 82 66.67 82 50 C 82 33.33 68.67 20 52 20 Z" />
        </svg>
        <span className="font-sans tracking-[0.25em] text-lg font-black uppercase text-black">CHANEL</span>
      </div>
    ) 
  },
  { 
    name: "Dior", 
    svg: (
      <div className="flex flex-col items-center gap-1">
        <span className="font-serif tracking-[0.15em] text-3xl font-semibold text-black italic">Dior</span>
      </div>
    ) 
  },
  { 
    name: "Gucci", 
    svg: (
      <div className="flex flex-col items-center gap-1">
        <span className="font-serif tracking-[0.2em] text-2xl font-medium uppercase text-black">GUCCI</span>
      </div>
    ) 
  },
  { 
    name: "Tom Ford", 
    svg: (
      <div className="flex flex-col items-center gap-1">
        <span className="font-sans tracking-[0.12em] text-xl font-black uppercase text-black">TOM FORD</span>
      </div>
    ) 
  },
];

export default function BrandsPage() {
  return (
    <main className="min-h-screen bg-white" dir="rtl">
      <Navbar />
      <div className="pt-8 pb-8 max-w-[1400px] mx-auto px-4 md:px-12 text-right">
        <h1 className="text-2xl md:text-3xl font-black mb-12">اشهر الماركات</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
          {BRANDS.map(brand => (
            <div key={brand.name} className="aspect-video bg-gray-50 rounded-3xl flex items-center justify-center p-6 border border-gray-100/80 hover:shadow-xl transition-all duration-300 hover:bg-black/5 hover:-translate-y-1 cursor-pointer">
              {brand.svg}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
