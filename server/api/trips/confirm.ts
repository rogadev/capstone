import { Trip, Stop } from '@prisma/client';

import * as supabase from '../../db/supabase';
import { getDistanceAndDuration } from "~/server/maps";

const { DEV } = useRuntimeConfig();
const DEBUG_IN_DEV = DEV.toLowerCase() === "true" || DEV === true;

export default defineEventHandler(async (event) => {
  console.log("Endpoint '/api/trips/confirm' called...");
  let success = false;
  let error = '';
  const tripId = await readBody(event);
  if (!tripId) return sendError(event, 'Client Error: No data was provided.', DEBUG_IN_DEV);
  console.log('Confirming trip with ID', tripId);

  // Fetch our trip data.
  console.log("Fetching trip data from database...");
  let trip: Trip;
  try {
    const { data, error } = await supabase.fetchTrip(tripId);
    trip = data[0];
    if (error) throw error;
  } catch (e) {
    console.log('An error occurred fetching the trip data from the database', e.message);
    return sendError(event, e.message, DEBUG_IN_DEV);
  }

  // Check if the trip is already confirmed or canceled.
  console.log("Checking if trip is already confirmed or canceled...");
  if (trip.confirmed || trip.closed) return sendError(event, `Client Error: Trip is already confirmed or closed.\nConfirmed: ${trip.confirmed}\nClosed: ${trip.closed}`, DEBUG_IN_DEV);

  // Get our trip distance and duration. Add it to our trip object. We will save the trip object later.
  console.log("Getting trip distance and duration...");
  const tripOriginString = `${trip.pickupAddressStreet}, ${trip.pickupAddressCity}`;
  const tripDestinationString = `${trip.dropOffAddressStreet}, ${trip.dropOffAddressCity}`;
  let distance: number, duration: number;
  try {
    const response = await getDistanceAndDuration(tripOriginString, tripDestinationString);
    distance = response.distance;
    duration = response.duration;
    trip.distance = distance;
    trip.duration = duration;
  } catch (e) {
    console.log('An error occurred getting the trip distance and duration', e.message);
    return sendError(event, e.message, DEBUG_IN_DEV);
  }

  // Create our stop objects.
  console.log("Creating stop objects...");
  const originDepartureTime = calcTimeAsMinutes(trip.pickupTime);
  const originArrivalTime = originDepartureTime - 5;
  const originAddressString = `${trip.pickupAddressStreet}, ${trip.pickupAddressCity}`;
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
  const destinationAddressString = `${trip.dropOffAddressStreet}, ${trip.dropOffAddressCity}`;
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
  console.log("Inserting stops into the database...");
  try {
    const { data, error } = await supabase.createStops([origin, destination]);
    if (error) throw error;
  } catch (e) {
    console.log('An error occurred inserting the stops into the database', e.message);
    return sendError(event, e.message, DEBUG_IN_DEV);
  }

  // Update the trip data.
  console.log("Updating the trip data...");
  trip.confirmed = true;
  try {
    const { data, error } = await supabase.updateTrip(trip);
    if (error) throw error;
  } catch (e) {
    console.log('An error occurred updating the trip', e.message);
    return sendError(event, e.message, DEBUG_IN_DEV);
  }

  console.log("Trip confirmed successfully!");
  success = true;
  return { success, error };
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