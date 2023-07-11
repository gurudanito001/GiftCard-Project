import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const wallets = await prisma.wallet.findMany();
  return new NextResponse(JSON.stringify({ message: "Wallets fetched successfully", data: wallets}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  }); 
}

export async function POST(request: Request) {
  try {
    const json = await request.json();

    const wallet = await prisma.wallet.create({
      data: json,
    });

    return new NextResponse(JSON.stringify(wallet), { 
     status: 201, 
     headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
} 
