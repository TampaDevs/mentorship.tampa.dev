'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { api } from '~/trpc/react';
import { Button } from '~/ui/primitives/button';
import Select from 'react-select';
import { ArrowRight } from 'lucide-react';
import { mentorFormSchema } from '../formSchemas';
import type { z } from 'zod';
import OnboardingLoading from '../_components/loading';
import { Input } from '~/ui/primitives/input';

export default function MentorForm({ setMentorFormCompleted }: { setMentorFormCompleted: (value: boolean) => void }) {
  const { mutate, error } = api.onboarding.submitMentorForm.useMutation();
  const { data: skills } = api.skill.getSkills.useQuery();
  const { data: softSkills } = api.softSkill.getSoftSkills.useQuery();
  const { data: goals } = api.goal.getGoals.useQuery();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (skills && softSkills && goals) setLoading(false);
  }, [skills, softSkills, goals]);

  const mentorForm = useForm<z.infer<typeof mentorFormSchema>>({
    resolver: zodResolver(mentorFormSchema),
    defaultValues: {
      mentorSkills: [],
      mentorSoftSkills: [],
      mentorGoals: [],
      capacity: 1,
    },
  });

  function onMentorFormSubmit(values: z.infer<typeof mentorFormSchema>) {
    setLoading(true);
    setMentorFormCompleted(true);
    mutate(
      { ...values },
      {
        onError: (error) => {
          console.log('Error', error);
        },
      }
    );
  }

  if (loading && !error) return <OnboardingLoading />;

  return (
    <div>
      <h1 className="text-3xl font-bold">Mentor Information</h1>
      <p className="w-full max-w-3xl text-sm text-neutral-500">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </p>

      {error && (
        <div className="border-red my-3 rounded border border-red-400 bg-red-200 p-2 text-sm">
          An error has occured while submitting this form.
        </div>
      )}

      <Form {...mentorForm}>
        <form onSubmit={mentorForm.handleSubmit(onMentorFormSubmit)} className="my-5 w-full max-w-lg space-y-8">
          {skills && (
            <FormField
              control={mentorForm.control}
              name="mentorSkills"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-2">
                    <FormLabel className="text-base">Hard Skills</FormLabel>
                    <FormDescription>What hard skills can you mentor someone on?</FormDescription>
                  </div>
                  <FormControl>
                    <Select
                      isMulti
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      placeholder="Select Hard Skills"
                      options={skills.map((skill) => {
                        return { value: skill.id, label: skill.name };
                      })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {softSkills && (
            <FormField
              control={mentorForm.control}
              name="mentorSoftSkills"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-2">
                    <FormLabel className="text-base">Soft Skills</FormLabel>
                    <FormDescription>What soft skills can you mentor someone on?</FormDescription>
                  </div>
                  <FormControl>
                    <Select
                      isMulti
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      placeholder="Select Soft Skills"
                      options={softSkills.map((skill) => {
                        return { value: skill.id, label: skill.name };
                      })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {goals && (
            <FormField
              control={mentorForm.control}
              name="mentorGoals"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-2">
                    <FormLabel className="text-base">Goals</FormLabel>
                    <FormDescription>What goals are you best suited to help someone achieve?</FormDescription>
                  </div>
                  <FormControl>
                    <Select
                      isMulti
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      placeholder="Select Goals"
                      options={goals.map((goal) => {
                        return { value: goal.id, label: goal.name };
                      })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={mentorForm.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <div className="mb-2">
                  <FormLabel className="text-base">Capacity</FormLabel>
                  <FormDescription>How many mentees do you have capacity to take on?</FormDescription>
                </div>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    max={3}
                    {...field}
                    className="max-w-24"
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">
            Next <ArrowRight />
          </Button>
        </form>
      </Form>
    </div>
  );
}
