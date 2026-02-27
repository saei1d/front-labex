'use client';

import Link from 'next/link';
import { useLabs } from '@/hooks/useLabs';

export default function LabsPage() {
  const { data: labs, isLoading, error } = useLabs();

  if (isLoading) return <div>در حال بارگذاری...</div>;
  if (error) return <div className="text-red-600">خطا در دریافت اطلاعات لَب‌ها</div>;

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">آزمایشگاه‌ها</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {labs?.map((lab) => (
          <Link key={lab.id} href={`/labs/${lab.id}`} className="rounded-xl border bg-white p-5">
            <h2 className="font-semibold">{lab.title}</h2>
            <p className="mt-2 text-sm text-slate-500">Difficulty: {lab.difficulty}</p>
            <p className="text-sm text-slate-500">Time limit: {lab.time_limit_minutes ?? 0} min</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
