'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { setCartOpen, removeItem, updateQuantity } from '@/lib/features/cartSlice';
import { X, ShoppingBag, Trash2, Minus, Plus, ChevronRight, ChevronLeft } from 'lucide-react';
import { Dialog, DialogContent, DialogOverlay, DialogPortal } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function CartDrawer() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { items, isOpen } = useSelector((state: RootState) => state.cart);

  React.useEffect(() => {
    if (isOpen && items.length > 0) {
      const duration = 2 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 40 * (timeLeft / duration);
        confetti({ 
            ...defaults, 
            particleCount, 
            origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 },
            colors: ['#8c1d3b', '#000000', '#32a852', '#d4af37']
        });
        confetti({ 
            ...defaults, 
            particleCount, 
            origin: { x: randomInRange(0.6, 0.9), y: Math.random() - 0.2 },
            colors: ['#8c1d3b', '#000000', '#32a852', '#d4af37']
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isOpen, items.length]);

  const subtotal = items.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => dispatch(setCartOpen(open))}>
      <DialogPortal>
        <DialogOverlay className="bg-black/40 backdrop-blur-sm z-50" />
        <DialogContent 
          className={cn(
            "fixed inset-y-0 left-0 z-5000 h-full w-full max-w-[400px] flex flex-col gap-0 border-r bg-white p-0 shadow-2xl outline-none translate-x-0 translate-y-0 rtl:translate-x-0 !top-0 !start-0 !-translate-x-0 !-translate-y-0",
            "data-open:animate-in data-open:slide-in-from-left data-closed:animate-out data-closed:slide-out-to-left duration-300"
          )}
          showCloseButton={false}
        >
          {/* Header */}
          <div className="flex flex-col p-6 border-b shrink-0 bg-white">
            <div className="flex items-center justify-between mb-4">
               <button 
                onClick={() => dispatch(setCartOpen(false))}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-800" />
              </button>
              <h2 className="text-[18px] font-black text-gray-900 font-sans">تمت الإضافة إلى حقيبة المشتريات</h2>
            </div>

            {/* Progress/Celebration Bar */}
            <div className="flex flex-col gap-2">
                <div className="w-full h-2 bg-[#f0f0f0] rounded-full overflow-hidden">
                    <div className="w-full h-full bg-[#32a852] animate-in slide-in-from-right duration-1000"></div>
                </div>
                <div className="flex items-center gap-2 text-[#32a852]">
                    <div className="w-4 h-4 rounded-full border-2 border-[#32a852] flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-[#32a852] rounded-full"></div>
                    </div>
                    <span className="text-[14px] font-bold">تم إضافة المنتج إلى السلة</span>
                </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 no-scrollbar">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="relative">
                    <ShoppingBag className="w-20 h-20 text-gray-100" strokeWidth={1} />
                    <ShoppingBag className="w-16 h-16 text-gray-200 absolute inset-0 m-auto" strokeWidth={1} />
                </div>
                <p className="text-gray-400 font-bold text-[18px]">حقيبة المشتريات فارغة</p>
                <button 
                  onClick={() => dispatch(setCartOpen(false))}
                  className="bg-[#071424] text-white px-10 py-4 rounded-sm font-black text-[14px] hover:bg-black transition-colors mt-4"
                >
                  استمر في التسوق
                </button>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b pb-6 last:border-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="w-24 h-32 bg-gray-50 rounded-sm shrink-0 overflow-hidden p-2">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                      <div className="flex-1 flex flex-col justify-start">
                        <div className="text-right">
                          <h3 className="text-[16px] font-black text-gray-900 mb-1">{item.brand}</h3>
                          <h4 className="text-[14px] font-bold text-gray-600 mb-1 leading-tight">{item.name}</h4>
                          {item.engravedName && (
                              <p className="text-[12px] font-bold text-[#D4AF37] mb-1">
                                  نحت مخصص: {item.engravedName}
                              </p>
                          )}
                          <p className="text-[13px] text-gray-500 mb-2">الحجم: 100ml</p>
                          <p className="text-[16px] font-black text-gray-900">{item.price} ريال</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Choose your gift section */}
                <div className="mt-4 border-t pt-8">
                  <div className="flex items-center justify-between mb-4">
                     <div className="flex items-center gap-2">
                        <span className="text-[12px] font-bold text-gray-500">0 من 3 عينات مختارة</span>
                        <ShoppingBag className="w-5 h-5 text-gray-800" strokeWidth={1.5} />
                     </div>
                     <h3 className="text-[16px] font-black text-gray-900">اختر هديتك</h3>
                  </div>

                  <div className="relative">
                    <Swiper
                      modules={[Navigation]}
                      navigation={{
                        nextEl: '.gift-next',
                        prevEl: '.gift-prev',
                      }}
                      spaceBetween={12}
                      slidesPerView={2}
                      className="gift-swiper"
                    >
                      {[
                        { name: "مجاناً عطر بلاك اوبيوم", image: "/001717728336_1.jpg" },
                        { name: "مجاناً عطر ميو ميو", image: "/001717728336_1.jpg" },
                        { name: "مجاناً عطر دونا بورن", image: "/001717728336_1.jpg" },
                        { name: "مجاناً عطر ليبر", image: "/001717728336_1.jpg" },
                      ].map((gift, idx) => (
                        <SwiperSlide key={idx}>
                          <div className="flex flex-col items-center text-center gap-2 group">
                            <div className="w-full aspect-square bg-gray-50 rounded-sm p-4 overflow-hidden">
                              <img src={gift.image} alt={gift.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform" />
                            </div>
                            <p className="text-[10px] font-bold text-gray-600 leading-tight h-8 line-clamp-2">{gift.name}</p>
                            <button className="w-full border border-black py-1.5 text-[12px] font-black rounded-sm hover:bg-black hover:text-white transition-all">أضف</button>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    
                    <button className="gift-prev absolute right-[-10px] top-[35%] -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-800 hover:bg-black hover:text-white transition-all shadow-sm">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button className="gift-next absolute left-[-10px] top-[35%] -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-800 hover:bg-black hover:text-white transition-all shadow-sm">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t bg-white mt-auto shrink-0 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
              <div className="flex items-center justify-between mb-6">
                 <div className="flex flex-col items-start">
                    <span className="text-[18px] font-black text-gray-900">{subtotal.toLocaleString()} ريال</span>
                    <span className="text-[10px] text-gray-400">(شامل ضريبة القيمة المضافة بنسبة 15%)</span>
                 </div>
                <span className="text-[16px] font-black text-gray-900">المجموع الجزئي</span>
              </div>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => {
                    dispatch(setCartOpen(false));
                    router.push('/cart');
                  }}
                  className="w-full bg-black text-white py-4 font-black text-[16px] rounded-sm hover:bg-gray-900 transition-all active:scale-[0.98]"
                >
                  الانتقال إلى عملية الدفع
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
