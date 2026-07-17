'use client';

import { lazy, Suspense, useEffect, useState } from 'react';

import type { Locale } from '@/src/lib/i18n';

const ContactCubeCanvas = lazy(
  () => import('@/src/components/ContactCubeCanvas'),
);

export default function DeferredContactCube({ locale }: { locale: Locale }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const delay = window.setTimeout(() => {
      setIsReady(true);
    }, 900);

    return () => {
      window.clearTimeout(delay);
    };
  }, []);

  if (!isReady) return null;

  return (
    <Suspense fallback={null}>
      <ContactCubeCanvas locale={locale} />
    </Suspense>
  );
}
