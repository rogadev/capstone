import { z } from 'zod';
import { VehicleType, VehicleFuelType } from '@prisma/client';

const MAX_VEHICLE_YEAR = Number.parseInt(new Date().getFullYear()) + 1;

const vehicleFormSchema = z.object({
  date_added: z.date(),
  last_updated: z.date(),
  name: z.string().min(1, { message: 'Name is required' }).max(50, { message: 'Name is too long' }),
  description: z.string().max(150, { message: 'Description is too long' }).optional(),
  make: z.string().min(2, { message: 'Make is required' }).max(50, { message: 'Make is too long' }),
  model: z.string().min(1, { message: 'Model is required' }).max(50, { message: 'Model is too long' }),
  year: z.number().min(1900, { message: 'Year is required' }).max(MAX_VEHICLE_YEAR, { message: `Maximum year is ${MAX_VEHICLE_YEAR}` }),
  type: z.nativeEnum(VehicleType, { message: 'Please enter valid vehicle type.' }),
  fuel_type: z.nativeEnum(VehicleFuelType, { message: 'Please enter valid fuel type.' }),
  departing_from: z.string().min(4, { message: 'Departing location is required' }).max(150, { message: 'Departing location is too long' }),
});
type VehicleForm = z.infer<typeof formSchema>;

export { vehicleFormSchema, VehicleForm };