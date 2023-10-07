import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const trade = await prisma.trade.findUnique({
    where: {
      id,
    },
  });

  if (!trade) {
    return new NextResponse(JSON.stringify({message: `Trade with ID Not Found!`}), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    }); 
  }

  return new NextResponse(JSON.stringify({message: "Trade fetched successfully", data: trade}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  }); 
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
  
) {
  const { searchParams } = new URL(request.url);
  const id = params.id;
  let json = await request.json();


  const updated_trade = await prisma.trade.update({
    where: { id },
    data: json,
  });
  
  if (!updated_trade) {
    return new NextResponse(JSON.stringify({message: "No trade with ID found"}), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    }); 
  }

  return new NextResponse(JSON.stringify({ message: "Trade updated successfully", data: updated_trade}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  }); 
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  await prisma.trade.delete({
    where: { id },
  });
  return new NextResponse(JSON.stringify({message: `Trade deleted with Id: ${id}`}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  }); 
} 

