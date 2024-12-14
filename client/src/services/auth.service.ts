import api, { handleApiError } from './api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    username: string;
    role: string;
    firstName?: string;
    lastName?: string;
  };
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
}

class AuthService {
  private readonly AUTH_ENDPOINT = '/auth';

  /**
   * Authenticate user and get token
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>(
        `${this.AUTH_ENDPOINT}/login`,
        credentials
      );
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  /**
   * Register a new user
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>(
        `${this.AUTH_ENDPOINT}/register`,
        data
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  /**
   * Logout user and remove token
   */
  logout(): void {
    localStorage.removeItem('token');
  }

  /**
   * Get current authenticated user
   */
  async getCurrentUser() {
    try {
      const response = await api.get(`${this.AUTH_ENDPOINT}/me`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  /**
   * Request password reset
   */
  async requestPasswordReset(data: PasswordResetRequest): Promise<void> {
    try {
      await api.post(`${this.AUTH_ENDPOINT}/forgot-password`, data);
    } catch (error) {
      throw handleApiError(error);
    }
  }

  /**
   * Confirm password reset
   */
  async confirmPasswordReset(data: PasswordResetConfirm): Promise<void> {
    try {
      await api.post(`${this.AUTH_ENDPOINT}/reset-password`, data);
    } catch (error) {
      throw handleApiError(error);
    }
  }

  /**
   * Verify email address
   */
  async verifyEmail(token: string): Promise<void> {
    try {
      await api.post(`${this.AUTH_ENDPOINT}/verify-email`, { token });
    } catch (error) {
      throw handleApiError(error);
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  /**
   * Get authentication token
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Refresh authentication token
   */
  async refreshToken(): Promise<string> {
    try {
      const response = await api.post(`${this.AUTH_ENDPOINT}/refresh-token`);
      const { token } = response.data;
      localStorage.setItem('token', token);
      return token;
    } catch (error) {
      throw handleApiError(error);
    }
  }
}

export default new AuthService();