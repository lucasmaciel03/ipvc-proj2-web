"use client";

import { User } from "@/mocks/auth";
import { useEffect, useState } from "react";

// Função para persistir o usuário no localStorage
const saveUserToStorage = (user: User | null) => {
  if (typeof window !== 'undefined') {
    if (user) {
      localStorage.setItem('auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('auth_user');
    }
  }
};

// Função para recuperar o usuário do localStorage
const getUserFromStorage = (): User | null => {
  if (typeof window !== 'undefined') {
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (e) {
        console.error('Erro ao carregar usuário do localStorage:', e);
      }
    }
  }
  return null;
};

// Variável global para manter a consistência entre componentes
let globalUser: User | null = null;

export function useAuth() {
  // Always initialize with null for server-side to ensure consistency
  const [user, setUser] = useState<User | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  // Load user data on client-side only
  useEffect(() => {
    // Check global variable first to maintain state between components
    if (globalUser) {
      setUser(globalUser);
    } else {
      // Try to load from localStorage
      const storedUser = getUserFromStorage();
      if (storedUser) {
        globalUser = storedUser;
        setUser(storedUser);
      }
    }
    
    setHasMounted(true);
  }, []);

  const login = (userData: User) => {
    globalUser = userData;
    setUser(userData);
    saveUserToStorage(userData);
  };

  const logout = () => {
    globalUser = null;
    setUser(null);
    saveUserToStorage(null);
  };

  return {
    user,
    isAuthenticated: !!user,
    isInitialized: hasMounted,
    login,
    logout,
  };
}