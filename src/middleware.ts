import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { routes } from '~/routes';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('authjs.session-token');
  const url = req.nextUrl.clone();

  // Check if the user is logged in
  if (token) {
    // Check if the user is accessing the root URL
    if (url.pathname === '/') {
      // Redirect to dashboard if accessing the root URL for the first time
      return NextResponse.redirect(new URL(routes.dashboard.home(), req.url));
    }
  } else {
    // Redirect to home if not logged in and trying to access protected routes
    if (['/dashboard', '/profile', '/onboarding'].some(path => url.pathname.startsWith(path))) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/profile/:path*', '/onboarding/:path*'],
};
