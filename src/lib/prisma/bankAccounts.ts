import {prisma} from "@/lib/prisma";

export async function getBankAccounts (userId: string){
  try {
    const bankAccounts = await prisma.bankAccount.findMany({
      where: {userId},
      orderBy: {
        createdAt: "desc"
      }
    });
    return { bankAccounts }
  } catch (error) {
    return {error}
  }
}
