import type { Trip, Stop } from '@prisma/client';
import * as supabase from '~~/server/db/supabase';
import { getDistanceAndDuration } from "~/server/maps";

export default defineEventHandler(async (event) => {
  const tripIdString = await readBody(event) as string;
  if (!tripIdString)
    return {
      status: 400,
      statusText: 'Request must include tripId string in the body. Expected body: { tripId: string }'
    };

  const tripId = parseInt(tripIdString);

  // Fetch our trip data.
  console.info("Fetching trip data...");
  let trip: Trip;
  try {
    const { data, error } = await supabase.fetchTrip(tripId) as { data: Trip | null; error: PostgrestError | null; };
    if (error) throw error;
    if (!data)
      return {
        status: 404,
        statusText: 'Trip not found'
      };

    console.info("API fetched trip data successfully. Updating trip...");
    trip = data;
  } catch (e: PostgrestError | Error) {
    console.error('/api/trips/confirm', 'Error fetching trip data');
    sendError(event, e.message);
  }

  // Get our trip distance and duration. Add it to our trip object. We will save the trip object later.
  console.info("Getting trip distance and duration...");
  const originAddressString: string = `${trip.pickupAddressStreet}, ${trip.pickupAddressCity}`;
  const destinationAddressString: string = `${trip.dropOffAddressStreet}, ${trip.dropOffAddressCity}`;
  try {
    const { distance, duration } = await getDistanceAndDuration(originAddressString, destinationAddressString) as { distance: number; duration: number; };
    if (!distance || !duration) throw new Error('Distance or duration is null. Distance:', distance, 'Duration:', duration);
    console.info("Distance:", distance, "Duration:", duration);
    trip.estimatedDistance = distance;
    trip.estimatedDuration = duration;
  } catch (e: Error) {
    console.error('/api/trips/confirm', 'Error getting trip distance and duration');
    sendError(event, e.message);
  }

  // Create our stop objects.
  console.info("Creating stop objects...");
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
  const hasAppointmentTime = trip.dropOffTime && trip.dropOffTime !== '';
  const calculateArrivalTime = () => {
    const expectedDestinationArrivalTime = originDepartureTime + Math.round(trip.estimatedDuration * 1.1);
    if (hasAppointmentTime && expectedDestinationArrivalTime > calcTimeAsMinutes(trip.dropOffTime)) sendError(500, 'The expected destination arrival time is greater than the required dropoff time. Please adjust the arrival time to accommodate for a trip duration of ' + trip.estimatedDuration + ' minutes.');
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
  console.info("Inserting stops into the database...");
  try {
    await supabase.createStop(origin);
    await supabase.createStop(destination);
  } catch (e: Error) {
    console.error('/api/trips/confirm', 'Error inserting stops into the database');
    sendError(event, e.message);
  }

  // Update the trip data.
  console.info("Updating trip confirmation status...");
  try {
    const successful = await supabase.updateTrip({
      ...trip,
      confirmed: true,
    });
    if (!successful) throw new Error('Trip update was unsuccessful');
  } catch (e: Error) {
    console.error('/api/trips/confirm', 'Error updating trip data');
    sendError(event, e.message);
  }

  // Send a success response.
  console.info("Sending success response...");
  return {};
});

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