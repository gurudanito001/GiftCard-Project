import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import sendEmail from "@/services/sendEmail";
import {TradeRequestAcceptanceTemplate} from "@/services/sendEmail"


export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
  
) {
  const id = params.id;

  const trade = await prisma.trade.findUnique({
    where: {
      id
    },
    include: {
      buyer: true,
      seller: true,
      offer: true
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
    const buyerAvailableBalance = buyerWallet.availableBalance;
    const tradeAmount = trade?.rate * trade?.valueInUSD
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
        data: {availableBalance: updatedAvailableBalance}
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
      amount: updated_trade?.rate * updated_trade?.valueInUSD,
      tradeId: updated_trade?.id
    }
  })

  // notify user that trade has been accepted
  let userToNotify;
  if(trade?.buyerId === trade?.offer?.userId){
    userToNotify = trade?.seller
  }else{
    userToNotify = trade?.buyer
  }

  if(userToNotify){
    await sendEmail({email: userToNotify?.email, url: `${process.env.BASE_URL}/trades/${trade?.id}?userId=${userToNotify?.id}`, subject: "Trade Request Acceptance", template: TradeRequestAcceptanceTemplate})
  }

  return new NextResponse(JSON.stringify({ message: "Trade updated successfully", data: updated_trade}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  }); 
}