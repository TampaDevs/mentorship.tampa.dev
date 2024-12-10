import { auth } from '~/server/auth';
import { redirect } from 'next/navigation';
import Stepper from './_components/stepper';
import { HydrateClient } from '~/trpc/server';

export default async function OnboardingLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <HydrateClient>
      <div className="flex h-[calc(100vh-64px)] grow">
        <Stepper />
        <div className="flex h-[calc(100vh-64px)] grow flex-col overflow-y-scroll p-10">{children}</div>
      </div>
    </HydrateClient>
  );
}
