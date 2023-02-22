import { auth } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { dev } from "$app/environment";

export const load: PageServerLoad = async ({ locals }) => {
  // If we're in production, redirect to login
  if (!dev) throw redirect(302, "/login");

  // If the user is already logged in, redirect to the dashboard
  const session = await locals.validate();
  if (session) throw redirect(302, "/dashboard");
};

export const actions: Actions = {
  default: async ({ request }) => {
    const { email, password } = Object.fromEntries(
      await request.formData(),
    ) as Record<string, string>;

    try {
      await auth.createUser({
        key: {
          providerId: "email",
          providerUserId: email,
          password: password,
        },
        attributes: {
          email
        },
      });
    } catch (err) {
      console.error(err);
      return fail(400, { message: "Could not register user" });
    }
    throw redirect(302, "/login");
  },
};