import { fail, redirect } from "@sveltejs/kit";
import { auth } from "$lib/server/auth";
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	// If the user is already logged in, redirect to the dashboard
	const session = await locals.validate();
	if (session) throw redirect(302, '/dashboard');
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = Object.fromEntries(await request.formData());
		console.log('I should have form data', form);
		const { username, password } = form;
		if (typeof username !== 'string' || typeof password !== 'string') {
			console.log('Failed for some reason because type of username or pw was not a string.');
			return fail(400, 'Invalid form data');
		}
		try {
			console.log('trying...');
			fetch('/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ username, password })
			})
				.then(response => response.json())
				.then(data => {
					console.log('Success:', data);
				})
				.catch((error) => {
					console.error('Error:', error);
				});
			const session = await auth.createSession(username);
			locals.setSession(session);
		} catch {
			return fail(400);
		}
	}
};