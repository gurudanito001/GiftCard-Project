import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import valuesExist from "@/validation/valuesExist";
import { User } from "@/types";
import sendEmail from "@/services/sendEmail";


export async function POST(request: Request) {
  try {
    const data = await request.json();
    // encrypt password
    let encryptedPassword;
    if(typeof data.password === "string") encryptedPassword = await bcrypt.hash(data.password, 10);
    if(typeof encryptedPassword === "string") data.password = encryptedPassword;
    
    // create user in database
    const user = await prisma.user.create({
      data,
    }) ;
    // create user token
    const token = jwt.sign(
      { user_id: user.id, email: user.email },
      process.env.TOKEN_KEY as string,
      {
        expiresIn: "2h",
      }
    );
    //send email
    await sendEmail({email: user.email, url: `${process.env.BASE_URL}/auth/verifyEmail?token=${token}`})
    // return new user
    return new NextResponse(JSON.stringify({message: `A confirmation email was sent to your email: ${user.email}`}), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    }); 
  } catch (error: any) {
    // error response if user with email already exists
    if (error.code === "P2002") {
      return new NextResponse(JSON.stringify({message: "User with email already exists"}), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      }); 
    }
    return new NextResponse(JSON.stringify(error), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    }); 
  }
}