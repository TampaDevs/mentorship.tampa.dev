import { type ReactNode } from 'react';
import { Dashboard } from '~/app/_components/dashboard';
import { SidebarProvider } from '~/ui/primitives/sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
  breadcrumbs?: {
    label: string;
    href?: string;
  }[];
  currentPage?: string;
}

export default function DashboardLayout({
  children,
  breadcrumbs = [],
  currentPage = 'Dashboard',
}: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <Dashboard breadcrumbs={breadcrumbs} currentPage={currentPage}>
        {children}
      </Dashboard>
    </SidebarProvider>
  );
}
