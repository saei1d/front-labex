'use client';

import { useCourse } from '@/hooks/useCourses';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import PageLoader from '@/app/components/PageLoader';

export default function CourseDetailPage() {
  const params = useParams<{ id: string }>();
  const { data: course, isLoading, error } = useCourse(params.id);

  if (isLoading) return <PageLoader />;
  if (error || !course) return <div className="rounded-xl bg-red-50 p-4 text-red-700">دوره یافت نشد.</div>;

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
        <p className="mb-2 text-xs font-semibold text-[var(--primary-dark)]">{course.level}</p>
        <h1 className="mb-2 text-3xl font-black">{course.title}</h1>
        <p className="text-[var(--text-muted)]">{course.description}</p>
      </section>

      <section className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-black">ماژول‌های دوره</h2>
        <div className="space-y-3">
          {course.modules?.map((module, idx) => (
            <div key={module.id} className="flex flex-col justify-between gap-3 rounded-xl border border-[var(--border)] p-4 md:flex-row md:items-center">
              <p className="font-semibold">
                {idx + 1}. {module.title}
              </p>
              <Link href={`/modules/${module.id}`} className="rounded-lg bg-[var(--surface-soft)] px-4 py-2 text-sm font-semibold">
                ورود به ماژول
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
