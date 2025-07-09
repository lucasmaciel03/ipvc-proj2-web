import { BaseApiService, ApiResponse } from './base';
import { User } from '@/hooks/use-auth';
import { API_ENDPOINTS } from '@/constants/app';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * Authentication service following Clean Architecture
 * Implements dependency inversion principle
 */
export class AuthService extends BaseApiService {
  /**
   * Authenticate user with credentials
   */
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return this.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
  }

  /**
   * Logout current user
   */
  async logout(): Promise<ApiResponse<void>> {
    return this.post<void>(API_ENDPOINTS.AUTH.LOGOUT);
  }

  /**
   * Refresh authentication token
   */
  async refreshToken(request: RefreshTokenRequest): Promise<ApiResponse<LoginResponse>> {
    return this.post<LoginResponse>(API_ENDPOINTS.AUTH.REFRESH, request);
  }

  /**
   * Validate current token
   */
  async validateToken(): Promise<ApiResponse<User>> {
    return this.get<User>('/auth/validate');
  }
}

// Singleton instance
export const authService = new AuthService();
