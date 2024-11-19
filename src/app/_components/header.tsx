import Image from 'next/image';
import Link from 'next/link';

import logo from '~/assets/images/logo.png';
import { routes } from '~/routes';
import { api } from '~/trpc/server';
import { Button } from '~/ui/primitives/button';

export async function Header() {
  const user = await api.user.getCurrentUser();
  const isOnboarded = user?.onboardingCompletedAt !== null;

  return (
    <header className="bg-blue-800 p-4 text-white">
      <div className="container mx-auto flex flex-col items-center justify-between sm:flex-row">
        <Link href="/" className="mb-4 flex items-center space-x-2 text-2xl font-bold sm:mb-0">
          <Image alt="Tampa Devs" width={40} height={40} src={logo} className="h-10 w-10" />
          <span>Tampa Devs Mentorship</span>
        </Link>

        <nav>
          <ul className="flex space-x-4">
            <li>
              <Button variant="ghost" asChild>
                <Link href={routes.public.landingPage}>Home</Link>
              </Button>
            </li>

            <li>
              <Button variant="ghost" asChild>
                <Link href={routes.public.about}>About</Link>
              </Button>
            </li>

            <li>
              <Button variant="ghost" asChild>
                <Link href={isOnboarded ? routes.dashboard.home() : routes.onboarding.start()}>
                  {isOnboarded ? 'Dashboard' : 'Onboarding'}
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
