import MapWrapper from '@/components/MapWrapper';

export const metadata = {
  title: 'فروعنا | Palmi',
  description: 'خريطة توضح أماكن فروعنا'
};

export default function BranchesPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12 dir-rtl font-tajawal">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-10 text-center">
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
  );
}
