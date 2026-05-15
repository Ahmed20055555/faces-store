"use client";

import React, { useState, useEffect } from 'react';
import OrderConfirmation from '@/components/OrderConfirmation';

export default function TrackOrderPage() {
    const [showConfirmation, setShowConfirmation] = useState(true);

    // Mock data for the demonstration
    const orderData = {
        customerName: "أحمد محمد",
        orderId: "BALMY-51732",
        productName: "Balmy Noir",
        productImage: null, // Use the SVG elegant bottle
        collection: "black" as const
    };

    return (
        <main className="min-h-screen bg-black">
            {showConfirmation ? (
                <OrderConfirmation 
                    customerName={orderData.customerName}
                    orderId={orderData.orderId}
                    productName={orderData.productName}
                    productImage={orderData.productImage}
                    collection={orderData.collection}
                />
            ) : (
                <div className="flex items-center justify-center h-screen text-white">
                    {/* Placeholder for regular tracking view if needed */}
                    <button onClick={() => setShowConfirmation(true)} className="border border-white/20 px-6 py-3 rounded-full">
                        عرض تأكيد الطلب السينمائي
                    </button>
                </div>
            )}
        </main>
    );
}
