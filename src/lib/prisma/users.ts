import {prisma} from "@/lib/prisma";

export async function getUsers (){
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });
    return { users }
  } catch (error) {
    return {error}
  }
}

export async function getUserById ({id}: {id: string}){
  try {
    const user = await prisma.user.findUnique({ 
      where: {id},
      include: {
        wallet: true,
        escrow: true
      }
    });
    return { user }
  } catch (error) {
    return {error}
  }
}