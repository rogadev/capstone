import { createClient } from '@supabase/supabase-js';
const { SUPABASE_URL, SUPABASE_KEY } = useRuntimeConfig();
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
export default supabase;