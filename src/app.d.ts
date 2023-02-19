declare namespace App {
	interface Supabase {
		Database: import('./DatabaseDefinitions').Database;
		SchemaName: 'public';
	}
	// interface Locals {}
	interface PageData {
		session: import('@supabase/auth-helpers-sveltekit').SupabaseSession;
	}
	// interface Error {}
	// interface Platform {}
}
