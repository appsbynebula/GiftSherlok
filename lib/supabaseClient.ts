import { createClient } from '@supabase/supabase-js';

// NOTE: These come from your .env file
// Ensure you have VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY defined
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase Environment Variables!");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);