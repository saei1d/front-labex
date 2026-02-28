'use client';

import { useCourse } from '@/hooks/useCourses';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CourseDetailPage() {
  const params = useParams<{ id: string }>();
  const { data: course, isLoading, error } = useCourse(params.id);

  if (isLoading) return <p className="py-20 text-center text-[#6b7280]">در حال بارگذاری دوره...</p>;
  if (error || !course) return <p className="py-20 text-center text-red-600">دوره پیدا نشد.</p>;

  return (
    <div className="container mx-auto space-y-8 px-6 py-16 lg:px-8">
      <section className="rounded-3xl border bg-gradient-to-br from-indigo-50 via-purple-50 to-amber-50 p-8 md:p-12">
        <h1 className="mb-4 text-4xl font-bold">{course.title}</h1>
        <p className="mb-6 max-w-3xl text-lg text-[#6b7280]">{course.description}</p>
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="rounded-full bg-[#6366f1]/10 px-4 py-2 text-[#6366f1]">{course.level}</span>
          <span className="rounded-full bg-[#f3f4f6] px-4 py-2 text-[#6b7280]">{course.status}</span>
        </div>
      </section>

      <section className="rounded-3xl border bg-white p-8">
        <h2 className="mb-6 text-2xl font-semibold">ماژول‌ها</h2>
        <div className="space-y-3">
          {course.modules?.map((module, index) => (
            <div key={module.id} className="flex flex-col items-start justify-between gap-3 rounded-2xl border p-4 sm:flex-row sm:items-center">
              <p className="font-medium">{index + 1}. {module.title}</p>
              <Link href={`/modules/${module.id}`} className="inline-flex items-center gap-2 text-sm font-medium text-[#6366f1] hover:underline">
                مشاهده ماژول
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
          {!course.modules?.length && <p className="text-sm text-[#6b7280]">هنوز ماژولی ثبت نشده است.</p>}
        </div>
      </section>
    </div>
  );
}
