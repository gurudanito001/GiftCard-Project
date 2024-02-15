import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
  
) {
  const id = params.id;

  const trade = await prisma.trade.findUnique({
    where: {
      id
    }
  })
  /* if(trade?.status !== "PENDING"){
    return new NextResponse(JSON.stringify({message: `Trade has already been ${trade?.status.toLocaleLowerCase()}`}), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    }); 
  } */
  
  const updated_trade = await prisma.trade.update({
    where: { id },
    data: {status: "CANCELLED"},
  });
  if (!updated_trade) {
    return new NextResponse(JSON.stringify({message: "No trade with ID found"}), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    }); 
  }


  const escrow = await prisma.escrow.findFirst({
    where: {tradeId: id}
  })
  if(escrow){
    await prisma.escrow.update({
      where: {id: escrow?.id},
      data: {status: "REVERTED"}
    })
    let buyerWallet = await prisma.wallet.findFirst({
      where: {userId: trade?.buyerId}
    })
    if(buyerWallet){
      let newAvailableBal = buyerWallet?.availableBalance + escrow?.amount
      await prisma.wallet.update({
        where: {userId: trade?.buyerId},
        data: {availableBalance: newAvailableBal}
      })
    }
  }

  return new NextResponse(JSON.stringify({ message: "Trade updated successfully", data: updated_trade}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  }); 
}