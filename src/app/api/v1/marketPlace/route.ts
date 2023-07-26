import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(request: Request,) {
  const { searchParams } = new URL(request.url);
  const offerCategory = searchParams.get('category') || "seller";
  const page = parseInt(searchParams.get('page') || "1");
  const take = parseInt(searchParams.get('take') || "10");
  //const offers = await prisma.offer.findMany()

  let myCursor = "";
  const offerResults = await prisma.offer.findMany({
    include: {
      user: true
    },
    take: take,
    skip: (page - 1) * take,
    ...(myCursor !== "" && {cursor: {
      id: myCursor,
    }}),
    where: {
      offerCategory
    }
  })
  const offersCount = await prisma.offer.count( {
    where: {
      ...(offerCategory && {offerCategory}),
    }
  })
  
  // Bookmark your location in the result set - in this
  // case, the ID of the last post in the list of 4.
  
  const lastOfferInResults = offerResults[(page * take) -1] // Remember: zero-based index! :)
  myCursor = lastOfferInResults?.id // Example: 29
  
  //const lastPostInResults: any = offersResults[0] // Remember: zero-based index! :)
  //const myCursor: any = lastPostInResults.id // Example: 52


  return new NextResponse(JSON.stringify({page, take, offersCount, message: "Offers fetched successfully", data: offerResults}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  }); 
}