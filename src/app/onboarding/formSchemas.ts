import { z } from 'zod';

export const generalFormSchema = z.object({
  first: z.string().min(2).max(50),
  last: z.string().min(2).max(50),
  title: z.string().min(2).max(200),
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

export const mentorFormSchema = z.object({
  // Mentor
  capacity: z.number().min(1).max(3),
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

export const menteeFormSchema = z.object({
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
  menteeGender: z
    .array(
      z.object({
        value: z.union([
          z.literal('MALE', { message: 'Please choose an option.' }),
          z.literal('FEMALE'),
          z.literal('NONBINARY'),
          z.literal('TRANSGENDER'),
          z.literal('OTHER'),
        ]),
        label: z.string(),
      })
    )
    .refine((value) => value.some((item) => item), {
      message: 'You must select at least one gender.',
    }),
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

export const preferencesFormSchema = z.object({
  in_person: z.union([z.literal('false', { message: 'Please choose an option.' }), z.literal('true')]),
  linkedin_url: z
    .string()
    .regex(RegExp('^https?://((www|ww).)?linkedin.com/((in/[^/]+/?)|(pub/[^/]+/((w|d)+/?){3}))$'), {
      message: 'This should be a LinkedIn profile URL.',
    }),
  availability: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You must select at least one meeting time.',
  }),
  match_emails: z.boolean(),
  suggestion_emails: z.boolean(),
  news_updates_emails: z.boolean(),
});
