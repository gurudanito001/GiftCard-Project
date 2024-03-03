import { prisma } from "@/lib/prisma";
import { tree } from "next/dist/build/templates/app-page";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const updated_trade = await prisma.trade.update({
      where: { id },
      data: {
        giftCardSent: true,
        timeSent: new Date().toISOString()        
      }
    });
  
    if (!updated_trade) {
      return new NextResponse(JSON.stringify({message: "No trade with ID found"}), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      }); 
    }
  
    await prisma.message.create({
      data: {
        resourceId: id,
        message: "Giftcard sent by seller",
        appMessage: true
      }
    })
  
  
    return new NextResponse(JSON.stringify({ message: "Trade updated successfully", data: null}), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }); 
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: error.message}), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
  
}