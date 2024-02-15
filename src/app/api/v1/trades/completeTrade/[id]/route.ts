import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
  
) {
  try {
    

    const id = params.id;
    const trade = await prisma.trade.findUnique({
      where: {id},
      include: {
        offer: true,
        escrow: true,
        seller: {
          select: {
            wallet: true
          }
        },
        buyer: {
          select: {
            wallet: true
          }
        }
      }
    })
  
    // offer status will be set to completed
    await prisma.offer.update({
      where: {id: trade?.offerId},
      data: {status: "COMPLETED"}
    })
  
    // trade status will be set to successful
    await prisma.trade.update({
      where: {id},
      data: {status: "SUCCESSFUL"}
    })
    // if escrow exists
    if(trade?.escrow?.id){
      // seller wallet will be credited with escrow amount
      if(trade?.seller?.wallet){
        let sellerNewAvailableBal = trade?.seller?.wallet?.availableBalance + trade?.escrow?.amount
        let sellerNewCurrentBal = trade?.seller?.wallet?.currentBalance + trade?.escrow?.amount
  
        await prisma.wallet.update({
          where: {userId: trade?.sellerId},
          data: {
            availableBalance: sellerNewAvailableBal,
            currentBalance: sellerNewCurrentBal
          }
        })
      }
  
      // escrow amount should be deducted from buyer's current balance
      if(trade?.buyer?.wallet){
        let buyerNewCurrentBal = trade?.buyer?.wallet?.currentBalance - trade?.escrow?.amount
  
        await prisma.wallet.update({
          where: {userId: trade?.buyerId},
          data: {
            currentBalance: buyerNewCurrentBal,
          }
        })
      }
  
      // escrow status will be set to DISBURSED
      await prisma.escrow.update({
        where: {id: trade?.escrow?.id},
        data: {status: "DISBURSED"}
      })
  
      // new transaction will be created
      await prisma.transaction.create(
        {data: {
          benefactorId: trade?.buyerId,
          beneficiaryId: trade?.sellerId,
          amount: trade?.escrow?.amount,
          tradeId: trade?.id,
          category: "Giftcard Payment"
        }}
      )
    }
  
    return new NextResponse(JSON.stringify({ message: "Trade completed successfully", data: null}), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }); 
    
  }catch (error: any) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
 
}