import type { Action } from "./$types";

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());
		return {
			data: formData,
		};
	}
};