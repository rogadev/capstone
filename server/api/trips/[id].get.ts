import { Trip, Stop } from '@prisma/client';

import { fetchTrip } from '~~/server/db/supabase';

export default defineEventHandler(async (event) => {
  const tripID = event.context.params.id;
  const response = await fetchTrip(tripID);
  if (response.error) throw response.error;
  return response;
});
