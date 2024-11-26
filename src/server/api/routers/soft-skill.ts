import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

/**
 * Router for handling soft-skill-related API requests.
 */
export const softSkillRouter = createTRPCRouter({
  /**
   * Fetches a list of soft skills.
   *
   * @returns A promise that resolves to an array of soft skills.
   */
  getSoftSkills: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.softSkill.findMany();
  }),
});
