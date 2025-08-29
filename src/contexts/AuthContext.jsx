import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier la session existante
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('Erreur session:', error);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email, password, userData = {}) => {
    try {
      console.log('🚀 Tentative inscription simple:', { email });
      console.log('🔧 Supabase instance:', supabase);
      
      // Test d'inscription basique sans metadata
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });
      
      console.log('📧 Résultat inscription:', { data, error });
      console.log('📧 User created:', data?.user?.id);
      console.log('📧 Session:', data?.session);
      
      if (error) {
        console.error('❌ Erreur Supabase:', error);
        console.error('❌ Error code:', error.status);
        console.error('❌ Error message:', error.message);
        throw error;
      }
      return { data, error: null };
    } catch (error) {
      console.error('❌ Erreur complète:', error);
      return { data: null, error };
    }
  };

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};