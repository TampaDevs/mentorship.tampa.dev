import type { NextPage } from "next";

interface OnboardingExpertisePageProps {
  params: { onboardingId: string };
}

const OnboardingExpertisePage: NextPage<OnboardingExpertisePageProps> = async ({
  params,
}) => {
  return (
    <div>
      <h1>Tell Us About Your Expertise</h1>
      <p>Onboarding ID: {params.onboardingId}</p>
      {/* ... form to input expertise ... */}
    </div>
  );
};

export default OnboardingExpertisePage;
