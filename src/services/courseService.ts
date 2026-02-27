import {
  AdminCreateCourse,
  AdminCreateModule,
  Course,
  CourseModule,
} from '@/types/api';
import api from './api';

export const courseService = {
  getAllCourses: async () => (await api.get<Course[]>('/courses/')).data,
  getCourseById: async (id: string) => (await api.get<Course>(`/courses/${id}/`)).data,
  getAllModules: async () => (await api.get<CourseModule[]>('/modules/')).data,
  getModuleById: async (id: number) => (await api.get<CourseModule>(`/modules/${id}/`)).data,

  adminListCourses: async () => (await api.get<Course[]>('/admin/courses/')).data,
  adminCreateCourse: async (payload: AdminCreateCourse) => (await api.post<Course>('/admin/courses/', payload)).data,
  adminUpdateCourse: async (id: string, payload: Partial<AdminCreateCourse>) => (await api.put<Course>(`/admin/courses/${id}/`, payload)).data,
  adminPatchCourse: async (id: string, payload: Partial<AdminCreateCourse>) => (await api.patch<Course>(`/admin/courses/${id}/`, payload)).data,
  adminDeleteCourse: async (id: string) => api.delete(`/admin/courses/${id}/`),

  adminListModules: async () => (await api.get<CourseModule[]>('/admin/modules/')).data,
  adminCreateModule: async (payload: AdminCreateModule) => (await api.post<CourseModule>('/admin/modules/', payload)).data,
  adminUpdateModule: async (id: number, payload: Partial<AdminCreateModule>) => (await api.put<CourseModule>(`/admin/modules/${id}/`, payload)).data,
  adminPatchModule: async (id: number, payload: Partial<AdminCreateModule>) => (await api.patch<CourseModule>(`/admin/modules/${id}/`, payload)).data,
  adminDeleteModule: async (id: number) => api.delete(`/admin/modules/${id}/`),
};
