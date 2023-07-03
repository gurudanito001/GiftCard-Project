import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

export async function GET(request: Request) {
  const users = await prisma.user.findMany({
    include: {
      wallet: true
    }
  });
  return new NextResponse(JSON.stringify({ message: "Users fetched successfully", data: users}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  }); 
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    let encryptedPassword;
    if(typeof data.password === "string") encryptedPassword = await bcrypt.hash(data.password, 10);
    if(typeof encryptedPassword === "string") data.password = encryptedPassword;
    
    // create user in database
    const user = await prisma.user.create({
      data,
    }) ;

    return new NextResponse(JSON.stringify(user), { 
     status: 201, 
     headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return new NextResponse("User with email already exists", {
        status: 409,
      });
    }
    return new NextResponse(error.message, { status: 500 });
  }
}
