import '$lib/db'; // Required to initialize the Supabase client server-side.
import { getServerSession } from '@supabase/auth-helpers-sveltekit';
import type { Session } from '@supabase/supabase-js';
import type { Handle, RequestEvent } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';

/**
 * Reaches out to our getServerSession function from @supabase/auth-helpers-sveltekit to get the current session and returns it, or null if there is no session.
 */
const getSupabaseSession = async (event: RequestEvent) => {
	let session: Session | null = null;
	try {
		session = await getServerSession(event);
	} catch (e) {
		session = null;
		console.error('Error getting the server side session (getSupabaseSession()): ', e);
		fail(500, 'Something went wrong');
	}
	return { session };
};

/**
 * This main hook is called on every request.
 */
export const handle: Handle = async ({ event, resolve }: RequestResolver) => {
	const intendedPath = event.url.pathname;
	console.log('Request: ', intendedPath, Intl.DateTimeFormat().format(new Date()));
	const publicPaths = ['/login', '/signup'];
	const intendedPathIsPublic = () => {
		if (intendedPath === '/') return true;
		return publicPaths.includes(intendedPath);
	};
	const { session } = await getSupabaseSession(event);
	event.locals.session = session ? session : null;

	if (intendedPathIsPublic() && session) {
		throw redirect(302, '/dashboard');
	}
	if (!session && !intendedPathIsPublic()) throw redirect(302, '/login');

	return await resolve(event);
};