import type { Metadata } from 'next';

import ServicesPage from '@/app/services/page';
import { createPageMetadata } from '@/src/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Branding, Zhvillim Web dhe Shërbime SEO',
  description:
    'Strategji marke, dizajn identiteti, zhvillim web me performancë të lartë, SEO, motion dhe dizajn digjital nga Midnight në Tiranë.',
  path: '/sq/services',
  alternatePath: '/services',
  locale: 'sq',
});

export default function AlbanianServicesPage() {
  return <ServicesPage locale="sq" />;
}
