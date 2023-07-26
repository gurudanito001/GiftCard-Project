import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const bankAccounts = await prisma.bankAccount.findMany();
  return new NextResponse(JSON.stringify({ message: "BankAccounts fetched successfully", data: bankAccounts}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  }); 
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    console.log(json)

    const bankAccount = await prisma.bankAccount.create({
      data: json,
    });

    return new NextResponse(JSON.stringify({message: "Bank Account Added Successfully", data: bankAccount}), { 
     status: 201, 
     headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
} 
