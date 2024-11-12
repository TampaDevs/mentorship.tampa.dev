import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedMessages() {
  const messages = Array.from({ length: 50 }).map(() => ({
    id: faker.string.uuid(),
    mentorshipId: faker.string.uuid(),
    senderId: faker.string.uuid(),
    receiverId: faker.string.uuid(),
    content: faker.helpers.maybe(
      () => faker.lorem.paragraphs(),
      { probability: 0.7 }
    ) ?? faker.lorem.sentence(),
    sentAt: faker.date.recent({ days: 30 }),
  }));

  await prisma.message.createMany({ data: messages });
}
