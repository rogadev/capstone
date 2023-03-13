import type { PageServerLoad } from "./$types";
import { getRole } from "$lib/server/utils/getUserRole";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
  const { user, session } = locals.validateUser();
  if (session && user) {
    const role = await getRole(user);
    if (role === 'Admin' || role === 'SuperAdmin') throw redirect(302, '/dispatch');
    throw redirect(302, '/drive');
  }
  console.log('Not logged in', user, session);
  throw redirect(302, '/login');
};