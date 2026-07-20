import type { Metadata } from 'next';
import type { Locale } from '@/src/lib/i18n';

export const SITE_NAME = 'Midnight';
export const SITE_TITLE = 'Midnight | Digital Agency in Tirana, Albania';
export const SITE_DESCRIPTION =
  'Midnight is a digital agency in Tirana creating brand identities, high-performance websites, SEO, motion, and digital experiences for ambitious businesses.';
export const SITE_DESCRIPTION_SQ =
  'Midnight është një agjenci digjitale në Tiranë që krijon identitete marke, faqe web me performancë të lartë, SEO, motion dhe eksperienca digjitale për biznese ambicioze.';

export const SITE_URL = new URL(
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'https://midnight-coffee.agency'
);

type SocialImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

export const DEFAULT_SOCIAL_IMAGE: SocialImage = {
  url: '/images/midnight-hero.png',
  width: 1672,
  height: 941,
  alt: 'Midnight digital agency in Tirana, Albania',
};

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: SocialImage;
  type?: 'website' | 'article';
  locale?: Locale;
  alternatePath?: string;
};

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_SOCIAL_IMAGE,
  type = 'website',
  locale = 'en',
  alternatePath,
}: PageMetadataOptions): Metadata {
  const socialTitle = `${title} | ${SITE_NAME}`;
  const languageAlternates = alternatePath
    ? {
        en: locale === 'en' ? path : alternatePath,
        sq: locale === 'sq' ? path : alternatePath,
        'x-default': locale === 'en' ? path : alternatePath,
      }
    : undefined;

  return {
    title: {
      absolute: socialTitle,
    },
    description,
    alternates: {
      canonical: path,
      languages: languageAlternates,
    },
    openGraph: {
      type,
      locale: locale === 'sq' ? 'sq_AL' : 'en_US',
      alternateLocale: [locale === 'sq' ? 'en_US' : 'sq_AL'],
      url: path,
      siteName: SITE_NAME,
      title: socialTitle,
      description,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [image],
    },
  };
}

export const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': absoluteUrl('/#organization'),
      name: SITE_NAME,
      alternateName: 'Midnight Agency',
      url: absoluteUrl('/'),
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/icon.png'),
        width: 288,
        height: 288,
      },
      image: absoluteUrl(DEFAULT_SOCIAL_IMAGE.url),
      description: SITE_DESCRIPTION,
      email: 'hello@midnight.studio',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Tirana',
        addressCountry: 'AL',
      },
      areaServed: ['Albania', 'International'],
      knowsAbout: [
        'Brand strategy',
        'Brand identity',
        'Web development',
        'Search engine optimization',
        'Motion design',
        'Digital design',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': absoluteUrl('/#website'),
      name: SITE_NAME,
      alternateName: 'Midnight Agency',
      url: absoluteUrl('/'),
      description: SITE_DESCRIPTION,
      inLanguage: ['en', 'sq'],
      publisher: {
        '@id': absoluteUrl('/#organization'),
      },
    },
  ],
};

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
