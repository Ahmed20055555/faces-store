import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  celebrity?: string;
}

export interface Category {
  name: string;
  image: string;
}

export interface Brand {
  name: string;
  image: string;
}

export interface ProductsState {
  newArrivals: Product[];
  springImages: string[];
  gwpImages: string[];
  freeGiftProducts: Product[];
  isseyProducts: Product[];
  aroundTheWorldBrands: Brand[];
  categories: Category[];
}

const initialState: ProductsState = {
  newArrivals: [
    { id: "prod_0", brand: " Balmy", name: "عطر بالمي لافندر سبريت", price: "460", image: "/product-1.jpeg", isNew: true, hasGift: true },
    { id: "prod_1", brand: "بالمي | Balmy", name: "عطر بالمي عود ملكي", price: "537", image: "/product-2.jpeg", isNew: true, hasGift: true },
    { id: "prod_2", brand: "بالمي | Balmy", name: "عطر بالمي روز نوار", price: "572", image: "/product-3.jpeg", isNew: true, hasGift: true },
    { id: "prod_3", brand: "بالمي | Balmy", name: "عطر بالمي فيلفيت صندل", price: "790", image: "/product-4.jpeg", isNew: true, hasGift: true },
    { id: "prod_4", brand: "بالمي | Balmy", name: "عطر بالمي عود وود", price: "488", image: "/product-5.jpeg", isNew: true, hasGift: true },
    { id: "prod_5", brand: "بالمي | Balmy", name: "عطر بالمي رويال ياسمين", price: "572", image: "/product-13.jpeg", isNew: true, hasGift: true },
    { id: "prod_6", brand: "بالمي | Balmy", name: "عطر بالمي باتشولي ميست", price: "460", image: "/product-7.jpeg", isNew: true, hasGift: true },
    { id: "prod_7", brand: "بالمي | Balmy", name: "عطر بالمي جولدن نكتار", price: "537", image: "/product-9.jpeg", isNew: true, hasGift: true },
    { id: "prod_8", brand: "بالمي | Balmy", name: "عطر بالمي ديب ليذر", price: "690", image: "/product-10.jpeg", isNew: true, hasGift: true },
    { id: "prod_9", brand: "بالمي | Balmy", name: "عطر بالمي مسك رويال", price: "572", image: "/product-11.jpeg", isNew: true, hasGift: true },
    { id: "prod_10", brand: "بالمي | Balmy", name: "عطر بالمي سافرون سبايس", price: "488", image: "/product-3.jpeg", isNew: true, hasGift: true },
    { id: "prod_11", brand: "بالمي | Balmy", name: "عطر بالمي أمبر نايت", price: "640", image: "/product-13.jpeg", isNew: true, hasGift: true },
  ],
  springImages: [
    "/product-14.jpeg",
    "/product-15.jpeg",
    "/product-16.jpeg",
    "/product-17.jpeg",
    "/product-18.jpeg",
    "/product-19.jpeg",
  ],
  gwpImages: [
    "/product-20.jpeg",
    "/product-21.jpeg",
    "/product-22.jpeg",
    "/product-23.jpeg",
    "/product-24.jpeg",
    "/product-25.jpeg",
    "/product-26.jpeg",
    "/product-27.jpeg",
  ],
  freeGiftProducts: [
    { id: "gift_0", brand: "بالمي | Balmy", name: "عطر بالمي أوبالين", price: "531", image: "/product-14.jpeg", hasGift: false, hasFrom: true, celebrity: "عمرو دياب" },
    { id: "gift_1", brand: "بالمي | Balmy", name: "عطر بالمي مسك روز", price: "489", image: "/product-15.jpeg", hasGift: false, hasFrom: true, celebrity: " جولي" },
    { id: "gift_2", brand: "بالمي | Balmy", name: "عطر بالمي سفاري عود", price: "621", image: "/product-16.jpeg", hasGift: false, hasFrom: false, celebrity: "جوني ديب" },
    { id: "gift_3", brand: "بالمي | Balmy", name: "عطر بالمي هيريتج", price: "477", image: "/product-17.jpeg", hasGift: false, hasFrom: true, celebrity: "أحمد عز" },
    { id: "gift_4", brand: "بالمي | Balmy", name: "عطر بالمي رويال توباز", price: "587", image: "/product-18.jpeg", hasGift: false, hasFrom: true, celebrity: "جورجينا" },
    { id: "gift_5", brand: "بالمي | Balmy", name: "عطر بالمي لورين", price: "518", image: "/product-19.jpeg", hasGift: false, hasFrom: true, celebrity: "نادين نجيم" },
  ],
  isseyProducts: [
    { id: "issey_0", brand: "بالمي | Balmy", name: "عطر بالمي إليكسير", price: "444", image: "/product-20.jpeg", hasGift: false, hasFrom: true },
    { id: "issey_1", brand: "بالمي | Balmy", name: "عطر بالمي مسك الفخامة", price: "460", image: "/product-21.jpeg", hasGift: false, hasFrom: true },
    { id: "issey_2", brand: "بالمي | Balmy", name: "عطر بالمي كشمير وود", price: "537", image: "/product-22.jpeg", hasGift: false, hasFrom: true },
    { id: "issey_3", brand: "بالمي | Balmy", name: "عطر بالمي سوليفان", price: "514", image: "/product-23.jpeg", hasGift: false, hasFrom: true },
    { id: "issey_4", brand: "بالمي | Balmy", name: "عطر بالمي رويال توباز", price: "551", image: "/product-24.jpeg", hasGift: false, hasFrom: true },
    { id: "issey_5", brand: "بالمي | Balmy", name: "عطر بالمي ويسبر", price: "419", image: "/product-25.jpeg", hasGift: false, hasFrom: true },
  ],
  aroundTheWorldBrands: [
    { name: "بالمي سيجنتشر", image: "/product-26.jpeg" },
    { name: "بالمي كلاسيك", image: "/product-27.jpeg" },
    { name: "بالمي عود", image: "/product-28.jpeg" },
    { name: "بالمي رويال", image: "/product-1.jpeg" },
    { name: "بالمي أوركيد", image: "/product-2.jpeg" },
    { name: "بالمي إليت", image: "/product-3.jpeg" },
  ],
  categories: [
    { name: "عطور نسائية", image: "/product-12.jpeg" },
    { name: "عطور رجالية", image: "/product-28.jpeg" },
    { name: "عطور النيش", image: "/product-26.jpeg" },
    { name: "عطور الشعر", image: "/product-18.jpeg" },
    { name: "أطقم هدايا", image: "/product-21.jpeg" },
    { name: "عطور الصيف", image: "/product-2.jpeg" },
    { name: "الأكثر مبيعاً", image: "/product-27.jpeg" },
    { name: "جديدنا", image: "/product-10.jpeg" },
    { name: "الماركات", image: "/product-14.jpeg" },
    { name: "عطور زيتية", image: "/product-25.jpeg" },
  ]
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setNewArrivals(state, action: PayloadAction<Product[]>) {
      state.newArrivals = action.payload;
    },
    setFreeGiftProducts(state, action: PayloadAction<Product[]>) {
      state.freeGiftProducts = action.payload;
    },
    setIsseyProducts(state, action: PayloadAction<Product[]>) {
      state.isseyProducts = action.payload;
    },
    setCategories(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
    }
  }
});

export const { setNewArrivals, setFreeGiftProducts, setIsseyProducts, setCategories } = productsSlice.actions;
export default productsSlice.reducer;
