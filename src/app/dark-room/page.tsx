"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const QUESTIONS = [
  "الليل ولا النهار؟",
  "القوة ولا النعومة؟",
  "الغموض ولا الوضوح؟",
  "الصحرا ولا البحر؟",
  "العمق ولا الخفة؟"
];

const BLACK_COLLECTION = [
  { id: "b1", name: "Balmy Noir", price: "2,500" },
  { id: "b2", name: "Oud Absolute", price: "3,200" },
  { id: "b3", name: "Midnight Leather", price: "2,800" }
];

const WHITE_COLLECTION = [
  { id: "w1", name: "Balmy Blanc", price: "1,900" },
  { id: "w2", name: "Pure Silk", price: "2,100" },
  { id: "w3", name: "Morning Breeze", price: "1,750" }
];

export default function BalmyExperience() {
  const router = useRouter();
  const [stage, setStage] = useState<'intro' | 'quiz' | 'result'>('intro');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  
  // Track current background color: 'black' or 'white'
  const [bgColor, setBgColor] = useState<'black' | 'white'>('black');
  
  // Track clicks
  const [blackCount, setBlackCount] = useState(0);
  const [whiteCount, setWhiteCount] = useState(0);

  const handleStart = () => {
    setStage('quiz');
  };

  const handleAnswer = (choice: 'black' | 'white') => {
    // 1. Immediately change background
    setBgColor(choice);
    
    // 2. Register score
    if (choice === 'black') {
      setBlackCount(prev => prev + 1);
    } else {
      setWhiteCount(prev => prev + 1);
    }

    // 3. Move to next question or result
    setTimeout(() => {
      if (currentQIndex < QUESTIONS.length - 1) {
        setCurrentQIndex(prev => prev + 1);
      } else {
        setStage('result');
      }
    }, 400); // Wait for bg transition before next question
  };

  const isBlackBg = bgColor === 'black';

  return (
    <div className="min-h-screen flex flex-col font-tajawal dir-rtl">
      {/* <Navbar /> */}

      <div 
        className={`flex-1 w-full flex flex-col items-center justify-center transition-colors duration-400 ease-in-out min-h-[80vh] relative py-12`}
        style={{ 
          backgroundColor: isBlackBg ? '#000000' : '#FFFFFF',
          color: isBlackBg ? '#FFFFFF' : '#000000'
        }}
      >
      {/* Close button to exit experience */}
      <button 
        onClick={() => router.push('/')}
        className="absolute top-8 right-8 z-50 text-sm tracking-widest uppercase font-bold opacity-50 hover:opacity-100 transition-opacity flex items-center gap-2"
      >
       الخروج من الغرفة
      </button>

      {/* STAGE: INTRO */}
      {stage === 'intro' && (
        <div className="text-center animate-in fade-in duration-1000">
          <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tight">اكتشف عطرك</h1>
          <p className="text-lg md:text-xl font-light opacity-70 mb-16 tracking-widest">
            5 أسئلة بس — وهتعرف أنت مين
          </p>
          <button 
            onClick={handleStart}
            className={`px-12 py-3 border rounded-full text-lg font-light tracking-widest transition-colors duration-300
              ${isBlackBg ? 'border-white hover:bg-white hover:text-black' : 'border-black hover:bg-black hover:text-white'}
            `}
          >
            ابدأ
          </button>
        </div>
      )}

      {/* STAGE: QUIZ */}
      {stage === 'quiz' && (
        <div className="w-full max-w-2xl px-6 flex flex-col items-center animate-in fade-in zoom-in-95 duration-500">
          <h2 className="text-4xl md:text-5xl font-light mb-24 text-center tracking-wide h-20 flex items-center justify-center">
            {QUESTIONS[currentQIndex]}
          </h2>
          
          <div className="flex gap-16 md:gap-32 items-center justify-center mb-24">
            {/* White Circle Button */}
            <button 
              onClick={() => handleAnswer('white')}
              className={`w-20 h-20 md:w-24 md:h-24 rounded-full bg-white hover:scale-110 transition-transform duration-300 ${!isBlackBg ? 'border-2 border-black' : ''}`}
              aria-label="أبيض"
            ></button>
            
            {/* Black Circle Button */}
            <button 
              onClick={() => handleAnswer('black')}
              className={`w-20 h-20 md:w-24 md:h-24 rounded-full bg-black hover:scale-110 transition-transform duration-300 ${isBlackBg ? 'border-2 border-white' : ''}`}
              aria-label="أسود"
            ></button>
          </div>

          {/* Progress Dots */}
          <div className="flex gap-3">
            {QUESTIONS.map((_, idx) => (
              <div 
                key={idx}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  idx <= currentQIndex 
                    ? (isBlackBg ? 'bg-white' : 'bg-black') 
                    : (isBlackBg ? 'bg-white/20' : 'bg-black/20')
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* STAGE: RESULT */}
      {stage === 'result' && (
        <div className="w-full max-w-5xl px-6 flex flex-col items-center animate-in fade-in duration-1000 h-full overflow-y-auto pt-20 pb-10">
          
          {/* SVG Perfume Bottle */}
          <div className="mb-8">
            <svg width="60" height="120" viewBox="0 0 60 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="0" width="20" height="25" fill={isBlackBg ? "white" : "black"} />
              <rect x="25" y="25" width="10" height="10" fill={isBlackBg ? "white" : "black"} />
              <path d="M10 35 L50 35 L60 120 L0 120 Z" fill={isBlackBg ? "white" : "black"} />
            </svg>
          </div>

          <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-wider text-center">
            أنت الـ {blackCount > whiteCount ? "Black Collection" : "White Collection"}
          </h2>
          <p className="text-lg md:text-xl font-light opacity-70 mb-16 text-center tracking-widest">
            {blackCount > whiteCount 
              ? "عطور قوية، غامضة، لا تُنسى" 
              : "عطور ناعمة، نقية، تلفت الأنظار"}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {(blackCount > whiteCount ? BLACK_COLLECTION : WHITE_COLLECTION).map((perfume) => (
              <div 
                key={perfume.id} 
                className={`flex flex-col items-center p-8 border ${isBlackBg ? 'border-white/20' : 'border-black/20'}`}
              >
                <div className="w-full aspect-[3/4] mb-6 flex items-center justify-center">
                  {/* Minimal Bottle Graphic inside card */}
                  <svg width="30" height="60" viewBox="0 0 60 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-50">
                    <rect x="20" y="0" width="20" height="25" fill={isBlackBg ? "white" : "black"} />
                    <rect x="25" y="25" width="10" height="10" fill={isBlackBg ? "white" : "black"} />
                    <path d="M10 35 L50 35 L60 120 L0 120 Z" fill={isBlackBg ? "white" : "black"} />
                  </svg>
                </div>
                <h3 className="text-xl font-light tracking-wider mb-2 text-center">{perfume.name}</h3>
                <p className="text-md font-bold mb-6 tracking-widest">{perfume.price} EGP</p>
                
                <button 
                  className={`w-full py-3 text-sm font-light tracking-widest transition-colors duration-300
                    ${isBlackBg ? 'bg-white text-black hover:bg-white/80' : 'bg-black text-white hover:bg-black/80'}
                  `}
                >
                  شراء
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      </div>
      {/* <Footer /> */}
    </div>
  );
}
