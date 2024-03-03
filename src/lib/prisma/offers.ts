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

type filterDataSchema = {
  cardName: string
  cardType: string
  valueInUSD: number
  rate: number
  minRange: number
  maxRange: number
}

type getOffersForMarketProps = {
  userId: string, 
  user: boolean, 
  offerCategory: string, 
  filterData: filterDataSchema
}
export async function getOffersForMarket (props: getOffersForMarketProps){
  console.log(props?.filterData?.valueInUSD)
  try {
    console.log(props?.userId)
    const offers = await prisma.offer.findMany({ 
      where: {
        NOT: {
          OR: [
            {userId: props?.userId},
            {status: "COMPLETED"}
          ]
        },
        
        ...(props?.filterData?.cardName && {cardName: props?.filterData?.cardName}),
        ...(props?.filterData?.cardType && {cardType: props?.filterData?.cardType}),
        ...(props?.filterData?.rate && {
          rate: {gte: props?.filterData?.rate}
        }),
        ...(props?.filterData?.valueInUSD && {
            AND: {
              minRange: {lte: props?.filterData?.valueInUSD}, 
              maxRange: {gte: props?.filterData?.valueInUSD}, 
            }
        }),
        valueInUSD: {
          ...(props?.filterData?.maxRange) && {lte: props?.filterData?.maxRange},
          ...(props?.filterData?.minRange) && {gte: props?.filterData?.minRange},
        }, 


        ...(props?.offerCategory && {offerCategory: props?.offerCategory})
      },
      include: {
        ...(props?.user && {user: props?.user})
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