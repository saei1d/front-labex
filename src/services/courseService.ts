import api from './api';
import { Course, CourseModule } from '@/types/api';

export const courseService = {
  // دریافت همه دوره‌ها
  getAllCourses: async () => {
    const response = await api.get<Course[]>('/courses/');
    return response.data;
  },

  // دریافت یک دوره با جزئیات
  getCourseById: async (id: string) => {
    const response = await api.get<Course>(`/courses/${id}/`);
    return response.data;
  },

  // دریافت ماژول‌های یک دوره
  getCourseModules: async (courseId: string) => {
    const response = await api.get<CourseModule[]>(`/modules/?course=${courseId}`);
    return response.data;
  },

  // مدیریت دوره‌ها (برای ادمین)
  createCourse: async (courseData: Partial<Course>) => {
    const response = await api.post<Course>('/admin/courses/', courseData);
    return response.data;
  },

  updateCourse: async (id: string, courseData: Partial<Course>) => {
    const response = await api.put<Course>(`/admin/courses/${id}/`, courseData);
    return response.data;
  },

  deleteCourse: async (id: string) => {
    await api.delete(`/admin/courses/${id}/`);
  },
};