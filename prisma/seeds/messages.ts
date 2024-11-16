import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedMessages() {
  const mentorships = await prisma.mentorship.findMany({
    select: { id: true },
  });
  const users = await prisma.user.findMany({
    select: { id: true },
  });

  const mentorshipIds = mentorships.map((mentorship) => mentorship.id);
  const userIds = users.map((user) => user.id);

  const messages = Array.from({ length: 50 }).map(() => ({
    id: faker.string.uuid(),
    mentorshipId: faker.helpers.arrayElement(mentorshipIds),
    senderId: faker.helpers.arrayElement(userIds),
    receiverId: faker.helpers.arrayElement(userIds),
    content: faker.helpers.maybe(() => faker.lorem.paragraphs(), { probability: 0.7 }) ?? faker.lorem.sentence(),
    sentAt: faker.date.recent({ days: 30 }),
  }));

  await prisma.message.createMany({ data: messages });
}
