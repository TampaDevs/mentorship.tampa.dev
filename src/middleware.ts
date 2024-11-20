import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { routes } from '~/routes';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('authjs.session-token');
  const hasRedirected = req.cookies.get('has-redirected');
  const url = req.nextUrl.clone();

  // Check if the user is logged in
  if (token) {
    // Check if the user is accessing the root URL and hasn't been redirected yet
    if (url.pathname === '/' && !hasRedirected) {
      // Set a cookie to indicate the user has been redirected
      const response = NextResponse.redirect(new URL(routes.dashboard.home(), req.url));
      response.cookies.set('has-redirected', 'true', { path: '/', maxAge: 60 });
      return response;
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
