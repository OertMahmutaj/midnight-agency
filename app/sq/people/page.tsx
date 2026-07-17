import type { Metadata } from 'next';

import PeoplePage from '@/app/people/page';
import { createPageMetadata } from '@/src/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Rreth Ekipit Kreativ Midnight',
  description:
    'Njihuni me themeluesit e Midnight, që bashkojnë zhvillimin software, strategjinë e markës, identitetin, motion dhe drejtimin artistik në Tiranë.',
  path: '/sq/people',
  alternatePath: '/people',
  locale: 'sq',
});

export default function AlbanianPeoplePage() {
  return <PeoplePage locale="sq" />;
}
