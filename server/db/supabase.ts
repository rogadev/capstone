import { type PostgrestError, createClient } from '@supabase/supabase-js';
import type { Trip, Stop, CancelationNote, CompletionNote } from '@prisma/client';
import { errorLog } from '../utils/logging';

const { SUPABASE_URL, SUPABASE_KEY } = useRuntimeConfig();
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const { log, info } = console;

/**
 * Creates a new trip in the database
 * @param trip The trip to create
 * @returns { data: Trip, error: Error }
 */
const createTrip = async (trip: Trip) => {
  let result = { data: null, error: null };
  try {
    result = await supabase.from('trips').insert(trip);
    const { data, error } = result;
    if (error) throw error;
  } catch (error) {
    errorLog(error, 'server/db/supabase.ts');
  }
  return result;
};

// ✅ Working ✅
/**
 * Fetches a single trip from the database by id
 * @param tripID The id of the trip to fetch
 * @returns { data: Trip, error: Error }
 */
const fetchTrip = async (tripID: number) => {
  log('Supabase fetching trip', tripID);
  try {
    const response = await supabase.from('trips').select('*').eq('id', tripID).single();
    const { data, error } = response as { data: Trip | null; error: PostgrestError | null; };
    if (error) throw error;
    log('Trip found. Supabase returning trip...');
    const trip = data as Trip;
    return { data: trip, error };
  } catch (error: any) {
    errorLog(error, 'server/db/supabase.ts');
    return { data: null, error };
  }
};

/**
 * Fetches one stop from the database by id
 * @param stopID The id of the stop to fetch
 * @returns { data: Stop, error: Error }
 */
const fetchStop = async (stopID: number) => {
  let result: {
    data: Stop | null;
    error: Error | null;
  } = { data: null, error: null };
  try {
    result = supabase.from('stops').select('*').eq('id', stopID).single();
    const { error } = result;
    if (error) throw error;
  } catch (error) {
    errorLog(error, 'server/db/supabase.ts');
  }
  return result;
};

/**
 * Creates a stop in the database
 * @param stop The stop to create
 * @returns { data: Stop, error: Error }
 */
const createStop = async (stop: Stop) => {
  let result = { data: null, error: null };
  try {
    result = await supabase.from('stops').insert(stop);
    const { data, error } = result;
    if (error) throw error;
  } catch (error) {
    errorLog(error, 'server/db/supabase.ts');
  }
  return result;
};

/**
 * Creates multiple stops in the database
 * @param stops The stops to create
 */
const createStops = async (stops: Stop[]) => {
  if (!stops || stops.length < 1) throw new Error('supabase.createStops() expects an array of stops. None provided.');
  log('Supabase is creating', stops.length, 'stops');
  try {
    await supabase.from('stops').insert([...stops]);
  } catch (error: any) {
    errorLog(error, 'server/db/supabase.ts');
    throw error;
  }
};


/**
 * Fetches all stops for a trip from the database
 * @param tripID The id of the trip to fetch stops for
 * @returns { data: Stop[], error: Error }
 */
const fetchStops = async (tripID: number) => {
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
    errorLog(error, 'server/db/supabase.ts');
  }
  return response;
};

const fetchAllStops = async () => {
  log('Supabase is fetching all stops');
  try {
    const response = await supabase.from('stops').select('*');
    return { data: response.data as Stop[], error: null };
  } catch (error) {
    errorLog(error, 'server/db/supabase.ts');
    return { data: null, error };
  }
};

/**
 * Fetches all stops for a trip from the database that are not closed
 * @returns { data: Stop[], error: Error }
 */
const fetchAllOpenStops = async () => {
  log('Supabase is fetching all stops (not closed)');
  try {
    const response = await supabase.from('stops').select('*').eq('closed', false);
    return { data: response.data as Stop[], error: null };
  } catch (error) {
    errorLog(error, 'server/db/supabase.ts');
    return { data: null, error };
  }
};

/**
 * Updates a trip in the database
 */
