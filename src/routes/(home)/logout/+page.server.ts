import { type Actions, fail, redirect } from "@sveltejs/kit";
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
  // Automatically trigger the logout action and redirect to the home page
  await actions.default({ locals });
  throw redirect(302, "/");
};