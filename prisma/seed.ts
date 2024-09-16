import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const main = async () => {
  const alice = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      email: "alice@prisma.io",
      name: "Alice",
    },
  });
  console.log({ alice });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
