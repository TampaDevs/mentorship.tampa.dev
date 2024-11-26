import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

/**
 * Router for handling goal-related API requests.
 */
export const seniorityRouter = createTRPCRouter({
  /**
   * Fetches a list of seniority levels.
   *
   * @returns A promise that resolves to an array of seniority levels.
   */
  getSeniorityLevels: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.seniorityLevel.findMany();
  }),
});
