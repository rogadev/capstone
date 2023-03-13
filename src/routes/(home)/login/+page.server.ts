import { fail, redirect } from "@sveltejs/kit";
import { auth } from "$lib/server/auth";
import type { PageServerLoad, Actions } from "./$types";

let username: string;
let password: string;
let errors: string[] = [];

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.validate();
	if (session) throw redirect(302, '/admin');
	return { username, errors };
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		// reset errors
		errors = [];

		// get form data
		const form = Object.fromEntries(await request.formData());
		username = form.username;
		password = form.password;

		// validate form data for empty or invalid values
		if (typeof username !== 'string' || typeof password !== 'string') {
			if (typeof username !== 'string') errors.push('Valid email was not provided.');
			if (typeof password !== 'string') errors.push('Valid password was not provided.');
			return fail(400, { username, errors });
		}

		// attempt to sign in
		try {
			const key = await auth.validateKeyPassword('username', username, password);
			if (key) {
				const { userId } = key;
				const session = await auth.createSession(userId);
				locals.setSession(session);
			}
		} catch (e) {
			return fail(400, { username, errors });
		}
	}
};