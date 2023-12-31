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
  const buyerWallet = await prisma.wallet.findUnique({
    where: {
      userId: trade?.buyerId
    }
  });
  if(trade?.status !== "PENDING"){
    return new NextResponse(JSON.stringify({message: `Trade has already been ${trade?.status.toLocaleLowerCase()}`}), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    }); 
  }
  if(buyerWallet){
    const buyerAvailableBalance = parseFloat(buyerWallet.availableBalance);
    const tradeAmount = parseFloat(trade.price)
    if(buyerAvailableBalance < tradeAmount){
      console.log(buyerWallet, tradeAmount);
      return new NextResponse(JSON.stringify({message: `Buyer has Insufficient funds for this trade`}), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      }); 
    }else{
      const updatedAvailableBalance = buyerAvailableBalance - tradeAmount
      await prisma.wallet.update({
        where: {
          userId: trade?.buyerId
        },
        data: {availableBalance: updatedAvailableBalance.toString()}
      })
    }
  }else{
    return new NextResponse(JSON.stringify({message: `Could not find buyer wallet`}), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    }); 
  }
  

  const updated_trade = await prisma.trade.update({
    where: { id },
    data: {status: "ACCEPTED"},
  });

  if (!updated_trade) {
    return new NextResponse(JSON.stringify({message: "No trade with ID found"}), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    }); 
  }

  await prisma.escrow.create({
    data: {
      userId: updated_trade?.buyerId,
      amount: updated_trade?.price,
      tradeId: updated_trade?.id
    }
  })

  


  return new NextResponse(JSON.stringify({ message: "Trade updated successfully", data: updated_trade}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  }); 
}