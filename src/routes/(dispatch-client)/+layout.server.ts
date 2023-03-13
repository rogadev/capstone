import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from "./$types";
import getRole from '$lib/server/utils/getUserRole';

export const load: LayoutServerLoad = async (event) => {
  const { locals } = event;
  // AUTHENTICATION
  const { session, user } = await locals.validateUser();
  if (!session) throw redirect(301, '/login');
  // AUTHORIZATION
  const role = await getRole(user);
  if (role !== "Admin" || role !== "SuperAdmin") throw redirect(301, "/app");

  return {};
};