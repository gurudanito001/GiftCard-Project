import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const notifications = await prisma.notification.findMany();
  return new NextResponse(JSON.stringify({ message: "Notifications fetched successfully", data: notifications}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  }); 
}

export async function POST(request: Request) {
  try {
    const json = await request.json();

    const notification = await prisma.notification.create({
      data: json,
    });

    return new NextResponse(JSON.stringify(notification), { 
     status: 201, 
     headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
} 
