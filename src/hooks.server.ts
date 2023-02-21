import { auth } from "$lib/server/auth";
import { handleHooks } from "@lucia-auth/sveltekit";

const authHandle = async (request) => {
	// TODO: handle auth
};

export const handle = sequence(handleHooks(auth), authHandle);