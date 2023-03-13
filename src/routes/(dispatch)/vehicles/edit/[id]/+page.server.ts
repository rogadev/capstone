import { prismaClient } from '$lib/server/prisma';
import type { PageServerLoad } from '$lib/types';

export const load: PageServerLoad = async ({ params }) => {
  const id = parseInt(params.id as string);
  const vehicle = await prismaClient.vehicle.findUnique({
    where: { id: parseInt(id) }
  });
  return {
    vehicle
  };
};