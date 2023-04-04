import type { Trip, Stop } from '@prisma/client';
import * as supabase from '~~/server/db/supabase';
import { getDistanceAndDuration } from "~/server/maps";

export default defineEventHandler(async (event) => {
  const tripIdString = await readBody(event) as string;
  if (!tripIdString) return setResponseStatus(400, "Request to '/api/trips/confirm' was missing parameter tripId");

  const tripId = parseInt(tripIdString);

  // Fetch our trip data.
  console.info("Fetching trip data...");
  let trip: Trip;
  try {
    const { data, error } = await supabase.fetchTrip(tripId) as Trip | null;
    if (!data) return setResponseStatus(404, "Trip not found");
    trip = data;
  } catch (e) {
    errorLog(e, '/api/trips/confirm', 'Error fetching trip data');
    sendError(event, e.message);
  }

  // Get our trip distance and duration. Add it to our trip object. We will save the trip object later.
  // info("Getting trip distance and duration, and updating local trip object...");
  const originAddressString: string = `${trip.pickupAddressStreet}, ${trip.pickupAddressCity}`;
  const destinationAddressString: string = `${trip.dropOffAddressStreet}, ${trip.dropOffAddressCity}`;
  const { distance, duration } = await getDistanceAndDuration(originAddressString, destinationAddressString);
  if (!distance || !duration) return console.error('Distance or duration is null. Distance:', distance, 'Duration:', duration);
  console.log('Distance:', distance, 'Duration:', duration);
  trip.estimatedDistance = distance;
  trip.estimatedDuration = duration;

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
  const calculateArrivalTime = () => {
    const expectedDestinationArrivalTime = originDepartureTime + Math.round(duration * 1.1);
    if (hasFixedDropoffTime && expectedDestinationArrivalTime > calcTimeAsMinutes(trip.dropOffTime)) sendError(500, 'The expected destination arrival time is greater than the required dropoff time. Please adjust the arrival time to accommodate for a trip duration of ' + duration + ' minutes.');
    return expectedDestinationArrivalTime;
  };
  const destinationArrivalTime = calculateArrivalTime();
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
  await supabase.createStop(origin);
  await supabase.createStop(destination);

  // Update the trip data.
  trip.confirmed = true;
  await supabase.updateTrip(trip);
  return { status: 200, body: "Trip confirmed" };
});

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
        return sendError(500, 'An unknown error occurred getting distance and duration');
      }
      dist = distance;
      dur = duration;
      return { distance: dist, duration: dur };
    } catch (e) {
      console.error('An error occurred getting distance and duration', e);
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

function calcTimeAsMinutes(time: string) {
  const [hours, minutes] = time.split(':');
  return Number(hours) * 60 + Number(minutes);
}