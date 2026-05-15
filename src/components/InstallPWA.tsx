"use client";

import React, { useEffect, useState } from 'react';
import { Download, Share, PlusSquare, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showButton, setShowButton] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Register Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then((reg) => {
        console.log('SW Registered', reg);
      });
    }

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
        // Remember intent for when the prompt is ready
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

    // Register SW immediately
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .then(reg => {
          reg.update(); // Force update check
        })
        .catch(err => console.log('SW registration failed:', err));
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

    // If it's iOS and not standalone, show the button anyway for instructions
    if (isIOSDevice && !isPWA) {
      setShowButton(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowButton(false);
        setDeferredPrompt(null);
      }
    } else {
      // Fallback for other browsers if event didn't fire
      if (isIOS) {
        setShowIOSInstructions(true);
      } else {
        alert('جاري تجهيز التحميل... يرجى الانتظار ثانية أو تحديث الصفحة إذا لم يظهر خيار التثبيت من المتصفح.');
      }
    }
  };

  if (isStandalone) return null;

  return (
    <>
      <button
        className="install-pwa-trigger hidden"
        onClick={handleInstallClick}
      />

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
    </>
  );
};

export default InstallPWA;

