'use client';

import Link from 'next/link';
import { useCourses } from '@/hooks/useCourses';
import { useLabs } from '@/hooks/useLabs';
import PageLoader from './components/PageLoader';

export default function HomePage() {
  const coursesQuery = useCourses();
  const labsQuery = useLabs();

  if (coursesQuery.isLoading || labsQuery.isLoading) return <PageLoader label="در حال آماده‌سازی داشبورد آموزشی..." />;

  return (
    <div className="space-y-8">
      <section className="glass-card rounded-3xl p-8 shadow-sm">
        <p className="mb-2 text-sm font-semibold text-[var(--primary-dark)]">پلتفرم آموزش حرفه‌ای</p>
        <h1 className="mb-4 text-3xl font-black md:text-5xl">یادگیری مهارتی با لَب‌های واقعی</h1>
        <p className="mb-6 max-w-2xl text-[var(--text-muted)]">
          یک تجربه کامل شبیه LabEx: مسیر دوره، ماژول، اجرای لَب، مدیریت سشن و ارزیابی خودکار تسک‌ها — کاملاً واکنش‌گرا و فارسی.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/courses" className="rounded-xl bg-[var(--primary)] px-5 py-3 font-semibold text-white">
            شروع یادگیری
          </Link>
          <Link href="/labs" className="rounded-xl border border-[var(--border)] bg-white px-5 py-3 font-semibold">
            مشاهده لَب‌ها
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[['دوره‌ها', coursesQuery.data?.length ?? 0], ['آزمایشگاه‌ها', labsQuery.data?.length ?? 0], ['API', 'Online']].map(([t, v]) => (
          <div key={String(t)} className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm">
            <p className="text-sm text-[var(--text-muted)]">{t}</p>
            <p className="mt-2 text-3xl font-black">{v}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
