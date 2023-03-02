// Reference Docs: https://lucia-auth.vercel.app/sveltekit/start-here/getting-started

import { auth } from "$lib/server/auth";
import { sequence } from "@sveltejs/kit/hooks";
import { handleHooks } from "@lucia-auth/sveltekit";
import type { Handle } from "@sveltejs/kit";

export const authHandle: Handle = async ({ resolve, event }) => {
	// console log if there is a logged in user with the current session
	if (auth.user) {
		console.log("User is logged in: ", auth.user);
	} else {
		console.log("No user is logged in.");
	}
	return resolve(event);
};

export const handle: Handle = sequence(handleHooks(auth), authHandle);