import type { NextPage } from 'next';

interface OnboardingStartPageProps {
  params: Promise<{ onboardingId: string }>;
}

const OnboardingStartPage: NextPage<OnboardingStartPageProps> = async ({ params }) => {
  const { onboardingId } = await params;

  return (
    <div>
      <h1>Welcome to Onboarding</h1>
      <p>Your Onboarding ID: {onboardingId}</p>
      {/* ... onboarding steps ... */}
    </div>
  );
};

export default OnboardingStartPage;
