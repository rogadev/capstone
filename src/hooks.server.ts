// Reference Docs: https://lucia-auth.vercel.app/sveltekit/start-here/getting-started

import { auth } from "$lib/server/auth";
import { sequence } from "@sveltejs/kit/hooks";
import { handleHooks } from "@lucia-auth/sveltekit";
import type { Handle } from "@sveltejs/kit";

export const authHandle: Handle = async ({ resolve, event }) => {
	return resolve(event);
};

export const handle: Handle = sequence(handleHooks(auth), authHandle);