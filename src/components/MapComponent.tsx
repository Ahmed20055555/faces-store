import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState, useRef } from 'react';

// Fix for default marker icons in react-leaflet
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface Branch {
  id: number;
  name: string;
  lat: number;
  lng: number;
  address?: string;
}

const defaultBranches: Branch[] = [
  { id: 101, name: "حفر الباطن", lat: 28.4123453, lng: 45.9791099, address: "حفر الباطن، حي البلدية، طريق الملك فيصل" },
  { id: 102, name: "تبوك الموسي", lat: 28.3995749, lng: 36.5646258, address: "تبوك، حي العليا" },
  { id: 103, name: "تبوك ميلاغرو", lat: 28.4061, lng: 36.5681, address: "تبوك، حي المطار، العليا الجديدة" },
  { id: 105, name: "تبوك بارك", lat: 28.3697, lng: 36.5925, address: "تبوك، مول بارك" },
  { id: 106, name: "حائل الأمير سلطان", lat: 27.5246, lng: 41.6961, address: "حائل، حي الوسيطاء، طريق الأمير سلطان" },
  { id: 107, name: "حائل سكوير", lat: 27.5333, lng: 41.6833, address: "حائل، حي الوسيطاء، مجمع اسكوير" },
  { id: 109, name: "الرياض أطياف مول (اليرموك)", lat: 24.8115, lng: 46.7725, address: "الرياض، حي اليرموك، أطياف مول" },
  { id: 110, name: "نجران رويل سنتر", lat: 17.5113, lng: 44.1500, address: "نجران، رويل سنتر، طريق الملك عبد العزيز" },
  { id: 111, name: "جازان كادي مول", lat: 16.9048, lng: 42.5458, address: "جازان، حي الشاطئ، كادي مول" },
  { id: 112, name: "خميس مشيط", lat: 18.3000, lng: 42.7333, address: "خميس مشيط، حي ام سرار، طريق المطار" },
  { id: 113, name: "نجران الخالدية", lat: 17.5252, lng: 44.2096, address: "نجران، حي الخالدية، طريق الملك عبد العزيز" },
  { id: 114, name: "نجران الفيصلية", lat: 17.5132, lng: 44.1729, address: "نجران، حي الفيصلية، طريق الملك عبد العزيز" },
  { id: 115, name: "نجران العزام مول", lat: 17.5028, lng: 44.1611, address: "نجران، حي الفيصلية، طريق الملك عبد العزيز" },
  { id: 119, name: "حائل النقرة", lat: 27.4812, lng: 41.6845, address: "حائل، حي النقرة، طريق فهد العلي" },
  { id: 121, name: "نجران بارك", lat: 17.5401, lng: 44.1802, address: "نجران، حي الاثيبه، طريق الملك عبد العزيز" },
  { id: 122, name: "حفر الباطن", lat: 28.4110, lng: 45.9750, address: "حفر الباطن، حي البلدية، طريق الملك فيصل" },
  { id: 123, name: "حائل زون", lat: 27.4751667, lng: 41.6577778, address: "حائل، حي النقرة، مجمع حائل زون" },
  { id: 124, name: "الباحة", lat: 20.0071618, lng: 41.4517252, address: "الباحة، حي الشفاء، الغنيم مول مقابل البليفارد" }
];

// Component to handle map panning
function MapController({ center, zoom }: { center: [number, number] | null, zoom: number }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom, { duration: 1.5 });
    }
  }, [center, zoom, map]);

  useEffect(() => {
    // Fit all markers on initial load
    if (!center && defaultBranches.length > 0) {
      const bounds = L.latLngBounds(defaultBranches.map(b => [b.lat, b.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, center]);

  return null;
}

export default function MapComponent({ 
  branches = defaultBranches, 
  hideSidebar = false 
}: { 
  branches?: Branch[], 
  hideSidebar?: boolean 
}) {
  const [activeBranch, setActiveBranch] = useState<[number, number] | null>(null);
  const markerRefs = useRef<{ [key: number]: any }>({});

  useEffect(() => {
    // This fixes an issue with leaflet's default icon paths in Next.js
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-white overflow-hidden shadow-sm border border-gray-100" style={{ minHeight: hideSidebar ? '450px' : '600px' }}>
      {/* Sidebar List */}
      {!hideSidebar && (
        <div className="w-full md:w-1/3 bg-gray-50 flex flex-col h-[300px] md:h-[600px] border-l border-gray-200">
          <div className="p-4 bg-white border-b border-gray-200">
            <h2 className="text-xl font-bold text-[#2B3440] font-tajawal text-right">قائمة الفروع ({branches.length})</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            <div className="flex flex-col gap-3">
              {branches.map((branch) => (
                <div 
                  key={branch.id} 
                  onClick={() => {
                    setActiveBranch([branch.lat, branch.lng]);
                    const marker = markerRefs.current[branch.id];
                    if (marker) {
                      marker.openPopup();
                    }
                  }}
                  className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:border-[#8c1d3b] hover:shadow-md transition-all text-right group"
                >
                  <h3 className="font-bold text-[#2B3440] font-tajawal group-hover:text-[#8c1d3b] transition-colors">{branch.name}</h3>
                  {branch.address && <p className="text-xs text-gray-500 mt-2 font-tajawal leading-relaxed">{branch.address}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Map Area */}
      <div className={`w-full ${hideSidebar ? 'md:w-full' : 'md:w-2/3'} h-full relative z-10`}>
        <MapContainer 
          center={[24.7136, 46.6753]} 
          zoom={5} 
          style={{ height: '100%', width: '100%', zIndex: 1 }}
          scrollWheelZoom={true}
        >
          <MapController center={activeBranch} zoom={15} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {branches.map((branch) => (
            <Marker 
              key={branch.id} 
              position={[branch.lat, branch.lng]} 
              icon={customIcon}
              ref={(ref) => {
                if (ref) markerRefs.current[branch.id] = ref;
              }}
            >
              <Popup>
                <div className="text-right" style={{ direction: 'rtl', fontFamily: 'Tajawal, sans-serif' }}>
                  <h3 className="font-bold text-lg text-[#2B3440] mb-1">{branch.name}</h3>
                  {branch.address && <p className="text-sm text-gray-600 m-0">{branch.address}</p>}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
