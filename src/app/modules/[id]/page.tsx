'use client';

import { useLabs } from '@/hooks/useLabs';
import { useModule } from '@/hooks/useCourses';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import PageLoader from '@/app/components/PageLoader';

export default function ModuleDetailsPage() {
  const params = useParams<{ id: string }>();
  const moduleId = Number(params.id);
  const { data: module, isLoading: moduleLoading } = useModule(moduleId);
  const { data: labs, isLoading: labsLoading } = useLabs();

  const moduleLabs = labs?.filter((lab) => lab.module === moduleId) ?? [];

  if (moduleLoading || labsLoading) return <PageLoader />;
  if (!module) return <div className="rounded-xl bg-red-50 p-4 text-red-700">ماژول پیدا نشد.</div>;

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-black">{module.title}</h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">شناسه دوره: {module.course}</p>
      </section>

      <section className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-black">آزمایشگاه‌های این ماژول</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {moduleLabs.map((lab) => (
            <Link key={lab.id} href={`/labs/${lab.id}`} className="rounded-xl border border-[var(--border)] p-4 transition hover:bg-[var(--surface-soft)]">
              <p className="font-semibold">{lab.title}</p>
              <p className="text-xs text-[var(--text-muted)]">{lab.difficulty}</p>
            </Link>
          ))}
          {moduleLabs.length === 0 && <p className="text-sm text-[var(--text-muted)]">لابی برای این ماژول تعریف نشده است.</p>}
        </div>
      </section>
    </div>
  );
}
