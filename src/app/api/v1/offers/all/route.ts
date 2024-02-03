import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function GET(request: Request) {
    const offers = await prisma.offer.findMany();

    return new NextResponse(JSON.stringify({message: "Offers fetched successfully", data: offers}), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }); 
  
}