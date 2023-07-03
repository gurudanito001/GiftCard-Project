import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const bankAccount = await prisma.bankAccount.findUnique({
    where: {
      id,
    },
  });

  if (!bankAccount) {
    return new NextResponse(JSON.stringify({message: `BankAccount with ID Not Found!`}), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    }); 
  }

  return new NextResponse(JSON.stringify({message: "BankAccount fetched successfully", data: bankAccount}), {
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

  const updated_bankAccount = await prisma.bankAccount.update({
    where: { id },
    data: json,
  });

  if (!updated_bankAccount) {
    return new NextResponse(JSON.stringify({message: "No bankAccount with ID found"}), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    }); 
  }

  return new NextResponse(JSON.stringify({ message: "BankAccount updated successfully", data: updated_bankAccount}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  }); 
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  await prisma.bankAccount.delete({
    where: { id },
  });
  return new NextResponse(JSON.stringify({message: `BankAccount deleted with Id: ${id}`}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  }); 
} 

