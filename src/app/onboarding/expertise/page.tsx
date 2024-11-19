import type { NextPage } from 'next';

interface OnboardingExpertisePageProps {
  params: Promise<{ onboardingId: string }>;
}

const OnboardingExpertisePage: NextPage<OnboardingExpertisePageProps> = async ({ params }) => {
  const { onboardingId } = await params;

  return (
    <div>
      <h1>Tell Us About Your Expertise</h1>
      <p>Onboarding ID: {onboardingId}</p>
      {/* ... form to input expertise ... */}
    </div>
  );
};

export default OnboardingExpertisePage;
