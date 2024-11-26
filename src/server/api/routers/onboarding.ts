import { generalFormSchema } from '~/app/onboarding/general/page';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '~/server/api/trpc';

/**
 * Router for handling soft-skill-related API requests.
 */
export const onboardingRouter = createTRPCRouter({
  submitGeneralForm: protectedProcedure.input(generalFormSchema).mutation(async ({ ctx, input }) => {
    const session = ctx.session;

    if (!session?.user?.id) {
      return null;
    }

    const industries = input.industries.map((industry) => {
      return { id: industry.value };
    });

    ctx.db.user
      .update({
        where: { id: session.user.id },
        data: {
          name: input.first + ' ' + input.last,
          mentor_gender: input.gender,
          mentorSeniorityId: parseInt(input.seniorityLevel),
          industries: {
            connect: [...industries],
          },
          active_mentee: input.userType.includes('mentee'),
          active_mentor: input.userType.includes('mentor'),
          bio: input.bio,
        },
      })
      .then(() => {
        // Mark general form submitted withing onboarding table
        ctx.db.onboarding.upsert({
          where: { userId: session.user.id },
          update: {
            generalFormCompleted: true,
          },
          create: {
            userId: session.user.id,
            generalFormCompleted: true,
          },
        });
      });
  }),
});
