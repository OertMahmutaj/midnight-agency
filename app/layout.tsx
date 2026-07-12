import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from 'next/headers';
import "./globals.css";
import Navbar from "@/src/components/Navbar";
import Footer from '@/src/components/Footer';
import MidnightCurtain from '@/src/components/MidnightCurtain';

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const introSeen = (await cookies()).has('midnight_intro_seen');

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}>
        <div className="grain-fixed" />
        {!introSeen && <MidnightCurtain />}

        <div className="relative z-10">
          <Navbar />
          
          <main>
            {children}
          </main>
          
          <Footer />
        </div>
      </body>
    </html>
  );
}
