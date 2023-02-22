declare global {
	/// <reference types="lucia-auth" />
	declare namespace Lucia {
		type Auth = import("$lib/server/lucia").Auth;
		type UserAttributes = import("@prisma/client").User;
	}
	namespace App {
		// interface Error {}
		interface Locals {
			validate: import('@lucia-auth/sveltekit').Validate;
			validateUser: import('@lucia-auth/sveltekit').ValidateUser;
			setSession: import('@lucia-auth/sveltekit').SetSession;
		}
		// interface PageData {}
		// interface Platform {}
	}
	const prisma: import("@prisma/client").PrismaClient;
}

export { };