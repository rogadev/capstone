import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

// const { log } = console;

export const load: PageServerLoad = async ({ locals }) => {
  // log(' -> (home) Page Server Load');
  // log('Authenticating...');
  const { session, user } = await locals.validateUser();
  if (session) {
    // log('Authenticated. Authorizing...');
    const { role } = user;
    // log('User role: ', role);
    if (role.includes("Admin")) {
      // log('Redirecting to /admin...');
      throw redirect(302, "/admin");
    }
    else if (role.includes("Driver")) {
      // log('Redirecting to /app/drive...');
      throw redirect(302, "/app");
    }
  }
  // log("Not authenticated. Continue to '/'");
  return {};
};