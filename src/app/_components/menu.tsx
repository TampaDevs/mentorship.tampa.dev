'use client';

import { Bell, House, LogOut, MenuIcon, Search, Settings, UserRound } from 'lucide-react';
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
          <Link href="/account" className="flex items-center gap-2 hover:bg-neutral-100">
            <UserRound size={15} />
            Account
          </Link>
        </DropdownMenuLabel>
        <DropdownMenuLabel asChild>
          <Link href="/matching" className="flex items-center gap-2 hover:bg-neutral-100">
            <Search size={15} />
            Matching
          </Link>
        </DropdownMenuLabel>
        <DropdownMenuLabel asChild>
          <Link href="/notifications" className="flex items-center gap-2 hover:bg-neutral-100">
            <Bell size={15} />
            Notifications
          </Link>
        </DropdownMenuLabel>
        <DropdownMenuLabel asChild>
          <Link href="/settings" className="flex items-center gap-2 hover:bg-neutral-100">
            <Settings size={15} />
            Settings
          </Link>
        </DropdownMenuLabel>
        {session && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel asChild className="text-red-500">
              <Link href="api/auth/signout" className="flex items-center gap-2 hover:bg-neutral-100">
                <LogOut size={15} color="red" />
                Sign Out
              </Link>
            </DropdownMenuLabel>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
