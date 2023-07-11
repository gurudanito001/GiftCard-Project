import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { TokenData, User } from "@/types";
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export async function POST(
  request: Request,
  { params }: { params: { token: string } }
) {
  try {
    const token = params.token;
    const data: {password: string, confirmPassword: string} = await request.json();
    if(data.password !== data.confirmPassword){
      return new NextResponse(JSON.stringify({message: "Passwords do not match"}), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }); 
    }
    if(process.env.TOKEN_KEY){
      let {user_id, email} = await jwt.verify(token, process.env.TOKEN_KEY) as TokenData;
      const user = await prisma.user.findUnique({
        where: {
          id: user_id,
        },
      });
      if(!user){
        return new NextResponse(JSON.stringify({message: "User Not Found!"}), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }); 
      }
      // hash password
      let encryptedPassword
      if(typeof data.password === "string") encryptedPassword = await bcrypt.hash(data.password, 10);

      await prisma.user.update({
        where: { id: user_id },
        data: {...user, password: encryptedPassword},
      });
      return new NextResponse(JSON.stringify({message: "Password Change Successful!"}), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }); 
    }
    
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}