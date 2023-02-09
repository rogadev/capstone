import '$lib/db'; // Required to initialize the Supabase client server-side.
import { getServerSession } from '@supabase/auth-helpers-sveltekit';
import type { Session } from '@supabase/supabase-js';
import type { Handle, RequestEvent } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';

// LIST OF PUBLIC PATHS
const PUBLIC_PATHS = [
	'/forgot',
	'/reset',
	'/public',
	'/confirm'
];

/**
 * Evaluates the path to see if it is a public path.
 */
const isIntendedPathPublic = (path: string) => {
	if (PUBLIC_PATHS.some((publicPath) => path === '/' || path.startsWith(publicPath))) {
		return true;
	}
	return false;
};

/**
 * Reaches out to our getServerSession function from @supabase/auth-helpers-sveltekit to get the current session and returns it, or null if there is no session.
 */
const getSupabaseSession = async (event: RequestEvent) => {
	let session: Session | null = null;
	try {
		session = await getServerSession(event);
	} catch (e) {
		console.error('Supabase getServerSession Error: ', e);
		fail(500, 'Something went wrong');
	}
	event.locals.session = session;
	return session;
};

/**
 * This main hook is called on every request.
 */
export const handle: Handle = async ({ event, resolve }: RequestResolver) => {
	const session = await getSupabaseSession(event);
	const intendedPath = event.url.pathname;

	return await resolve(event);
};
