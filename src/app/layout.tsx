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

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Balmy | Luxury Perfume",
  description: "High-end luxury perfume brand.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Balmy",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/icons/apple-icon-180x180.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={cn("font-sans", readex.variable)}>
      <head>
        {/* Apple Splash Screens */}
        <link rel="apple-touch-startup-image" href="/icons/apple-splash-640x1136.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" />
        <link rel="apple-touch-startup-image" href="/icons/apple-splash-750x1334.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" />
        <link rel="apple-touch-startup-image" href="/icons/apple-splash-1170x2532.png" media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3)" />
      </head>
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
