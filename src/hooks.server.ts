import { auth } from "$lib/server/auth";
import { handleHooks } from "@lucia-auth/sveltekit";

export const handle = handleHooks(auth);