import { createClient } from '@supabase/supabase-js';

// Ces clés seront à remplacer par vos vraies clés Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Configuration des tables
export const TABLES = {
  PROJECTS: 'projects',
  USERS: 'users'
};