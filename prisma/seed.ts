import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  /* const user = await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      firstName: "Admin",
      lastName: "",
      email: "admin@admin.com",
      role: "ADMIN",
    },
  });

  console.log({ user }); */
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit();
  });
