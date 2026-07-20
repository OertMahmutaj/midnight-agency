import type { Metadata } from 'next';

import AllWorkGrid from '@/src/components/AllWorkGrid';
import { createPageMetadata } from '@/src/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Të Gjitha Projektet e Branding-ut dhe Digjitale',
  description:
    'Shfletoni të gjitha projektet e Midnight për branding, identitet, dizajn web, zhvillim dhe eksperienca digjitale në një indeks të plotë.',
  path: '/sq/work/all',
  alternatePath: '/work/all',
  locale: 'sq',
});

export default function AllWorkPageSq() {
  return <AllWorkGrid locale="sq" />;
}
