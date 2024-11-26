import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedGoals() {
  const goals = [
    { name: 'Get promoted', slug: 'get-promoted' },
    { name: 'Get a job', slug: 'get-a-job' },
    { name: 'Go back to school', slug: 'go-back-to-school' },
    { name: 'Learn a new skill', slug: 'learn-a-new-skill' },
    { name: 'Get a certification', slug: 'get-a-certification' },
    { name: 'Start a Company', slug: 'start-a-company' },
    { name: 'Guidance on a side project', slug: 'guidance-on-a-side-project' },
    { name: 'Work on resume', slug: 'work-on-resume' },
    { name: 'Interview Prep', slug: 'interview-prep' },
  ];

  await prisma.goal.createMany({ data: goals });
}
