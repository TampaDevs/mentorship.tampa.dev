import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedAccounts() {
  const users = await prisma.user.findMany({
    select: { id: true },
  });

  const userIds = users.map(user => user.id);

  const accounts = Array.from({ length: 15 }).map(() => ({
    id: faker.string.uuid(),
    userId: faker.helpers.arrayElement(userIds),
    type: 'oauth',
    provider: faker.helpers.arrayElement(['google', 'github', 'linkedin']),
    providerAccountId: faker.string.uuid(),
    refresh_token: faker.helpers.maybe(() => faker.string.alphanumeric(64)),
    access_token: faker.string.alphanumeric(64),
    expires_at: Math.floor(Date.now() / 1000) + faker.number.int({ min: 0, max: 7200 }),
    token_type: 'bearer',
    scope: 'read write',
    id_token: faker.helpers.maybe(() => faker.string.alphanumeric(128)),
    session_state: faker.helpers.maybe(() => faker.string.alphanumeric(32)),
  }));

  await prisma.account.createMany({ data: accounts });
}
