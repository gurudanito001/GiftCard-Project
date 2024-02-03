/*
  Warnings:

  - Added the required column `cardType` to the `Trade` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trade" ADD COLUMN     "cardType" TEXT NOT NULL;
