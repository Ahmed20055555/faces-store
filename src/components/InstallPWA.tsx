"use client";

import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowButton(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    window.addEventListener('appinstalled', () => {
      setShowButton(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowButton(false);
      setDeferredPrompt(null);
    }
  };

  if (!showButton) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.5, x: -50 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.5, x: -50 }}
        className="fixed bottom-24 md:bottom-8 left-8 z-[9999] group flex items-center gap-3"
        dir="rtl"
      >
        <div className="bg-white px-4 py-2 rounded-full shadow-xl opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 font-black text-[11px] border border-gray-100 uppercase tracking-widest">
          تثبيت التطبيق
        </div>
        <button
          onClick={handleInstallClick}
          className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 relative border border-white/10"
        >
          <Download className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#8c1d3b] rounded-full border-2 border-white animate-pulse"></span>
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default InstallPWA;
