import api from './api';
import { Lab, LabSection, LabTask } from '@/types/api';

export const labService = {
  // دریافت همه لَب‌ها
  getAllLabs: async () => {
    const response = await api.get<Lab[]>('/labs/');
    return response.data;
  },

  // دریافت یک لَب با جزئیات کامل
  getLabById: async (id: number) => {
    const response = await api.get<Lab>(`/labs/${id}/`);
    return response.data;
  },

  // دریافت بخش‌های یک لَب
  getLabSections: async (labId: number) => {
    const response = await api.get<LabSection[]>(`/lab-sections/?lab=${labId}`);
    return response.data;
  },

  // دریافت تسک‌های یک لَب
  getLabTasks: async (labId: number) => {
    const response = await api.get<LabTask[]>(`/lab-tasks/?lab=${labId}`);
    return response.data;
  },

  // شروع یک لَب (ایجاد session)
  startLab: async (labId: number) => {
    const response = await api.post(`/labs/${labId}/start/`);
    return response.data;
  },

  // مدیریت لَب‌ها (برای ادمین)
  createLab: async (labData: Partial<Lab>) => {
    const response = await api.post<Lab>('/admin/labs/', labData);
    return response.data;
  },

  updateLab: async (id: number, labData: Partial<Lab>) => {
    const response = await api.put<Lab>(`/admin/labs/${id}/`, labData);
    return response.data;
  },
};