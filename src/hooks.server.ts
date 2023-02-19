import '$lib/db'; // Required to initialize the Supabase client server-side.
import { getServerSession } from '@supabase/auth-helpers-sveltekit';
import type { AuthSession, Session } from '@supabase/supabase-js';
import type { Handle, RequestEvent } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import { SECRET_ENV_MODE } from '$env/static/private';

// CONSTANTS
const PUBLIC_PATHS = ['/login'];
const UNIVERSAL_PATHS = ['/terms', '/privacy'];
const DATE_TIME_OPTIONS = {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric',
	second: 'numeric',
	timeZone: 'America/Vancouver',
	timeZoneName: 'short',
	locale: 'en-CA'
};

/**
 * Determine if the app is running in development mode. Else, assume running in production.
 * @returns True if the app is running in development mode.
 */
const isInDevelopmentMode = () => {
	return SECRET_ENV_MODE === 'development';
};

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
 * Logs the request event to the console.
 * @param event 
 */
const log = (event: RequestEvent) => {
	// TODO - Start logging to a file.
	const { method, url, headers } = event.request;
	const dateTimeStamp = Intl.DateTimeFormat('en-CA', DATE_TIME_OPTIONS).format(new Date());
	if (isInDevelopmentMode()) {
		const blue = '\x1b[34m';
		const reset = '\x1b[0m';
		const green = '\x1b[32m';
		console.log(`${dateTimeStamp}${green} ${method} ${blue}${url}${reset}`);
	} else {
		console.log(`[${dateTimeStamp}] ${method} ${url} ${headers.get('user-agent')}`);
	}
};

/**
 * Sets the current auth session to locals for use in other hooks.
 * @param event Request event.
 */
const setSessionInLocals = async (event: RequestEvent) => {
	const { session } = await getSupabaseSession(event);
	event.locals.session = session ? session : null;
	return <AuthSession | null>event.locals.session;
};

/**
 * Returns true if the intended path is a public path.
 * @param intendedPath 
 */
const isIntendedPathPublic = (intendedPath: string) => {
	return PUBLIC_PATHS.includes(intendedPath);
};

/**
 * Returns true if the intended path is a universal path.
 * @param intendedPath 
 */
const isIntendedPathUniversal = (intendedPath: string) => {
	return UNIVERSAL_PATHS.includes(intendedPath);
};



/**
 * This main hook is called on every request.
 */
export const handle: Handle = async ({ event, resolve }: RequestResolver) => {
	// EVENT LOGGING
	log(event);
	// EVENT VARIABLES
	const session = await setSessionInLocals(event);
	const intendedPath: string = event.url.pathname;
	const intendedPathIsPublic: boolean = isIntendedPathPublic(intendedPath);
	const intendedPathIsUniversal: boolean = isIntendedPathUniversal(intendedPath);

	// REDIRECTS
	if (session && intendedPath === '/') throw redirect(302, '/dashboard');
	if (!session && intendedPath === '/') throw redirect(302, '/login');
	// TODO -  I might want to make the login/dashboard pages exist at the root route and turn each into components that render dynamically.

	if (!intendedPathIsUniversal && intendedPathIsPublic && session) throw redirect(302, '/dashboard');

	if (!intendedPathIsUniversal && !session && !intendedPathIsPublic) throw redirect(302, '/login');

	return await resolve(event);
};