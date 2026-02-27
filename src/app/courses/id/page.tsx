'use client';

import { useCourse } from '@/hooks/useCourses';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.id as string;
  
  const { data: course, isLoading, error } = useCourse(courseId);

  if (isLoading) return <div>در حال بارگذاری...</div>;
  if (error) return <div>خطا در دریافت اطلاعات</div>;
  if (!course) return <div>دوره یافت نشد</div>;

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
        
        <div className="flex gap-4 mb-6">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            سطح: {course.level === 'beginner' ? 'مبتدی' : course.level === 'intermediate' ? 'متوسط' : 'پیشرفته'}
          </span>
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
            وضعیت: {course.status === 'published' ? 'منتشر شده' : 'پیش‌نویس'}
          </span>
        </div>
        
        <p className="text-gray-700 text-lg mb-8">{course.description}</p>
        
        <h2 className="text-2xl font-semibold mb-4">ماژول‌های دوره</h2>
        
        <div className="space-y-4">
          {course.modules?.map((module, index) => (
            <div key={module.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-medium">
                  {index + 1}. {module.title}
                </h3>
                <Link 
                  href={`/modules/${module.id}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  مشاهده لَب‌ها
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}