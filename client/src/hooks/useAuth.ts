import { useContext } from 'react';
import { AuthContext, AuthContextType, User } from '../context/AuthContext';

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

// Type guard
export const isAuthenticated = (user: User | null): user is User => {
  return user !== null;
};

// Helper functions
export const getStoredToken = (): string | null => {
  return localStorage.getItem('token');
};

export const clearAuthData = (): void => {
  localStorage.removeItem('token');
};

export const hasRole = (user: User | null, role: string): boolean => {
  return user?.role === role;
};