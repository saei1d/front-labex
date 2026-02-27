import { SessionData } from '@/types/api';
import api from './api';

export const sessionService = {
  getSession: async (sessionId: string) => (await api.get<SessionData>(`/sessions/${sessionId}/`)).data,
  stopSession: async (sessionId: string) => (await api.post(`/sessions/${sessionId}/stop/`)).data,
  validateTask: async (sessionId: string, taskId: string | number) =>
    (await api.post(`/sessions/${sessionId}/tasks/${taskId}/validate/`)).data,
};
