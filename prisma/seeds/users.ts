import { faker } from '@faker-js/faker';
import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedUsers() {
  const users = Array.from({ length: 10 }).map(() => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    emailVerified: faker.date.past(),
    image: faker.image.avatar(),
    title: faker.person.jobTitle(),
    location: faker.location.city(),
    in_person: faker.datatype.boolean(),
    role: faker.helpers.enumValue(UserRole),
    availability: {
      weekdays: faker.helpers.multiple(
        () => ({
          day: faker.helpers.arrayElement(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']),
          times: faker.helpers.multiple(
            () => ({
              start: faker.date.future().toISOString(),
              end: faker.date.future().toISOString(),
            }),
            { count: { min: 1, max: 3 } }
          ),
        }),
        { count: { min: 1, max: 5 } }
      ),
    },
    notificationPreferences: {
      email: faker.datatype.boolean(),
      push: faker.datatype.boolean(),
      sms: faker.datatype.boolean(),
    },
    onboardingCompletedAt: faker.date.past(),
  }));

  await prisma.user.createMany({ data: users });
}
