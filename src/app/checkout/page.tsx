'use client';

import React, { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { CheckCircle2, Lock, X, HelpCircle, MapPin, Navigation, Store, CreditCard, Banknote } from 'lucide-react';
import MapWrapper from '@/components/MapWrapper';
import { useRouter } from 'next/navigation';
import { cn } from "@/lib/utils";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const PICKUP_BRANCHES = [
    { id: 1, name: "تبوك بارك", address: "تبوك، مول بارك" },
    { id: 2, name: "حائل الأمير سلطان", address: "حائل، حي الوسيطاء، طريق الأمير سلطان" },
    { id: 3, name: "حائل سكوير", address: "حائل، حي الوسيطاء، مجمع سكوير" },
    { id: 4, name: "حفر الباطن", address: "حفر الباطن، حي البلدية، طريق الملك فيصل" },
    { id: 5, name: "نجران رويال سنتر", address: "نجران، رويال سنتر، طريق الملك عبد العزيز" },
    { id: 6, name: "تبوك الموسي", address: "تبوك، حي العليا" },
    { id: 7, name: "تبوك ميلاغرو", address: "تبوك، حي المطار، العليا الجديدة" },
    { id: 8, name: "الرياض أطياف مول", address: "الرياض، حي اليرموك، أطياف مول" },
    { id: 9, name: "نجران رويل سنتر", address: "نجران، رويل سنتر، طريق الملك عبد العزيز" },
    { id: 10, name: "جازان كادي مول", address: "جازان، حي الشاطئ، كادي مول" },
    { id: 11, name: "خميس مشيط", address: "خميس مشيط، حي ام سرار، طريق المطار" },
    { id: 12, name: "نجران الخالدية", address: "نجران، حي الخالدية، طريق الملك عبد العزيز" },
    { id: 13, name: "حائل النقرة", address: "حائل، حي النقرة، طريق فهد العلي" },
    { id: 14, name: "نجران بارك", address: "نجران، حي الاثيبه، طريق الملك عبد العزيز" },
    { id: 15, name: "حائل زون", address: "حائل، حي النقرة، مجمع حائل زون" },
    { id: 16, name: "الباحة", address: "الباحة، حي الشفاء، الغنيم مول مقابل البليفارد" },
    { id: 17, name: "نجران الفيصلية", address: "نجران، حي الفيصلية، طريق الملك عبد العزيز" },
    { id: 18, name: "نجران العزام مول", address: "نجران، حي الفيصلية، طريق الملك عبد العزيز" },
];

export default function CheckoutPage() {
    const router = useRouter();
    const { items } = useSelector((state: RootState) => state.cart);
    const subtotal = items.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
    const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
    const [paymentMethod, setPaymentMethod] = useState<'online' | 'cod'>('online');
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCvv, setCardCvv] = useState('');
    const [isPaying, setIsPaying] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [selectedBranch, setSelectedBranch] = useState<number | null>(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [pickupStep, setPickupStep] = useState<'buttons' | 'list' | 'confirmed'>('buttons');
    const [isDeliveryConfirmed, setIsDeliveryConfirmed] = useState(false);
    const [formData, setFormData] = useState({
        firstName: 'جاري التحميل...',
        lastName: '',
        phone: '',
        city: '',
        district: '',
        street: '',
        buildingNo: '',
        notes: '',
    });

    useEffect(() => {
        const savedInfo = localStorage.getItem('customerInfo');
        if (savedInfo) {
            setFormData(JSON.parse(savedInfo));
        }
    }, []);

    const saveOrderToAdmin = (method: 'online' | 'cod', status: 'paid' | 'cod') => {
        const orderId = "BALMY-" + Math.floor(10000 + Math.random() * 90000);
        const newOrder = {
            id: orderId,
            customerName: formData.firstName + " " + formData.lastName,
            phone: formData.phone,
            address: deliveryMethod === 'delivery'
                ? `${formData.city}، حي ${formData.district}، شارع ${formData.street}، مبنى ${formData.buildingNo}`
                : `استلام من فرع: ${selectedBranchData?.name || 'الفرع الرئيسي'}`,
            items: items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image,
                engravedName: item.engravedName || null
            })),
            amount: subtotal,
            paymentMethod: method,
            paymentStatus: status,
            status: 'received', // 'received', 'preparing', 'shipping', 'delivered'
            time: 'الآن'
        };

        const existingOrders = JSON.parse(localStorage.getItem('adminOrders') || '[]');
        existingOrders.unshift(newOrder);
        localStorage.setItem('adminOrders', JSON.stringify(existingOrders));

        localStorage.setItem('activeOrderId', orderId);
        localStorage.setItem('selectedPaymentMethod', method);
        localStorage.setItem('selectedOrderTotal', subtotal.toString());
        localStorage.setItem('paymentStatus', status);
    };

    const handleCheckout = () => {
        if (paymentMethod === 'online') {
            setIsPaymentModalOpen(true);
        } else {
            saveOrderToAdmin('cod', 'cod');
            router.push('/track');
        }
    };

    const selectedBranchData = PICKUP_BRANCHES.find(b => b.id === selectedBranch);

    return (
        <main className="min-h-screen bg-[#faf9f8]" dir="rtl">
            <Navbar />

            <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-6 md:py-8 font-sans">
                <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-start">

                    {/* Right Column: Checkout Details */}
                    <div className="flex-1 w-full flex flex-col gap-6 order-1">

                        {/* Account Section */}
                        <div className="bg-white p-4 md:p-6 border border-gray-200 rounded-sm flex flex-row flex-wrap items-center justify-between gap-4 shadow-sm">

                            <div className="flex flex-col items-start gap-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-black text-[16px] md:text-[20px] text-gray-900">حساب</span>
                                    <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#12b76a]" strokeWidth={2.5} />
                                </div>
                                <span className="text-gray-500 text-[12px] md:text-[14px]">ahmedgg12347800@gmail.com</span>
                            </div>
                            <button className="border border-[#8c1d3b] text-[#8c1d3b] px-6 py-1.5 rounded-full font-bold hover:bg-[#8c1d3b] hover:text-white transition-colors text-sm">
                                تعديل
                            </button>
                        </div>

                        {/* Delivery Section */}
                        <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
                            <div className="p-4 md:p-6 pb-0">

                                {/* Delivery Tabs */}
                                <div className="flex border-b border-gray-100 w-full mb-6 overflow-x-auto scrollbar-hide">
                                    <button
                                        onClick={() => { setDeliveryMethod('pickup'); setPickupStep('buttons'); }}
                                        className={`flex-1 py-3 px-2 md:px-4 text-center font-bold text-[12px] md:text-[14px] whitespace-nowrap transition-colors relative ${deliveryMethod === 'pickup' ? 'text-[#8c1d3b]' : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        الاستلام من المتجر
                                        {deliveryMethod === 'pickup' && (
                                            <div className="absolute bottom-[-1px] left-0 right-0 h-[2.5px] bg-[#8c1d3b]"></div>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => setDeliveryMethod('delivery')}
                                        className={`flex-1 py-3 px-2 md:px-4 text-center font-bold text-[12px] md:text-[14px] whitespace-nowrap transition-colors relative ${deliveryMethod === 'delivery' ? 'text-[#8c1d3b]' : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        التوصيل إلى العنوان
                                        {deliveryMethod === 'delivery' && (
                                            <div className="absolute bottom-[-1px] left-0 right-0 h-[2.5px] bg-[#8c1d3b]"></div>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* ===== DELIVERY: Address Summary + Branch List (No Map) ===== */}
                            {deliveryMethod === 'delivery' && (
                                <div className="px-4 md:px-6 pb-6 md:pb-8">
                                    {isDeliveryConfirmed ? (
                                        <div className="bg-[#12b76a]/5 border-2 border-[#12b76a]/20 rounded-sm p-6 md:p-10 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-500 w-full">
                                            <div className="w-16 h-16 md:w-20 md:h-20 bg-[#12b76a]/10 rounded-full flex items-center justify-center mb-6">
                                                <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-[#12b76a]" strokeWidth={2.5} />
                                            </div>
                                            <h3 className="text-[18px] md:text-[22px] font-black text-gray-900 mb-4">تم تأكيد العنوان والفرع ✅</h3>
                                            <p className="text-[15px] md:text-[18px] font-bold text-gray-700 leading-relaxed max-w-2xl">
                                                هيتم توصيل الاوردر من العنوان بتاع العميل <span className="text-[#8c1d3b]">{formData.city} - {formData.district}</span> و اسم الفرع <span className="text-[#8c1d3b]">{selectedBranchData?.name}</span>.
                                                <br />
                                                اضغط علي دفع الان واختار وسيله الدفع وانتظر الاوردر.
                                            </p>
                                            <button
                                                onClick={() => setIsDeliveryConfirmed(false)}
                                                className="mt-8 text-[14px] text-gray-400 hover:text-[#8c1d3b] underline font-bold"
                                            >
                                                تغيير البيانات
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col lg:flex-row gap-6">
                                            {/* Right Column: Address Details */}
                                            <div className="flex-1 bg-gray-50 rounded-sm border border-gray-100 p-4 md:p-6">
                                                <div className="flex flex-col gap-2 md:gap-3 mb-4 md:mb-6 items-start">
                                                    <div className="flex items-center gap-1.5 md:gap-2">
                                                        <MapPin className="w-4 h-4 md:w-5 md:h-5 text-[#8c1d3b] shrink-0" />
                                                        <h3 className="font-black text-[14px] md:text-[18px] text-gray-900 whitespace-nowrap">عنوان التوصيل</h3>
                                                    </div>
                                                    <button
                                                        onClick={() => router.push('/checkout/info')}
                                                        className="text-[#8c1d3b] text-[12px] md:text-[13px] font-bold hover:underline whitespace-nowrap pr-6 md:pr-7"
                                                    >
                                                        تعديل العنوان
                                                    </button>
                                                </div>

                                                {/* Address Summary Card */}
                                                <div className="bg-white border border-gray-200 rounded-sm p-5 shadow-sm mb-6">
                                                    <div className="flex flex-col gap-3 text-right">
                                                        <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                                                            <span className="text-gray-400 text-[11px] md:text-[12px]">الاسم</span>
                                                            <span className="text-gray-900 font-bold text-[13px] md:text-base text-left dir-ltr">{formData.firstName} {formData.lastName}</span>
                                                        </div>
                                                        <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                                                            <span className="text-gray-400 text-[11px] md:text-[12px]">رقم الجوال</span>
                                                            <span className="text-gray-900 font-bold text-[13px] md:text-base text-left dir-ltr">{formData.phone}</span>
                                                        </div>
                                                        <div className="pt-1">
                                                            <span className="text-gray-400 text-[11px] md:text-[12px] block mb-1">العنوان بالتفصيل</span>
                                                            <p className="text-gray-900 font-bold text-[13px] md:text-base leading-relaxed">
                                                                {formData.city}، {formData.district}، {formData.street}
                                                                {formData.buildingNo && `، مبنى ${formData.buildingNo}`}
                                                            </p>
                                                            {formData.notes && (
                                                                <p className="text-gray-500 text-[13px] mt-2 bg-gray-50 p-2 rounded-sm italic">
                                                                    " {formData.notes} "
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Left Column: Branches List */}
                                            <div className="w-full lg:w-[320px] shrink-0 flex flex-col">
                                                <div className="flex items-center justify-between mb-4 ">
                                                    <h3 className="font-black text-[16px] text-gray-900">الفروع للاستلام </h3>
                                                    <span className="text-[12px] text-gray-400 font-bold bg-gray-100 px-2 py-1 rounded-sm">{PICKUP_BRANCHES.length} فرع</span>
                                                </div>
                                                <div className="flex flex-col gap-2 max-h-[450px] overflow-y-auto custom-scrollbar pl-2">
                                                    {PICKUP_BRANCHES.map(branch => {
                                                        const isSameCity = branch.address.includes(formData.city);
                                                        return (
                                                            <div
                                                                key={branch.id}
                                                                onClick={() => {
                                                                    setSelectedBranch(branch.id);
                                                                    setIsConfirmModalOpen(true);
                                                                }}
                                                                className={`p-3 rounded-sm border cursor-pointer transition-all ${selectedBranch === branch.id ? 'border-[#8c1d3b] bg-[#8c1d3b]/5' : 'border-gray-200 hover:border-gray-300'}`}
                                                            >
                                                                <div className="flex items-center justify-between mb-1">
                                                                    {isSameCity && <span className="text-[10px] bg-[#12b76a]/10 text-[#12b76a] px-1.5 py-0.5 rounded-full font-black">في مدينتك</span>}
                                                                    <h4 className={`font-bold text-[14px] text-right flex-1 ${selectedBranch === branch.id ? 'text-[#8c1d3b]' : 'text-gray-800'}`}>{branch.name}</h4>
                                                                </div>
                                                                <p className="text-gray-400 text-[11px] text-right line-clamp-1">{branch.address}</p>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* ===== PICKUP: Buttons → List → Confirmed ===== */}
                            {deliveryMethod === 'pickup' && (
                                <div className="px-6 pb-6">
                                    {/* Step 1: Choice Buttons */}
                                    {pickupStep === 'buttons' && (
                                        <div className="flex flex-col items-center justify-center py-8 md:py-16 border-2 border-dashed border-gray-200 rounded-sm bg-gray-50/50">
                                            <div className="w-12 h-12 md:w-16 md:h-16 bg-[#8c1d3b]/10 rounded-full flex items-center justify-center mb-4 md:mb-6">
                                                <Store className="w-6 h-6 md:w-8 md:h-8 text-[#8c1d3b]" />
                                            </div>
                                            <h3 className="text-[16px] md:text-[20px] font-black text-gray-900 mb-2">كيف تود اختيار الفرع؟</h3>
                                            <p className="text-gray-500 text-[12px] md:text-[14px] mb-6 md:mb-8">اختار الطريقة المناسبة ليك</p>
                                            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full max-w-md px-4">
                                                <button
                                                    onClick={() => {
                                                        setSelectedBranch(PICKUP_BRANCHES[0].id);
                                                        setPickupStep('confirmed');
                                                    }}
                                                    className="flex-1 bg-[#8c1d3b] text-white text-[13px] md:text-base font-bold py-3.5 md:py-4 rounded-sm shadow-md hover:bg-[#7a1934] transition-all flex items-center justify-center gap-2 md:gap-3"
                                                >
                                                    <Navigation className="w-4 h-4 md:w-5 md:h-5" />
                                                    <span>أقرب فرع ليك</span>
                                                </button>
                                                <button
                                                    onClick={() => setPickupStep('list')}
                                                    className="flex-1 bg-white border-2 border-gray-200 text-gray-800 text-[13px] md:text-base font-bold py-3.5 md:py-4 rounded-sm hover:border-[#8c1d3b] hover:text-[#8c1d3b] transition-all flex items-center justify-center gap-2 md:gap-3"
                                                >
                                                    <MapPin className="w-4 h-4 md:w-5 md:h-5" />
                                                    <span>اختار فرع معين</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 2: Full Branch List */}
                                    {pickupStep === 'list' && (
                                        <div>
                                            <div className="flex items-center justify-between mb-4 md:mb-6 flex-row-reverse">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="font-black text-[16px] md:text-[20px] text-gray-900">اختار الفرع</h3>
                                                    <button
                                                        onClick={() => setPickupStep('buttons')}
                                                        className="text-[12px] md:text-[13px] text-[#8c1d3b] hover:text-[#7a1934] transition-colors font-bold bg-[#8c1d3b]/10 px-3 py-1 rounded-full"
                                                    >
                                                        رجوع
                                                    </button>
                                                </div>
                                                <div className="bg-gray-100 text-gray-500 font-bold px-3 py-1.5 rounded-md text-[12px] md:text-[14px]">
                                                    {PICKUP_BRANCHES.length} فرع
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto custom-scrollbar pr-1">
                                                {PICKUP_BRANCHES.map(branch => (
                                                    <div
                                                        key={branch.id}
                                                        onClick={() => {
                                                            setSelectedBranch(branch.id);
                                                            setPickupStep('confirmed');
                                                        }}
                                                        className={`p-4 rounded-sm border cursor-pointer transition-all ${selectedBranch === branch.id ? 'border-[#8c1d3b] bg-[#8c1d3b]/5 shadow-sm' : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'}`}
                                                    >
                                                        <h4 className={`font-bold mb-1 text-right text-[13px] md:text-[14px] ${selectedBranch === branch.id ? 'text-[#8c1d3b]' : 'text-gray-800'}`}>{branch.name}</h4>
                                                        <p className="text-gray-500 text-[11px] md:text-[12px] text-right">{branch.address}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 3: Confirmed - Show message */}
                                    {pickupStep === 'confirmed' && selectedBranchData && (
                                        <div className="flex flex-col items-center justify-center py-8 md:py-16 border-2 border-solid border-[#8c1d3b]/20 rounded-sm bg-[#8c1d3b]/5">
                                            <div className="w-14 h-14 md:w-20 md:h-20 bg-[#12b76a]/10 rounded-full flex items-center justify-center mb-4 md:mb-6">
                                                <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-[#12b76a]" strokeWidth={2.5} />
                                            </div>
                                            <h3 className="text-[18px] md:text-[22px] font-black text-gray-900 mb-2 md:mb-3">تم اختيار الفرع </h3>
                                            <p className="text-[15px] md:text-[18px] font-bold text-[#8c1d3b] mb-1 md:mb-2 text-center">
                                                هيتم الاستلام من فرع {selectedBranchData.name}
                                            </p>
                                            <p className="text-gray-500 text-[12px] md:text-[14px] mb-6 md:mb-8 text-center px-4">{selectedBranchData.address}</p>
                                            <button
                                                onClick={() => { setPickupStep('buttons'); setSelectedBranch(null); }}
                                                className="text-[13px] md:text-[14px] text-gray-400 hover:text-[#8c1d3b] transition-colors underline font-bold"
                                            >
                                                تغيير الفرع
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Left Column: Summary */}
                    <div className="w-full lg:w-[380px] shrink-0 flex flex-col gap-6 order-2">
                        <div className="bg-white rounded-sm border border-gray-200 overflow-hidden shadow-sm">

                            {/* Order Summary Items */}
                            <div className="p-4 md:p-6 border-b border-gray-100 bg-gray-50/30">
                                <h3 className="font-black text-[16px] md:text-[18px] text-gray-900 mb-4 text-right">ملخص الطلب ({items.length})</h3>
                                <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto custom-scrollbar pl-4 pr-1">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex gap-4 border-b border-gray-100/50 pb-4 last:border-0 last:pb-0">
                                            <div className="w-16 h-20 bg-white rounded-sm shrink-0 p-2">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-center text-right">
                                                <span className="text-[13px] font-black text-gray-900 mb-0.5">{item.brand}</span>
                                                <h4 className="text-[12px] font-bold text-gray-600 leading-tight mb-1">{item.name}</h4>
                                                {item.engravedName && (
                                                    <p className="text-[11px] font-bold text-[#D4AF37] mb-1">
                                                        نحت مخصص : {item.engravedName}
                                                    </p>
                                                )}
                                                <div className="flex items-center justify-between mt-auto gap-2">
                                                    <span className="text-[12px] text-gray-400 font-bold whitespace-nowrap">الكمية: {item.quantity}</span>
                                                    <span className="text-[14px] md:text-[15px] font-black text-gray-900 whitespace-nowrap">{item.price} ريال</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Totals */}
                            <div className="p-4 md:p-6 bg-gray-50/50">
                                <div className="flex flex-col gap-4">
                                    <div className="flex justify-between items-center text-[13px] md:text-[14px] text-gray-600 font-bold">
                                        <span>المجموع الجزئي</span>
                                        <span className="font-sans text-black dir-ltr">{subtotal.toLocaleString()} ريال</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[13px] md:text-[14px] text-gray-600 font-bold">
                                        <div className="flex items-center gap-1">
                                            <span>التوصيل</span>
                                            <HelpCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400" />
                                        </div>
                                        <span className="text-gray-800">مجاناً</span>
                                    </div>
                                    <div className="flex justify-between items-start pt-6 border-t mt-2">
                                        <div className="flex flex-col items-start shrink-0">
                                            <span className="text-[16px] md:text-[18px] font-black text-gray-900">إجمالي</span>
                                            <span className="text-[9px] md:text-[11px] text-gray-500 font-medium text-right mt-0.5 leading-tight max-w-[120px] md:max-w-none">
                                                (شامل ضريبة القيمة المضافة 15%)
                                            </span>
                                        </div>
                                        <span className="text-[18px] md:text-[20px] font-black text-gray-900 font-sans mt-1 whitespace-nowrap">{subtotal.toLocaleString()} ريال</span>
                                    </div>
                                </div>

                                {/* Payment Method Selector */}
                                <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col gap-3">
                                    <span className="text-[12px] font-black text-gray-900 text-right">طريقة الدفع</span>
                                    <div className="grid grid-cols-2 gap-2.5">
                                        {/* Card / Apple Pay / Online */}
                                        <button
                                            type="button"
                                            onClick={() => setPaymentMethod('online')}
                                            className={cn(
                                                "p-3 rounded-sm border text-center font-black text-[11px] md:text-[12px] transition-all flex flex-col items-center justify-center gap-2",
                                                paymentMethod === 'online'
                                                    ? 'border-[#8c1d3b] bg-[#8c1d3b]/5 text-[#8c1d3b] shadow-sm'
                                                    : 'border-gray-200 hover:border-gray-300 text-gray-500 bg-white'
                                            )}
                                        >
                                            <CreditCard className="w-4 h-4" />
                                            <span>دفع إلكتروني</span>
                                        </button>

                                        {/* Cash on Delivery (COD) */}
                                        <button
                                            type="button"
                                            onClick={() => setPaymentMethod('cod')}
                                            className={cn(
                                                "p-3 rounded-sm border text-center font-black text-[11px] md:text-[12px] transition-all flex flex-col items-center justify-center gap-2",
                                                paymentMethod === 'cod'
                                                    ? 'border-[#8c1d3b] bg-[#8c1d3b]/5 text-[#8c1d3b] shadow-sm'
                                                    : 'border-gray-200 hover:border-gray-300 text-gray-500 bg-white'
                                            )}
                                        >
                                            <Banknote className="w-4 h-4" />
                                            <span>الدفع عند الاستلام</span>
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    className="w-full bg-[#3d3d3b] text-white py-2.5 md:py-3 mt-5 rounded-sm font-black text-[14px] md:text-[16px] flex items-center justify-center gap-2 hover:bg-black transition-all"
                                >
                                    {paymentMethod === 'cod' ? 'تأكيد طلب الدفع عند الاستلام' : 'الدفع الآمن'}
                                    <Lock className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Payment Logos */}
                        <div className="mt-2 flex flex-col items-center gap-4">
                            <div className="flex flex-wrap justify-center gap-2 items-center">
                                <div className="bg-[#00FFAA] text-black text-[11px] font-black px-2.5 py-1 rounded-sm tracking-widest border border-gray-200">tabby</div>
                                <div className="bg-[#12b76a] text-white text-[11px] font-black px-2.5 py-1 rounded-sm tracking-widest border border-gray-200">tamara</div>
                                <div className="bg-white border rounded-sm px-2 py-1"><img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" alt="Apple Pay" className="h-5 object-contain" /></div>
                                <div className="bg-white border rounded-sm px-2 py-1"><img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Mada_Logo.svg" alt="Mada" className="h-5 object-contain" /></div>
                                <div className="bg-white border rounded-sm px-2 py-1"><img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-5 object-contain" /></div>
                                <div className="bg-white border rounded-sm px-2 py-1"><img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5 object-contain" /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            {isConfirmModalOpen && (
                <div className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center p-0 md:p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-t-2xl md:rounded-lg p-6 md:p-8 max-w-md w-full shadow-2xl animate-in slide-in-from-bottom md:zoom-in-95 duration-300">
                        <div className="text-center">
                            <div className="w-14 h-14 md:w-16 md:h-16 bg-[#8c1d3b]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MapPin className="w-7 h-7 md:w-8 md:h-8 text-[#8c1d3b]" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-2 px-2">
                                هل تريد الاستلام من {selectedBranchData?.name}؟
                            </h3>
                            <p className="text-sm md:text-base text-gray-600 mb-8 font-medium leading-relaxed">
                                تمام! تقدر تستلم طلبك من الفرع خلال 15 دقيقة من دلوقتي.
                            </p>

                            <div className="flex flex-col md:flex-row gap-3">
                                <button
                                    onClick={() => {
                                        setIsDeliveryConfirmed(true);
                                        setIsConfirmModalOpen(false);
                                    }}
                                    className="flex-1 bg-[#8c1d3b] text-white font-bold py-4 rounded-sm hover:bg-[#7a1934] transition-colors order-1 md:order-2"
                                >
                                    تأكيد
                                </button>
                                <button
                                    onClick={() => setIsConfirmModalOpen(false)}
                                    className="flex-1 bg-gray-100 text-gray-700 font-bold py-4 rounded-sm hover:bg-gray-200 transition-colors order-2 md:order-1"
                                >
                                    إلغاء
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Premium Credit Card Payment Modal */}
            {isPaymentModalOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
                    <div className="bg-white rounded-[2.5rem] p-6 md:p-8 max-w-md w-full shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-300 relative overflow-hidden">
                        
                        {/* Close button */}
                        <button 
                            type="button" 
                            onClick={() => {
                                if (!isPaying) {
                                    setIsPaymentModalOpen(false);
                                }
                            }}
                            className="absolute top-6 left-6 text-gray-400 hover:text-black transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="text-right">
                            <h3 className="text-xl font-black text-gray-900 mb-1 flex items-center gap-2">
                                <Lock size={18} className="text-[#8c1d3b]" />
                                الدفع الآمن المشفر
                            </h3>
                            <p className="text-[11px] font-bold text-gray-400 mb-6 uppercase tracking-wider">Secure Payment Gateway</p>

                            {isPaying ? (
                                <div className="py-12 flex flex-col items-center justify-center text-center">
                                    {paymentSuccess ? (
                                        <div className="animate-in zoom-in duration-500 flex flex-col items-center">
                                            <div className="w-16 h-16 bg-[#12b76a]/10 rounded-full flex items-center justify-center text-[#12b76a] mb-4">
                                                <CheckCircle2 size={36} strokeWidth={2.5} />
                                            </div>
                                            <h4 className="text-lg font-black text-gray-900 mb-1">تمت العملية بنجاح!</h4>
                                            <p className="text-xs text-gray-400 font-bold">جاري تحويلك لصفحة التتبع...</p>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            {/* Luxury golden custom spinner */}
                                            <div className="w-12 h-12 border-4 border-gray-200 border-t-[#8c1d3b] rounded-full animate-spin mb-4" />
                                            <h4 className="text-sm font-black text-gray-900 mb-1">جاري معالجة عملية الدفع...</h4>
                                            <p className="text-[11px] text-gray-400 font-bold max-w-[200px] leading-relaxed text-center">
                                                برجاء عدم إغلاق الصفحة أو تحديث المتصفح لحين اكتمال المعاملة.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {/* Mada / Visa logo bar */}
                                    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                        <span className="text-[11px] font-black text-gray-400">البطاقات المقبولة</span>
                                        <div className="flex gap-1.5 items-center">
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Mada_Logo.svg" alt="Mada" className="h-4 object-contain" />
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 object-contain" />
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4 object-contain" />
                                        </div>
                                    </div>

                                    {/* Cardholder name */}
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-gray-400 mr-1 uppercase">اسم صاحب البطاقة</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={cardName}
                                            onChange={(e) => setCardName(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-100 focus:bg-white focus:border-black focus:ring-4 focus:ring-black/5 rounded-xl py-3 px-4 text-xs md:text-sm font-bold outline-none transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    {/* Card Number */}
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-gray-400 mr-1 uppercase">رقم البطاقة</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={cardNumber}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/\D/g, '').substring(0, 16);
                                                const formatted = val.match(/.{1,4}/g)?.join(' ') || val;
                                                setCardNumber(formatted);
                                            }}
                                            className="w-full bg-gray-50 border border-gray-100 focus:bg-white focus:border-black focus:ring-4 focus:ring-black/5 rounded-xl py-3 px-4 text-xs md:text-sm font-bold outline-none transition-all text-left dir-ltr"
                                            placeholder="4000 1234 5678 9010"
                                        />
                                    </div>

                                    {/* Expiry & CVV */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1 text-right">
                                            <label className="text-[10px] font-black text-gray-400 mr-1 uppercase">تاريخ الانتهاء</label>
                                            <input 
                                                type="text" 
                                                required
                                                value={cardExpiry}
                                                onChange={(e) => {
                                                    let val = e.target.value.replace(/\D/g, '').substring(0, 4);
                                                    if (val.length >= 2) {
                                                        val = val.substring(0, 2) + '/' + val.substring(2);
                                                    }
                                                    setCardExpiry(val);
                                                }}
                                                className="w-full bg-gray-50 border border-gray-100 focus:bg-white focus:border-black focus:ring-4 focus:ring-black/5 rounded-xl py-3 px-4 text-xs md:text-sm font-bold outline-none transition-all text-center dir-ltr"
                                                placeholder="MM/YY"
                                            />
                                        </div>
                                        <div className="space-y-1 text-right">
                                            <label className="text-[10px] font-black text-gray-400 mr-1 uppercase">رمز الأمان (CVV)</label>
                                            <input 
                                                type="password" 
                                                required
                                                value={cardCvv}
                                                onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').substring(0, 3))}
                                                className="w-full bg-gray-50 border border-gray-100 focus:bg-white focus:border-black focus:ring-4 focus:ring-black/5 rounded-xl py-3 px-4 text-xs md:text-sm font-bold outline-none transition-all text-center dir-ltr animate-none"
                                                placeholder="•••"
                                            />
                                        </div>
                                    </div>

                                    {/* Pay button */}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (!cardName || cardNumber.length < 19 || cardExpiry.length < 5 || cardCvv.length < 3) {
                                                alert("برجاء ملء كافة بيانات البطاقة بشكل صحيح لتأمين المعاملة.");
                                                return;
                                            }
                                            setIsPaying(true);
                                            // Process fake secure payment
                                            setTimeout(() => {
                                                setPaymentSuccess(true);
                                                setTimeout(() => {
                                                    saveOrderToAdmin('online', 'paid');
                                                    setIsPaymentModalOpen(false);
                                                    router.push('/track');
                                                }, 1500);
                                            }, 2500);
                                        }}
                                        className="w-full bg-[#8c1d3b] text-white py-4 rounded-xl font-black text-sm hover:bg-[#7a1934] transition-all shadow-lg mt-6"
                                    >
                                        دفع آمن بقيمة {subtotal.toLocaleString()} ريال
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </main>
    );
}
