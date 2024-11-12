import type { NextPage } from "next";

interface OnboardingStartPageProps {
  params: { onboardingId: string };
}

const OnboardingStartPage: NextPage<OnboardingStartPageProps> = async ({
  params,
}) => {
  return (
    <div>
      <h1>Welcome to Onboarding</h1>
      <p>Your Onboarding ID: {params.onboardingId}</p>
      {/* ... onboarding steps ... */}
    </div>
  );
};

export default OnboardingStartPage;
