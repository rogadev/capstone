import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createNewTrip = async (trip: GeneratedTrip, date: Date) => {
  const newTrip: GeneratedTrip = await prisma.trip.create({
    data: {
      updatedAt: new Date(),
      date: date,
      pickupTime: trip.pickup_time,
      passengerName: trip.passenger_name,
      passengerPhone: trip.passenger_phone,
      pickupAddressName: trip.pickup_address_name,
      pickupAddressUnit: trip.pickup_address_unit,
      pickupAddressStreet: trip.pickup_address_street,
      pickupAddressCity: trip.pickup_address_city,
      dropOffAddressName: trip.drop_off_address_name,
      dropOffAddressUnit: trip.drop_off_address_unit,
      dropOffAddressStreet: trip.drop_off_address_street,
      dropOffAddressCity: trip.drop_off_address_city,
      dropOffTime: trip.drop_off_time,
      notes: trip.notes,
    },
  });
  return newTrip;
};