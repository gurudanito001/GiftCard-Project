-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "category";

-- AlterTable
ALTER TABLE "Trade" DROP COLUMN "cardName",
DROP COLUMN "price",
DROP COLUMN "status",
DROP COLUMN "valueInUSD",
ADD COLUMN     "successful" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "status",
ADD COLUMN     "successful" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Escrow" DROP COLUMN "status",
ADD COLUMN     "fulfilled" BOOLEAN NOT NULL DEFAULT false;

-- DropEnum
DROP TYPE "TransactionStatus";

-- DropEnum
DROP TYPE "EscrowStatus";

-- DropEnum
DROP TYPE "TradeStatus";

-- DropEnum
DROP TYPE "OfferCategory";

