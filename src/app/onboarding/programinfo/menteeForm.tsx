'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { api } from '~/trpc/react';
import { Button } from '~/ui/primitives/button';
import Select from 'react-select';
import { Textarea } from '~/components/ui/textarea';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

const menteeFormSchema = z.object({
  // Mentee
  menteeSkills: z
    .array(
      z.object({
        value: z.number(),
        label: z.string(),
      })
    )
    .refine((value) => value.some((item) => item), {
      message: 'You must select at least one hard skill.',
    }),
  sideProjects: z.string(),
  menteeSoftSkills: z
    .array(
      z.object({
        value: z.number(),
        label: z.string(),
      })
    )
    .refine((value) => value.some((item) => item), {
      message: 'You must select at least one soft skill.',
    }),
  menteeGoals: z
    .array(
      z.object({
        value: z.number(),
        label: z.string(),
      })
    )
    .refine((value) => value.some((item) => item), {
      message: 'You must select at least one goal.',
    }),
  motivation: z.string(),
});

export default function MenteeForm({ setMenteeFormCompleted }: { setMenteeFormCompleted: (value: boolean) => void }) {
  const { data: skills } = api.skill.getSkills.useQuery();
  const { data: softSkills } = api.softSkill.getSoftSkills.useQuery();
  const { data: goals } = api.goal.getGoals.useQuery();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (skills && softSkills && goals) setLoading(false);
  }, [skills, softSkills, goals]);

  const menteeForm = useForm<z.infer<typeof menteeFormSchema>>({
    resolver: zodResolver(menteeFormSchema),
    defaultValues: {
      menteeSkills: [],
      sideProjects: '',
      menteeSoftSkills: [],
      menteeGoals: [],
      motivation: '',
    },
  });

  function onMenteeFormSubmit(values: z.infer<typeof menteeFormSchema>) {
    console.log(values);
    setMenteeFormCompleted(true);
  }

  if (loading) return 'Loading...';

  return (
    <div>
      <h1 className="text-3xl font-bold">Mentee Information</h1>
      <p className="w-full max-w-3xl text-sm text-neutral-500">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </p>
      <Form {...menteeForm}>
        <form onSubmit={menteeForm.handleSubmit(onMenteeFormSubmit)} className="my-5 w-full max-w-lg space-y-8">
          {skills && (
            <FormField
              control={menteeForm.control}
              name="menteeSkills"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-2">
                    <FormLabel className="text-base">Hard Skills</FormLabel>
                    <FormDescription>What hard skills do you want a mentor to help you with?</FormDescription>
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
              control={menteeForm.control}
              name="menteeSoftSkills"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-2">
                    <FormLabel className="text-base">Soft Skills</FormLabel>
                    <FormDescription>What soft skills do you want a mentor to help you with?</FormDescription>
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
              control={menteeForm.control}
              name="menteeGoals"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-2">
                    <FormLabel className="text-base">Goals</FormLabel>
                    <FormDescription>What goals do you want a mentor to help you with?</FormDescription>
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
            control={menteeForm.control}
            name="sideProjects"
            render={({ field }) => (
              <FormItem>
                <div className="mb-2">
                  <FormLabel className="text-base">Side Projects</FormLabel>
                  <FormDescription>Describe any side projects you might want guidance on.</FormDescription>
                </div>
                <FormControl>
                  <Textarea className="min-h-24" placeholder="Side projects..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={menteeForm.control}
            name="motivation"
            render={({ field }) => (
              <FormItem>
                <div className="mb-2">
                  <FormLabel className="text-base">Motivation</FormLabel>
                  <FormDescription>What do you want to get out of this program?</FormDescription>
                </div>
                <FormControl>
                  <Textarea className="min-h-24" placeholder="Motivation..." {...field} />
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
