
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from '../../types.ts';
import { supabase } from '../../lib/supabaseClient.ts';
import { Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  logout: () => Promise<void>;
  dbError: string | null; // New state to track db errors
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setLoading(true);
        setDbError(null);
        setSession(session);
        
        if (session?.user) {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          // Handle specific DB setup error if the profiles table doesn't exist
          if (error && error.message.includes('relation "public.profiles" does not exist')) {
            console.error("DATABASE SETUP ERROR: The 'profiles' table is missing.", error);
            setDbError('PROFILES_TABLE_MISSING');
            setUser(null);
            setLoading(false);
            return;
          }

          // If session exists, create a user object. Profile data may be added if available.
          // This ensures the user is considered "logged in" even if profile data is momentarily unavailable after signup.
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            firstName: profile?.first_name || '',
            lastName: profile?.last_name || '',
            phone: profile?.phone || '',
            businessAddress: profile?.business_address || '',
          });

        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
        if (!session) {
            setLoading(false);
        }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };
  
  const value = {
      session,
      user,
      loading,
      logout,
      dbError, // Pass error state
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
