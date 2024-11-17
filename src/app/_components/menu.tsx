'use client';

import { Bell, MenuIcon, Search, Settings, UserRound } from 'lucide-react';
import type { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

import { routes } from '~/routes';
import { Button } from '~/ui/primitives/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/ui/primitives/dropdown-menu';

export default function Menu({ session }: { session: Session }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-0 px-2 outline-none">
        <MenuIcon color="white" size={30} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[250px]" align="end">
        <DropdownMenuLabel className="pb-0 text-lg">{session.user.name ?? session.user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel asChild>
          <Link
            href={routes.dashboard.profile(session.user.id)}
            className="flex items-center gap-2 hover:bg-neutral-100"
          >
            <UserRound size={15} />
            Account
          </Link>
        </DropdownMenuLabel>
        <DropdownMenuLabel asChild>
          <Link
            href={routes.matching.suggestions(session.user.id)}
            className="flex items-center gap-2 hover:bg-neutral-100"
          >
            <Search size={15} />
            Matching
          </Link>
        </DropdownMenuLabel>
        <DropdownMenuLabel asChild>
          <Link
            href={routes.dashboard.notifications(session.user.id)}
            className="flex items-center gap-2 hover:bg-neutral-100"
          >
            <Bell size={15} />
            Notifications
          </Link>
        </DropdownMenuLabel>
        <DropdownMenuLabel asChild>
          <Link
            href={routes.dashboard.settings(session.user.id)}
            className="flex items-center gap-2 hover:bg-neutral-100"
          >
            <Settings size={15} />
            Settings
          </Link>
        </DropdownMenuLabel>
        {session && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel asChild>
              <Button
                variant="ghost"
                className="flex w-full justify-start"
                size="sm"
                onClick={() => signOut({ callbackUrl: 'http://localhost:3000' })}
              >
                Sign Out
              </Button>
            </DropdownMenuLabel>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
