"use client";

import React, { useEffect, useState } from 'react';
import { Download, Share, PlusSquare, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showButton, setShowButton] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Register Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .then(reg => {
          reg.update();
        })
        .catch(err => console.log('SW registration failed:', err));
    }

    // Expose install function globally for direct access
    (window as any).installBalmyApp = handleInstallClick;

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowButton(true);
      
      // Auto-trigger if user already expressed intent
      if (window.sessionStorage.getItem('pwa-install-requested') === 'true') {
        e.prompt();
        window.sessionStorage.removeItem('pwa-install-requested');
      }
    };

    const handleTriggerInstall = () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
      } else {
        window.sessionStorage.setItem('pwa-install-requested', 'true');
        handleInstallClick();
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('trigger-pwa-install', handleTriggerInstall);

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowButton(false);
    }

    // Detect iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIOSDevice);

    const isPWA = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    setIsStandalone(!!isPWA);

    window.addEventListener('appinstalled', () => {
      setShowButton(false);
      setDeferredPrompt(null);
      setIsStandalone(true);
    });

    if (isIOSDevice && !isPWA) {
      setShowButton(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('trigger-pwa-install', handleTriggerInstall);
    };
  }, [deferredPrompt]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          setShowButton(false);
          setDeferredPrompt(null);
        }
      } catch (err) {
        console.error('Install prompt error:', err);
      }
    } else if (isIOS) {
      setShowIOSInstructions(true);
    } else {
      setIsPreparing(true);
      setTimeout(() => {
        if (!deferredPrompt) {
          setIsPreparing(false);
          setShowManualModal(true);
        } else {
          setIsPreparing(false);
          deferredPrompt.prompt();
        }
      }, 1500);
    }
  };

  if (isStandalone) return null;

  return (
    <>
      <button
        className="install-pwa-trigger hidden"
        onClick={handleInstallClick}
      />

      {/* Loading state when preparing installation */}
      <AnimatePresence>
        {isPreparing && (
          <div className="fixed inset-0 z-[10002] flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-zinc-900 border border-white/10 p-6 rounded-3xl flex flex-col items-center gap-4 shadow-2xl"
            >
              <div className="w-12 h-12 border-4 border-white/10 border-t-[#8c1d3b] rounded-full animate-spin"></div>
              <p className="text-white font-black text-sm">جاري التجهيز...</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {showButton && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 md:bottom-8 left-6 z-[9999]"
            dir="rtl"
          >
            <button
              onClick={handleInstallClick}
              className="flex items-center gap-3 bg-black text-white px-5 py-3 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20 group"
            >
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-[#8c1d3b] transition-colors">
                <Download className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col items-start leading-tight">
                <span className="text-[10px] opacity-70 font-medium">تطبيق Balmy</span>
                <span className="text-[13px] font-black tracking-wide">تثبيت الآن</span>
              </div>
            </button>
          </motion.div>
        </AnimatePresence>
      )}

      {/* iOS Instructions Modal */}
      <AnimatePresence>
        {showIOSInstructions && (
          <div className="fixed inset-0 z-[10000] flex items-end justify-center p-4 sm:items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowIOSInstructions(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl overflow-hidden"
              dir="rtl"
            >
              <button
                onClick={() => setShowIOSInstructions(false)}
                className="absolute top-4 left-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-black rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <img src="/icons/icon-192x192.png" alt="Balmy" className="w-12 h-12 rounded-lg" />
                </div>
                <h3 className="text-xl font-black text-gray-900">تثبيت تطبيق Balmy</h3>
                <p className="text-gray-500 text-sm mt-2">أضف التطبيق إلى شاشتك الرئيسية للوصول السريع</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                    <Share className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">1. اضغط على زر المشاركة</p>
                    <p className="text-gray-500 text-xs mt-0.5">موجود في أسفل المتصفح</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                    <PlusSquare className="w-5 h-5 text-gray-700" />
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">2. اختر "إضافة إلى الشاشة الرئيسية"</p>
                    <p className="text-gray-500 text-xs mt-0.5">Add to Home Screen</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowIOSInstructions(false)}
                className="w-full mt-8 py-4 bg-black text-white rounded-2xl font-black text-sm hover:bg-gray-900 transition-colors"
              >
                فهمت ذلك
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Manual Installation Guide Modal */}
      <AnimatePresence>
        {showManualModal && (
          <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowManualModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-zinc-900 border border-white/10 rounded-[40px] p-8 shadow-2xl overflow-hidden text-center"
              dir="rtl"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8c1d3b] to-transparent"></div>
              
              <button
                onClick={() => setShowManualModal(false)}
                className="absolute top-6 left-6 text-white/40 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="mb-8 mt-4">
                <div className="w-24 h-24 bg-gradient-to-br from-zinc-800 to-black rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-inner border border-white/5 relative group">
                  <div className="absolute inset-0 bg-[#8c1d3b]/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <img src="/icons/icon-192x192.png" alt="Balmy" className="w-16 h-16 rounded-2xl relative z-10" />
                </div>
                <h3 className="text-2xl font-black text-white mb-2">تثبيت Balmy</h3>
                <p className="text-zinc-400 text-sm">استمتع بتجربة تسوق فاخرة ومباشرة</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-right">
                  <p className="text-white text-sm font-bold flex items-center gap-2">
                    <span className="w-5 h-5 bg-[#8c1d3b] rounded-full flex items-center justify-center text-[10px]">1</span>
                    {isIOS ? 'اضغط على زر المشاركة' : 'اضغط على النقاط الثلاث في المتصفح'}
                  </p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-right">
                  <p className="text-white text-sm font-bold flex items-center gap-2">
                    <span className="w-5 h-5 bg-[#8c1d3b] rounded-full flex items-center justify-center text-[10px]">2</span>
                    اختر "إضافة إلى الشاشة الرئيسية"
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowManualModal(false)}
                className="w-full py-4 bg-white text-black rounded-2xl font-black text-sm hover:bg-zinc-200 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                حسناً، سأفعل ذلك
              </button>
              
              <p className="mt-6 text-zinc-500 text-[10px] uppercase tracking-widest font-bold">Balmy Luxury Experience</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default InstallPWA;
