import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

const { log } = console;

export const load: LayoutServerLoad = async ({ locals }) => {
  log('(driver) Layout Server Load.');
  // AUTHENTICATION
  log('Authenticating...');
  const { session, user } = await locals.validateUser();
  if (!session) {
    log('No session, redirecting to /login');
    throw redirect(301, '/login');
  }
  // AUTHORIZATION
  log('Session found. Authorizing...');
  const { role } = user;
  log('User role: ', role);
  if (!role || (role !== "Admin" && role !== "SuperAdmin" && role !== "Driver")) {
    log("redirecting to /login");
    throw redirect(302, "/login");
  }
  log('Authorized.');
  return { user };
};