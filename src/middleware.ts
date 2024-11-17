import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { routes } from '~/routes';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('next-auth.session-token');
  console.log('token: ', token);
  console.log('req.nextUrl.pathname: ', req.nextUrl);

  // Prevent endless loop by checking for a specific query parameter
  const isRedirected = req.nextUrl.searchParams.get('redirected');

  // Redirect to home if no token and not already on the home page
  if (!token && req.nextUrl.pathname !== '/' && !isRedirected) {
    const url = new URL('/', req.url);
    url.searchParams.set('redirected', 'true');
    // return NextResponse.redirect(url);
  }

  // Redirect to dashboard if token exists and currently on the home page
  if (token && req.nextUrl.pathname === '/' && !isRedirected) {
    const url = new URL(routes.dashboard.home(token.value), req.url);
    url.searchParams.set('redirected', 'true');
    // return NextResponse.redirect(url);
  }

  // Proceed to the next middleware or request handler
  return NextResponse.next();
}

export const config = {
  // Apply middleware to specified paths
  matcher: ['/:path*', '/dashboard/:path*', '/profile/:path*', '/onboarding/:path*'],
};
