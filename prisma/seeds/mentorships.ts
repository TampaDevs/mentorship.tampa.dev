import { faker } from '@faker-js/faker';
import { MentorshipStatus, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedMentorships() {
  const users = await prisma.user.findMany({
    select: { id: true },
  });

  const userIds = users.map(user => user.id);

  const mentorships = Array.from({ length: 20 }).map(() => ({
    id: faker.string.uuid(),
    mentorId: faker.helpers.arrayElement(userIds),
    menteeId: faker.helpers.arrayElement(userIds),
    startDate: faker.date.past(),
    endDate: faker.helpers.maybe(() => faker.date.future(), { probability: 0.3 }),
    status: faker.helpers.enumValue(MentorshipStatus),
    goals: {
      shortTerm: faker.helpers.multiple(() => faker.lorem.sentence(), { count: { min: 1, max: 3 } }),
      longTerm: faker.helpers.multiple(() => faker.lorem.sentence(), { count: { min: 1, max: 3 } }),
      milestones: faker.helpers.multiple(
        () => ({
          title: faker.lorem.sentence(),
          completed: faker.datatype.boolean(),
          dueDate: faker.date.future(),
        }),
        { count: { min: 2, max: 5 } }
      ),
    },
    notes: faker.lorem.paragraphs(),
  }));

  await prisma.mentorship.createMany({ data: mentorships });
}
