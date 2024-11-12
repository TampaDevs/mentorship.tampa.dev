import { faker } from '@faker-js/faker';
import { PrismaClient, SuggestionStatus } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedSuggestions() {
  const users = await prisma.user.findMany({
    select: { id: true },
  });

  const userIds = users.map((user) => user.id);

  const suggestions = Array.from({ length: 30 }).map(() => ({
    id: faker.string.uuid(),
    mentorId: faker.helpers.arrayElement(userIds),
    menteeId: faker.helpers.arrayElement(userIds),
    status: faker.helpers.enumValue(SuggestionStatus),
  }));

  await prisma.suggestion.createMany({ data: suggestions });
}
