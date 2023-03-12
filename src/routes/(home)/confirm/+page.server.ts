import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const email = url.searchParams.get('email');
	if (!email || typeof email !== 'string')
		return fail(400, 'Page requires an email address as a query parameter.');
	return {
		email
	};
};
