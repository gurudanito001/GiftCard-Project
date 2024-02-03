import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import sendEmail from "@/services/sendEmail";
import {TradeRequestNotificationTemplate} from "@/services/sendEmail"

export async function GET(request: Request) {
  const trades = await prisma.trade.findMany();
  return new NextResponse(JSON.stringify({ message: "Trades fetched successfully", data: trades}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  }); 
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const existingTrade = await prisma.trade.findFirst({
      where: {
        offerId: json.offerId,
        buyerId: json.buyerId,
        sellerId: json.sellerId,
        status: "PENDING"
      }
    })

    if(existingTrade){
      return new NextResponse(JSON.stringify({message: "There is a pending trade between buyer and seller"}), { 
        status: 400, 
        headers: { "Content-Type": "application/json" },
       });
    }
    let offer = await prisma.offer.findUnique({
      where: {id: json?.offerId},
      include: {
        user: true
      }
    })
    const user = await prisma.user.findUnique({
      where: {id: offer?.userId}
    })

    const trade = await prisma.trade.create({
      data: json,
    });
    console.log(trade, "let us see")
    if(user){
      await sendEmail({email: user?.email, url: `${process.env.BASE_URL}/trades/${trade?.id}?userId=${user?.id}`, subject: "Trade Request", template: TradeRequestNotificationTemplate})
    }

    return new NextResponse(JSON.stringify(trade), { 
     status: 201, 
     headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({message: error.message}), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    }); 
  }
} 
