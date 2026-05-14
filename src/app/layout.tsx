import type { Metadata } from "next";
import "./globals.css";
import { Readex_Pro } from "next/font/google";
import { cn } from "@/lib/utils";
import Providers from "@/components/Providers";
import CartDrawer from "@/components/CartDrawer";
import Toast from "@/components/Toast";
import FavoritesToast from "@/components/FavoritesToast";
import LiveChat from "@/components/LiveChat";

const readex = Readex_Pro({ subsets: ['arabic', 'latin'], variable: '--font-readex' });

export const metadata: Metadata = {
  title: "FACES | وجوه - Luxury Beauty & Fragrance",
  description: "Shop the best perfumes, makeup, and skincare at FACES.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={cn("font-sans", readex.variable)}>
      <body className="font-sans antialiased">
        <Providers>
          {children}
          <CartDrawer />
          <Toast />
          <FavoritesToast />
          <LiveChat />
        </Providers>
      </body>
    </html>
  );
}
