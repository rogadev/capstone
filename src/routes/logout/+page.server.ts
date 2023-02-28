import { type Actions, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { auth } from "$lib/server/auth";

export const actions: Actions = {
  default: async ({ locals }) => {
    const session = await locals.validate();
    if (!session) return fail(401);
    await auth.invalidateSession(session.sessionId); // invalidate session
    locals.setSession(null); // remove cookie
  }
};

export const load: PageServerLoad = async ({ locals }) => {
  await locals.actions.default();
  return {
    status: 302,
    redirect: "/"
  };
};