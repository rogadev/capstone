import { auth } from "$lib/server/auth";
import { sequence } from "@sveltejs/kit/hooks";
import { handleHooks } from "@lucia-auth/sveltekit";
import type { Handle } from "@sveltejs/kit";
import { dev } from "$app/environment"; // TODO Remove for production

export const postAuthHooksHandler: Handle = async ({ resolve, event }) => {
	const session = await event.locals.validate();
	if (dev) {
		if (!session) console.log('Not authenticated.');
		else {
			console.log('Authenticated.');
			console.log('User:', session.user);
		}
	}
	return resolve(event);
};

export const handle: Handle = sequence(handleHooks(auth), postAuthHooksHandler);