/*
  Warnings:

  - The values [DISCONTINUED] on the enum `TradeStatus` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `userId` to the `Trade` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TradeStatus_new" AS ENUM ('PENDING', 'CANCELLED', 'DECLINED', 'ACCEPTED', 'DISPUTED', 'SUCCESSFUL');
ALTER TABLE "Trade" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Trade" ALTER COLUMN "status" TYPE "TradeStatus_new" USING ("status"::text::"TradeStatus_new");
ALTER TYPE "TradeStatus" RENAME TO "TradeStatus_old";
ALTER TYPE "TradeStatus_new" RENAME TO "TradeStatus";
DROP TYPE "TradeStatus_old";
ALTER TABLE "Trade" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "Trade" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
