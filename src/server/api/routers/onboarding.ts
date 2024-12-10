import {
  generalFormSchema,
  menteeFormSchema,
  mentorFormSchema,
  preferencesFormSchema,
} from '~/app/onboarding/formSchemas';
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

    const industries = input.industries.map((industry) => {
      return { id: industry.value };
    });

    ctx.db.user
      .update({
        where: { id: session.user.id },
        data: {
          name: input.first + ' ' + input.last,
          title: input.title,
          mentor_gender: input.gender,
          seniorityId: parseInt(input.seniorityLevel),
          industries: {
            connect: [...industries],
          },
          active_mentee: input.userType.includes('mentee'),
          active_mentor: input.userType.includes('mentor'),
          bio: input.bio,
        },
      })
      .then(async () => {
        // Mark general form submitted withing onboarding table
        await ctx.db.onboarding.upsert({
          where: { userId: session.user.id },
          update: { generalFormCompleted: true },
          create: {
            userId: session.user.id,
            generalFormCompleted: true,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }),

  submitMentorForm: protectedProcedure.input(mentorFormSchema).mutation(async ({ ctx, input }) => {
    const session = ctx.session;

    console.log('HERE', input);

    if (!session?.user?.id) {
      return null;
    }

    const skills = input.mentorSkills.map((skill) => {
      return { id: skill.value };
    });

    const softSkills = input.mentorSoftSkills.map((skill) => {
      return { id: skill.value };
    });

    const goals = input.mentorGoals.map((goal) => {
      return { id: goal.value };
    });

    ctx.db.user
      .update({
        where: { id: session.user.id },
        data: {
          mentor_capacity: input.capacity,
          mentorSkills: {
            connect: [...skills],
          },
          mentorSoftSkills: {
            connect: [...softSkills],
          },
          mentorGoals: {
            connect: [...goals],
          },
        },
      })
      .then(async () => {
        // Mark mentor form submitted within onboarding table
        await ctx.db.onboarding.update({
          where: { userId: session.user.id },
          data: {
            mentorFormCompleted: true,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }),

  submitMenteeForm: protectedProcedure.input(menteeFormSchema).mutation(async ({ ctx, input }) => {
    const session = ctx.session;

    if (!session?.user?.id) {
      return null;
    }

    const genders = input.menteeGender.map((gender) => {
      return gender.value;
    });

    const skills = input.menteeSkills.map((skill) => {
      return { id: skill.value };
    });

    const softSkills = input.menteeSoftSkills.map((skill) => {
      return { id: skill.value };
    });

    const goals = input.menteeGoals.map((goal) => {
      return { id: goal.value };
    });

    ctx.db.user
      .update({
        where: { id: session.user.id },
        data: {
          menteeSkills: {
            connect: [...skills],
          },
          mentee_gender: genders,
          menteeSoftSkills: {
            connect: [...softSkills],
          },
          menteeGoals: {
            connect: [...goals],
          },
          side_projects: input.sideProjects,
          motivation: input.motivation,
        },
      })
      .then(async () => {
        // Mark mentor form submitted within onboarding table
        await ctx.db.onboarding.update({
          where: { userId: session.user.id },
          data: {
            menteeFormCompleted: true,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }),

  submitPreferencesForm: protectedProcedure.input(preferencesFormSchema).mutation(async ({ ctx, input }) => {
    const session = ctx.session;

    if (!session?.user?.id) {
      return null;
    }

    const notificationPreferences = {
      match_emails: input.match_emails,
      suggestion_emails: input.suggestion_emails,
      news_updates_emails: input.news_updates_emails,
    };

    ctx.db.user
      .update({
        where: { id: session.user.id },
        data: {
          in_person: input.in_person == 'true',
          linkedin_url: input.linkedin_url,
          availability: JSON.stringify(input.availability),
          notificationPreferences,
        },
      })
      .then(async () => {
        // Mark mentor form submitted within onboarding table
        await ctx.db.onboarding.update({
          where: { userId: session.user.id },
          data: {
            optionsFormCompleted: true,
          },
        });

        // Mark onboarding completion time in user table
        await ctx.db.user.update({
          where: { id: session.user.id },
          data: {
            onboardingCompletedAt: new Date(),
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }),
});
