'use client';

import { useCourses } from '@/hooks/useCourses';
import Link from 'next/link';
import PageLoader from '../components/PageLoader';

export default function CoursesPage() {
  const { data: courses, isLoading, error } = useCourses();

  if (isLoading) return <div className="text-center">در حال بارگذاری...</div>;
  if (error) return <div className="text-center text-red-600">خطا در دریافت اطلاعات دوره‌ها</div>;

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">دوره‌های آموزشی</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses?.map((course) => (
          <Link href={`/courses/${course.id}`} key={course.id} className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="mb-2 text-xl font-semibold">{course.title}</h2>
            <p className="mb-4 line-clamp-3 text-sm text-slate-600">{course.description}</p>
            <div className="flex items-center justify-between text-sm">
              <span>{course.level}</span>
              <span>{course.modules?.length ?? 0} ماژول</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
