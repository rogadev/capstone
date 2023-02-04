import type { PageServerLoad } from "../$types";
import supabase from "$lib/db";

export const load: PageServerLoad = async () => {
  const user = supabase.auth.getUser()?.id;
  let userOrganization = null;

  if (user) {
    userOrganization = await supabase
      .from('organizations')
      .select('organization_name, public_email, public_phone, public_website, show_email, show_phone, show_website')
      .eq('owner_id', user.id)
      .single();
  }

  return {
    userId: user?.id,
    userOrganization,
  };
};