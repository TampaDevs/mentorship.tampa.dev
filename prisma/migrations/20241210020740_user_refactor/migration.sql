/*
  Warnings:

  - You are about to drop the column `about` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `menteeSeniorityId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `mentorSeniorityId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_menteeSeniorityId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_mentorSeniorityId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "about",
DROP COLUMN "menteeSeniorityId",
DROP COLUMN "mentorSeniorityId",
ADD COLUMN     "seniorityId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_seniorityId_fkey" FOREIGN KEY ("seniorityId") REFERENCES "SeniorityLevel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
