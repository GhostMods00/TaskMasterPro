export interface User {
    id: number;
    email: string;
    username: string;
    firstName?: string;
    lastName?: string;
    role: 'admin' | 'user' | 'manager';
    avatar?: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterData extends Omit<LoginCredentials, 'role'> {
    username: string;
    firstName?: string;
    lastName?: string;
  }
  
  export interface AuthResponse {
    user: User;
    token: string;
  }
  
  export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
  }
  
  export interface PasswordResetRequest {
    email: string;
  }
  
  export interface PasswordResetConfirm {
    token: string;
    newPassword: string;
    confirmPassword: string;
  }