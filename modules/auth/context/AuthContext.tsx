import { clearToken, getToken, storeToken } from "@/utils/storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { loginAPI } from "../api/auth.api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      const token = await getToken();
      if (token) setUser({}); // Fetch profile later
      setLoading(false);
    };
    bootstrap();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await loginAPI(email, password);
      await storeToken(res.token);
      setUser(res.user);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await clearToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
