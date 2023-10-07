-- DropForeignKey
ALTER TABLE "Escrow" DROP CONSTRAINT "Escrow_tradeId_fkey";

-- AddForeignKey
ALTER TABLE "Escrow" ADD CONSTRAINT "Escrow_tradeId_fkey" FOREIGN KEY ("tradeId") REFERENCES "Trade"("id") ON DELETE CASCADE ON UPDATE CASCADE;
