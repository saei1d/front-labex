'use client';

import { useEffect, useState } from 'react';
import { Course, CourseModule } from '@/types/api';
import { courseService } from '@/services/courseService';

export const useCourses = () => {
  const [data, setData] = useState<Course[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    courseService
      .getAllCourses()
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, []);

  return { data, isLoading, error };
};

export const useCourse = (id: string) => {
  const [data, setData] = useState<Course>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!id) return;
    courseService
      .getCourseById(id)
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [id]);

  return { data, isLoading, error };
};

export const useModules = () => {
  const [data, setData] = useState<CourseModule[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    courseService
      .getAllModules()
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, []);

  return { data, isLoading, error };
};

export const useModule = (id: number) => {
  const [data, setData] = useState<CourseModule>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!id) return;
    courseService
      .getModuleById(id)
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [id]);

  return { data, isLoading, error };
};
