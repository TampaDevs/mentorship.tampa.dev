'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { Form } from '~/components/ui/form';
import { api } from '~/trpc/react';
import { Button } from '~/ui/primitives/button';
import { useOnboardingStore } from '../onboarding-store';
import { generalFormSchema } from './validation-schemas';

const OnboardingGeneralPage = () => {
  const { data: industries } = api.industry.getIndustries.useQuery();
  const { data: seniorityLevels } = api.seniority.getSeniorityLevels.useQuery();
  const [loading, setLoading] = useState(true);
  const { updateGeneralForm } = useOnboardingStore();

  useEffect(() => {
    if (seniorityLevels && industries) setLoading(false);
  }, [seniorityLevels, industries]);

  const form = useForm<z.infer<typeof generalFormSchema>>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: {
      first: '',
      last: '',
      industries: [],
      userType: [],
      bio: '',
    },
  });

  function onSubmit(values: z.infer<typeof generalFormSchema>) {
    console.log(values);
    updateGeneralForm(values);
    window.location.replace('/onboarding/programinfo');
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold">General Information</h1>
      <p className="w-full max-w-3xl text-sm text-neutral-500">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="my-5 w-full max-w-lg space-y-4">
          {/* Form Fields */}
          <div id="checkboxes">
            <button className="hidden">Hidden Button</button>
          </div>
          <Button type="submit">
            Next Step <ArrowRight />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default OnboardingGeneralPage;
