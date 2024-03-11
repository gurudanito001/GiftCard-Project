import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const dispute = await prisma.dispute.findUnique({
    where: {
      id,
    },
  });

  if (!dispute) {
    return new NextResponse(JSON.stringify({message: `Dispute with ID Not Found!`}), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    }); 
  }

  return new NextResponse(JSON.stringify({message: "Dispute fetched successfully", data: dispute}), {
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

  const updated_dispute = await prisma.dispute.update({
    where: { id },
    data: json,
  });

  if (!updated_dispute) {
    return new NextResponse(JSON.stringify({message: "No dispute with ID found"}), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    }); 
  }

  return new NextResponse(JSON.stringify({ message: "Dispute updated successfully", data: updated_dispute}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  }); 
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  await prisma.dispute.delete({
    where: { id },
  });
  return new NextResponse(JSON.stringify({message: `Dispute deleted with Id: ${id}`}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  }); 
} 

