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
      const user: any = await prisma.user.findUnique({
        where: {
          id: user_id,
        },
        include: {
          wallet: true
        }
      });
      if(!user){
        return new NextResponse(JSON.stringify({message: "User Not Found!"}), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }); 
      }
      // Create token
      const newToken = jwt.sign(
        { user_id: user.id, email: user.email },
        process.env.TOKEN_KEY as string,
        {
          expiresIn: "2h",
        }
      );
      // add token to user object
      user.token = token;
      // return new user
      delete user.password;
      return new NextResponse(JSON.stringify({message: "User Data Refreshed", data: user}), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }); 
    }
    
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}