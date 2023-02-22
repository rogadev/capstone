import { auth } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  // If the user is already logged in, redirect to the dashboard
  const session = await locals.validate();
  if (session) throw redirect(302, "/dashboard");
};

export const actions: Actions = {
  default: async ({ request }) => {
    const { name, username, password } = Object.fromEntries(
      await request.formData(),
    ) as Record<string, string>;

    try {
      await auth.createUser({
        account: {
          providerId: "username",
          providerUserId: username,
          password,
        },
        attributes: {
          name,
          username,
        },
      });
    } catch (err) {
      console.error(err);
      return fail(400, { message: "Could not register user" });
    }
    throw redirect(302, "/login");
  },
};