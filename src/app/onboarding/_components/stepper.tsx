'use client';

import { cn } from '~/lib/utils';
import { Check } from 'lucide-react';
import { usePathname } from 'next/navigation';

const steps = [
  {
    title: 'General',
    slug: 'general',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
  },
  { title: 'Interests / Expertise', slug: 'programinfo', description: 'Date & Time' },
  { title: 'Preferences', slug: 'preferences', description: 'Your preferences' },
];

export default function Stepper() {
  const pathname = usePathname();

  function stepStatus(stepCircleNumber: number) {
    const page = pathname.split('/').at(-1);
    const pageIndex = steps.findIndex((step) => step.slug === page) + 1;
    if (stepCircleNumber < pageIndex) {
      return 'finished';
    } else if (stepCircleNumber === pageIndex) {
      return 'current';
    } else {
      return 'unfinished';
    }
  }

  return (
    <div className="hidden w-full max-w-sm flex-col gap-2 bg-neutral-100 p-10 md:flex">
      {steps.map((step, idx) => {
        const stepNumber = idx + 1;
        const status = stepStatus(stepNumber);
        return (
          <div key={`step-${idx}`}>
            <div className="flex items-start gap-3">
              <div>
                <div
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-blue-700 text-sm font-bold text-blue-700',
                    status !== 'unfinished' && 'bg-blue-700 text-white'
                  )}
                >
                  {status === 'finished' ? <Check size={15} /> : stepNumber}
                </div>
                {stepNumber < steps.length && (
                  <div className="mt-2 flex w-8 justify-center">
                    <div className="h-16 w-[2px] rounded bg-blue-700"></div>
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center gap-1.5 pt-2">
                <p className="font-semibold leading-4">{step.title}</p>
                <p className="text-sm leading-4 text-neutral-500">{step.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
