import { createClient } from '@supabase/supabase-js';

// Configuration Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

// Validation des variables d'environnement
if (!supabaseUrl || supabaseUrl === 'YOUR_SUPABASE_URL') {
  console.error('❌ VITE_SUPABASE_URL manquante ou invalide');
}

if (!supabaseKey || supabaseKey === 'YOUR_SUPABASE_ANON_KEY') {
  console.error('❌ VITE_SUPABASE_ANON_KEY manquante ou invalide');
}

console.log('🔧 Supabase URL:', supabaseUrl);
console.log('🔧 Supabase Key présente:', supabaseKey ? 'Oui' : 'Non');
console.log('🔧 URL length:', supabaseUrl.length);
console.log('🔧 Key length:', supabaseKey.length);
console.log('🔧 URL type:', typeof supabaseUrl);
console.log('🔧 Key type:', typeof supabaseKey);

export const supabase = createClient(supabaseUrl, supabaseKey);

// Configuration des tables
export const TABLES = {
  PROJECTS: 'serre_projects',
  USERS: 'users'
};