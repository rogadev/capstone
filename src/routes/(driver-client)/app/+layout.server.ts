import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
  // AUTHENTICATION
  const { session, user } = await locals.validateUser();
  if (!session) throw redirect(301, '/app/login');
  // AUTHORIZATION
  const role = await getRole(user);
  if (role === "Admin" || role === "SuperAdmin") throw redirect(301, "/");
  else throw redirect(301, "/app");
  return {};
};