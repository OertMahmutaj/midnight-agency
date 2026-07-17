'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { localeFromPathname } from '@/src/lib/i18n';

export default function DocumentLanguage() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.lang = localeFromPathname(pathname);
  }, [pathname]);

  return null;
}
