import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const transactions = await prisma.transaction.findMany();
  return new NextResponse(JSON.stringify({ message: "Transactions fetched successfully", data: transactions}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  }); 
}

export async function POST(request: Request) {
  try {
    const json = await request.json();

    const transaction = await prisma.transaction.create({
      data: json,
    });

    return new NextResponse(JSON.stringify(transaction), { 
     status: 201, 
     headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
} 
