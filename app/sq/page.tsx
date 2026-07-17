import type { Metadata } from 'next';

import HomePage from '@/app/page';
import { createPageMetadata, SITE_DESCRIPTION_SQ } from '@/src/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Agjenci Digjitale në Tiranë, Shqipëri',
  description: SITE_DESCRIPTION_SQ,
  path: '/sq',
  alternatePath: '/',
  locale: 'sq',
});

export default function AlbanianHomePage() {
  return <HomePage locale="sq" />;
}
