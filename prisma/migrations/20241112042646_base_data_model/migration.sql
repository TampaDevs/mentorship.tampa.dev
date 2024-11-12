/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('REGULAR', 'ADMIN', 'OWNER');

-- CreateEnum
CREATE TYPE "MentorshipStatus" AS ENUM ('PENDING', 'ACTIVE', 'COMPLETED', 'CANCELED');

-- CreateEnum
CREATE TYPE "SuggestionStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_createdById_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "about" TEXT,
ADD COLUMN     "availability" JSONB,
ADD COLUMN     "in_person" BOOLEAN,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "notificationPreferences" JSONB,
ADD COLUMN     "onboardingCompletedAt" TIMESTAMP(3),
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'REGULAR',
ADD COLUMN     "title" TEXT;

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mentorship" (
    "id" TEXT NOT NULL,
    "mentorId" TEXT NOT NULL,
    "menteeId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "status" "MentorshipStatus" NOT NULL DEFAULT 'PENDING',
    "goals" JSONB,
    "notes" TEXT,

    CONSTRAINT "Mentorship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "mentorshipId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Suggestion" (
    "id" TEXT NOT NULL,
    "mentorId" TEXT NOT NULL,
    "menteeId" TEXT NOT NULL,
    "status" "SuggestionStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Suggestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_skills_as_mentor" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_skills_as_mentee" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_skills_as_mentor_AB_unique" ON "_skills_as_mentor"("A", "B");

-- CreateIndex
CREATE INDEX "_skills_as_mentor_B_index" ON "_skills_as_mentor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_skills_as_mentee_AB_unique" ON "_skills_as_mentee"("A", "B");

-- CreateIndex
CREATE INDEX "_skills_as_mentee_B_index" ON "_skills_as_mentee"("B");

-- AddForeignKey
ALTER TABLE "Mentorship" ADD CONSTRAINT "Mentorship_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mentorship" ADD CONSTRAINT "Mentorship_menteeId_fkey" FOREIGN KEY ("menteeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_mentorshipId_fkey" FOREIGN KEY ("mentorshipId") REFERENCES "Mentorship"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Suggestion" ADD CONSTRAINT "Suggestion_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Suggestion" ADD CONSTRAINT "Suggestion_menteeId_fkey" FOREIGN KEY ("menteeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_skills_as_mentor" ADD CONSTRAINT "_skills_as_mentor_A_fkey" FOREIGN KEY ("A") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_skills_as_mentor" ADD CONSTRAINT "_skills_as_mentor_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_skills_as_mentee" ADD CONSTRAINT "_skills_as_mentee_A_fkey" FOREIGN KEY ("A") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_skills_as_mentee" ADD CONSTRAINT "_skills_as_mentee_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
