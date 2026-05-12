"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChevronRight, ChevronLeft, X } from "lucide-react";
import * as DialogPrimitive from "@base-ui/react/dialog";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface ImageGalleryModalProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageGalleryModal({
  images,
  initialIndex,
  isOpen,
  onClose,
}: ImageGalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Update current index when modal opens with a new initial index
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      {/* showCloseButton={false} prevents the default Shadcn close button so we can use our custom circle one */}
      <DialogContent 
        showCloseButton={false}
        className="w-[95vw] sm:max-w-[700px] md:max-w-[850px] h-[85vh] p-0 gap-0 overflow-hidden rounded-md bg-white flex flex-col border-0 shadow-2xl" 
        dir="rtl"
      >
        <DialogTitle className="sr-only">Product Image Gallery</DialogTitle>
        
        {/* Custom Circular Close Button matching FACES */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-[0_2px_15px_rgba(0,0,0,0.15)] text-gray-500 hover:text-black transition-colors"
        >
          <X size={20} strokeWidth={1.5} />
        </button>

        {/* Main Image Area with Zoom/Pan */}
        <div className="flex-1 relative flex items-center justify-center bg-white overflow-hidden p-8 cursor-grab active:cursor-grabbing">
          <TransformWrapper
            key={currentIndex} // Re-mount when image changes to reset zoom
            initialScale={1}
            minScale={1}
            maxScale={4}
            centerOnInit
            doubleClick={{ step: 1.5 }}
            wheel={{ step: 0.1 }}
          >
            <TransformComponent wrapperClass="!w-full !h-full flex items-center justify-center" contentClass="!w-full !h-full flex items-center justify-center">
              <img
                src={images[currentIndex]}
                alt={`Product view ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain pointer-events-none"
              />
            </TransformComponent>
          </TransformWrapper>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-[0_2px_15px_rgba(0,0,0,0.15)] text-gray-600 hover:text-black transition-colors z-10"
              >
                <ChevronRight size={22} strokeWidth={1.5} />
              </button>
              
              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-[0_2px_15px_rgba(0,0,0,0.15)] text-gray-600 hover:text-black transition-colors z-10"
              >
                <ChevronLeft size={22} strokeWidth={1.5} />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails Area */}
        {images.length > 1 && (
          <div className="h-28 shrink-0 bg-white flex items-center justify-center gap-4 px-4 pb-4">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
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
