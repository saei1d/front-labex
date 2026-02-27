'use client';

import { useLabs } from '@/hooks/useLabs';
import { useModule } from '@/hooks/useCourses';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ModuleDetailsPage() {
  const params = useParams<{ id: string }>();
  const moduleId = Number(params.id);
  const { data: module, isLoading: moduleLoading } = useModule(moduleId);
  const { data: labs, isLoading: labsLoading } = useLabs();

  const moduleLabs = labs?.filter((lab) => lab.module === moduleId) ?? [];

  if (moduleLoading || labsLoading) return <div>در حال بارگذاری...</div>;
  if (!module) return <div className="text-red-600">ماژول پیدا نشد.</div>;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-white p-6">
        <h1 className="text-3xl font-bold">{module.title}</h1>
        <p className="mt-2 text-slate-600">شناسه دوره: {module.course}</p>
      </div>

      <div className="rounded-xl border bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">آزمایشگاه‌های این ماژول</h2>
        <div className="space-y-3">
          {moduleLabs.map((lab) => (
            <Link key={lab.id} href={`/labs/${lab.id}`} className="block rounded border p-4 hover:bg-slate-50">
              <div className="flex items-center justify-between">
                <span className="font-medium">{lab.title}</span>
                <span className="text-sm text-slate-500">{lab.difficulty}</span>
              </div>
            </Link>
          ))}
          {moduleLabs.length === 0 && <p className="text-sm text-slate-500">لابی برای این ماژول تعریف نشده است.</p>}
        </div>
      </div>
    </div>
  );
}
