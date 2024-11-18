/*
  Warnings:

  - The values [REGULAR] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MAN', 'WOMAN', 'NONBINARY', 'TRANSGENDER', 'OTHER');

-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('USER', 'ADMIN', 'OWNER');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "UserRole_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "active_mentee" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "active_mentor" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "linkedin_url" TEXT,
ADD COLUMN     "menteeSeniorityId" INTEGER,
ADD COLUMN     "mentee_gender" "Gender"[],
ADD COLUMN     "mentorSeniorityId" INTEGER,
ADD COLUMN     "mentor_capacity" INTEGER,
ADD COLUMN     "mentor_gender" "Gender",
ADD COLUMN     "motivation" TEXT,
ADD COLUMN     "side_projects" TEXT,
ALTER COLUMN "role" SET DEFAULT 'USER';

-- CreateTable
CREATE TABLE "SeniorityLevel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "SeniorityLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Goal" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SoftSkill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "SoftSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Industry" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Industry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MentorGoals" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MenteeGoals" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MentorSoftSkills" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MenteeSoftSkills" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_UserIndustries" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MentorGoals_AB_unique" ON "_MentorGoals"("A", "B");

-- CreateIndex
CREATE INDEX "_MentorGoals_B_index" ON "_MentorGoals"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MenteeGoals_AB_unique" ON "_MenteeGoals"("A", "B");

-- CreateIndex
CREATE INDEX "_MenteeGoals_B_index" ON "_MenteeGoals"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MentorSoftSkills_AB_unique" ON "_MentorSoftSkills"("A", "B");

-- CreateIndex
CREATE INDEX "_MentorSoftSkills_B_index" ON "_MentorSoftSkills"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MenteeSoftSkills_AB_unique" ON "_MenteeSoftSkills"("A", "B");

-- CreateIndex
CREATE INDEX "_MenteeSoftSkills_B_index" ON "_MenteeSoftSkills"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserIndustries_AB_unique" ON "_UserIndustries"("A", "B");

-- CreateIndex
CREATE INDEX "_UserIndustries_B_index" ON "_UserIndustries"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_mentorSeniorityId_fkey" FOREIGN KEY ("mentorSeniorityId") REFERENCES "SeniorityLevel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_menteeSeniorityId_fkey" FOREIGN KEY ("menteeSeniorityId") REFERENCES "SeniorityLevel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MentorGoals" ADD CONSTRAINT "_MentorGoals_A_fkey" FOREIGN KEY ("A") REFERENCES "Goal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MentorGoals" ADD CONSTRAINT "_MentorGoals_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MenteeGoals" ADD CONSTRAINT "_MenteeGoals_A_fkey" FOREIGN KEY ("A") REFERENCES "Goal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MenteeGoals" ADD CONSTRAINT "_MenteeGoals_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MentorSoftSkills" ADD CONSTRAINT "_MentorSoftSkills_A_fkey" FOREIGN KEY ("A") REFERENCES "SoftSkill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MentorSoftSkills" ADD CONSTRAINT "_MentorSoftSkills_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MenteeSoftSkills" ADD CONSTRAINT "_MenteeSoftSkills_A_fkey" FOREIGN KEY ("A") REFERENCES "SoftSkill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MenteeSoftSkills" ADD CONSTRAINT "_MenteeSoftSkills_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserIndustries" ADD CONSTRAINT "_UserIndustries_A_fkey" FOREIGN KEY ("A") REFERENCES "Industry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserIndustries" ADD CONSTRAINT "_UserIndustries_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
