'use client';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { usePathname } from 'next/navigation';
import Navbar from "@/src/components/Navbar";
import Footer from '@/src/components/Footer';
import { AnimatePresence, motion } from 'framer-motion';
import MidnightCurtain from '@/src/components/MidnightCurtain';

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}>
        <div className="grain-fixed" />
        {/* 1. Curtain Layer: High Z-Index, absolute positioning */}
        <AnimatePresence mode="wait">
          <MidnightCurtain key={pathname} />
        </AnimatePresence>

        {/* 2. Main Content Layer */}
        <div className="relative z-10">
          <Navbar />
          
          <motion.main
            key={pathname} // Keying the main forces a clean fade-in
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }} // Delay long enough for curtain to clear
          >
            {children}
          </motion.main>
          
          <Footer />
        </div>
      </body>
    </html>
  );
}