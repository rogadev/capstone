import { Trip, Stop } from '@prisma/client';
import supabase from '~/server/db/supabase.ts';
import { getDistanceAndDuration } from "~/server/maps";
const { DEV } = useRuntimeConfig();
const DEBUG_IN_DEV = DEV.toLowerCase() === "true" || DEV === true;
console.log("DEBUG_IN_DEV:", DEBUG_IN_DEV);

/**
 * Not all trips have an appointment and therefore might not have a dropoff time. If the dropoff time is an empty string or null, we need to use Google Maps Distance Matrix API to calculate the time it will take to get from the pickup location to the dropoff location. This function will return the time it will take to get from the pickup location to the dropoff location.
 * @param time A string in the format of HH:MM
 * @returns String in the format of HH:MM
 */
async function calcDistanceAndDuration(time: string | null) {
  if (!time || time === '') {
    let dist: string, dur: string;
    try {
      const { distance, duration } = await getDistanceAndDuration();
      if (!distance || !duration) {
        console.error("An unknown error occurred getting distance and duration. While getDistanceAndDuration() didn't throw an error, it returned an empty string for distance or duration.");
        return sendError(500, 'An unknown error occurred getting distance and duration', DEBUG_IN_DEV);
      }
      dist = distance;
      dur = duration;
      return { distance: dist, duration: dur };
    } catch (e) {
      console.error('An error occurred getting distance and duration', e, DEBUG_IN_DEV);
      return sendError(500, e.message);
    }
  }
}

/**
 * Arrival time at a given pickup or dropoff should always be 5 minutes ahead of the intended time. Therefore, this function takes a time in the format of HH:MM and returns a time 5 minutes before that time.
 * @param time A string in the format of HH:MM
 * @returns String in the format of HH:MM
 */
function calculateOriginArrivalTime(time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes;
  const newTotalMinutes = totalMinutes - 5;
  const newHours = Math.floor(newTotalMinutes / 60);
  const newMinutes = newTotalMinutes % 60;
  const newTime = `${newHours}:${newMinutes}`;
  return newTime;
}

function calculateDestinationArrivalTime(originDepartureTime: string, duration: string) {
  const [hours, minutes] = originDepartureTime.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes;
  const [durHours, durMinutes] = duration.split(':').map(Number);
  const durTotalMinutes = durHours * 60 + durMinutes;
  const newTotalMinutes = totalMinutes + durTotalMinutes;
  const newHours = Math.floor(newTotalMinutes / 60);
  const newMinutes = newTotalMinutes % 60;
  const newTime = `${newHours}:${newMinutes}`;
  return newTime;
}

function getAddressString(name: string, street: string, city: string, event: H3Event) {
  if (!city || city === '') return sendError(event, 'Client Error: City is required in ALL address data.', DEBUG_IN_DEV);
  const hasName = name && name !== '';
  const hasStreetAddress = street && street !== '';
  if (!hasName && !hasStreetAddress) return city;
  if (!hasName && hasStreetAddress) return `${street}, ${city}`;
  if (hasName && !hasStreetAddress) return `${name}, ${city}`;
  return `${name}, ${street}, ${city}`;
}

export default defineEventHandler(async (event) => {
  console.log("'/api/trips/confirm' called");
  const tripId = await readBody(event);
  if (!tripId) return sendError(event, 'Client Error: No data was provided.', DEBUG_IN_DEV);
  console.log('Confirming Trip:\n', tripId);

  // Fetch our trip data.
  console.log("Fetching trip data from database...");
  const trip: Trip = await supabase.from('trips').select().eq('id', tripId).single();
  if (!trip) return send(event, `Client or Server Error: Trip not found with trip id provided: \n{tripId}`, DEBUG_IN_DEV);

  // Check if the trip is already confirmed or canceled.
  console.log("Checking if trip is already confirmed or canceled...");
  if (trip.confirmed || trip.closed) return sendError(event, `Client Error: Trip is already confirmed or closed.\nConfirmed: ${trip.confirmed}\nClosed: ${trip.closed}`, DEBUG_IN_DEV);

  // Create our stop objects.
  console.log("Creating stop objects...");
  const hasDestinationArrivalTime = trip.dropOffTime && trip.dropOffTime !== '';
  const tripOriginString = getAddressString(trip.pickupAddressName || '', trip.pickupAddressStreet, trip.pickupAddressCity, event);
  const tripDestinationString = getAddressString(trip.dropOffAddressName || '', trip.dropOffAddressStreet, trip.dropOffAddressCity, event);
  const { distance, duration } = await getDistanceAndDuration(tripOriginString, tripDestinationString);
  const origin: Stop = {
    tripId: trip.id,
    type: 'pickup',
    name: trip.pickupAddressName,
    unit: trip.pickupAddressUnit,
    street: trip.pickupAddressStreet,
    city: trip.pickupAddressCity,
    arrivalTime: calculateOriginArrivalTime(trip.pickupTime),
    departureTime: trip.pickupTime,
    notes: trip.notes,
  };
  const destination: Stop = {
    tripId: trip.id,
    type: 'dropoff',
    name: trip.dropOffAddressName,
    unit: trip.dropOffAddressUnit,
    street: trip.dropOffAddressStreet,
    city: trip.dropOffAddressCity,
    arrivalTime: calculateDestinationArrivalTime(trip.pickupTime, duration),
    departureTime: trip.dropOffTime,
    notes: trip.notes,
  };

  // Insert the stops into the database.
  console.log("Inserting stops into the database...");
  const { data, error } = await supabase.from('stops').insert([origin, destination]);
  if (error) {
    console.log('An error occurred inserting the stops into the database', error.message);
    return sendError(event, error.message, DEBUG_IN_DEV);
  }
  console.log('Stops inserted into the database', data);

  // Update the trip data.
  console.log("Updating the trip data...");
  tripId.confirmed = true;
  tripId.distance = distance;
  tripId.duration = duration;
  try {
    // update the trip in the database. 'confirmed' should be set to true now.
    const { data, error } = await supabase.from('trips').update(tripId).match({ id: tripId.id });
    if (error) {
      return { status: 500, body: error.message };
    }
    return { status: 200, body: data };
  } catch (e) {
    console.log('An error occurred updating the trip', e.message);
    return { status: 500, body: e.message };
  }
});