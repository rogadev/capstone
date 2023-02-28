import { redirect } from "@sveltejs/kit";
import type { Action } from "./$types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	// If the user is already logged in, redirect to the dashboard
	const session = await locals.validate();
	if (session) throw redirect(302, '/dashboard');

};

const handleEmailLogin = async (data) => {
	console.log('Email login', data);

	return {
		data,
	};
};

const handleProviderLogin = async (data) => {
	console.log('Provider login', data);
};

export const actions: Action = {
	default: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());
		const { provider } = formData;
		if (provider) handleProviderLogin(formData);
		else handleEmailLogin(formData);
	}
};