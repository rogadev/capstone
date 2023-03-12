import { type RequestHandler } from "@sveltejs/kit";
import { prismaClient } from "$lib/server/prisma";
import type { Vehicle } from "@prisma/client";
import authorizeAdmin from "../isAdmin";

export const GET = (async ({ locals }) => {
  console.log('GET /api/vehicles');
  // AUTHORIZATION
  await authorizeAdmin(locals);
  // GET VEHICLES
  const vehicles: Vehicle[] = await prismaClient.vehicle.findMany();
  return new Response(JSON.stringify(vehicles));
}) satisfies RequestHandler;

export const POST = (async ({ locals, request }) => {
  // TODO - Fix posting of new vehicles. Not receiving request data. Unclear why.
  console.log('POST /api/vehicles');
  const form = await request.formData();
  const data = Object.fromEntries(form.entries());
  const { session, user } = await locals.validateUser();
  console.log(data);
  console.log(user.userId);
  // AUTHORIZATION
  await authorizeAdmin(locals);
  // GET VEHICLES
  const vehicles: Vehicle[] = await prismaClient.vehicle.findMany();
  return new Response(JSON.stringify(vehicles));
}) satisfies RequestHandler;