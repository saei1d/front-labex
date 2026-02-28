'use client';

import Link from 'next/link';
import { useLabs } from '@/hooks/useLabs';
import { ArrowRight, Clock, Shield } from 'lucide-react';

export default function LabsPage() {
  const { data: labs, isLoading, error } = useLabs();

  if (isLoading) return <p className="py-20 text-center text-[#6b7280]">در حال بارگذاری آزمایشگاه‌ها...</p>;
  if (error) return <p className="py-20 text-center text-red-600">بارگذاری آزمایشگاه‌ها ناموفق بود.</p>;

  return (
    <div className="container mx-auto px-6 py-16 lg:px-8">
      <div className="mb-12 max-w-3xl space-y-4">
        <h1 className="text-5xl font-bold">آزمایشگاه‌های تعاملی</h1>
        <p className="text-lg text-[#6b7280]">در محیط‌های واقعی و ایمن تمرین کنید و مهارت عملی بسازید.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {labs?.map((lab) => (
          <Link key={lab.id} href={`/labs/${lab.id}`} className="group rounded-3xl border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#6366f1]/10">
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full bg-[#6366f1]/10 px-3 py-1 text-xs font-medium text-[#6366f1]">{lab.difficulty}</span>
              <span className="inline-flex items-center gap-1 text-xs text-[#6b7280]"><Clock className="h-3.5 w-3.5" />{lab.time_limit_minutes ?? 0} دقیقه</span>
            </div>
            <h2 className="mb-3 text-xl font-semibold">{lab.title}</h2>
            <p className="mb-5 line-clamp-2 text-sm text-[#6b7280]">ایمیج داکر: {lab.docker_image}</p>
            <div className="inline-flex items-center gap-2 text-sm font-medium text-[#6366f1]">
              مشاهده آزمایشگاه
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>

      {!labs?.length && (
        <div className="mt-10 rounded-2xl border border-dashed p-10 text-center text-[#6b7280]">
          <Shield className="mx-auto mb-4 h-8 w-8 text-[#6366f1]" />
          هنوز آزمایشگاهی ثبت نشده است.
        </div>
      )}
    </div>
  );
}
