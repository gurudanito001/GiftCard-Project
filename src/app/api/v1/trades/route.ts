import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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

    const trade = await prisma.trade.create({
      data: json,
    });

    return new NextResponse(JSON.stringify(trade), { 
     status: 201, 
     headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
} 
