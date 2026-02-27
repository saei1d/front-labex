'use client';

import { useCourse } from '@/hooks/useCourses';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function CourseDetailPage() {
  const params = useParams<{ id: string }>();
  const { data: course, isLoading, error } = useCourse(params.id);

  if (isLoading) return <div>در حال بارگذاری...</div>;
  if (error || !course) return <div className="text-red-600">دوره یافت نشد.</div>;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-white p-6">
        <h1 className="mb-3 text-3xl font-bold">{course.title}</h1>
        <p className="mb-4 text-slate-700">{course.description}</p>
        <div className="flex gap-2 text-sm">
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-indigo-700">{course.level}</span>
          <span className="rounded-full bg-slate-100 px-3 py-1">{course.status}</span>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6">
        <h2 className="mb-4 text-2xl font-semibold">ماژول‌ها</h2>
        <div className="space-y-3">
          {course.modules?.map((module, idx) => (
            <div key={module.id} className="flex items-center justify-between rounded border p-3">
              <p>
                {idx + 1}. {module.title}
              </p>
              <Link className="text-indigo-600" href={`/modules/${module.id}`}>
                مشاهده لَب‌های ماژول
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
