import { Trip, Stop } from '@prisma/client';

import supabase from '~~/server/db/supabase';
import { errorLog, info, log } from "~/server/utils/logging";
import { getDistanceAndDuration } from "~/server/maps";

const { DEV } = useRuntimeConfig();
const DEBUG_IN_DEV = DEV.toLowerCase() === "true";

export default defineEventHandler(async (event) => {
  const tripId = await readBody(event);
  if (!tripId) return { status: 400, body: "Request to '/api/trips/confirm' was missing parameter tripId" };
  log("API request to update trip with id", tripId, 'to "confirmed"');
  // Fetch our trip data.
  // info("API is fetching trip data from database...");
  let trip: Trip;
  try {
    const { data, error } = await supabase.fetchTrip(tripId) as { data: Trip; error: Error | PostgrestError | null; };
    if (error) throw error;
    trip = data;
  } catch (e) {
    errorLog(e, __filename);
    sendError(event, e.message, DEBUG_IN_DEV);
  }

  // Get our trip distance and duration. Add it to our trip object. We will save the trip object later.
  // info("Getting trip distance and duration, and updating local trip object...");
  const originAddressString: string = `${trip.pickupAddressStreet}, ${trip.pickupAddressCity}`;
  const destinationAddressString: string = `${trip.dropOffAddressStreet}, ${trip.dropOffAddressCity}`;
  const { distance, duration } = await getDistanceAndDuration(originAddressString, destinationAddressString);
  trip.distance = distance;
  trip.duration = duration;

  // Create our stop objects.
  // info("Creating local stop objects...");
  const originDepartureTime = calcTimeAsMinutes(trip.pickupTime);
  const originArrivalTime = originDepartureTime - 5;
  const origin: Stop = {
    tripId: trip.id,
    type: 'pickup',
    date: trip.date,
    passenger: trip.passengerName,
    name: trip.pickupAddressName,
    unit: trip.pickupAddressUnit,
    street: trip.pickupAddressStreet,
    city: trip.pickupAddressCity,
    arrivalTime: originArrivalTime,
    departureTime: originDepartureTime,
    notes: trip.notes,
  };
  const hasFixedDropoffTime = trip.dropOffTime && trip.dropOffTime !== '';
  const destinationArrivalTime = hasFixedDropoffTime ? calcTimeAsMinutes(trip.dropOffTime) : originDepartureTime + duration;
  const destinationDepartureTime = destinationArrivalTime + 5;
  const destination: Stop = {
    tripId: trip.id,
    type: 'dropoff',
    date: trip.date,
    passenger: trip.passengerName,
    name: trip.dropOffAddressName,
    unit: trip.dropOffAddressUnit,
    street: trip.dropOffAddressStreet,
    city: trip.dropOffAddressCity,
    arrivalTime: destinationArrivalTime,
    departureTime: destinationDepartureTime,
    notes: trip.notes,
  };

  // Insert the stops into the database.
  // info("Inserting local stop objects into the database...");
  await supabase.createStops([origin, destination]);

  // Update the trip data.
  // info("Updating the trip data...");
  trip.confirmed = true;
  await supabase.updateTrip(trip);
  return { status: 200, body: "Trip confirmed" };
});

function calcTimeAsMinutes(time: string) {
  const [hours, minutes] = time.split(':');
  return Number(hours) * 60 + Number(minutes);
}





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