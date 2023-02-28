import '$lib/db'; // Required to initialize the Supabase client server-side.
import { getServerSession } from '@supabase/auth-helpers-sveltekit';
import type { AuthSession, Session } from '@supabase/supabase-js';
import type { Handle, RequestEvent } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import { dev } from '$app/environment';

// CONSTANTS
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
 * Logs the request event to the console.
 * @param event 
 */
const log = (event: RequestEvent) => {
	// TODO - Start logging to a file.
	const { method, url, headers } = event.request;
	const dateTimeStamp = Intl.DateTimeFormat('en-CA', DATE_TIME_OPTIONS).format(new Date());
	if (dev) {
		const blue = '\x1b[34m';
		const reset = '\x1b[0m';
		const green = '\x1b[32m';
		console.log(`${dateTimeStamp}${green} ${method} ${blue}${url}${reset}`);
	} else {
		console.log(`[${dateTimeStamp}] ${method} ${url} ${headers.get('user-agent')}`);
	}
};

/**
 * This main hook is called on every request.
 */
export const handle: Handle = async ({ event, resolve }: RequestResolver) => {
	// EVENT LOGGING
	log(event);

	return await resolve(event);
};