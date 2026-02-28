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

  if (moduleLoading || labsLoading) return <p className="py-20 text-center text-[#6b7280]">در حال بارگذاری ماژول...</p>;
  if (!module) return <p className="py-20 text-center text-red-600">ماژول پیدا نشد.</p>;

  return (
    <div className="container mx-auto space-y-8 px-6 py-16 lg:px-8">
      <section className="rounded-3xl border bg-gradient-to-br from-indigo-50 via-purple-50 to-amber-50 p-8 md:p-12">
        <h1 className="text-4xl font-bold">{module.title}</h1>
        <p className="mt-2 text-[#6b7280]">شناسه دوره: {module.course}</p>
      </section>

      <section className="rounded-3xl border bg-white p-8">
        <h2 className="mb-4 text-2xl font-semibold">آزمایشگاه‌های ماژول</h2>
        <div className="space-y-3">
          {moduleLabs.map((lab) => (
            <Link key={lab.id} href={`/labs/${lab.id}`} className="block rounded-2xl border p-4 transition-colors hover:bg-[#f8f7ff]">
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium">{lab.title}</span>
                <span className="rounded-full bg-[#6366f1]/10 px-3 py-1 text-xs text-[#6366f1]">{lab.difficulty}</span>
              </div>
            </Link>
          ))}
          {!moduleLabs.length && <p className="text-sm text-[#6b7280]">آزمایشگاهی برای این ماژول ثبت نشده است.</p>}
        </div>
      </section>
    </div>
  );
}
