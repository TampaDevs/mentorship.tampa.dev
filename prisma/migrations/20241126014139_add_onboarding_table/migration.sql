/*
  Warnings:

  - The values [MAN,WOMAN] on the enum `Gender` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Gender_new" AS ENUM ('MALE', 'FEMALE', 'NONBINARY', 'TRANSGENDER', 'OTHER');
ALTER TABLE "User" ALTER COLUMN "mentor_gender" TYPE "Gender_new" USING ("mentor_gender"::text::"Gender_new");
ALTER TABLE "User" ALTER COLUMN "mentee_gender" TYPE "Gender_new"[] USING ("mentee_gender"::text::"Gender_new"[]);
ALTER TYPE "Gender" RENAME TO "Gender_old";
ALTER TYPE "Gender_new" RENAME TO "Gender";
DROP TYPE "Gender_old";
COMMIT;

-- CreateTable
CREATE TABLE "Onboarding" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "generalFormCompleted" BOOLEAN NOT NULL DEFAULT false,
    "menteeFormCompleted" BOOLEAN NOT NULL DEFAULT false,
    "mentorFormCompleted" BOOLEAN NOT NULL DEFAULT false,
    "optionsFormCompleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Onboarding_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Onboarding_userId_key" ON "Onboarding"("userId");

-- AddForeignKey
ALTER TABLE "Onboarding" ADD CONSTRAINT "Onboarding_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
