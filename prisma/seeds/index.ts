import { PrismaClient } from '@prisma/client';
import { seed as seedVehicles } from './vehicles';

const prismaClient = new PrismaClient();

async function main() {
  let exitStatus = 0;
  try {
    await seedVehicles(prismaClient);
  } catch (error) {
    console.error(error);
    exitStatus = 1;
  } finally {
    await prismaClient.$disconnect();
    process.exit(exitStatus);
  }
}

main();