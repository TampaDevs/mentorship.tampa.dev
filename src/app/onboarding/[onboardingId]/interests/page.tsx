import type { NextPage } from "next";

interface OnboardingInterestsPageProps {
  params: { onboardingId: string };
}

const OnboardingInterestsPage: NextPage<OnboardingInterestsPageProps> = async ({
  params,
}) => {
  return (
    <div>
      <h1>What Are Your Interests?</h1>
      <p>Onboarding ID: {params.onboardingId}</p>
      {/* ... form to input interests ... */}
    </div>
  );
};

export default OnboardingInterestsPage;
