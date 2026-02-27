'use client';

import Link from 'next/link';
import { useCourses } from '@/hooks/useCourses';
import { useLabs } from '@/hooks/useLabs';

export default function HomePage() {
  const { data: courses } = useCourses();
  const { data: labs } = useLabs();

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 p-8 text-white">
        <h1 className="mb-3 text-4xl font-bold">پلتفرم LabEx اختصاصی شما</h1>
        <p className="mb-6 max-w-2xl text-indigo-100">
          تمام APIهای ارائه شده شما به صورت مهندسی و ماژولار در این فرانت پیاده‌سازی شده‌اند؛
          از Auth تا Course/Lab/Session و پنل مدیریت.
        </p>
        <div className="flex gap-3">
          <Link href="/courses" className="rounded-lg bg-white px-4 py-2 font-semibold text-indigo-700">
            مشاهده دوره‌ها
          </Link>
          <Link href="/labs" className="rounded-lg border border-white/40 px-4 py-2">
            مشاهده آزمایشگاه‌ها
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-white p-5">
          <p className="text-sm text-slate-500">تعداد دوره‌ها</p>
          <p className="text-3xl font-bold">{courses?.length ?? 0}</p>
        </div>
        <div className="rounded-xl border bg-white p-5">
          <p className="text-sm text-slate-500">تعداد لَب‌ها</p>
          <p className="text-3xl font-bold">{labs?.length ?? 0}</p>
        </div>
        <div className="rounded-xl border bg-white p-5">
          <p className="text-sm text-slate-500">API Base URL</p>
          <p className="text-sm font-semibold">{process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:8000/api'}</p>
        </div>
      </section>
    </div>
  );
}
