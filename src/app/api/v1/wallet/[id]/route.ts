import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const wallet = await prisma.wallet.findUnique({
    where: {
      id,
    },
  });

  if (!wallet) {
    return new NextResponse(JSON.stringify({message: `Wallet with ID Not Found!`}), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    }); 
  }

  return new NextResponse(JSON.stringify({message: "Wallet fetched successfully", data: wallet}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  }); 
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  let json = await request.json();

  const updated_wallet = await prisma.wallet.update({
    where: { id },
    data: {currentBalance: json.currentBalance},
  });

  if(json.userId){
    const transaction = await prisma.transaction.create({
      data: {
        benefactorId: json.userId,
        beneficiaryId: json.userId,
        amount: json.amount,
        type: json.type,
        category: json.category
      }
    })
  }
  

  if (!updated_wallet) {
    return new NextResponse(JSON.stringify({message: "No wallet with ID found"}), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    }); 
  }

  return new NextResponse(JSON.stringify({ message: "Wallet updated successfully", data: updated_wallet}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  }); 
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  await prisma.wallet.delete({
    where: { id },
  });
  return new NextResponse(JSON.stringify({message: `Wallet deleted with Id: ${id}`}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  }); 
} 

