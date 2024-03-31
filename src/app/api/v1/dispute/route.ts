import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const disputes = await prisma.dispute.findMany();
  return new NextResponse(JSON.stringify({ message: "Disputes fetched successfully", data: disputes}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  }); 
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    console.log("create dispute data:", json)
    let disputeExists = await prisma.dispute.findFirst({
      where: {
        tradeId: json?.tradeId
      }
    })
    if(disputeExists){
      return new NextResponse(JSON.stringify({ message: "Dispute already raised!!" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    //add Dispute to messages
    let user = await prisma.user.findFirst({
      where: {
        id: json?.userId
      }
    })
    
    // admin Dispute message
    await prisma.message.create({
      data:{
        appMessage: true,
        resourceId: json?.tradeId,
        message: `${user?.firstName} ${user?.lastName} raised a Dispute`
      }
    })
    // Dispute reason message
    await prisma.message.create({
      data:{
        senderId: json?.userId,
        resourceId: json?.tradeId,
        message: json?.reason
      }
    })
    // Dispute proof message
    await prisma.message.create({
      data:{
        senderId: json?.userId,
        resourceId: json?.tradeId,
        message: json?.mediaProof
      }
    })

    await prisma.trade.update({
      where: {
        id: json?.tradeId
      },
      data: {status: "DISPUTED"}
    })
    
    const dispute = await prisma.dispute.create({
      data: json,
    });
    
    

    return new NextResponse(JSON.stringify({message: "Dispute Added Successfully", data: dispute}), { 
     status: 201, 
     headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
} 
