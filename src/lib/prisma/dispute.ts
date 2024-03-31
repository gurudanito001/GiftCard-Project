import {prisma} from "@/lib/prisma";

export async function getAllDisputes (){
  try {
    const disputes = await prisma.dispute.findMany({
      include: {
        user: true,
        trade: {
          select: {
            user: true,
            buyerId: true,
            buyer: true,
            sellerId: true,
            seller: true,
            cardName: true,
            valueInUSD: true,
            rate: true,
            cardType: true,
            timeSent: true
          }
        },
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    return { disputes }
  } catch (error) {
    return {error}
  }
}

export async function getDisputeById ({id}: {id: string}){
  try {
    const dispute = await prisma.dispute.findUnique({ 
      where: {id},
      include: {
        user: true,
        trade: {
          select: {
            user: true,
            buyer: true,
            seller: true,
            cardName: true,
            valueInUSD: true,
            rate: true,
            cardType: true,
            timeSent: true
          }
        },
      }
    });
    return { dispute }
  } catch (error) {
    return {error}
  }
}