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
}
