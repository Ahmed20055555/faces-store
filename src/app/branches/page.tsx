import MapWrapper from '@/components/MapWrapper';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'فروعنا | Palmi',
  description: 'خريطة توضح أماكن فروعنا'
};

export default function BranchesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dir-rtl font-tajawal flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-8 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-[#2B3440] mb-4">فروعنا</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              تفضل بزيارة فروعنا المنتشرة لخدمتكم بشكل أفضل. يمكنك استعراض الخريطة لمعرفة أقرب فرع إليك.
            </p>
          </div>

          <div className="bg-white rounded-[2rem] p-4 md:p-6 shadow-sm border border-gray-100 relative z-10">
            <div className="h-[600px] w-full relative z-0">
              <MapWrapper />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
