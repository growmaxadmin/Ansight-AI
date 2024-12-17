import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: localStorage,
    storageKey: 'supabase.auth.token',
  }
});

export async function initSupabase() {
  try {
    const { error } = await supabase.auth.initialize();
    if (error) {
      console.error('Supabase initialization error:', error);
      throw error;
    }
  } catch (error) {
    console.error('Failed to initialize Supabase:', error);
    throw error;
  }
}