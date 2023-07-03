import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const escrows = await prisma.escrow.findMany();
  return new NextResponse(JSON.stringify({ message: "Escrows fetched successfully", data: escrows}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  }); 
}

export async function POST(request: Request) {
  try {
    const json = await request.json();

    const escrow = await prisma.escrow.create({
      data: json,
    });

    return new NextResponse(JSON.stringify(escrow), { 
     status: 201, 
     headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
} 
