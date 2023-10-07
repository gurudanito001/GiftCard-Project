import {prisma} from "@/lib/prisma";

export async function getOffers ({userId, user = false, offerCategory}: {userId: string, user: boolean, offerCategory: string}){
  try {
    const offers = await prisma.offer.findMany({ 
      where: {
        ...(userId && {userId}),
        ...(offerCategory && {offerCategory})
      },
      include: {
        ...(user && {user})
      },
      orderBy: {
        createdAt: "desc"
      } 
    });
    return { offers }
  } catch (error) {
    return {error}
  }
}

export async function getOffersForMarket ({userId, user = false, offerCategory}: {userId: string, user: boolean, offerCategory: string}){
  try {
    const offers = await prisma.offer.findMany({ 
      where: {
        NOT: {
          ...(userId && {userId}),
        },
        ...(offerCategory && {offerCategory})
      },
      include: {
        ...(user && {user})
      },
      orderBy: {
        createdAt: "desc"
      } 
    });
    return { offers }
  } catch (error) {
    return {error}
  }
}

export async function getOfferById ({id}: {id: string}){
  try {
    const offer = await prisma.offer.findUnique({ where: {id}});
    return { offer }
  } catch (error) {
    return {error}
  }
}