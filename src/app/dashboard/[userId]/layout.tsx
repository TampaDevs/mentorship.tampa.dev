import { type ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* ... dashboard navigation ... */}
      {children}
    </div>
  );
}
