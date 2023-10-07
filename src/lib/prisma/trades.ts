import {prisma} from "@/lib/prisma";

export async function getAllTrades (userId: string){
  try {
    const trades = await prisma.trade.findMany({
      where: {
        OR: [
          {buyerId: userId},
          {sellerId: userId}
        ]
      },
      include: {
        buyer: true,
        seller: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    return { trades }
  } catch (error) {
    return {error}
  }
}

export async function getTradeById (id: string){
  try {
    const trade = await prisma.trade.findUnique({ 
      where: {id},
      include: {
        buyer: true,
        seller: true,
        transaction: true,
        escrow: true,
        offer: true
      },
    });
    return { trade }
  } catch (error) {
    return {error}
  }
}