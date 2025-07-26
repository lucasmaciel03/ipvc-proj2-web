"use client";

import { useCallback, useEffect, useState } from "react";
import { APP_CONFIG } from '@/constants/app';

/**
 * Enhanced User interface with comprehensive typing
 * Follows Clean Code principle: Strong typing
 */
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'patient' | 'doctor' | 'admin';
  avatar?: string;
  address?: string;
  birthDate?: string;
  emergencyContact?: string;
  bloodType?: string;
  allergies?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Authentication state interface
 */
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
}

/**
 * Authentication errors enum for better error handling
 */
export enum AuthError {
  INVALID_CREDENTIALS = 'invalid_credentials',
  NETWORK_ERROR = 'network_error',
  TOKEN_EXPIRED = 'token_expired',
  UNAUTHORIZED = 'unauthorized',
  STORAGE_ERROR = 'storage_error',
}

// Global state for maintaining auth between components
let globalAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
  error: null,
};

/**
 * Secure storage utilities with error handling and cookie support
 * Follows Single Responsibility Principle
 */
class AuthStorage {
  private static getStorageKey(key: keyof typeof APP_CONFIG.STORAGE_KEYS): string {
    return APP_CONFIG.STORAGE_KEYS[key];
  }

  static getUserFromStorage(): User | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const storedUser = localStorage.getItem(this.getStorageKey('USER_DATA'));
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error('Failed to retrieve user from storage:', error);
      return null;
    }
  }

  static saveUserToStorage(user: User | null): void {
    if (typeof window === 'undefined') return;
    
    try {
      if (user) {
        localStorage.setItem(this.getStorageKey('USER_DATA'), JSON.stringify(user));
      } else {
        localStorage.removeItem(this.getStorageKey('USER_DATA'));
      }
    } catch (error) {
      console.error('Failed to save user to storage:', error);
      throw new Error(AuthError.STORAGE_ERROR);
    }
  }

  static getTokenFromStorage(): string | null {
    if (typeof window === 'undefined') return null;
    
    try {
      return localStorage.getItem(this.getStorageKey('AUTH_TOKEN'));
    } catch (error) {
      console.error('Failed to retrieve token from storage:', error);
      return null;
    }
  }

  static saveTokenToStorage(token: string | null): void {
    if (typeof window === 'undefined') return;
    
    try {
      if (token) {
        localStorage.setItem(this.getStorageKey('AUTH_TOKEN'), token);
        // Also save to cookie for middleware
        this.setCookie('auth-token', token, 7); // 7 days
      } else {
        localStorage.removeItem(this.getStorageKey('AUTH_TOKEN'));
        this.deleteCookie('auth-token');
      }
    } catch (error) {
      console.error('Failed to save token to storage:', error);
      throw new Error(AuthError.STORAGE_ERROR);
    }
  }

  static setCookie(name: string, value: string, days: number): void {
    if (typeof window === 'undefined') return;
    
    try {
      const expires = new Date();
      expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
      document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
    } catch (error) {
      console.error('Failed to set cookie:', error);
    }
  }

  static deleteCookie(name: string): void {
    if (typeof window === 'undefined') return;
    
    try {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    } catch (error) {
      console.error('Failed to delete cookie:', error);
    }
  }

  static clearStorage(): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem(this.getStorageKey('USER_DATA'));
      localStorage.removeItem(this.getStorageKey('AUTH_TOKEN'));
      this.deleteCookie('auth-token');
    } catch (error) {
      console.error('Failed to clear storage:', error);
    }
  }
}

/**
 * Enhanced authentication hook with improved error handling and type safety
 * Implements Clean Code principles and proper error boundaries
 */
export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>(globalAuthState);

  // Initialize authentication state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

        // Check if user exists in global state first
        if (globalAuthState.user) {
          const newState = { ...globalAuthState, isInitialized: true, isLoading: false };
          setAuthState(newState);
          globalAuthState = newState;
          return;
        }

        // Try to load from localStorage
        const storedUser = AuthStorage.getUserFromStorage();
        const storedToken = AuthStorage.getTokenFromStorage();

        if (storedUser && storedToken) {
          const newState: AuthState = {
            user: storedUser,
            isAuthenticated: true,
            isLoading: false,
            isInitialized: true,
            error: null,
          };
          
          setAuthState(newState);
          globalAuthState = newState;
        } else {
          const newState: AuthState = {
            user: null,
            isAuthenticated: false,
            isLoading: false,
            isInitialized: true,
            error: null,
          };
          
          setAuthState(newState);
          globalAuthState = newState;
        }
      } catch (error) {
        const errorState: AuthState = {
          user: null,
          isAuthenticated: false,
          isLoading: false,
          isInitialized: true,
          error: error instanceof Error ? error.message : AuthError.STORAGE_ERROR,
        };
        
        setAuthState(errorState);
        globalAuthState = errorState;
      }
    };

    initializeAuth();
  }, []);

  // Login function with proper error handling
  const login = useCallback(async (userData: User, token?: string): Promise<void> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

      // Save to storage
      AuthStorage.saveUserToStorage(userData);
      if (token) {
        AuthStorage.saveTokenToStorage(token);
      }

      const newState: AuthState = {
        user: userData,
        isAuthenticated: true,
        isLoading: false,
        isInitialized: true,
        error: null,
      };

      setAuthState(newState);
      globalAuthState = newState;
    } catch (error) {
      const errorState: AuthState = {
        ...authState,
        isLoading: false,
        error: error instanceof Error ? error.message : AuthError.STORAGE_ERROR,
      };
      
      setAuthState(errorState);
      globalAuthState = errorState;
      throw error;
    }
  }, [authState]);

  // Logout function with cleanup
  const logout = useCallback(async (): Promise<void> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

      // Clear storage
      AuthStorage.clearStorage();

      const newState: AuthState = {
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isInitialized: true,
        error: null,
      };

      setAuthState(newState);
      globalAuthState = newState;

      // Redirect to login page
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
    } catch (error) {
      const errorState: AuthState = {
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isInitialized: true,
        error: error instanceof Error ? error.message : AuthError.STORAGE_ERROR,
      };
      
      setAuthState(errorState);
      globalAuthState = errorState;
    }
  }, []);

  // Update user function
  const updateUser = useCallback(async (updates: Partial<User>): Promise<void> => {
    if (!authState.user) return;

    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

      const updatedUser: User = {
        ...authState.user,
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      AuthStorage.saveUserToStorage(updatedUser);

      const newState: AuthState = {
        ...authState,
        user: updatedUser,
        isLoading: false,
        error: null,
      };

      setAuthState(newState);
      globalAuthState = newState;
    } catch (error) {
      const errorState: AuthState = {
        ...authState,
        isLoading: false,
        error: error instanceof Error ? error.message : AuthError.STORAGE_ERROR,
      };
      
      setAuthState(errorState);
      globalAuthState = errorState;
      throw error;
    }
  }, [authState]);

  // Clear error function
  const clearError = useCallback((): void => {
    setAuthState(prev => ({ ...prev, error: null }));
    globalAuthState = { ...globalAuthState, error: null };
  }, []);

  return {
    // State
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    isInitialized: authState.isInitialized,
    error: authState.error,
    
    // Actions
    login,
    logout,
    updateUser,
    clearError,
  };
}