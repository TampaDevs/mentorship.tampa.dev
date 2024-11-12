import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getUsers: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findMany();
  }),

  getUserById: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.user.findUnique({
        where: { id: input.userId },
      });
    }),

  getMentorshipsForUser: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.mentorship.findMany({
        where: {
          OR: [
            { mentorId: input.userId },
            { menteeId: input.userId },
          ],
        },
        include: {
          mentor: true,
          mentee: true,
        },
      });
    }),

  getSkillsForUser: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: input.userId },
        include: {
          mentor_skills: true,
          mentee_skills: true,
        },
      });
      return {
        mentorSkills: user?.mentor_skills,
        menteeSkills: user?.mentee_skills,
      };
    }),

  getSuggestionsForUser: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.suggestion.findMany({
        where: {
          OR: [
            { mentorId: input.userId },
            { menteeId: input.userId },
          ],
        },
        include: {
          mentor: true,
          mentee: true,
        },
      });
    }),

  updateUserProfile: protectedProcedure
    .input(z.object({
      userId: z.string(),
      name: z.string().optional(),
      email: z.string().email().optional(),
      title: z.string().optional(),
      location: z.string().optional(),
      about: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.user.update({
        where: { id: input.userId },
        data: {
          name: input.name,
          email: input.email,
          title: input.title,
          location: input.location,
          about: input.about,
        },
      });
    }),
});
