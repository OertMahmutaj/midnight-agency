'use client';

import { lazy, Suspense, useEffect, useState } from 'react';

const ServiceCubeCanvas = lazy(
  () => import('@/src/components/ServiceCubeCanvas'),
);

export default function DeferredServiceCube() {
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
      <ServiceCubeCanvas />
    </Suspense>
  );
}
