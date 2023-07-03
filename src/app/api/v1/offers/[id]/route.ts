import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const offer = await prisma.offer.findUnique({
    where: {
      id,
    },
  });

  if (!offer) {
    return new NextResponse(JSON.stringify({message: `Offer with ID Not Found!`}), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    }); 
  }

  return new NextResponse(JSON.stringify({message: "Offer fetched successfully", data: offer}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  }); 
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  let json = await request.json();

  const updated_offer = await prisma.offer.update({
    where: { id },
    data: json,
  });

  if (!updated_offer) {
    return new NextResponse(JSON.stringify({message: "No offer with ID found"}), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    }); 
  }

  return new NextResponse(JSON.stringify({ message: "Offer updated successfully", data: updated_offer}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  }); 
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  await prisma.offer.delete({
    where: { id },
  });
  return new NextResponse(JSON.stringify({message: `Offer deleted with Id: ${id}`}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  }); 
} 

