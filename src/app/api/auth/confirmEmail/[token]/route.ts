import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { TokenData, User } from "@/types";
import * as jwt from 'jsonwebtoken';

export async function POST(
  request: Request,
  { params }: { params: { token: string } }
) {
  try {
    const token = params.token;
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
      await prisma.user.update({
        where: { id: user_id },
        data: {...user, email_confirmed: true},
      }) as User;
      return new NextResponse(JSON.stringify({message: "Email Confirmation Successful!"}), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }); 
    }
    
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}