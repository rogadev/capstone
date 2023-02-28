import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { supabase } from "$lib/db";
import { getServerSession } from "@supabase/auth-helpers-sveltekit";

export const load: PageServerLoad = async (event) => {
  console.log("logout");
  const session = await getServerSession(event);
  if (!session) throw redirect(302, '/login');
  await supabase.auth.api.signOut(session.access_token); // sign out from supabase
  event.locals.session = null;
  throw redirect(302, '/login');
};