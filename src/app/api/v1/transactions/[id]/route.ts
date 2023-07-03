import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const transaction = await prisma.transaction.findUnique({
    where: {
      id,
    },
  });

  if (!transaction) {
    return new NextResponse(JSON.stringify({message: `Transaction with ID Not Found!`}), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    }); 
  }

  return new NextResponse(JSON.stringify({message: "Transaction fetched successfully", data: transaction}), {
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

  const updated_transaction = await prisma.transaction.update({
    where: { id },
    data: json,
  });

  if (!updated_transaction) {
    return new NextResponse(JSON.stringify({message: "No transaction with ID found"}), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    }); 
  }

  return new NextResponse(JSON.stringify({ message: "Transaction updated successfully", data: updated_transaction}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  }); 
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  await prisma.transaction.delete({
    where: { id },
  });
  return new NextResponse(JSON.stringify({message: `Transaction deleted with Id: ${id}`}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  }); 
} 

