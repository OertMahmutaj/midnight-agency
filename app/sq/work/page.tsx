import type { Metadata } from 'next';

import WorkGallery from '@/src/components/WorkGallery';
import { createPageMetadata } from '@/src/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Projekte Branding-u dhe Digjitale',
  description:
    'Eksploroni projekte të përzgjedhura branding-u, identiteti, dizajni web dhe pune digjitale nga Midnight, një agjenci kreative në Tiranë.',
  path: '/sq/work',
  alternatePath: '/work',
  locale: 'sq',
});

export default function AlbanianWorkPage() {
  return <WorkGallery locale="sq" />;
}
