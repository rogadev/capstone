import '$lib/db'; // Required to initialize the Supabase client server-side.
import { getServerSession } from '@supabase/auth-helpers-sveltekit';
import type { Session } from '@supabase/supabase-js';
import type { Handle, RequestEvent } from "@sveltejs/kit";
import { fail, redirect } from "@sveltejs/kit";
import inDevMode from "$lib/server/mode";

/**
 * Reaches out to our getServerSession function from @supabase/auth-helpers-sveltekit to get the current session and returns it, or null if there is no session.
 * @param event Request event
 * @returns Promise<Session | null>
 */
const getSupabaseSession = async (event: RequestEvent) => {
  let session: Session | null = null;
  try {
    session = await getServerSession(event);
  } catch (e) {
    if (inDevMode) console.error('Supabase getServerSession Error: ', e);
    fail(500, 'Something went wrong');
  }
  return session;
};

export const handle: Handle = async ({ event, resolve }) => {
  const session = await getSupabaseSession(event);
  const loggedIn = session !== null ? true : false;
  const loggingIn = event.url.pathname.match('/login') ? true : false;
  const intendedPath = event.url.pathname;
  const publicPaths = ['/login', '/register', '/forgot-password', '/reset-password', '/public', '/onboarding'];
  const intendedPathIsPublic = intendedPath === '/' || publicPaths.some((publicPath) => intendedPath.startsWith(publicPath));

  if (loggingIn && loggedIn) throw redirect(303, '/dashboard');

  if (!loggedIn && !intendedPathIsPublic) throw redirect(303, '/login');

  return await resolve(event);
};
