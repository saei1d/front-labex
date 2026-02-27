
'use client';

import { useCourses } from '@/hooks/useCourses';
import Link from 'next/link';

export default function CoursesPage() {
  const { data: courses, isLoading, error } = useCourses();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-8">
        خطا در دریافت اطلاعات
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <h1 className="text-3xl font-bold mb-8 text-center">دوره‌های آموزشی</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses?.map((course) => (
          <Link href={`/courses/${course.id}`} key={course.id}>
            <div className="border rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 cursor-pointer bg-white">
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
              
              <div className="flex items-center justify-between">
                <span className={`
                  px-3 py-1 rounded-full text-sm
                  ${course.level === 'beginner' ? 'bg-green-100 text-green-700' : ''}
                  ${course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-700' : ''}
                  ${course.level === 'advanced' ? 'bg-red-100 text-red-700' : ''}
                `}>
                  {course.level === 'beginner' && 'مبتدی'}
                  {course.level === 'intermediate' && 'متوسط'}
                  {course.level === 'advanced' && 'پیشرفته'}
                </span>
                
                <span className="text-sm text-gray-500">
                  {course.modules?.length || 0} ماژول
                </span>
              </div>
              
              <div className="mt-4 text-sm text-gray-400">
                {new Date(course.created_at).toLocaleDateString('fa-IR')}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}