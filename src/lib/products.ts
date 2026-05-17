export interface Product {
    id: string;
    brand: string;
    name: string;
    price: string;
    image: string;
    isNew?: boolean;
    hasGift?: boolean;
    hasFrom?: boolean;
    rating?: number;
}

export const PRODUCTS_DB: Record<string, Product> = {
    // New Arrivals
    "prod_0": { id: "prod_0", brand: "بالمي | Balmy", name: "عطر بالمي لافندر سبريت", price: "460", image: "/product-1.jpeg", isNew: true, hasGift: true },
    "prod_1": { id: "prod_1", brand: "بالمي | Balmy", name: "عطر بالمي عود ملكي", price: "537", image: "/product-2.jpeg", isNew: true, hasGift: true },
    "prod_2": { id: "prod_2", brand: "بالمي | Balmy", name: "عطر بالمي روز نوار", price: "572", image: "/product-3.jpeg", isNew: true, hasGift: true },
    "prod_3": { id: "prod_3", brand: "بالمي | Balmy", name: "عطر بالمي فيلفيت صندل", price: "790", image: "/product-4.jpeg", isNew: true, hasGift: true },
    "prod_4": { id: "prod_4", brand: "بالمي | Balmy", name: "عطر بالمي عود وود", price: "488", image: "/product-5.jpeg", isNew: true, hasGift: true },
    "prod_5": { id: "prod_5", brand: "بالمي | Balmy", name: "عطر بالمي رويال ياسمين", price: "572", image: "/product-13.jpeg", isNew: true, hasGift: true },
    "prod_6": { id: "prod_6", brand: "بالمي | Balmy", name: "عطر بالمي باتشولي ميست", price: "460", image: "/product-7.jpeg", isNew: true, hasGift: true },
    "prod_7": { id: "prod_7", brand: "بالمي | Balmy", name: "عطر بالمي جولدن نكتار", price: "537", image: "/product-9.jpeg", isNew: true, hasGift: true },
    "prod_8": { id: "prod_8", brand: "بالمي | Balmy", name: "عطر بالمي ديب ليذر", price: "690", image: "/product-10.jpeg", isNew: true, hasGift: true },
    "prod_9": { id: "prod_9", brand: "بالمي | Balmy", name: "عطر بالمي مسك رويال", price: "572", image: "/product-11.jpeg", isNew: true, hasGift: true },
    "prod_10": { id: "prod_10", brand: "بالمي | Balmy", name: "عطر بالمي سافرون سبايس", price: "488", image: "/product-3.jpeg", isNew: true, hasGift: true },
    "prod_11": { id: "prod_11", brand: "بالمي | Balmy", name: "عطر بالمي أمبر نايت", price: "640", image: "/product-13.jpeg", isNew: true, hasGift: true },

    // Best Sellers
    "1": { id: "1", brand: "بالمي | Balmy", name: "عطر بالمي رويال سيجنتشر", price: "720", image: "/product-26.jpeg", rating: 5 },
    "2": { id: "2", brand: "بالمي | Balmy", name: "عطر بالمي عود انتنس", price: "680", image: "/product-27.jpeg", rating: 4.9 },
    "3": { id: "3", brand: "بالمي | Balmy", name: "عطر بالمي فيلفيت توباز", price: "850", image: "/product-28.jpeg", rating: 5 },
    "4": { id: "4", brand: "بالمي | Balmy", name: "عطر بالمي لافندر سبريت", price: "460", image: "/product-1.jpeg", rating: 4.8 },

    // Free Gift Products (Desktop / ProductSection loop)
    "gift_0": { id: "gift_0", brand: "بالمي | Balmy", name: "عطر بالمي أوبالين", price: "531", image: "/product-14.jpeg", hasGift: false, hasFrom: true },
    "gift_1": { id: "gift_1", brand: "بالمي | Balmy", name: "عطر بالمي مسك روز", price: "489", image: "/product-15.jpeg", hasGift: false, hasFrom: true },
    "gift_2": { id: "gift_2", brand: "بالمي | Balmy", name: "عطر بالمي سفاري عود", price: "621", image: "/product-16.jpeg", hasGift: false, hasFrom: false },
    "gift_3": { id: "gift_3", brand: "بالمي | Balmy", name: "عطر بالمي هيريتج", price: "477", image: "/product-17.jpeg", hasGift: false, hasFrom: true },
    "gift_4": { id: "gift_4", brand: "بالمي | Balmy", name: "عطر بالمي رويال توباز", price: "587", image: "/product-18.jpeg", hasGift: false, hasFrom: true },
    "gift_5": { id: "gift_5", brand: "بالمي | Balmy", name: "عطر بالمي لورين", price: "518", image: "/product-19.jpeg", hasGift: false, hasFrom: true },

    // Issey / Collection Products
    "issey_0": { id: "issey_0", brand: "بالمي | Balmy", name: "عطر بالمي إليكسير", price: "444", image: "/product-20.jpeg", hasGift: false, hasFrom: true },
    "issey_1": { id: "issey_1", brand: "بالمي | Balmy", name: "عطر بالمي مسك الفخامة", price: "460", image: "/product-21.jpeg", hasGift: false, hasFrom: true },
    "issey_2": { id: "issey_2", brand: "بالمي | Balmy", name: "عطر بالمي كشمير وود", price: "537", image: "/product-22.jpeg", hasGift: false, hasFrom: true },
    "issey_3": { id: "issey_3", brand: "بالمي | Balmy", name: "عطر بالمي سوليفان", price: "514", image: "/product-23.jpeg", hasGift: false, hasFrom: true },
    "issey_4": { id: "issey_4", brand: "بالمي | Balmy", name: "عطر بالمي رويال توباز", price: "551", image: "/product-24.jpeg", hasGift: false, hasFrom: true },
    "issey_5": { id: "issey_5", brand: "بالمي | Balmy", name: "عطر بالمي ويسبر", price: "419", image: "/product-25.jpeg", hasGift: false, hasFrom: true },

    // Scent Quiz
    "q1": { id: "q1", brand: "بالمي | Balmy", name: "عطر بالمي جولدن نكتار", price: "537", image: "/product-9.jpeg", rating: 4.7 },
    "q2": { id: "q2", brand: "بالمي | Balmy", name: "عطر بالمي لافندر سبريت", price: "460", image: "/product-1.jpeg", rating: 4.8 },
    "q3": { id: "q3", brand: "بالمي | Balmy", name: "عطر بالمي ديب ليذر", price: "690", image: "/product-10.jpeg", rating: 4.9 },
    "q4": { id: "q4", brand: "بالمي | Balmy", name: "عطر بالمي مسك رويال", price: "572", image: "/product-11.jpeg", rating: 5 },
    "q5": { id: "q5", brand: "بالمي | Balmy", name: "عطر بالمي سافرون سبايس", price: "488", image: "/product-12.jpeg", rating: 4.9 },
    "q6": { id: "q6", brand: "بالمي | Balmy", name: "عطر بالمي أوبالين", price: "531", image: "/product-14.jpeg", rating: 4.8 }
};

export function getProductById(id: string): Product | undefined {
    return PRODUCTS_DB[id];
}
