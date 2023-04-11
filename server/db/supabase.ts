import { type PostgrestError, createClient } from '@supabase/supabase-js';
import type { Trip, Stop, CancelationNote, CompletionNote } from '@prisma/client';

const { SUPABASE_URL, SUPABASE_KEY } = useRuntimeConfig();
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * Creates a trip in the database
 * @param trip The trip to create in the database
 * @throws Error if trip is not provided
 * @returns true if trip is created, false if not
 */
export const createTrip = async (trip: Trip) => {
  console.log("'server/db/supabase.ts' createTrip()");
  if (!trip) throw new Error('supabase.createTrip() expects a trip. None provided.');
  try {
    const { error } = await supabase.from('trips').insert(trip) as { error: PostgrestError | null; };
    if (error) throw error;
    console.info('Trip created - createTrip() returning true...');
    return true;
  } catch (error: PostgrestError | Error) {
    console.error('Trip not created - createTrip() returning false...', error);
    return false;
  }
};

/**
 * Fetches a single trip from the database by id
 * @param id The id of the trip to fetch
 * @throws Error if id is not provided
 */
export const fetchTrip = async (id: number) => {
  console.log("'server/db/supabase.ts' fetchTrip()");
  if (!id) throw new Error('supabase.fetchTrip() expects an id. None provided.');
  const response:
    { data: Trip | null; error: PostgrestError | null; } =
    { data: null, error: null };
  try {
    const { data, error } = await supabase.from('trips').select('*').eq('id', id).single();
    if (error) throw error;
    console.info('Trip fetched - fetchTrip() returning data...');
    response.data = data;
  } catch (error: PostgrestError | Error) {
    console.error('Trip not fetched - fetchTrip() returning error...', error);
    response.error = error;
  }
  return response;
};

/**
 * Fetches one stop from the database by id
 * @param id The id of the stop to fetch
 * @throws Error if id is not provided
 */
export const fetchStop = async (id: number) => {
  console.log("'server/db/supabase.ts' fetchStop()");
  if (!id) throw new Error('supabase.fetchStop() expects an id. None provided.');
  const response:
    { data: Stop | null; error: PostgrestError | null; } =
    { data: null, error: null };
  try {
    const { data, error } = await supabase.from('stops').select('*').eq('id', id) as { data: Stop | null; error: PostgrestError | null; };
    console.info('Stop fetched - fetchStop() returning data...');
    response.data = data;
  } catch (error: PostgrestError | Error) {
    console.error('Stop not fetched - fetchStop() returning error...', error);
    response.error = error;
  }
  return response;
};

/**
 * Creates a stop in the database
 * @param stop The stop to create
 * @throws Error if stop is not provided
 */
export const createStop = async (stop: Stop) => {
  console.log("'server/db/supabase.ts' createStop()");
  if (!stop) throw new Error('supabase.createStop() expects a stop. None provided.');
  try {
    const { error } = await supabase.from('stops').insert(stop) as { error: PostgrestError | null; };
    if (error) throw error;
    console.info('Stop created - createStop() returning true...');
    return true;
  } catch (error: PostgrestError | Error) {
    console.error('Stop not created - createStop() returning false...', error);
    return false;
  }
};

/**
 * Creates multiple stops in the database
 * @param stops The stops to create
 * @throws Error if stops is not provided
 */
export const createStops = async (stops: Stop[]) => {
  console.log("'server/db/supabase.ts' createStops()");
  if (!stops || stops.length < 1) throw new Error('supabase.createStops() expects an array of stops. None provided.');
  try {
    const { error } = await supabase.from('stops').insert(stops) as { error: PostgrestError | null; };
    if (error) throw error;
    console.info('Stops created - createStops() returning true...');
    return true;
  } catch (error: any) {
    console.error('Stops not created - createStops() returning false...', error);
    return null;
  }
};


/**
 * Fetches all stops for a trip from the database
 * @throws Error if tripID is not provided
 * @param tripId The id of the trip to fetch stops for
 */
export const fetchStops = async (tripId: number) => {
  console.log("'server/db/supabase.ts' fetchStops()");
  if (!tripId) throw new Error('supabase.fetchStops() expects a tripID. None provided.');
  const response:
    { data: Stop[] | null; error: PostgrestError | null; } =
    { data: null, error: null };
  try {
    const { data, error } = await supabase
      .from('stops')
      .select('*')
      .eq('tripId', tripId) as { data: Stop[] | null; error: PostgrestError | null; };
    if (error) throw error;
    console.info('Stops fetched - fetchStops() returning data...');
    response.data = data;
    return response;
  } catch (error: PostgrestError | Error) {
    console.error('Stops not fetched - fetchStops() returning error...', error);
    response.error = error;
    return response;
  }
};

/**
 * Fetches all stops for a trip from the database
 */
