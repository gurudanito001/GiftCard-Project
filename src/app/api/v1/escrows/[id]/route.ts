import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const escrow = await prisma.escrow.findUnique({
    where: {
      id,
    },
  });

  if (!escrow) {
    return new NextResponse(JSON.stringify({message: `Escrow with ID Not Found!`}), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    }); 
  }

  return new NextResponse(JSON.stringify({message: "Escrow fetched successfully", data: escrow}), {
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

  const updated_escrow = await prisma.escrow.update({
    where: { id },
    data: json,
  });

  if (!updated_escrow) {
    return new NextResponse(JSON.stringify({message: "No escrow with ID found"}), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    }); 
  }

  return new NextResponse(JSON.stringify({ message: "Escrow updated successfully", data: updated_escrow}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  }); 
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  await prisma.escrow.delete({
    where: { id },
  });
  return new NextResponse(JSON.stringify({message: `Escrow deleted with Id: ${id}`}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  }); 
} 

