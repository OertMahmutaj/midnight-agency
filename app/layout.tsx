import { cookies } from 'next/headers';
import localFont from 'next/font/local';
import './globals.css';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import MidnightCurtain from '@/src/components/MidnightCurtain';
import ScrollToTopButton from '@/src/components/ScrollToTopButton';
import ContactModal from '@/src/components/ContactModal';
import {
  INTRO_COOKIE,
  INTRO_COOKIE_VERSION,
} from '@/src/lib/introCookie';

const k2d = localFont({
  src: '../public/fonts/K2D-ExtraBold.ttf',
  variable: '--font-k2d',
  weight: '800',
  style: 'normal',
  display: 'swap',
  fallback: ['Arial', 'Helvetica', 'sans-serif'],
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const introCookie = (await cookies()).get(INTRO_COOKIE);
  const introSeen = introCookie?.value === INTRO_COOKIE_VERSION;

  return (
    <html lang="en" suppressHydrationWarning style={{ backgroundColor: '#000000' }}>
      <head>
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${k2d.variable} bg-black antialiased`} style={{ backgroundColor: '#000000' }}>
        <div className="grain-fixed" />
        {!introSeen && <MidnightCurtain />}

        <div className="relative z-10 min-h-screen overflow-x-clip">
          <Navbar />
          {children}
          <Footer />
          <ContactModal showTrigger={false} />
        </div>
        <ScrollToTopButton />
      </body>
    </html>
  );
}
