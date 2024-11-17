/*
  Warnings:

  - You are about to drop the `_skills_as_mentee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_skills_as_mentor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_skills_as_mentee" DROP CONSTRAINT "_skills_as_mentee_A_fkey";

-- DropForeignKey
ALTER TABLE "_skills_as_mentee" DROP CONSTRAINT "_skills_as_mentee_B_fkey";

-- DropForeignKey
ALTER TABLE "_skills_as_mentor" DROP CONSTRAINT "_skills_as_mentor_A_fkey";

-- DropForeignKey
ALTER TABLE "_skills_as_mentor" DROP CONSTRAINT "_skills_as_mentor_B_fkey";

-- DropTable
DROP TABLE "_skills_as_mentee";

-- DropTable
DROP TABLE "_skills_as_mentor";

-- CreateTable
CREATE TABLE "Meeting" (
    "id" TEXT NOT NULL,
    "mentorshipId" TEXT NOT NULL,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "location" TEXT,
    "notes" TEXT,

    CONSTRAINT "Meeting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MentorSkills" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MenteeSkills" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MentorSkills_AB_unique" ON "_MentorSkills"("A", "B");

-- CreateIndex
CREATE INDEX "_MentorSkills_B_index" ON "_MentorSkills"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MenteeSkills_AB_unique" ON "_MenteeSkills"("A", "B");

-- CreateIndex
CREATE INDEX "_MenteeSkills_B_index" ON "_MenteeSkills"("B");

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_mentorshipId_fkey" FOREIGN KEY ("mentorshipId") REFERENCES "Mentorship"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MentorSkills" ADD CONSTRAINT "_MentorSkills_A_fkey" FOREIGN KEY ("A") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MentorSkills" ADD CONSTRAINT "_MentorSkills_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MenteeSkills" ADD CONSTRAINT "_MenteeSkills_A_fkey" FOREIGN KEY ("A") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MenteeSkills" ADD CONSTRAINT "_MenteeSkills_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
