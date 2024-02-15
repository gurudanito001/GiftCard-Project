import {prisma} from "@/lib/prisma";

export async function getAllEscrows ({userId}: {userId: string}){
  try {
    const escrows = await prisma.escrow.findMany({
      where: {userId},
      include: {
        trade: {
          select: {
            buyer: true,
            seller: true
          }
        },
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    return { escrows }
  } catch (error) {
    return {error}
  }
}

export async function getEscrowById ({id}: {id: string}){
  try {
    const escrow = await prisma.escrow.findUnique({ 
      where: {id},
      include: {
        trade: {
          select: {
            buyer: true,
            seller: true,
            cardName: true,
            valueInUSD: true,
            rate: true,
            cardType: true,
            status: true,
            createdAt: true,
            updatedAt: true
          }
        },
      },
    });
    return { escrow }
  } catch (error) {
    return {error}
  }
}