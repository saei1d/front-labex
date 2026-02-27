import api from './api';

export const sessionService = {
  // دریافت اطلاعات session
  getSession: async (sessionId: string) => {
    const response = await api.get(`/sessions/${sessionId}/`);
    return response.data;
  },

  // توقف session
  stopSession: async (sessionId: string) => {
    const response = await api.post(`/sessions/${sessionId}/stop/`);
    return response.data;
  },

  // اعتبارسنجی یک تسک
  validateTask: async (sessionId: string, taskId: string) => {
    const response = await api.post(`/sessions/${sessionId}/tasks/${taskId}/validate/`);
    return response.data;
  },
};