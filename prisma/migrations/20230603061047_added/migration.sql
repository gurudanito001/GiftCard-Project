/*
  Warnings:

  - You are about to drop the column `positions` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "positions",
ADD COLUMN     "position" TEXT;
