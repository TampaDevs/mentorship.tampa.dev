import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '~/ui/primitives/button';

const OnboardingStartPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-2xl grow flex-col items-center justify-center gap-5 text-center">
      <h1 className="text-5xl font-bold">Welcome to Onboarding!</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </p>
      <Link href="/onboarding/general">
        <Button>
          Get Started <ArrowRight />
        </Button>
      </Link>
    </div>
  );
};

export default OnboardingStartPage;
