import {
  AdminCreateLab,
  AdminCreateLabSection,
  AdminCreateLabTask,
  AdminCreateValidationRule,
  Lab,
  LabSection,
  LabStartResponse,
  LabTask,
  TaskValidationRule,
} from '@/types/api';
import api from './api';

export const labService = {
  getAllLabs: async () => (await api.get<Lab[]>('/labs/')).data,
  getLabById: async (id: number) => (await api.get<Lab>(`/labs/${id}/`)).data,
  getAllLabSections: async () => (await api.get<LabSection[]>('/lab-sections/')).data,
  getLabSectionById: async (id: number) => (await api.get<LabSection>(`/lab-sections/${id}/`)).data,
  getAllLabTasks: async () => (await api.get<LabTask[]>('/lab-tasks/')).data,
  getLabTaskById: async (id: number) => (await api.get<LabTask>(`/lab-tasks/${id}/`)).data,
  startLab: async (labId: number) => (await api.post<LabStartResponse>(`/labs/${labId}/start/`)).data,

  adminListLabs: async () => (await api.get<Lab[]>('/admin/labs/')).data,
  adminCreateLab: async (payload: AdminCreateLab) => (await api.post<Lab>('/admin/labs/', payload)).data,
  adminUpdateLab: async (id: number, payload: Partial<AdminCreateLab>) => (await api.put<Lab>(`/admin/labs/${id}/`, payload)).data,
  adminPatchLab: async (id: number, payload: Partial<AdminCreateLab>) => (await api.patch<Lab>(`/admin/labs/${id}/`, payload)).data,
  adminDeleteLab: async (id: number) => api.delete(`/admin/labs/${id}/`),

  adminListLabSections: async () => (await api.get<LabSection[]>('/admin/lab-sections/')).data,
  adminCreateLabSection: async (payload: AdminCreateLabSection) => (await api.post<LabSection>('/admin/lab-sections/', payload)).data,
  adminUpdateLabSection: async (id: number, payload: Partial<AdminCreateLabSection>) => (await api.put<LabSection>(`/admin/lab-sections/${id}/`, payload)).data,
  adminPatchLabSection: async (id: number, payload: Partial<AdminCreateLabSection>) => (await api.patch<LabSection>(`/admin/lab-sections/${id}/`, payload)).data,
  adminDeleteLabSection: async (id: number) => api.delete(`/admin/lab-sections/${id}/`),

  adminListLabTasks: async () => (await api.get<LabTask[]>('/admin/lab-tasks/')).data,
  adminCreateLabTask: async (payload: AdminCreateLabTask) => (await api.post<LabTask>('/admin/lab-tasks/', payload)).data,
  adminUpdateLabTask: async (id: number, payload: Partial<AdminCreateLabTask>) => (await api.put<LabTask>(`/admin/lab-tasks/${id}/`, payload)).data,
  adminPatchLabTask: async (id: number, payload: Partial<AdminCreateLabTask>) => (await api.patch<LabTask>(`/admin/lab-tasks/${id}/`, payload)).data,
  adminDeleteLabTask: async (id: number) => api.delete(`/admin/lab-tasks/${id}/`),

  adminListValidationRules: async () => (await api.get<TaskValidationRule[]>('/admin/validation-rules/')).data,
  adminCreateValidationRule: async (payload: AdminCreateValidationRule) =>
    (await api.post<TaskValidationRule>('/admin/validation-rules/', payload)).data,
  adminUpdateValidationRule: async (id: number, payload: Partial<AdminCreateValidationRule>) =>
    (await api.put<TaskValidationRule>(`/admin/validation-rules/${id}/`, payload)).data,
  adminPatchValidationRule: async (id: number, payload: Partial<AdminCreateValidationRule>) =>
    (await api.patch<TaskValidationRule>(`/admin/validation-rules/${id}/`, payload)).data,
  adminDeleteValidationRule: async (id: number) => api.delete(`/admin/validation-rules/${id}/`),
};
