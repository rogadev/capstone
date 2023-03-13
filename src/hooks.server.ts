import { auth } from "$lib/server/auth";
import { sequence } from "@sveltejs/kit/hooks";
import { handleHooks } from "@lucia-auth/sveltekit";
import type { Handle } from "@sveltejs/kit";
import { dev } from "$app/environment"; // TODO Remove for production
import getRole from "$lib/server/utils/getUserRole";

export const postAuthHooksHandler: Handle = async ({ resolve, event }) => {
	const { locals } = event;
	const { session, user } = await locals.validateUser();
	locals.session = session;
	if (session && user) {
		const role = await getRole(user);
		user.role = role;
	}
	locals.user = user;
	if (dev) {
		console.log("User", user);
		console.log("Session", session);
	}
	return resolve(event);
};

export const handle: Handle = sequence(handleHooks(auth), postAuthHooksHandler);