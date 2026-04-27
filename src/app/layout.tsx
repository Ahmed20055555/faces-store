import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="ar" dir="rtl">
      <body>
        {children}
      </body>
    </html>
  );
}
