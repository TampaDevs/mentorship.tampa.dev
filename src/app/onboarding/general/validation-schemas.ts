import { z } from 'zod';

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
