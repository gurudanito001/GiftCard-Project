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
