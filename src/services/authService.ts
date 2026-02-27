import api from './api';
import { LoginRequest, LoginResponse, RegisterRequest, TokenRefreshResponse } from '@/types/api';

export const authService = {
  // ثبت‌نام
  register: async (data: RegisterRequest) => {
    const response = await api.post('/auth/register/', data);
    return response.data;
  },

  // ورود
  login: async (data: LoginRequest) => {
    const response = await api.post<LoginResponse>('/auth/login/', data);
    
    // ذخیره توکن‌ها
    if (response.data.access) {
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
    }
    
    return response.data;
  },

  // خروج
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },

  // رفرش توکن
  refreshToken: async (refreshToken: string) => {
    const response = await api.post<TokenRefreshResponse>('/auth/refresh/', {
      refresh: refreshToken
    });
    return response.data;
  },

  // بررسی وضعیت احراز هویت
  isAuthenticated: () => {
    return !!localStorage.getItem('access_token');
  },
};