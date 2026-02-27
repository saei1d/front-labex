'use client';

import React, { createContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { authService } from '@/services/authService';
import { ACCESS_TOKEN_KEY } from '@/services/api';

interface User {
  id?: string;
  email?: string;
}

interface JwtPayload {
  user_id?: string;
  email?: string;
  sub?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const decodeUser = (token: string): User => {
  const payload = jwtDecode<JwtPayload>(token);
  return {
    id: payload.user_id ?? payload.sub,
    email: payload.email,
  };
};

const getInitialUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (!token) return null;
  try {
    return decodeUser(token);
  } catch {
    authService.logout();
    return null;
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(getInitialUser);

  const login = async (email: string, password: string) => {
    const res = await authService.login({ email, password });
    setUser(decodeUser(res.access));
  };

  const register = async (email: string, password: string) => {
    await authService.register({ email, password, password2: password });
    await login(email, password);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading: false, isAuthenticated: Boolean(user) }}>
      {children}
    </AuthContext.Provider>
  );
}
