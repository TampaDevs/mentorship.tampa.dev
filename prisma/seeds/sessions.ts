import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedSessions() {
  const users = await prisma.user.findMany({
    select: { id: true },
  });

  const userIds = users.map((user) => user.id);

  const sessions = Array.from({ length: 10 }).map(() => ({
    id: faker.string.uuid(),
    sessionToken: faker.string.alphanumeric(32),
    userId: faker.helpers.arrayElement(userIds),
    expires: faker.date.future(),
  }));

  await prisma.session.createMany({ data: sessions });
}
