import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedAccounts() {
  const accounts = Array.from({ length: 15 }).map(() => ({
    id: faker.string.uuid(),
    userId: faker.string.uuid(),
    type: 'oauth',
    provider: faker.helpers.arrayElement(['google', 'github', 'linkedin']),
    providerAccountId: faker.string.uuid(),
    refresh_token: faker.helpers.maybe(() => faker.string.alphanumeric(64)),
    access_token: faker.string.alphanumeric(64),
    expires_at: faker.number.int({ min: Date.now(), max: Date.now() + 7200000 }),
    token_type: 'bearer',
    scope: 'read write',
    id_token: faker.helpers.maybe(() => faker.string.alphanumeric(128)),
    session_state: faker.helpers.maybe(() => faker.string.alphanumeric(32)),
  }));

  await prisma.account.createMany({ data: accounts });
}
