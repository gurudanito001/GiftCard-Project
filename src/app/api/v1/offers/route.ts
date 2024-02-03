import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const offerCategory = searchParams.get('category');
  const page = parseInt(searchParams.get('page') || "1");
  const take = parseInt(searchParams.get('take') || "10");
  const userId = searchParams.get('userId');
  console.log(userId);
  //const offers = await prisma.offer.findMany()

  if (userId) {
    let myCursor = "";
    const offerResults = await prisma.offer.findMany({
      take: take,
      skip: (page - 1) * take,
      ...(myCursor !== "" && {
        cursor: {
          id: myCursor,
        }
      }),
      where: {
        ...(offerCategory && {offerCategory}),
        userId
      }
    })
    const offersCount = await prisma.offer.count( {
      where: {
        ...(offerCategory && {offerCategory}),
        userId
      }
    })
    // Bookmark your location in the result set - in this
    // case, the ID of the last post in the list of 4.

    const lastOfferInResults = offerResults[(page * take) - 1] // Remember: zero-based index! :)
    myCursor = lastOfferInResults?.id // Example: 29

    return new NextResponse(JSON.stringify({page, take, offersCount, message: "Offers fetched successfully", data: offerResults}), {
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
    console.log(json)
    const offer = await prisma.offer.create({
      data: json,
    });
    return new NextResponse(JSON.stringify(offer), { 
     status: 201, 
     headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({message: error.message}), { status: 500 });
  }
} 
