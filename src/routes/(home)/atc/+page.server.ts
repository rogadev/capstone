import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { getRole } from '$lib/server/utils/getUserRole';
const { log } = console;
export const load: PageServerLoad = async ({ locals }) => {
  log('Starting ATC...');
  log('Vaidating User...');
  const { user, session } = locals.validateUser();
  if (user || session) {
    const role = await getRole(user);
    log('Session:', session);
    log('User:', user);
    log('User Role:', role);
    if (role === 'Admin' || role === 'SuperAdmin') {
      log('Admin. Redirecting to dispatch...');
      throw redirect(302, '/dispatch');
    }
    log('Driver. Redirecting to drive...');
    throw redirect(302, '/drive');
  }
  log('Not logged in. Redirecting to login...');
  throw redirect(302, '/login');
};