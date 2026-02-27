'use client';

import Link from 'next/link';
import { useLabs } from '@/hooks/useLabs';
import PageLoader from '../components/PageLoader';

export default function LabsPage() {
  const { data: labs, isLoading, error } = useLabs();

  if (isLoading) return <PageLoader />;
  if (error) return <div className="rounded-xl bg-red-50 p-4 text-red-700">خطا در دریافت اطلاعات لَب‌ها</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black">آزمایشگاه‌های عملی</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {labs?.map((lab) => (
          <Link key={lab.id} href={`/labs/${lab.id}`} className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <h2 className="font-bold">{lab.title}</h2>
            <p className="mt-2 text-sm text-[var(--text-muted)]">سطح: {lab.difficulty}</p>
            <p className="text-sm text-[var(--text-muted)]">زمان: {lab.time_limit_minutes ?? 0} دقیقه</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
