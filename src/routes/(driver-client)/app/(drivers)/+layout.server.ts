import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './app/$types$types';

export const load: LayoutServerLoad = async (event) => {
  const { locals } = event;
  const session = await locals.validate();
  // TODO also validate if they are a driver
  // if (!session || !session.user.isDriver) throw redirect(301, '/app/login');
  if (!session) throw redirect(301, '/app/login');
  return {};
};