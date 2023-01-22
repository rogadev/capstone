import { createClient } from '@supabase/auth-helpers-sveltekit';
import { env } from '$env/static/public';

const supabaseClient = createClient(env.PUBLIC_SUPABASE_URL, env.PUBLIC_SUPABASE_ANON_KEY);
export default supabaseClient;