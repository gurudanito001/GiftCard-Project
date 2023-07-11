/*
  Warnings:

  - You are about to drop the column `fulfilled` on the `Escrow` table. All the data in the column will be lost.
  - You are about to drop the column `successful` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `successful` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `cardName` to the `Trade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Trade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valueInUSD` to the `Trade` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'FAILED', 'SUCCESSFUL');

-- CreateEnum
CREATE TYPE "EscrowStatus" AS ENUM ('PENDING', 'RETURNED', 'DISBURSED');

-- CreateEnum
CREATE TYPE "TradeStatus" AS ENUM ('PENDING', 'ACCEPTED', 'SUCCESSFUL', 'DISCONTINUED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "OfferCategory" AS ENUM ('MERCHANT', 'SELLER');

-- AlterTable
ALTER TABLE "Escrow" DROP COLUMN "fulfilled",
ADD COLUMN     "status" "EscrowStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Offer" ADD COLUMN     "category" "OfferCategory" NOT NULL DEFAULT 'MERCHANT';

-- AlterTable
ALTER TABLE "Trade" DROP COLUMN "successful",
ADD COLUMN     "cardName" TEXT NOT NULL,
ADD COLUMN     "price" TEXT NOT NULL,
ADD COLUMN     "status" "TradeStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "valueInUSD" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "successful",
ADD COLUMN     "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING';
