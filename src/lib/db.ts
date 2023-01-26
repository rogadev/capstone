import { createClient } from '@supabase/auth-helpers-sveltekit';
// import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import * as env from 'dotenv';
env.config();
const supabaseClient = createClient(process.env.PUBLIC_SUPABASE_URL, process.env.PUBLIC_SUPABASE_ANON_KEY);
export default supabaseClient;