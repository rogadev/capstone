import { redirect } from "@sveltejs/kit";
import type { Action } from "./$types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	// If the user is already logged in, redirect to the dashboard
	const session = await locals.validate();
	if (session) throw redirect(302, '/dashboard');

};

export const actions: Action = {
	default: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());
		return {
			data: formData,
		};
	},
	with: async ({ request }) => {
		const provider = request.params.provider;
		console.log(provider);
		return {
			data: {
				provider,
			},
		};
	}
};