export const fetchAllStops = async () => {
  console.log("'server/db/supabase.ts' fetchAllStops()");
  const response = { data: null, error: null } as { data: Stop[] | null; error: PostgrestError | null; };
  try {
    const { data, error } = await supabase.from('stops').select('*') as { data: Stop[] | null; error: PostgrestError | null; };
    if (error) throw error;
    console.log('Stops fetched - fetchAllStops() returning data...');
    response.data = data;
  } catch (error: PostgrestError | Error) {
    console.error('Stops not fetched - fetchAllStops() returning error...', error);
    response.error = error;
  }
  return response;
};

/**
 * Fetches all stops for a trip from the database that are not closed
 */
export const fetchAllOpenStops = async () => {
  console.log("'server/db/supabase.ts' fetchAllOpenStops()");
  const response = { data: null, error: null } as { data: Stop[] | null; error: PostgrestError | null; };
  try {
    const { data, error } = await supabase.from('stops').select('*').eq('closed', false);
    if (error) throw error;
    console.info('Stops fetched - fetchAllOpenStops() returning data...');
    response.data = data;
  } catch (error) {
    console.error('Stops not fetched - fetchAllOpenStops() returning error...', error);
    response.error = error;
  }
  return response;
};

/**
 * Updates a trip in the database
 * @throws Error if trip is not provided
 */
export const updateTrip = async (trip: Trip) => {
  console.log("'server/db/supabase.ts' updateTrip()");
  if (!trip) throw new Error('supabase.updateTrip() expects a trip. None provided.');
  trip = {
    ...trip,
    updatedAt: new Date().toISOString(),
  };
  try {
    const { error } = await supabase
      .from('trips')
      .update(trip)
      .eq('id', trip.id);
    if (error) throw error;
    console.info('Trip updated - updateTrip() returning true...');
    return true;
  } catch (error) {
    console.error('Trip not updated - updateTrip() returning false...', error);
    return false;
  }
};

/**
 * Updates a stop in the database
 * @param stop The stop to update
 * @throws Error if stop is not provided
 */
export const updateStop = async (stop: Stop) => {
  if (!stop) throw new Error('supabase.updateStop() expects a stop. None provided.');
  console.log("'server/db/supabase.ts' updateStop()");
  stop = {
    ...stop,
    updatedAt: new Date().toISOString()
  };
  try {
    const { error } = await supabase.from('stops').update(stop).eq('id', stop.id) as { error: PostgrestError | null; };
    if (error) throw error;
    console.info('Stop updated - updateStop() returning true...');
    return true;
  } catch (error: PostgrestError | Error) {
    console.error('Stop not updated.', error);
    return false;
  }
};

/**
 * Creates a new cancelation note
 * @param cancelationNote The cancelation note to create
 * @throws Error if cancelationNote is not provided
 */
export const createCancellationNote = async (cancelationNote: CancelationNote) => {
  console.log("'server/db/supabase.ts' createCancellationNote()");
  if (!cancelationNote) throw new Error('supabase.createCancellationNote() expects a cancelationNote. None provided.');
  try {
    const { error } = await supabase.from('cancelation_notes').insert(cancelationNote);
    if (error) throw error;
    console.info('Cancelation note created - createCancellationNote() returning true...');
    return true;
  } catch (error) {
    console.error('Cancelation note not created.', error);
    return false;
  }
};

/**
 * Creates a new completion note
 * @param completionNote The completion note to create
 * 
 */
export const createCompletionNote = async (completionNote: CompletionNote) => {
  console.log("'server/db/supabase.ts' createCompletionNote()");
  try {
    const { error } = await supabase.from('completion_notes').insert(completionNote);
    if (error) throw error;
    console.info('Completion note created - createCompletionNote() returning true...');
    return true;
  } catch (error) {
    console.error('Completion note not created.', error);
    return false;
  }
};

/**
 * Fetches all trips from the database
 * @returns All trips in the database
 */
export const fetchAllTrips = async () => {
  console.log("'server/db/supabase.ts' fetchAllTrips()");
  const response:
    { data: Trip[] | null; error: PostgrestError | null; } =
    { data: null, error: null };
  try {
    const { data, error } = await supabase.from('trips').select('*') as { data: Trip[] | null; error: PostgrestError | null; };
    if (error) throw error;
    console.info('Trips fetched - fetchAllTrips() returning data...');
    response.data = data;
  } catch (error) {
    console.error('Trips not fetched.', error);
    response.error = error;
  }
  return response;
};

/**
 * Fetches all unconfirmed trips from the database
 * @returns All unconfirmed trips in the database
 */
export const fetchAllUnconfirmedTrips = async () => {
  console.log("'server/db/supabase.ts' fetchAllUnconfirmedTrips()");
  const response:
    { data: Trip[] | null; error: PostgrestError | null; } =
    { data: null, error: null };
  try {
    const { data, error } = await supabase.from('trips').select('*').eq('confirmed', false) as Trip[] | null;
    if (error) throw error;
    console.info('Trips fetched - fetchAllUnconfirmedTrips() returning data...');
    response.data = data;
  } catch (error) {
    console.error('Unconfirmed trips not fetched.', error);
    response.error = error;
  }
  return response;
};