-- DropForeignKey
ALTER TABLE "Trade" DROP CONSTRAINT "Trade_buyerId_fkey";

-- DropForeignKey
ALTER TABLE "Trade" DROP CONSTRAINT "Trade_sellerId_fkey";

-- DropForeignKey
ALTER TABLE "Trade" DROP CONSTRAINT "Trade_offerId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_benefactorId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_beneficiaryId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_tradeId_fkey";

-- DropForeignKey
ALTER TABLE "BankAccount" DROP CONSTRAINT "BankAccount_userId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_senderId_fkey";

-- DropForeignKey
ALTER TABLE "Wallet" DROP CONSTRAINT "Wallet_userId_fkey";

-- DropForeignKey
ALTER TABLE "Escrow" DROP CONSTRAINT "Escrow_userId_fkey";

-- DropForeignKey
ALTER TABLE "Escrow" DROP CONSTRAINT "Escrow_tradeId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "avater",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "showBalance",
ADD COLUMN     "name" TEXT NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "category",
DROP COLUMN "price",
DROP COLUMN "valueInUSD",
ADD COLUMN     "amountInUsd" TEXT NOT NULL;

-- DropTable
DROP TABLE "Trade";

-- DropTable
DROP TABLE "Transaction";

-- DropTable
DROP TABLE "BankAccount";

-- DropTable
DROP TABLE "Notification";

-- DropTable
DROP TABLE "Wallet";

-- DropTable
DROP TABLE "Escrow";

-- DropEnum
DROP TYPE "Role";

-- DropEnum
DROP TYPE "TransactionType";

-- DropEnum
DROP TYPE "TransactionStatus";

-- DropEnum
DROP TYPE "EscrowStatus";

-- DropEnum
DROP TYPE "TradeStatus";

-- DropEnum
DROP TYPE "OfferCategory";

