import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

/**
 * Router for handling goal-related API requests.
 */
export const goalRouter = createTRPCRouter({
  /**
   * Fetches a list of goals.
   *
   * @returns A promise that resolves to an array of goals.
   */
  getGoals: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.goal.findMany();
  }),
});
