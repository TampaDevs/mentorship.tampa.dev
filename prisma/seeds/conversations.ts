import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedConversations() {
  const users = await prisma.user.findMany({
    select: { id: true },
  });

  const userIds = users.map((user) => user.id);

  const conversations = Array.from({ length: 20 }).map(() => ({
    id: faker.string.uuid(),
    participant1Id: faker.helpers.arrayElement(userIds),
    participant2Id: faker.helpers.arrayElement(userIds),
  }));

  await prisma.conversation.createMany({ data: conversations });

  // Fetch the created conversations to use their IDs
  const createdConversations = await prisma.conversation.findMany({
    select: { id: true, participant1Id: true, participant2Id: true },
  });

  // Create messages for each conversation
  const messages = createdConversations.flatMap((conversation) => {
    const messageCount = faker.number.int({ min: 10, max: 50 });
    return Array.from({ length: messageCount }).map(() => ({
      id: faker.string.uuid(),
      conversationId: conversation.id,
      senderId: faker.helpers.arrayElement([conversation.participant1Id, conversation.participant2Id]),
      receiverId: (function (senderId) {
        return conversation.participant1Id === senderId ? conversation.participant2Id : conversation.participant1Id;
      })(faker.helpers.arrayElement([conversation.participant1Id, conversation.participant2Id])),
      content: faker.lorem.sentence(),
      sentAt: faker.date.recent({ days: 30 }),
    }));
  });

  await prisma.message.createMany({ data: messages });
}
