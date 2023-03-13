import { fail } from "@sveltejs/kit";
import { auth } from "$lib/server/auth";
import type { PageServerLoad, Actions } from "./$types";

let username: string;
let password: string;
let errors: string[] = [];

export const load: PageServerLoad = async ({ locals }) => {
	const { user } = locals.validateUser();
	console.log(user);
	return { username, errors };
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		// reset errors
		errors = [];

		// get form data
		const form = await request.formData();
		username = form.get("username");
		password = form.get("password");

		// validate form data for empty or invalid values
		if (!username) errors.push('Valid email was not provided.');
		if (!password) errors.push('Valid password was not provided.');
		if (errors.length) return fail(400);

		// attempt to sign in
		try {
			const key = await auth.validateKeyPassword("username", username, password);
			const session = await auth.createSession(key.userId);
			locals.setSession(session);
		} catch (e) {
			console.error(e);
			return fail(400);
		}
	}
};