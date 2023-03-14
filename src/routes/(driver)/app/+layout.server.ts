import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

// const { log } = console;

export const load: LayoutServerLoad = async ({ locals }) => {
  // log("'/admin' Layout Server Load.");
  // AUTHORIZING
  // log('Authorizing...');
  const { user } = await locals.validateUser();
  const { role } = user;
  if (role.includes("Admin")) {
    // log('Not authorized, redirecting to /login');
    throw redirect(302, '/admin');
  }
  // log('Authorized.');
  return { user };
};