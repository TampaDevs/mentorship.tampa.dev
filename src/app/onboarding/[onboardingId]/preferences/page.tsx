import type { NextPage } from 'next';

interface OnboardingPreferencesPageProps {
  params: Promise<{ onboardingId: string }>;
}

const OnboardingPreferencesPage: NextPage<OnboardingPreferencesPageProps> = async ({ params }) => {
  const { onboardingId } = await params;

  return (
    <div>
      <h1>Set Your Preferences</h1>
      <p>Onboarding ID: {onboardingId}</p>
      {/* ... form to set preferences ... */}
    </div>
  );
};

export default OnboardingPreferencesPage;
