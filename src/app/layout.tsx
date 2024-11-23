import '~/styles/globals.css';

import { GeistSans } from 'geist/font/sans';
import { type Metadata } from 'next';

import { type NextRequest } from 'next/server';
import { Footer } from '~/app/_components/footer';
import { Header } from '~/app/_components/header';
import { TRPCReactProvider } from '~/trpc/react';
import { api } from '~/trpc/server';

export const metadata: Metadata = {
  title: 'Tampa Devs Mentorship',
  description: 'Tampa Devs Mentorship',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default async function RootLayout({
  request,
  children,
}: Readonly<{ request: NextRequest; children: React.ReactNode }>) {
  const user = await api.user.getCurrentUser();
  const isOnboardingCompleted = user?.onboardingCompletedAt ? false : true;
  const pathname = request?.nextUrl?.pathname;

  console.log('getCurrentUser: ', user);
  console.log('isOnboardingCompleted: ', isOnboardingCompleted);
  console.log('pathname: ', pathname);

  if (user) {
    // redirect(routes.dashboard.home(user.id));
  }

  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <Header />
          <div className="min-h-full">
            <main className="mx-auto">{children}</main>
          </div>
          {/* <Footer /> */}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
