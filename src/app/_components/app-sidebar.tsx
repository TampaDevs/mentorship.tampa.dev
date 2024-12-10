'use client';

import { BadgeCheck, Bell, CreditCard, LogOut, Settings2, Sparkles, SquareTerminal } from 'lucide-react';
import { signOut } from 'next-auth/react';
import React from 'react';

import { routes } from '~/routes';
import { api } from '~/trpc/react';
import { type NavItem, NavMain } from '~/ui/components/nav-main';
import { NavUser } from '~/ui/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '~/ui/primitives/sidebar';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>): JSX.Element {
  const { data: user, isLoading: isUserLoading } = api.user.getCurrentUser.useQuery();

  const navItems: NavItem[] = [
    {
      title: 'Dashboard',
      url: routes.dashboard.home(),
      icon: SquareTerminal,
      items: [
        { title: 'Home', url: routes.dashboard.home() },
        { title: 'Suggestions', url: routes.dashboard.suggestions() },
        { title: 'Schedule', url: routes.dashboard.schedule() },
        { title: 'Mentorships', url: routes.dashboard.mentorships() },
        { title: 'Notifications', url: routes.dashboard.notifications() },
        { title: 'Profile', url: routes.dashboard.profile() },
        { title: 'Settings', url: routes.dashboard.settings() },
      ],
    },
    {
      title: 'Matching',
      url: routes.matching.suggestions(),
      icon: SquareTerminal,
      items: [{ title: 'Suggestions', url: routes.matching.suggestions() }],
    },
    {
      title: 'Mentorship',
      url: routes.mentorship.details(''),
      icon: SquareTerminal,
      items: [
        { title: 'Details', url: routes.mentorship.details('') },
        { title: 'Messaging', url: routes.mentorship.messaging('') },
        { title: 'Goals', url: routes.mentorship.goals('') },
        { title: 'Status', url: routes.mentorship.status('') },
      ],
    },
  ];

  if (user?.role === 'ADMIN' || user?.role === 'OWNER') {
    navItems.push({
      title: 'Admin',
      url: routes.admin.settings,
      icon: Settings2,
      items: [
        { title: 'Users', url: routes.admin.users },
        { title: 'Settings', url: routes.admin.settings },
      ],
    });
  }

  const userMenuItems = [
    { icon: <Sparkles />, label: 'Upgrade to Pro' },
    { icon: <BadgeCheck />, label: 'Account' },
    { icon: <CreditCard />, label: 'Billing' },
    { icon: <Bell />, label: 'Notifications' },
    { icon: <LogOut />, label: 'Log out', onClick: () => signOut({ redirect: true, callbackUrl: '/' }) },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader />
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        {user && !isUserLoading && (
          <NavUser
            user={{
              ...user,
              avatar: user.image ?? 'default-avatar-url',
              name: user.name ?? 'Unknown User',
              email: user.email ?? 'no-email@example.com',
            }}
            menuItems={userMenuItems}
          />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
