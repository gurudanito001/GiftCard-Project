import {prisma} from "@/lib/prisma";

export async function getTrades ({userId}: {userId: string}){
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
        seller: true,
        offer: true
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

export async function getAllTrades (){
  try {
    const trades = await prisma.trade.findMany({
      include: {
        buyer: true,
        seller: true,
        offer: true
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

export async function getActiveTrades ({userId}: {userId: string}){
  try {
    const trades = await prisma.trade.findMany({
      where: {
        OR: [
          {
            status: {
              equals: "ACCEPTED"
            }
          },
          {
            status: {
              equals: "DISPUTED"
            }
          },
          {
            status: {
              equals: "PENDING"
            }
          },
        ]
      },
      include: {
        buyer: true,
        seller: true,
        offer: true
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



export async function getTradeById ({id}: {id: string}){
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