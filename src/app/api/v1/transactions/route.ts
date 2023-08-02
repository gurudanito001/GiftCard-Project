import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";



//type transactionType = "CREDIT" | "DEBIT" | "" ;
export async function GET(request: Request) {
  
  const { searchParams } = new URL(request.url);
  const transactionType: any = searchParams.get('type') || "";
  const page = parseInt(searchParams.get('page') || "1");
  const take = parseInt(searchParams.get('take') || "10");
  const userId = searchParams.get('userId') || "";

  if (userId) {
    let myCursor = "";
    const transactionResults = await prisma.transaction.findMany({
      take: take,
      skip: (page - 1) * take,
      ...(myCursor !== "" && {
        cursor: {
          id: myCursor,
        }
      }),
      where: {
        ...(transactionType && {type: transactionType}),
        OR: [
          {
            benefactorId: userId
          },
          {
            beneficiaryId: userId
          }
        ]
      },
      include:{
        benefactor: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            username: true, 
            avater: true
          }
        },
        beneficiary: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            username: true, 
            avater: true
          }
        }
      }
    })
    const transactionsCount = await prisma.transaction.count( {
      where: {
        ...(transactionType && {type: transactionType}),
        OR: [
          {
            benefactorId: userId
          },
          {
            beneficiaryId: userId
          }
        ]
      }
    })
    // Bookmark your location in the result set - in this
    // case, the ID of the last post in the list of 4.

    const lastTransactionInResults = transactionResults[(page * take) - 1] // Remember: zero-based index! :)
    myCursor = lastTransactionInResults?.id // Example: 29

    return new NextResponse(JSON.stringify({page, take, transactionsCount, message: "Transactions fetched successfully", data: transactionResults}), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }); 
  }else{
    return new NextResponse(JSON.stringify({ message: "User Id is required", data: null}), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    }); 
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();

    const transaction = await prisma.transaction.create({
      data: json,
    });

    return new NextResponse(JSON.stringify(transaction), { 
     status: 201, 
     headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
} 


/* const transactions = await prisma.transaction.findMany({
    include:{
      benefactor: {
        select: {
          firstName: true,
          lastName: true,
          email: true,
          username: true, 
          avater: true
        }
      },
      beneficiary: {
        select: {
          firstName: true,
          lastName: true,
          email: true,
          username: true, 
          avater: true
        }
      }
    }
  });
  return new NextResponse(JSON.stringify({ message: "Transactions fetched successfully", data: transactions}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });  */
