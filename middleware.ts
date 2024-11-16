import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { api } from '~/trpc/server';

export async function middleware(req: NextRequest) {
  try {
    const user = await api.user.getCurrentUser()
    console.log('user: ', user)

    if (user) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    } else {
    
      return NextResponse.redirect(new URL('/api/auth/signin', req.url));
    }
  } catch (error) {
    console.error('Error in middleware:', error);
    // Optionally handle errors, e.g., redirect to an error page
  }

  // Allow the request to proceed if no redirection is needed
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/profile/:path*', '/onboarding/:path*', '/api/auth/signin', '/api/auth/signout'],
};
