import { createClient } from '@supabase/supabase-js';
import type { Trip, Stop, CancelationNote, CompletionNote } from '@prisma/client';

const { SUPABASE_URL, SUPABASE_KEY } = useRuntimeConfig();
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const createTrip = async (trip: Trip) => {
  let result = { data: null, error: null };
  try {
    result = await supabase.from('trips').insert(trip);
    const { data, error } = result;
    if (error) throw error;
  } catch (error) {
    console.error(error);
  }
  return result;
};

/**
 * Fetches a single trip from the database
 * @param tripId The id of the trip to fetch
 * @returns { data: Trip, error: Error }
 */
export const fetchTrip = async (tripId: number) => {
  const result = { data: null, error: null };
  try {
    const response = await supabase.from('trips').select('*').eq('id', tripId);
    if (response.error) throw response.error;
    result.data = response.data as Trip;
  } catch (error) {
    result.error = error;
    console.log(error);
  }
  return result;
};

export const fetchStop = async (stopID: number) => {
  let result: {
    data: Stop | null;
    error: Error | null;
  } = { data: null, error: null };
  try {
    result = supabase.from('stops').select('*').eq('id', stopID).single();
    const { error } = result;
    if (error) throw error;
  } catch (error) {
    console.log(error);
  }
  return result;
};

export const createStop = async (stop: Stop) => {
  let result = { data: null, error: null };
  try {
    result = await supabase.from('stops').insert(stop);
    const { data, error } = result;
    if (error) throw error;
  } catch (error) {
    console.error(error);
  }
  return result;
};

// create n number of stops
export const createStops = async (stops: Stop[]) => {
  let result = { data: [], error: null };
  for (const stop of stops) {
    const { data, error } = await createStop(stop);
    if (error) {
      result.error = error;
      break;
    }
    result.data = [...result.data, data];
  }
  return result;
};


/**
 * Fetches all stops for a trip from the database
 * @param tripID The id of the trip to fetch stops for
 * @returns { data: Stop[], error: Error }
 */
export const fetchStops = async (tripID: number) => {
  let response: {
    data: Stop[] | null;
    error: Error | null;
  } = { data: null, error: null };
  try {
    response = await supabase
      .from('stops')
      .select('*')
      .eq('tripId', tripID);
    const { error } = response;
    if (error) throw error;
  } catch (error) {
    console.log(error);
  }
  return response;
};

/**
 * Fetch all stops
 */
export const fetchAllStops = async () => {
  const response = await supabase.from('stops').select('*');
  const { error } = response;
  return { data: response.data as Stop[], error };
};

/**
 * Fetches all stops for a trip from the database
 * @param trip The trip to update
 * @returns { data: Trip, error: Error }
 */
export const updateTrip = async (trip: Trip) => {
  let result = { data: null, error: null };
  try {
    result = await supabase.from('trips').update(trip).eq('id', trip.id);
    const { data, error } = result;
    if (error) throw error;
  } catch (error) {
    console.error(error);
  } finally {
    return result;
  }
};

/**
 * Fetches all stops for a trip from the database
 * @param stop The stop to update
 * @returns { data: Stop, error: Error }
 */
export const updateStop = async (stop: Stop) => {
  let result = { data: null, error: null };
  try {
    result = await supabase.from('stops').update(stop).eq('id', stop.id);
    const { data, error } = result;
    if (error) throw error;
  } catch (error) {
    console.error(error);
  } finally {
    return result;
  }
};

/**
 * Creates a new cancelation note
 * @param cancelationNote The cancelation note to create
 * @returns { data: CancelationNote, error: Error }
 */
export const createCancelationNote = async (cancelationNote: CancelationNote) => {
  let result = { data: null, error: null };
  try {
    result = await supabase.from('cancelation_notes').insert(cancelationNote);
    const { data, error } = result;
    if (error) throw error;
  } catch (error) {
    console.error(error);
  } finally {
    return result;
  }
};

export const createCompletionNote = async (completionNote: CompletionNote) => {
  let result = { data: null, error: null };
  try {
    result = await supabase.from('completion_notes').insert(completionNote);
    const { data, error } = result;
    if (error) throw error;
  } catch (error) {
    console.error(error);
  } finally {
    return result;
  }
};