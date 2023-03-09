import type { PrismaClient } from '@prisma/client';
import vehicles from './data/vehicles.json';

export async function seed(prismaClient: PrismaClient) {
  await prismaClient.$executeRawUnsafe(`TRUNCATE TABLE "vehicle" CASCADE;`);
  await prismaClient.vehicle.createMany({
    data: vehicles.map((vehicle) => ({
      ...vehicle,
      date_added: new Date(),
      last_updated: new Date(),
    })),
  });
}