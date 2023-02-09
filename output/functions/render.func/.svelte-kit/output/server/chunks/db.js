import { createClient } from "@supabase/auth-helpers-sveltekit";
const PUBLIC_SUPABASE_URL = "https://wxtrgcovvnnbhsqoknle.supabase.co";
const PUBLIC_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4dHJnY292dm5uYmhzcW9rbmxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMyOTkzMzAsImV4cCI6MTk4ODg3NTMzMH0._M3lGSaIaHRhIBjTnfIKq0LKgrjY1zAO4rPpHVdZ4D8";
const supabaseClient = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
export {
  supabaseClient as s
};
