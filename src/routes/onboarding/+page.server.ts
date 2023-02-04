import type { PageServerLoad } from "../$types";
import { getServerSession } from '@supabase/auth-helpers-sveltekit';
import supabase from "$lib/db";

export const load: PageServerLoad = async (event) => {
  type UserId = string | null;
  const session = await getServerSession(event);
  const userId: UserId = session?.user?.id ?? null;

  let userOrganization = null;
  let error = null;

  if (userId) {
    userOrganization = await supabase
      .from('organizations')
      .select('organization_name, public_email, public_phone, public_address, show_email, show_phone, show_address')
      .eq('owner_id', userId)
      .single();

    // if we have an error, and the error details suggest there are no results, then we can set userOrganization to null. If it says anything else, be sure to pass along the error to the page.
    if (userOrganization.error?.details) {
      if (userOrganization.error.details.includes('Results contain 0 rows')) userOrganization = null;
      else error = userOrganization.error;
    }
  }

  console.log('userOrganization: ', userOrganization);

  return {
    userId,
    userOrganization,
    error
  };
};