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
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // No primeiro carregamento, tenta obter o usuário do localStorage
    if (!isInitialized) {
      const storedUser = getUserFromStorage();
      if (storedUser) {
        globalUser = storedUser;
        setUser(storedUser);
      }
      setIsInitialized(true);
    }
  }, [isInitialized]);

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
    isInitialized,
    login,
    logout,
  };
}