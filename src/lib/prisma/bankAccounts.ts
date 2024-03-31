import {prisma} from "@/lib/prisma";

export async function getBankAccounts ({userId}: {userId: string}){
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


export async function getAllBankAccounts (){
  try {
    const bankAccounts = await prisma.bankAccount.findMany({
      include: {
        user: true
      }
    });
    return { bankAccounts }
  } catch (error) {
    return {error}
  }
}