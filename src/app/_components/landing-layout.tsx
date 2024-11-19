import '~/styles/globals.css';

import { Footer } from '~/app/_components/footer';
import { Header } from '~/app/_components/header';

export async function LandingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
