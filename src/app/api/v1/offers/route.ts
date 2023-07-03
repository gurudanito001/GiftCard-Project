import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const offers = await prisma.offer.findMany()
  return new NextResponse(JSON.stringify({ message: "Offers fetched successfully", data: offers}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  }); 
}

export async function POST(request: Request) {
  try {
    const json = await request.json();

    const offer = await prisma.offer.create({
      data: json,
    });

    return new NextResponse(JSON.stringify(offer), { 
     status: 201, 
     headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
} 
