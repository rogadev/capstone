import type { RequestHandler } from "@sveltejs/kit";
import { fail } from "@sveltejs/kit";
import { prismaClient } from "$lib/server/prisma";
import type { Vehicle } from "@prisma/client";

export const GET = (async ({ locals }) => {
  // AUTHORIZATION
  const session = await locals.validate();
  if (!session) return fail(401, "Unauthorized");
  // GET VEHICLES
  const vehicles: Vehicle[] = await prismaClient.vehicle.findMany();
  return new Response(JSON.stringify(vehicles));
}) satisfies RequestHandler;

