import {prisma} from "@/lib/prisma";

export async function getTransactions ({userId}: {userId: string}){
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        OR: [
          {benefactorId: userId},
          {beneficiaryId: userId}
        ]
      },
      include: {
        benefactor: true,
        beneficiary: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    return { transactions }
  } catch (error) {
    return {error}
  }
}

export async function getTransactionById ({id}: {id: string}){
  try {
    const transaction = await prisma.transaction.findUnique({ 
      where: {id},
      include: {
        benefactor: true,
        beneficiary: true
      },
    });
    return { transaction }
  } catch (error) {
    return {error}
  }
}