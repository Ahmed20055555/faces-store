'use client';

import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import ProductCard from "@/components/ProductCard";
import { Heart, ShoppingBag } from 'lucide-react';

export default function FavoritesPage() {
    const { items } = useSelector((state: RootState) => state.favorites);

    return (
        <main className="min-h-screen bg-[#faf9f8]" dir="rtl">
            <Navbar isSticky={true} />

            <div className="max-w-[1400px] mx-auto px-4 md:px-12 py-8 font-sans">
                <div className="flex items-center gap-3 mb-8">
                    <Heart className="w-8 h-8 text-[#8c1d3b] fill-[#8c1d3b]" />
                    <h1 className="text-[28px] md:text-[32px] font-black text-gray-900">قائمة أمنياتي ({items.length})</h1>
                </div>

                {items.length === 0 ? (
                    <div className="bg-white p-20 rounded-sm border border-gray-100 flex flex-col items-center gap-6 shadow-sm">
                        <div className="relative">
                            <Heart className="w-24 h-24 text-gray-100" strokeWidth={1} />
                            <Heart className="w-16 h-16 text-gray-200 absolute inset-0 m-auto" strokeWidth={1} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-400">قائمة أمنياتك فارغة</h2>
                        <p className="text-gray-500 max-w-md text-center">أضف المنتجات التي تحبها إلى قائمة أمنياتك لتتمكن من العودة إليها لاحقاً وشرائها.</p>
                        <a href="/" className="bg-black text-white px-12 py-4 rounded-sm font-black transition-transform active:scale-95">ابدأ التسوق الآن</a>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {items.map((product) => (
                            <ProductCard 
                                key={product.id}
                                id={product.id}
                                brand={product.brand}
                                name={product.name}
                                price={product.price}
                                image={product.image}
                            />
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
