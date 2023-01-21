declare namespace App {
	interface Supabase {
		Database: import('./DatabaseDefinitions').Database;
		SchemaName: 'public';
	}
	// interface Locals {}
	interface PageData {
		session: import('@supabase/supabase-js').Session | null;
	}
	// interface Error {}
	// interface Platform {}
}