const updateTrip = async (trip: Trip) => {
  const tripID = trip.id;
  log('Supabase is updating trip', tripID);
  const updatedTrip: Trip = {
    updatedAt: new Date().toISOString(),
    date: trip.date,
    pickupTime: trip.pickupTime,
    passengerName: trip.passengerName,
    passengerPhone: trip.passengerPhone,
    pickupAddressName: trip.pickupAddressName,
    pickupAddressUnit: trip.pickupAddressUnit,
    pickupAddressStreet: trip.pickupAddressStreet,
    pickupAddressCity: trip.pickupAddressCity,
    dropOffAddressName: trip.dropOffAddressName,
    dropOffAddressUnit: trip.dropOffAddressUnit,
    dropOffAddressStreet: trip.dropOffAddressStreet,
    dropOffAddressCity: trip.dropOffAddressCity,
    dropOffTime: trip.dropOffTime,
    notes: trip.notes,
    confirmed: trip.confirmed,
    closed: trip.closed,
    canceled: trip.canceled,
    distance: trip.distance,
    duration: trip.duration,
  };
  try {
    const { error } = await supabase
      .from('trips')
      .update({ ...updatedTrip })
      .eq('id', tripID);
    if (error) throw error;
    const { data } = await supabase.from('trips').select('*').eq('id', tripID).single();
    return { data, error: null };
  } catch (error) {
    errorLog(error, 'server/db/supabase.ts');
    return { data: null, error };
  }
};

// ✅ I believe this is working ✅
/**
 * Fetches all stops for a trip from the database
 * @param updatedStop The stop to update
 * @returns { data: Stop, error: Error }
 */
const updateStop = async (stop: Stop) => {
  const stopID = stop.id;
  log("Supabase is updating stop", stopID);
  const updatedStop: Stop = {
    updatedAt: new Date().toISOString(),
    date: stop.date,
    passenger: stop.passenger,
    street: stop.street,
    city: stop.city,
    arrivalTime: stop.arrivalTime,
    departureTime: stop.departureTime,
    distance: stop.distance,
    name: stop.name,
    unit: stop.unit,
    notes: stop.notes,
    type: stop.type,
    closed: stop.closed,
    status: stop.status,
  };
  try {
    const { error } = await supabase.from('stops').update(updatedStop).eq('id', stopID) as { error: PostgrestError | null; };
    if (error) throw error;
    return { status: 200 };
  } catch (error: PostgrestError | Error) {
    errorLog(error, 'server/db/supabase.ts');
    sendError(event, 'server/db/supabase.ts');
  }
};

/**
 * Creates a new cancelation note
 * @param cancelationNote The cancelation note to create
 * @returns { data: CancelationNote, error: Error }
 */
const createCancellationNote = async (cancelationNote: CancelationNote) => {
  log('Supabase is creating a new cancelation note');
  let result = { data: null, error: null };
  try {
    result = await supabase.from('cancelation_notes').insert(cancelationNote);
    const { data, error } = result;
    if (error) throw error;
  } catch (error) {
    errorLog(error, 'server/db/supabase.ts');
  } finally {
    return result;
  }
};

/**
 * Creates a new completion note
 * @param completionNote The completion note to create
 * @returns { data: CompletionNote, error: Error }
 */
const createCompletionNote = async (completionNote: CompletionNote) => {
  log('Supabase is creating a new completion note');
  let result = { data: null, error: null };
  try {
    result = await supabase.from('completion_notes').insert(completionNote);
    const { data, error } = result;
    if (error) throw error;
  } catch (error) {
    errorLog(error, 'server/db/supabase.ts');
  } finally {
    return result;
  }
};

const fetchAllTrips = async () => {
  log('Supabase is fetching all trips in the database');
  try {
    const { data } = await supabase.from('trips').select('*') as { data: Trip[] | null; };
    return data;
  } catch (error) {
    errorLog(error, 'server/db/supabase.ts');
    throw error;
  }
};

const fetchAllUnconfirmedTrips = async () => {
  log('Supabase is fetching all unconfirmed trips in the database');
  try {
    const { data } = await supabase.from('trips').select('*').eq('confirmed', false) as Trip[] | null;
    return data;
  } catch (error) {
    errorLog(error, 'server/db/supabase.ts');
    throw error;
  }
};

export default {
  createTrip,
  fetchTrip,
  updateTrip,
  createStop,
  fetchStop,
  updateStop,
  createStops,
  fetchStops,
  fetchAllTrips,
  fetchAllStops,
  fetchAllOpenStops,
  createCompletionNote,
  createCancellationNote,
  fetchAllUnconfirmedTrips,
};