/*
  Warnings:

  - The `valueInUSD` column on the `Offer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `maxRange` column on the `Offer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `minRange` column on the `Offer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `currentBalance` column on the `Wallet` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `availableBalance` column on the `Wallet` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `amount` on the `Escrow` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `rate` on the `Offer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `valueInUSD` on the `Trade` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `rate` on the `Trade` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `amount` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Escrow" DROP COLUMN "amount",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "valueInUSD",
ADD COLUMN     "valueInUSD" INTEGER,
DROP COLUMN "maxRange",
ADD COLUMN     "maxRange" INTEGER,
DROP COLUMN "minRange",
ADD COLUMN     "minRange" INTEGER,
DROP COLUMN "rate",
ADD COLUMN     "rate" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Trade" DROP COLUMN "valueInUSD",
ADD COLUMN     "valueInUSD" INTEGER NOT NULL,
DROP COLUMN "rate",
ADD COLUMN     "rate" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "amount",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Wallet" DROP COLUMN "currentBalance",
ADD COLUMN     "currentBalance" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
DROP COLUMN "availableBalance",
ADD COLUMN     "availableBalance" DOUBLE PRECISION NOT NULL DEFAULT 0.00;
