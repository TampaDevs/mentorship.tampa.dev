import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

/**
 * Router for handling skill-related API requests.
 */
export const skillRouter = createTRPCRouter({
  /**
   * Fetches a list of skills including associated mentors and mentees.
   *
   * @returns A promise that resolves to an array of skills with their mentors and mentees.
   */
  getSkills: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.skill.findMany();
  }),
});
