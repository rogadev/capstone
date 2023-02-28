import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";

export const load: PageServerLoad = async (event) => {
  const { supabaseClient } = await getSupabase(event);
  await supabaseClient.auth.signOut();
  throw redirect(303, '/');
};