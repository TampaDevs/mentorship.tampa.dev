import { generalFormSchema } from '~/app/onboarding/general/validation-schemas';
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';

/**
 * Router for handling onboarding-related API requests.
 */
export const onboardingRouter = createTRPCRouter({
  submitGeneralForm: protectedProcedure.input(generalFormSchema).mutation(async ({ ctx, input }) => {
    const session = ctx.session;

    // Ensure user is authenticated
    if (!session?.user?.id) {
      throw new Error('Unauthorized access');
    }

    try {
      // Validate input against schema (optional; for additional backend validation)
      generalFormSchema.parse(input);

      // Prepare industries for connecting
      const industries = input.industries.map((industry) => ({ id: industry.value }));

      // Perform updates in a transaction for atomicity
      await ctx.db.$transaction([
        ctx.db.user.update({
          where: { id: session.user.id },
          data: {
            name: `${input.first} ${input.last}`,
            mentor_gender: input.gender,
            mentorSeniorityId: parseInt(input.seniorityLevel, 10),
            industries: {
              connect: industries,
            },
            active_mentee: input.userType.includes('mentee'),
            active_mentor: input.userType.includes('mentor'),
            bio: input.bio,
          },
        }),
        ctx.db.onboarding.upsert({
          where: { userId: session.user.id },
          update: { generalFormCompleted: true },
          create: {
            userId: session.user.id,
            generalFormCompleted: true,
          },
        }),
      ]);

      return { success: true, message: 'Form submitted successfully' };
    } catch (error) {
      console.error('Error submitting general form:', error);
      throw new Error('Failed to submit the form. Please try again later.');
    }
  }),
});
