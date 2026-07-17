import { NextResponse, type NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const pathname = request.nextUrl.pathname;
  const locale = pathname === '/sq' || pathname.startsWith('/sq/') ? 'sq' : 'en';

  requestHeaders.set('x-midnight-locale', locale);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    '/',
    '/work/:path*',
    '/services/:path*',
    '/people/:path*',
    '/contact/:path*',
    '/sq/:path*',
  ],
};
