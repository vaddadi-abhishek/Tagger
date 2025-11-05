// modules/auth/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { signInWithGoogle, signOut } from "../api/auth.api";
import { supabase } from "../utils/supabaseClient";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for session changes
  useEffect(() => {
    const initAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    initAuth();
    return () => subscription?.subscription.unsubscribe();
  }, []);

  const login = async () => {
    setLoading(true);
    try {
      const session = await signInWithGoogle();
      setUser(session?.user ?? null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
