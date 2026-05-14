'use client';

import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full bg-gray-100 animate-pulse rounded-[2rem] flex items-center justify-center">
      <span className="text-gray-500 font-tajawal text-lg">جاري تحميل الخريطة...</span>
    </div>
  )
});

export default function MapWrapper({ hideSidebar = false }: { hideSidebar?: boolean }) {
  return <MapComponent hideSidebar={hideSidebar} />;
}
