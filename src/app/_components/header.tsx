'use client';

import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

import Menu from '~/app/_components/menu';
import logo from '~/assets/images/logo.png';
import { Button } from '~/ui/primitives/button';

export function Header() {
  const { data: session } = useSession();

  return (
    <nav className="bg-blue-800 text-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-5">
          <Image alt="Tampa Devs" width={40} height={40} src={logo} className="h-10 w-10" />
          <h1 className="text-xl font-medium">Tampa Devs Mentorship</h1>
        </Link>

        <div className="flex gap-4">
          {!session ? (
            <div className="flex items-center gap-4">
              <Button onClick={() => signIn()}>Sign In</Button>
            </div>
          ) : (
            <Menu session={session} />
          )}
        </div>
      </div>
    </nav>
  );
}
