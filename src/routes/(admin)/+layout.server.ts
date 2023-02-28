import { getServerSession } from '@supabase/auth-helpers-sveltekit';
// import type { AuthSession, Session } from '@supabase/supabase-js';
// import type { Handle, RequestEvent } from '@sveltejs/kit';
// import { fail, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../$types';

export const load: LayoutServerLoad = async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    return {
      redirect: '/login'
    };
  }
  const user = session.user;
  const isUserAdmin = user?.app_metadata?.roles?.includes('admin');
  console.log('isUserAdmin', isUserAdmin);
};