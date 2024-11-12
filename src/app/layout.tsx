import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { Header } from "~/app/_components/header";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Tampa Devs Mentorship",
  description: "Tampa Devs Mentorship",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <Header />
          <div className="min-h-full">
            <main className="mx-auto">{children}</main>
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
