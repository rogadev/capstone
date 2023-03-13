import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

// const { log } = console;

export const load: LayoutServerLoad = async ({ locals }) => {
  // log('Dispatch Layout Server Load.');
  // AUTHENTICATION
  // log('Authenticating...');
  const session = await locals.validate();
  if (!session) {
    // log('No session, redirecting to /login');
    throw redirect(301, '/login');
  }
  // log('Session found. Authorized.');
  return {};
};