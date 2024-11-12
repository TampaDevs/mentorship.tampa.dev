import { faker } from '@faker-js/faker';
import { PrismaClient, SuggestionStatus } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedSuggestions() {
  const suggestions = Array.from({ length: 30 }).map(() => ({
    id: faker.string.uuid(),
    mentorId: faker.string.uuid(),
    menteeId: faker.string.uuid(),
    status: faker.helpers.enumValue(SuggestionStatus),
  }));

  await prisma.suggestion.createMany({ data: suggestions });
}
