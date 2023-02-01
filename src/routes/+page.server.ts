import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import type { Provider } from "@supabase/supabase-js";
import supabase from "$lib/db";

export const actions: Actions = {
  login: async ({ url }) => {
    console.log('fired');
    const provider = url.searchParams.get("provider") as Provider;
    const { data, error } = await supabase.auth.signInWithOAuth({ provider, options: { redirectTo: `${url.origin}/dashboard` } });
    if (error) {
      console.error(`Error logging in with Supabase. Provider: ${provider}. Error: ${error.message}`);
      return fail(400, "Something went wrong");
    }
    throw redirect(303, data.url);
  },
  default: async () => {
    console.log('why is this firing');
    return fail(400, "Something went wrong");
  },
};