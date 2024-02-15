/*
  Warnings:

  - The values [RETURNED] on the enum `EscrowStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [CLOSED] on the enum `OfferStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EscrowStatus_new" AS ENUM ('PENDING', 'REVERTED', 'DISBURSED');
ALTER TABLE "Escrow" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Escrow" ALTER COLUMN "status" TYPE "EscrowStatus_new" USING ("status"::text::"EscrowStatus_new");
ALTER TYPE "EscrowStatus" RENAME TO "EscrowStatus_old";
ALTER TYPE "EscrowStatus_new" RENAME TO "EscrowStatus";
DROP TYPE "EscrowStatus_old";
ALTER TABLE "Escrow" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "OfferStatus_new" AS ENUM ('PENDING', 'CANCELLED', 'COMPLETED');
ALTER TABLE "Offer" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Offer" ALTER COLUMN "status" TYPE "OfferStatus_new" USING ("status"::text::"OfferStatus_new");
ALTER TYPE "OfferStatus" RENAME TO "OfferStatus_old";
ALTER TYPE "OfferStatus_new" RENAME TO "OfferStatus";
DROP TYPE "OfferStatus_old";
ALTER TABLE "Offer" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;
