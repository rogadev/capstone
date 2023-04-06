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
    id: string;
    date: string;
    raw: string;
    pickup_time: string;
    passenger_name: string;
    passenger_phone: string;
    pickup_location_name: string;
    pickup_location_unit: string;
    pickup_location_street: string;
    pickup_location_city: string;
    drop_off_location_name: string;
    drop_off_location_unit: string;
    drop_off_location_street: string;
    drop_off_location_city: string;
    drop_off_time: string;
    notes: string;
  };

  type ChatMessage = {
    role: "system" | "user" | "assistant",
    message: string;
  };

  type ChatConversation = ChatMessage[];

  type GenerateTripsBody = {
    prompt: string;
    date: string;
  };

  type ChatCompletion = {
    id: string,
    object: string,
    created: number,
    model: string,
    usage: {
      prompt_tokens: number,
      completion_tokens: number,
      total_tokens: number;
    },
    choices:
    {
      message: {
        role: string,
        content: string;
      },
      finish_reason: string,
      index: number;
    }[];
  };

}
