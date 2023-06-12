/*
  Warnings:

  - You are about to drop the column `newValue` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "newValue",
ADD COLUMN     "password" TEXT;
