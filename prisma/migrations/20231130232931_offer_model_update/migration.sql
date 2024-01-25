-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('PHYSICAL', 'CODE');

-- AlterTable
ALTER TABLE "Offer" ADD COLUMN     "cardType" "CardType",
ADD COLUMN     "maxRange" TEXT,
ADD COLUMN     "minRange" TEXT,
ADD COLUMN     "rate" TEXT,
ALTER COLUMN "price" DROP NOT NULL,
ALTER COLUMN "valueInUSD" DROP NOT NULL;
