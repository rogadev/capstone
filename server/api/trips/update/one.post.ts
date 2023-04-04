import type { Trip } from '@prisma/client';
import * as supabase from '~~/server/db/supabase';

export default defineEventHandler(async (event) => {
  const trip = await readBody(event) as Trip;
  if (!trip) return { status: 400, statusText: "Request was missing trip data" };
  try {
    const successful = await supabase.updateTrip(trip);
    if (!successful) throw new Error("Trip update failed");
    console.info(`Trip with id ${trip.id} updated successfully.`);
    return {};
  } catch (e: Error) {
    console.error(`Error updating trip with id ${trip.id}:`, e);
    sendError(event, "Error updating trip. This was not expected.");
  }
});
