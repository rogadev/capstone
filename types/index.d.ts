import { User } from "@supabase/supabase-js";

export { };

declare global {
  type UserObject = User;

  type UserObjectClient = {
    id: string;
    email: string;
    name?: string;
    photo?: string;
  };

  type GeneratedTrip = {
    pickup_time: string;
    passenger_name: string;
    passenger_phone: string;
    pickup_name: string;
    pickup_location_unit: string;
    pickup_location_street: string;
    pickup_location_city: string;
    drop_off_name: string;
    drop_off_location_unit: string;
    drop_off_location_street: string;
    drop_off_location_city: string;
    drop_off_time: string;
    notes: string;
  };
}
