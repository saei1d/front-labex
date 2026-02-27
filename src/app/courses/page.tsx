'use client';

import { useCourses } from '@/hooks/useCourses';
import Link from 'next/link';
import PageLoader from '../components/PageLoader';

export default function CoursesPage() {
  const { data: courses, isLoading, error } = useCourses();

  if (isLoading) return <PageLoader />;
  if (error) return <div className="rounded-xl bg-red-50 p-4 text-red-700">خطا در دریافت اطلاعات دوره‌ها</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black">کاتالوگ دوره‌های آموزشی</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses?.map((course) => (
          <Link href={`/courses/${course.id}`} key={course.id} className="group rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <p className="mb-2 text-xs font-semibold text-[var(--primary-dark)]">{course.level}</p>
            <h2 className="mb-2 text-xl font-bold">{course.title}</h2>
            <p className="line-clamp-3 text-sm text-[var(--text-muted)]">{course.description}</p>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span>{course.modules?.length ?? 0} ماژول</span>
              <span className="font-semibold group-hover:text-[var(--primary-dark)]">مشاهده ←</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
