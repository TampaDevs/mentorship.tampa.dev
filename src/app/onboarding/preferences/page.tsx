'use client';

import { Button } from '~/ui/primitives/button';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { Input } from '~/ui/primitives/input';
import { Checkbox } from '~/components/ui/checkbox';
import { Card, CardDescription, CardHeader, CardTitle } from '~/ui/primitives/card';
import { Briefcase, CircleCheck, Coffee, MoonStar } from 'lucide-react';
import { cn } from '~/lib/utils';
import { Switch } from '~/components/ui/switch';
import './page.css';
import { preferencesFormSchema } from '../formSchemas';
import { api } from '~/trpc/react';
import { useState } from 'react';
import OnboardingLoading from '../_components/loading';

const OnboardingPreferencesPage = () => {
  const { mutate, error } = api.onboarding.submitPreferencesForm.useMutation();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof preferencesFormSchema>>({
    resolver: zodResolver(preferencesFormSchema),
    defaultValues: {
      in_person: 'false',
      linkedin_url: '',
      availability: [],
      match_emails: true,
      suggestion_emails: true,
      news_updates_emails: true,
    },
  });

  function onSubmit(values: z.infer<typeof preferencesFormSchema>) {
    console.log(values);
    setLoading(true);
    mutate(
      { ...values },
      {
        onSuccess: () => {
          window.location.replace('/');
        },
        onError: (error) => {
          console.log('Error', error);
        },
      }
    );
  }

  if (loading && !error) return <OnboardingLoading />;

  return (
    <div>
      <h1 className="text-3xl font-bold">Preferences</h1>
      <p className="w-full max-w-3xl text-sm text-neutral-500">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </p>

      {error && (
        <div className="border-red my-3 rounded border border-red-400 bg-red-200 p-2 text-sm">
          An error has occured while submitting this form.
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="my-5 w-full max-w-md space-y-8">
          <FormField
            control={form.control}
            name="in_person"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <div className="mb-2">
                  <FormLabel className="text-base">Mentorship Type</FormLabel>
                  <FormDescription>How would you like to meet with other users?</FormDescription>
                </div>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="false" />
                      </FormControl>
                      <FormLabel className="font-normal">Online only</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="true" />
                      </FormControl>
                      <FormLabel className="font-normal">Online & in-person</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="linkedin_url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>LinkedIn Profile URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://www.linkedin.com/in/..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="availability"
            render={() => (
              <FormItem className="!my-6">
                <div className="mb-4">
                  <FormLabel className="text-base">Your preferred meeting times</FormLabel>
                  <FormDescription>When in the week would you like to meet with others?</FormDescription>
                </div>
                <div className="flex flex-col justify-stretch gap-2" id="checkboxes">
                  <FormField
                    control={form.control}
                    name="availability"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes('working_hours')}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, 'working_hours'])
                                  : field.onChange(field.value?.filter((value) => value !== 'working_hours'));
                              }}
                            />
                          </FormControl>
                          <FormLabel className="!m-0 flex grow text-sm font-normal">
                            <Card
                              className={cn(
                                'flex grow cursor-pointer items-center gap-3 border-2 p-3',
                                form.getValues().availability.includes('working_hours') && 'border-blue-700'
                              )}
                            >
                              <Briefcase size={24} />
                              <CardHeader className="p-0">
                                <CardTitle className="flex items-center gap-1 leading-5">
                                  Working Hours{' '}
                                  {form.getValues().availability.includes('working_hours') && (
                                    <CircleCheck size={16} color="blue" />
                                  )}
                                </CardTitle>
                                <CardDescription className="!mt-0">Mon-Fri, 9:00 AM - 5:00 PM</CardDescription>
                              </CardHeader>
                            </Card>
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="availability"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes('weeknights')}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, 'weeknights'])
                                  : field.onChange(field.value?.filter((value) => value !== 'weeknights'));
                              }}
                            />
                          </FormControl>
                          <FormLabel className="!m-0 flex grow text-sm font-normal">
                            <Card
                              className={cn(
                                'flex grow cursor-pointer items-center gap-3 border-2 p-3',
                                form.getValues().availability.includes('weeknights') && 'border-blue-700'
                              )}
                            >
                              <MoonStar size={24} />
                              <CardHeader className="p-0">
                                <CardTitle className="flex items-center gap-1 leading-5">
                                  Weeknights{' '}
                                  {form.getValues().availability.includes('weeknights') && (
                                    <CircleCheck size={16} color="blue" />
                                  )}
                                </CardTitle>
                                <CardDescription className="!mt-0">Mon-Fri, 5:00 PM - 10:00 PM</CardDescription>
                              </CardHeader>
                            </Card>
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="availability"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes('weekends')}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, 'weekends'])
                                  : field.onChange(field.value?.filter((value) => value !== 'weekends'));
                              }}
                            />
                          </FormControl>
                          <FormLabel className="!m-0 flex grow text-sm font-normal">
                            <Card
                              className={cn(
                                'flex grow cursor-pointer items-center gap-3 border-2 p-3',
                                form.getValues().availability.includes('weekends') && 'border-blue-700'
                              )}
                            >
                              <Coffee size={24} />
                              <CardHeader className="p-0">
                                <CardTitle className="flex items-center gap-1 leading-5">
                                  Weekends{' '}
                                  {form.getValues().availability.includes('weekends') && (
                                    <CircleCheck size={16} color="blue" />
                                  )}
                                </CardTitle>
                                <CardDescription className="!mt-0">Sat-Sun, 9:00 AM - 7:00 PM</CardDescription>
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

          <h2 className="text-xl font-bold">Notifications</h2>

          <div className="!mt-3 space-y-4">
            <FormField
              control={form.control}
              name="match_emails"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-4">
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="!mt-0">
                    <FormLabel>Match Emails</FormLabel>
                    <FormDescription>Receive an email when you match with a mentor or mentee.</FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="suggestion_emails"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-4">
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="!mt-0">
                    <FormLabel>Suggestion Emails</FormLabel>
                    <FormDescription>Receive an email when you have new match suggestions.</FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="news_updates_emails"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-4">
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="!mt-0">
                    <FormLabel>News & Updates</FormLabel>
                    <FormDescription>Receive emails about news, features, and more.</FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default OnboardingPreferencesPage;
