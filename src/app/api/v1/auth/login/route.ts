

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { LoginCredentials, User } from "@/types";
import fetch from 'node-fetch';


export async function POST(request: Request) {
  try {
    const data: LoginCredentials = await request.json();
    // find user in database
    const user: any = await prisma.user.findFirst({
      where: {email: data.email},
      include: {
        wallet: true
      }
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

      await fetch('https://graph.facebook.com/v17.0/168909186310029/messages', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer EAAKXsatZCsXgBO3PBMJHW9l9QQXOZCsLBsgUi4NxV9OlTqvvD7Bzsy6LJ2UehUKZBg0BFG2CYsQ8oeyvx0XrEH2IDBZA6GIA8tymbstYnSsOcIgYilAHC25gBtFbEO6ZA2MofzAf6oVI8F2Dfg8FCvXfbhG0JkNcGEKTZC4G8q2wCcTmqZCNfNiDqOAMtTOSAhc7FBy7HDJf78vh1YZD',
          'Content-Type': 'application/json'
        },
        // body: '{ "messaging_product": "whatsapp", "to": "2348140715723", "type": "template", "template": { "name": "hello_world", "language": { "code": "en_US" } } }',
        body: JSON.stringify({
          'messaging_product': 'whatsapp',
          'to': '2348140715723',
          "type": "text",
          "text": { // the text object
            "preview_url": true,
            "body": "You just logged in to Peniga"
          }
        })
      });
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