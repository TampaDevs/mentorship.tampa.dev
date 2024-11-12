import type { NextPage } from "next";

interface OnboardingPreferencesPageProps {
  params: { onboardingId: string };
}

const OnboardingPreferencesPage: NextPage<
  OnboardingPreferencesPageProps
> = async ({ params }) => {
  return (
    <div>
      <h1>Set Your Preferences</h1>
      <p>Onboarding ID: {params.onboardingId}</p>
      {/* ... form to set preferences ... */}
    </div>
  );
};

export default OnboardingPreferencesPage;
