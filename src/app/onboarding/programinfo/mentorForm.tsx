'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { api } from '~/trpc/react';
import { Button } from '~/ui/primitives/button';
import Select from 'react-select';
import { ArrowRight } from 'lucide-react';

const mentorFormSchema = z.object({
  // Mentor
  mentorSkills: z
    .array(
      z.object({
        value: z.number(),
        label: z.string(),
      })
    )
    .refine((value) => value.some((item) => item), {
      message: 'You must select at least one hard skill.',
    }),
  mentorSoftSkills: z
    .array(
      z.object({
        value: z.number(),
        label: z.string(),
      })
    )
    .refine((value) => value.some((item) => item), {
      message: 'You must select at least one soft skill.',
    }),
  mentorGoals: z
    .array(
      z.object({
        value: z.number(),
        label: z.string(),
      })
    )
    .refine((value) => value.some((item) => item), {
      message: 'You must select at least one hard goal.',
    }),
});

export default function MentorForm({ setMentorFormCompleted }: { setMentorFormCompleted: (value: boolean) => void }) {
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
    },
  });

  function onMentorFormSubmit(values: z.infer<typeof mentorFormSchema>) {
    setMentorFormCompleted(true);
    console.log(values);
  }

  if (loading) return 'Loading...';

  return (
    <div>
      <h1 className="text-3xl font-bold">Mentor Information</h1>
      <p className="w-full max-w-3xl text-sm text-neutral-500">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </p>
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

          <Button type="submit">
            Next <ArrowRight />
          </Button>
        </form>
      </Form>
    </div>
  );
}
