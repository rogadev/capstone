import type { LayoutServerLoad } from '../$types';
// import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async (event) => {
  // const session = await getServerSession(event);
  // if (!session) throw redirect(302, '/login');
  // const { user } = session;
  // if (!user) throw redirect(302, '/login');
  // const isUserAdmin = user?.app_metadata?.roles?.includes('admin');
  // if (!isUserAdmin) throw redirect(302, '/login');
  return {};
};