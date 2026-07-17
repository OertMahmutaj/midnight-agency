'use client';

import { lazy, Suspense, useEffect, useState } from 'react';

const ContactModal = lazy(() => import('@/src/components/ContactModal'));

export default function GlobalContactModal() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    function loadAndOpenModal() {
      setShouldLoad(true);
    }

    window.addEventListener('midnight:open-contact', loadAndOpenModal);

    return () => {
      window.removeEventListener('midnight:open-contact', loadAndOpenModal);
    };
  }, []);

  if (!shouldLoad) return null;

  return (
    <Suspense fallback={null}>
      <ContactModal showTrigger={false} initialOpen />
    </Suspense>
  );
}
