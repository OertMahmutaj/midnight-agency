import { cookies } from 'next/headers';
import './globals.css';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import MidnightCurtain from '@/src/components/MidnightCurtain';
import ScrollToTopButton from '@/src/components/ScrollToTopButton';
import ContactModal from '@/src/components/ContactModal';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const introSeen = (await cookies()).has('midnight_intro_seen');

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-black antialiased">
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
