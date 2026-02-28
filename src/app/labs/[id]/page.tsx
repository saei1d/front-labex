'use client';

import { useLab, useStartLab } from '@/hooks/useLabs';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

export default function LabDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const labId = Number(params.id);
  const { data: lab, isLoading, error } = useLab(labId);
  const { mutateAsync: startLab, isPending } = useStartLab();

  const handleStart = async () => {
    const response = await startLab(labId);
    const sessionId = String(response.session_id ?? response.id ?? '');
    if (sessionId) {
      router.push(`/sessions/${sessionId}`);
    }
  };

  if (isLoading) return <p className="py-20 text-center text-[#6b7280]">در حال بارگذاری آزمایشگاه...</p>;
  if (error || !lab) return <p className="py-20 text-center text-red-600">آزمایشگاه پیدا نشد.</p>;

  return (
    <div className="container mx-auto space-y-8 px-6 py-16 lg:px-8">
      <section className="rounded-3xl border bg-gradient-to-br from-indigo-50 via-purple-50 to-amber-50 p-8 md:p-12">
        <h1 className="text-4xl font-bold">{lab.title}</h1>
        <p className="mt-3 text-sm text-[#6b7280]">داکر: {lab.docker_image}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={handleStart}
            disabled={isPending}
            className="rounded-xl bg-gradient-to-r from-[#6366f1] to-purple-600 px-5 py-3 text-white transition-all hover:shadow-lg hover:shadow-[#6366f1]/30 disabled:opacity-50"
            type="button"
          >
            {isPending ? 'در حال شروع...' : 'شروع جلسه آزمایشگاه'}
          </button>
          <Link href="/labs" className="rounded-xl border px-5 py-3 transition-colors hover:bg-white/70">
            بازگشت به آزمایشگاه‌ها
          </Link>
        </div>
      </section>

      <section className="rounded-3xl border bg-white p-8">
        <h2 className="mb-4 text-2xl font-semibold">بخش‌ها</h2>
        <div className="space-y-3">
          {lab.sections?.map((section) => (
            <div key={section.id} className="rounded-2xl border p-4">
              <p className="font-medium">{section.title}</p>
              <p className="text-sm text-[#6b7280]">{section.type}</p>
            </div>
          ))}
          {!lab.sections?.length && <p className="text-sm text-[#6b7280]">بخشی ثبت نشده است.</p>}
        </div>
      </section>

      <section className="rounded-3xl border bg-white p-8">
        <h2 className="mb-4 text-2xl font-semibold">تسک‌ها</h2>
        <div className="space-y-3">
          {lab.tasks?.map((task) => (
            <div key={task.id} className="rounded-2xl border p-4">
              <p className="font-medium">{task.title}</p>
              <p className="text-sm text-[#6b7280]">حداکثر تلاش: {task.max_attempts}</p>
            </div>
          ))}
          {!lab.tasks?.length && <p className="text-sm text-[#6b7280]">تسکی ثبت نشده است.</p>}
        </div>
      </section>

      <Link href="/labs" className="inline-flex items-center gap-2 text-sm font-medium text-[#6366f1] hover:underline">
        <ArrowRight className="h-4 w-4 rotate-180" />
        بازگشت به آزمایشگاه‌ها
      </Link>
    </div>
  );
}
