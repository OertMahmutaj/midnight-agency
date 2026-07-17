export type Locale = 'en' | 'sq';

export const DEFAULT_LOCALE: Locale = 'en';

export function localeFromPathname(pathname: string): Locale {
  return pathname === '/sq' || pathname.startsWith('/sq/') ? 'sq' : 'en';
}

export function withLocale(path: string, locale: Locale) {
  if (
    locale === 'en' ||
    path.startsWith('mailto:') ||
    path.startsWith('tel:') ||
    path.startsWith('#')
  ) {
    return path;
  }

  if (path === '/') {
    return '/sq';
  }

  return `/sq${path}`;
}

export function alternateLocalePath(pathname: string) {
  if (pathname === '/sq') {
    return '/';
  }

  if (pathname.startsWith('/sq/')) {
    return pathname.slice(3) || '/';
  }

  return pathname === '/' ? '/sq' : `/sq${pathname}`;
}
