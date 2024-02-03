import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";



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