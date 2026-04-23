import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "故事小馆 - 甜蜜短篇故事",
  description: "一个收集甜蜜短篇故事的温暖小站，愿每个故事都能给你带来片刻治愈。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">
        {/* 背景装饰 - 柔和的圆点 */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#e8dcd0]/20 dark:bg-gray-700/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#d4c9b8]/20 dark:bg-gray-600/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#f0ede8]/30 dark:bg-gray-800/5 rounded-full blur-3xl"></div>
        </div>
        
        <Navbar />
        <main className="flex-1 relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}