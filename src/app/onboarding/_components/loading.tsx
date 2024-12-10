import { LoaderCircle } from 'lucide-react';

export default function OnboardingLoading() {
  return (
    <div className="flex w-full justify-center py-20">
      <LoaderCircle size={30} color="lightgrey" className="animate-spin" />
    </div>
  );
}
