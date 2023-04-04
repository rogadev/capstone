import { Trip } from '@prisma/client';
import * as supabase from '~/server/db/supabase.ts';

export default defineEventHandler(async (event) => {
  const trip = await readBody(event) as Trip;
  if (!trip) return { status: 400, statusText: 'Bad Request' };
  console.log('Attempting to add trip to database...');
  try {
    const successful = await supabase.createTrip(trip);
    if (!successful) throw new Error('Trip creation failed');
    console.info('Trip created successfully');
    return {};
  } catch (e: Error) {
    console.error(`Error creating trip with id ${trip.id}:`, e);
    sendError(event, 'Error creating trip. This was not expected.');
  }
});