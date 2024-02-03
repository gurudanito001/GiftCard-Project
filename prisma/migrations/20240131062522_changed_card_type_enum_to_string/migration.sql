/*
  Warnings:

  - The `cardType` column on the `Offer` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "cardType",
ADD COLUMN     "cardType" TEXT;

-- DropEnum
DROP TYPE "CardType";
