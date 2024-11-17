'use client';

import {
  Calendar,
  ChevronDown,
  Home,
  Inbox,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
  UserPlus,
  Users,
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { routes } from '~/routes';

import { Button } from '~/ui/primitives/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/ui/primitives/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
} from '~/ui/primitives/sidebar';

type UserRole = 'regular' | 'admin' | 'owner';

interface SidebarProps {
  userRole: UserRole;
  userName: string;
}

export default function MentorshipSidebar({ userRole, userName }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const userId = session?.user.id ?? '';

  const menuItems = [
    {
      name: 'Dashboard',
      icon: LayoutDashboard,
      href: routes.dashboard.home(userId),
      roles: ['regular', 'admin', 'owner'],
    },
    {
      name: 'Mentorships',
      icon: Users,
      href: routes.dashboard.mentorships(userId),
      roles: ['regular', 'admin', 'owner'],
    },
    {
      name: 'Messages',
      icon: Inbox,
      href: routes.dashboard.notifications(userId),
      roles: ['regular', 'admin', 'owner'],
    },
    {
      name: 'Schedule',
      icon: Calendar,
      href: routes.dashboard.schedule(userId),
      roles: ['regular', 'admin', 'owner'],
    },
    { name: 'User Management', icon: UserPlus, href: routes.admin.users, roles: ['admin', 'owner'] },
    { name: 'Platform Settings', icon: Settings, href: routes.admin.settings, roles: ['owner'] },
  ];

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground w-full justify-start"
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span className="font-medium">{userName}</span>
                    <ChevronDown className="ml-auto h-4 w-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/logout">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => {
              if (item.roles.includes(userRole)) {
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild isActive={pathname === item.href}>
                      <Link href={item.href}>
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              }
              return null;
            })}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  <span>Back to Home</span>
                </Link>
              </Button>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  );
}
