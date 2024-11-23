'use client';

import { Button } from '~/ui/primitives/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/ui/primitives/input';

const formSchema = z.object({
  menteeSkills: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You must select at least one item.',
  }),
  sideProjects: z.string(),
  menteeSoftSkills: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You must select at least one item.',
  }),
  menteeGoals: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You must select at least one item.',
  }),
  motivation: z.string(),
});

const OnboardingInterestsPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      menteeSkills: [],
      sideProjects: '',
      menteeSoftSkills: [],
      menteeGoals: [],
      motivation: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Your Interests</h1>
      <p className="w-full max-w-3xl text-sm text-neutral-500">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="my-5 w-full max-w-md space-y-8">
          <FormField
            control={form.control}
            name="sideProjects"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default OnboardingInterestsPage;
