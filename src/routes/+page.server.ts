import supabase from '$lib/db';
import { fail, redirect } from '@sveltejs/kit';
import { AuthApiError } from '@supabase/supabase-js';
import type { Actions } from './$types';
import type { AuthError, Provider } from '@supabase/supabase-js';

export const actions: Actions = {
	default: async (event) => {
		const provider = event.url.searchParams.get('provider') as Provider;
		// No provider means we're using the email/password in the body to log in.
		if (!provider) {
			console.log('No provider. Logging in with email/password.');
			const data = await event.request.formData();
			const email = data.get('email') as string;
			console.log(`Email: ${email}`);
			const password = data.get('password') as string;
			const { error } = (await supabase.auth.signInWithPassword({ email, password })) as AuthError;
			console.log(error);
			// Error short cct.
			if (error) {
				if (error instanceof AuthApiError) {
					console.error(`Error logging in with Supabase. Email: ${email}. Error: ${error.message}`);
					return {
						status: error.status,
						message: error.message
					};
				}
				return fail(400, 'Something went wrong');
			}
			// Otherwise, we've logged in successfully - redirect to dashboard.
			return redirect(303, '/dashboard');
		}
		// If we have a provider, we're using OAuth to log in.
		const {
			data: { url },
			error
		} = await supabase.auth.signInWithOAuth({
			provider,
			options: { redirectTo: `${event.url.origin}/dashboard` }
		});
		if (error) {
			if (error instanceof AuthError) {
				console.error(`Error logging in with Supabase. Error: ${error.message}`);
				return fail(error.status, error.message);
			}
			return fail(400, 'Something went wrong');
		}
		throw redirect(303, url);
	}
};
