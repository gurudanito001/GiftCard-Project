import { prisma } from "@/lib/prisma";
import { tree } from "next/dist/build/templates/app-page";
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
  if(trade?.status !== "PENDING"){
    return new NextResponse(JSON.stringify({message: `Trade has already been ${trade?.status.toLocaleLowerCase()}`}), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    }); 
  }
  
  const updated_trade = await prisma.trade.update({
    where: { id },
    data: {status: "DECLINED"},
  });

  if (!updated_trade) {
    return new NextResponse(JSON.stringify({message: "No trade with ID found"}), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    }); 
  }

  
  // notify user that trade has been accepted
  let userToNotify;
  if(trade?.buyerId === trade?.offer?.userId){
    userToNotify = trade?.seller
  }else{
    userToNotify = trade?.buyer
  }

  if(userToNotify){
    await sendEmail({email: userToNotify?.email, url: `${process.env.BASE_URL}/trades/${trade?.id}?userId=${userToNotify?.id}`, subject: "Trade Request Decline", template: TradeRequestAcceptanceTemplate})
  }

  return new NextResponse(JSON.stringify({ message: "Trade updated successfully", data: updated_trade}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  }); 
}