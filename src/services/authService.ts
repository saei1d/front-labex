import api, { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, clearTokens } from './api';
import { LoginRequest, LoginResponse, RegisterRequest, TokenRefreshResponse } from '@/types/api';

export const authService = {
  register: async (data: RegisterRequest) => {
    const response = await api.post('/auth/register/', data);
    return response.data;
  },

  login: async (data: LoginRequest) => {
    const response = await api.post<LoginResponse>('/auth/login/', data);
    if (typeof window !== 'undefined') {
      localStorage.setItem(ACCESS_TOKEN_KEY, response.data.access);
      localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refresh);
    }
    return response.data;
  },

  logout: () => {
    clearTokens();
  },

  refreshToken: async (refreshToken: string) => {
    const response = await api.post<TokenRefreshResponse>('/auth/refresh/', {
      refresh: refreshToken,
    });
    return response.data;
  },

  isAuthenticated: () => {
    if (typeof window === 'undefined') return false;
    return Boolean(localStorage.getItem(ACCESS_TOKEN_KEY));
  },
};
