"use client";

import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChevronRight, ChevronLeft, X, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";

interface ImageGalleryModalProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

/* ─── Inner controls bar (needs to be inside TransformWrapper) ─── */
function ZoomControls({ isZoomed }: { isZoomed: boolean }) {
  const { zoomIn, zoomOut, resetTransform } = useControls();
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
      <button
        onClick={() => zoomOut()}
        className="w-9 h-9 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.15)] flex items-center justify-center text-gray-600 hover:text-black transition-colors disabled:opacity-30"
        title="تصغير"
      >
        <ZoomOut size={17} strokeWidth={1.8} />
      </button>
      <button
        onClick={() => zoomIn()}
        className="w-9 h-9 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.15)] flex items-center justify-center text-gray-600 hover:text-black transition-colors"
        title="تكبير"
      >
        <ZoomIn size={17} strokeWidth={1.8} />
      </button>
      {isZoomed && (
        <button
          onClick={() => resetTransform()}
          className="flex items-center gap-1 px-3 h-9 rounded-full bg-black text-white text-[11px] font-bold shadow-md hover:bg-gray-800 transition-colors"
          title="إعادة ضبط"
        >
          <Maximize2 size={12} />
          إعادة الضبط
        </button>
      )}
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────── */
export default function ImageGalleryModal({
  images,
  initialIndex,
  isOpen,
  onClose,
}: ImageGalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed]         = useState(false);
  const resetRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setIsZoomed(false);
    }
  }, [isOpen, initialIndex]);

  const handleNavigate = (dir: "next" | "prev") => {
    resetRef.current?.();
    setIsZoomed(false);
    setCurrentIndex((p) =>
      dir === "next"
        ? p === images.length - 1 ? 0 : p + 1
        : p === 0 ? images.length - 1 : p - 1
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="z-1000 w-[95vw] sm:max-w-[700px] md:max-w-[850px] h-[85vh] p-0 gap-0 overflow-hidden rounded-md bg-white flex flex-col border-0 shadow-2xl"
        dir="rtl"
      >
        <DialogTitle className="sr-only">معرض صور المنتج</DialogTitle>

        {/* ── Close ── */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-[0_2px_15px_rgba(0,0,0,0.15)] text-gray-500 hover:text-black transition-colors"
        >
          <X size={20} strokeWidth={1.5} />
        </button>

        {/* ── Hint badge ── */}
        <div className="absolute top-4 left-4 z-40 pointer-events-none select-none">
          <span className="flex items-center gap-1.5 bg-black/40 text-white text-[11px] px-3 py-1.5 rounded-full">
            <ZoomIn size={12} />
            {isZoomed ? "اسحب للتنقل • اضغط مرتين للرجوع" : "اضغط مرتين للتكبير أو استخدم عجلة الفأرة"}
          </span>
        </div>

        {/* ── Zoomable image area ── */}
        <div className="flex-1 relative overflow-hidden bg-white">
          <TransformWrapper
            key={currentIndex} // remount on image change → reset zoom
            initialScale={1}
            minScale={1}
            maxScale={5}
            centerOnInit
            doubleClick={{ step: 1.8 }}
            wheel={{ step: 0.08 }}
            panning={{ velocityDisabled: false }}
            onTransformed={(_, state) => setIsZoomed(state.scale > 1.05)}
            onInit={(ref) => { resetRef.current = () => ref.resetTransform(); }}
          >
            {() => (
              <div className="relative w-full h-full">
                <TransformComponent
                  wrapperClass="!w-full !h-full"
                  contentClass="!w-full !h-full flex items-center justify-center p-8"
                >
                  <img
                    src={images[currentIndex]}
                    alt={`Product view ${currentIndex + 1}`}
                    draggable={false}
                    className="max-w-full max-h-full object-contain select-none"
                    style={{ maxHeight: "calc(85vh - 7rem)" }}
                  />
                </TransformComponent>

                {/* ── Zoom controls (inside TransformWrapper context) ── */}
                <ZoomControls isZoomed={isZoomed} />
              </div>
            )}
          </TransformWrapper>

          {/* ── Navigation arrows (outside TransformComponent so they don't zoom) ── */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => handleNavigate("prev")}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-[0_2px_15px_rgba(0,0,0,0.15)] text-gray-600 hover:text-black transition-colors z-10"
              >
                <ChevronRight size={22} strokeWidth={1.5} />
              </button>
              <button
                onClick={() => handleNavigate("next")}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-[0_2px_15px_rgba(0,0,0,0.15)] text-gray-600 hover:text-black transition-colors z-10"
              >
                <ChevronLeft size={22} strokeWidth={1.5} />
              </button>
            </>
          )}
        </div>

        {/* ── Thumbnails ── */}
        {images.length > 1 && (
          <div className="h-28 shrink-0 bg-white flex items-center justify-center gap-4 px-4 pb-4 border-t border-gray-100">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => {
                  resetRef.current?.();
                  setIsZoomed(false);
                  setCurrentIndex(idx);
                }}
                className={`w-16 h-20 shrink-0 rounded-sm overflow-hidden transition-all bg-white flex items-center justify-center p-1 ${
                  currentIndex === idx
                    ? "border border-black shadow-sm"
                    : "border border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </button>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
