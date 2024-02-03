/*
  Warnings:

  - You are about to drop the column `price` on the `Trade` table. All the data in the column will be lost.
  - Made the column `cardName` on table `Offer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rate` on table `Offer` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `rate` to the `Trade` table without a default value. This is not possible if the table is not empty.
  - Made the column `cardName` on table `Trade` required. This step will fail if there are existing NULL values in that column.
  - Made the column `valueInUSD` on table `Trade` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "OfferStatus" AS ENUM ('PENDING', 'CLOSED');

-- AlterTable
ALTER TABLE "Offer" ADD COLUMN     "status" "OfferStatus" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "cardName" SET NOT NULL,
ALTER COLUMN "rate" SET NOT NULL;

-- AlterTable
ALTER TABLE "Trade" DROP COLUMN "price",
ADD COLUMN     "rate" TEXT NOT NULL,
ALTER COLUMN "cardName" SET NOT NULL,
ALTER COLUMN "valueInUSD" SET NOT NULL;
