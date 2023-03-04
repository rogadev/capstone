import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../$types';

export const load: LayoutServerLoad = async (event) => {
  const { locals } = event;
  const session = await locals.validate();
  if (!session) throw redirect(301, '/login');
  return {};
};