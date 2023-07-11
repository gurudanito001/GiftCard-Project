

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { LoginCredentials, User } from "@/types";


export async function POST(request: Request) {
  try {
    const data: LoginCredentials = await request.json();
    // find user in database
    const user: any = await prisma.user.findFirst({
      where: {email: data.email}
    });
    if (user && (await bcrypt.compare(data.password as string, user.password as string))) {
      if(!user.email_confirmed){
        return new NextResponse(JSON.stringify({message: "Email Not Verified"}), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }); 
      }
      // Create token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.TOKEN_KEY as string,
        {
          expiresIn: "2h",
        }
      );
      // add token to user object
      user.token = token;
      // return new user
      return new NextResponse(JSON.stringify({message: "Login Successful", data: user}), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }); 
    }
    
    return new NextResponse(JSON.stringify({message: "Invalid Email or Password"}), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    }); 
    
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
}