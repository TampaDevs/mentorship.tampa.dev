import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedSessions() {
  const sessions = Array.from({ length: 10 }).map(() => ({
    id: faker.string.uuid(),
    sessionToken: faker.string.alphanumeric(32),
    userId: faker.string.uuid(),
    expires: faker.date.future(),
  }));

  await prisma.session.createMany({ data: sessions });
}
