import { cookies, headers } from 'next/headers';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import MidnightCurtain from '@/src/components/MidnightCurtain';
import ScrollToTopButton from '@/src/components/ScrollToTopButton';
import ContactModal from '@/src/components/ContactModal';
import DocumentLanguage from '@/src/components/DocumentLanguage';
import {
  INTRO_COOKIE,
  INTRO_COOKIE_VERSION,
} from '@/src/lib/introCookie';
import {
  DEFAULT_SOCIAL_IMAGE,
  serializeJsonLd,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  structuredData,
} from '@/src/lib/seo';

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  applicationName: SITE_NAME,
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: '/',
    languages: {
      en: '/',
      sq: '/sq',
      'x-default': '/',
    },
  },
  category: 'business',
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['sq_AL'],
    url: '/',
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_SOCIAL_IMAGE],
  },
};

const k2d = localFont({
  src: '../public/fonts/K2D-ExtraBold.ttf',
  variable: '--font-k2d',
  weight: '800',
  style: 'normal',
  display: 'swap',
  fallback: ['Arial', 'Helvetica', 'sans-serif'],
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [cookieStore, headerStore] = await Promise.all([cookies(), headers()]);
  const introCookie = cookieStore.get(INTRO_COOKIE);
  const introSeen = introCookie?.value === INTRO_COOKIE_VERSION;
  const locale = headerStore.get('x-midnight-locale') === 'sq' ? 'sq' : 'en';

  return (
    <html lang={locale} suppressHydrationWarning style={{ backgroundColor: '#000000' }}>
      <head>
        <meta name="theme-color" content="#000000" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(structuredData),
          }}
        />
      </head>
      <body className={`${k2d.variable} bg-black antialiased`} style={{ backgroundColor: '#000000' }}>
        <DocumentLanguage />
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
