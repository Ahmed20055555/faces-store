import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BRANDS = [
  { name: "Chanel", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/92/Chanel_logo_interlocking_cs.svg/1200px-Chanel_logo_interlocking_cs.svg.png" },
  { name: "Dior", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Dior_Logo.svg/1200px-Dior_Logo.svg.png" },
  { name: "Gucci", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Gucci_logo.svg/1200px-Gucci_logo.svg.png" },
  { name: "Tom Ford", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Tom_Ford_logo.svg/1200px-Tom_Ford_logo.svg.png" },
];

export default function BrandsPage() {
  return (
    <main className="min-h-screen bg-white" dir="rtl">
      <Navbar />
      <div className="pt-8 pb-8 max-w-[1400px] mx-auto px-4 md:px-12 text-right">
        <h1 className="text-3xl font-black mb-12">اشهر الماركات</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {BRANDS.map(brand => (
            <div key={brand.name} className="aspect-video bg-gray-50 rounded-3xl flex items-center justify-center p-8 border border-gray-100 hover:shadow-xl transition-all grayscale hover:grayscale-0 cursor-pointer">
              <img src={brand.logo} alt={brand.name} className="max-h-full max-w-full object-contain" />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
