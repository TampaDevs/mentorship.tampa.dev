import { skillRouter } from '~/server/api/routers/skill';
import { userRouter } from '~/server/api/routers/user';
import { createCallerFactory, createTRPCRouter } from '~/server/api/trpc';
import { softSkillRouter } from './routers/soft-skill';
import { goalRouter } from './routers/goal';
import { industryRouter } from './routers/industry';
import { seniorityRouter } from './routers/seniority';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  skill: skillRouter,
  softSkill: softSkillRouter,
  goal: goalRouter,
  industry: industryRouter,
  seniority: seniorityRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
