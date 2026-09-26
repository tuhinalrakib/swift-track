import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SwiftTrack — Modern E-Commerce Order Tracking",
  description: "Real-time interactive mobile order tracking experience with timeline progress, live driver status, delivery proof, delay handling, and instant support.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased bg-[#070a12] text-slate-100 selection:bg-purple-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
