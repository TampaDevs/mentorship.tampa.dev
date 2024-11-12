'use client';

import { MenuIcon } from 'lucide-react';
import type { Session } from 'next-auth';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/ui/primitives/dropdown-menu';

export default function Menu({ session }: { session: Session | null }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-0 px-2 outline-none">
        <MenuIcon color="white" size={30} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[250px]" align="end">
        {session && (
          <>
            <DropdownMenuLabel className="pb-0 text-lg">{session.user.name ?? session.user.email}</DropdownMenuLabel>
            <DropdownMenuLabel asChild className="pt-0 text-blue-500">
              <Link href="/account">My Account</Link>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
        {session && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel asChild className="text-red-500">
              <Link href="api/auth/signout">Sign Out</Link>
            </DropdownMenuLabel>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
