'use client';

import { useLab, useStartLab } from '@/hooks/useLabs';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import PageLoader from '@/app/components/PageLoader';
import Accordion from '@/app/components/Accordion';

export default function LabDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const labId = Number(params.id);
  const { data: lab, isLoading, error } = useLab(labId);
  const { mutateAsync: startLab, isPending } = useStartLab();

  const handleStart = async () => {
    const response = await startLab(labId);
    const sessionId = String(response.session_id ?? response.id ?? '');
    if (sessionId) router.push(`/sessions/${sessionId}`);
  };

  if (isLoading) return <PageLoader label="در حال بارگذاری اطلاعات آزمایشگاه..." />;
  if (error || !lab) return <div className="rounded-xl bg-red-50 p-4 text-red-700">لَب پیدا نشد.</div>;

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold text-[var(--primary-dark)]">{lab.difficulty}</p>
            <h1 className="text-3xl font-black">{lab.title}</h1>
            <p className="mt-1 text-sm text-[var(--text-muted)]">Docker: {lab.docker_image}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={handleStart} disabled={isPending} className="rounded-xl bg-[var(--primary)] px-4 py-2 font-semibold text-white disabled:opacity-50" type="button">
              {isPending ? 'در حال شروع...' : 'شروع آزمایشگاه'}
            </button>
            <Link href="/labs" className="rounded-xl border border-[var(--border)] px-4 py-2 font-semibold">
              بازگشت
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-black">سرفصل‌ها و تسک‌ها</h2>
        <Accordion
          items={[
            ...lab.sections.map((section) => ({ key: `s-${section.id}`, title: section.title, content: section.content_md, meta: `نوع: ${section.type}` })),
            ...lab.tasks.map((task) => ({ key: `t-${task.id}`, title: task.title, content: task.prompt_md, meta: `حداکثر تلاش: ${task.max_attempts}` })),
          ]}
        />
      </section>
    </div>
  );
}
