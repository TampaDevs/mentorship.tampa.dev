import { z } from 'zod';

import { createTRPCRouter, protectedProcedure, publicProcedure } from '~/server/api/trpc';

export const userRouter = createTRPCRouter({
  /**
   * Fetches the current user based on the active session.
   * @returns The current user object if authenticated, otherwise null.
   */
  getCurrentUser: publicProcedure.query(async ({ ctx }) => {
    const session = ctx.session;

    if (!session?.user?.id) {
      return null;
    }
    return await ctx.db.user.findUnique({
      where: { id: session.user.id },
    });
  }),
  /**
   * Fetches all users from the database.
   * @returns An array of user objects.
   */
  getUsers: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findMany();
  }),

  /**
   * Fetches a user by their unique ID.
   * @param userId - The unique identifier of the user.
   * @returns A user object if found, otherwise null.
   */
  getUserById: protectedProcedure.input(z.object({ userId: z.string() })).query(async ({ ctx, input }) => {
    return await ctx.db.user.findUnique({
      where: { id: input.userId },
    });
  }),

  /**
   * Fetches mentorships associated with a user.
   * @param userId - The unique identifier of the user.
   * @returns An array of mentorship objects where the user is either a mentor or mentee.
   */
  getMentorshipsForUser: protectedProcedure.input(z.object({ userId: z.string() })).query(async ({ ctx, input }) => {
    return await ctx.db.mentorship.findMany({
      where: {
        OR: [{ mentorId: input.userId }, { menteeId: input.userId }],
      },
      include: {
        mentor: true,
        mentee: true,
      },
    });
  }),

  /**
   * Fetches skills associated with a user.
   * @param userId - The unique identifier of the user.
   * @returns An object containing arrays of mentor and mentee skills.
   */
  getSkillsForUser: protectedProcedure.input(z.object({ userId: z.string() })).query(async ({ ctx, input }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: input.userId },
      include: {
        mentorSkills: {
          select: {
            name: true,
            slug: true,
          },
        },
        menteeSkills: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    });
    return {
      mentorSkills: user?.mentorSkills,
      menteeSkills: user?.menteeSkills,
    };
  }),

  /**
   * Fetches suggestions associated with a user.
   * @param userId - The unique identifier of the user.
   * @returns An array of suggestion objects where the user is either a mentor or mentee.
   */
  getSuggestionsForUser: protectedProcedure.input(z.object({ userId: z.string() })).query(async ({ ctx, input }) => {
    return await ctx.db.suggestion.findMany({
      where: {
        OR: [{ mentorId: input.userId }, { menteeId: input.userId }],
      },
      include: {
        mentor: true,
        mentee: true,
      },
    });
  }),

  /**
   * Updates a user's profile information.
   * @param userId - The unique identifier of the user.
   * @param name - The new name of the user (optional).
   * @param email - The new email of the user (optional).
   * @param title - The new title of the user (optional).
   * @param location - The new location of the user (optional).
   * @param about - The new about section of the user (optional).
   * @returns The updated user object.
   */
  updateUserProfile: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        name: z.string().optional(),
        email: z.string().email().optional(),
        title: z.string().optional(),
        location: z.string().optional(),
        about: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.user.update({
        where: { id: input.userId },
        data: {
          name: input.name,
          email: input.email,
          title: input.title,
          location: input.location,
        },
      });
    }),
});
