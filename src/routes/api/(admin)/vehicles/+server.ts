import { type RequestHandler } from "@sveltejs/kit";
import { prismaClient } from "$lib/server/prisma";
import type { Vehicle } from "@prisma/client";
import authorizeAdmin from "../isAdmin";

export const GET = (async ({ locals }) => {
  console.log('/api/vehicles')
  // AUTHORIZATION
  await authorizeAdmin(locals);
  // GET VEHICLES
  const vehicles: Vehicle[] = await prismaClient.vehicle.findMany();
  return new Response(JSON.stringify(vehicles));
}) satisfies RequestHandler;

