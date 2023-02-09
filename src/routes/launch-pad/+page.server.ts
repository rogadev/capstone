import type { PageServerLoad } from "../$types";
// import { getUserOrganizations } from "$lib/db";

export const load: PageServerLoad = async (event) => {
  const organizations = await getOrganizations(event.locals.session.user.id);

  return {
    session: event.locals.session,
    organizations
  };
};