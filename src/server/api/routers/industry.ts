import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

/**
 * Router for handling industry-related API requests.
 */
export const industryRouter = createTRPCRouter({
  /**
   * Fetches a list of industries.
   *
   * @returns A promise that resolves to an array of industries.
   */
  getIndustries: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.industry.findMany();
  }),
});
