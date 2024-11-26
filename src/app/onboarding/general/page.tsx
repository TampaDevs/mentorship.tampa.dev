'use client';

import { Button } from '~/ui/primitives/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/ui/primitives/input';
import { Textarea } from '~/components/ui/textarea';
import { Checkbox } from '~/components/ui/checkbox';
import { cn } from '~/lib/utils';
import { Card, CardDescription, CardHeader, CardTitle } from '~/ui/primitives/card';
import './page.css';
import { ArrowRight, CircleCheck } from 'lucide-react';
import { useOnboardingStore } from '../onboarding-store';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { api } from '~/trpc/react';
import { useEffect, useState } from 'react';
import MultiSelect from 'react-select';

export const generalFormSchema = z.object({
  first: z.string().min(2).max(50),
  last: z.string().min(2).max(50),
  gender: z.union([
    z.literal('MALE', { message: 'Please choose an option.' }),
    z.literal('FEMALE'),
    z.literal('NONBINARY'),
    z.literal('TRANSGENDER'),
    z.literal('OTHER'),
  ]),
  seniorityLevel: z.string(),
  industries: z
    .array(
      z.object({
        value: z.number(),
        label: z.string(),
      })
    )
    .refine((value) => value.some((item) => item), {
      message: 'You must select at least one industry.',
    }),
  userType: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You must select at least one item.',
  }),
  bio: z.string().min(2).max(50),
});

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

  if (loading) return 'Loading...';

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
          <div className="flex w-full gap-3">
            <FormField
              control={form.control}
              name="last"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="first"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="w-full">
                <div className="mb-2">
                  <FormLabel className="text-base">Gender</FormLabel>
                  <FormDescription>What gender do you identify with?</FormDescription>
                </div>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                    <SelectItem value="NONBINARY">Non-binary</SelectItem>
                    <SelectItem value="TRANSGENDER">Transgender</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {seniorityLevels && (
            <FormField
              control={form.control}
              name="seniorityLevel"
              render={({ field }) => (
                <FormItem className="w-full">
                  <div className="mb-2">
                    <FormLabel className="text-base">Seniority</FormLabel>
                    <FormDescription>What is your seniority level?</FormDescription>
                  </div>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seniority Level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {seniorityLevels.map((level, idx) => (
                        <SelectItem value={level.id.toString()} key={`seniority-${level.id}`}>
                          {level.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {industries && (
            <FormField
              control={form.control}
              name="industries"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-2">
                    <FormLabel className="text-base">Industry</FormLabel>
                    <FormDescription>What industries do you have the most experience in?</FormDescription>
                  </div>
                  <FormControl>
                    <MultiSelect
                      isMulti
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      placeholder="Select Hard Skills"
                      options={industries.map((industry) => {
                        return { value: industry.id, label: industry.name };
                      })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="userType"
            render={() => (
              <FormItem className="!my-6">
                <div className="mb-4">
                  <FormLabel className="text-base">How do you want to use this platform?</FormLabel>
                  <FormDescription>You can choose to appear as a mentor, mentee, or both.</FormDescription>
                </div>
                <div className="flex items-stretch gap-5" id="checkboxes">
                  <FormField
                    control={form.control}
                    name="userType"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex basis-1/2 flex-col items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes('mentor')}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, 'mentor'])
                                  : field.onChange(field.value?.filter((value) => value !== 'mentor'));
                              }}
                            />
                          </FormControl>
                          <FormLabel className="!m-0 flex grow text-sm font-normal">
                            <Card
                              className={cn(
                                'grow cursor-pointer border-2',
                                form.getValues().userType.includes('mentor') && 'border-blue-700'
                              )}
                            >
                              <CardHeader>
                                <CardTitle className="flex items-center gap-1 leading-5">
                                  Mentor{' '}
                                  {form.getValues().userType.includes('mentor') && (
                                    <CircleCheck size={16} color="blue" />
                                  )}
                                </CardTitle>
                                <CardDescription>
                                  Provide Guidance and support to a Mentee to help them reach their goals.
                                </CardDescription>
                              </CardHeader>
                            </Card>
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="userType"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex basis-1/2 flex-col items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes('mentee')}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, 'mentee'])
                                  : field.onChange(field.value?.filter((value) => value !== 'mentee'));
                              }}
                            />
                          </FormControl>
                          <FormLabel className="!m-0 flex grow text-sm font-normal">
                            <Card
                              className={cn(
                                'grow cursor-pointer border-2',
                                form.getValues().userType.includes('mentee') && 'border-blue-700'
                              )}
                            >
                              <CardHeader>
                                <CardTitle className="flex items-center gap-1 leading-5">
                                  Mentee{' '}
                                  {form.getValues().userType.includes('mentee') && (
                                    <CircleCheck size={16} color="blue" />
                                  )}
                                </CardTitle>
                                <CardDescription>
                                  Receive guidance and support from a mentor who can help enhance your personal or
                                  professional development.
                                </CardDescription>
                              </CardHeader>
                            </Card>
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <div className="mb-2">
                  <FormLabel className="text-base">Bio</FormLabel>
                  <FormDescription>
                    Your bio is one of the most important pieces of information for matching with colleagues. A good bio
                    means you are 2x more likely to match with the right person.
                  </FormDescription>
                </div>
                <FormControl>
                  <Textarea
                    rows={8}
                    placeholder="Current position, past roles, expertise, experience, etc."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            Next Step <ArrowRight />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default OnboardingGeneralPage;
