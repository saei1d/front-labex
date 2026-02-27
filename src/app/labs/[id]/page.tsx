'use client';

import { useLab, useStartLab } from '@/hooks/useLabs';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

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

  if (isLoading) return <div>در حال بارگذاری...</div>;
  if (error || !lab) return <div className="text-red-600">لَب پیدا نشد.</div>;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-white p-6">
        <h1 className="text-3xl font-bold">{lab.title}</h1>
        <p className="mt-2 text-sm text-slate-500">Docker: {lab.docker_image}</p>
        <div className="mt-4 flex gap-3">
          <button
            onClick={handleStart}
            disabled={isPending}
            className="rounded-md bg-green-600 px-4 py-2 text-white disabled:opacity-50"
            type="button"
          >
            {isPending ? 'در حال شروع...' : 'شروع آزمایشگاه'}
          </button>
          <Link href="/labs" className="rounded-md border px-4 py-2">
            بازگشت
          </Link>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">سکشن‌ها</h2>
        <div className="space-y-3">
          {lab.sections?.map((section) => (
            <div key={section.id} className="rounded border p-3">
              <p className="font-medium">{section.title}</p>
              <p className="text-sm text-slate-500">{section.type}</p>
            </div>
          ))}
          {lab.sections?.length === 0 && <p className="text-sm text-slate-500">بدون سکشن</p>}
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">تسک‌ها</h2>
        <div className="space-y-3">
          {lab.tasks?.map((task) => (
            <div key={task.id} className="rounded border p-3">
              <p className="font-medium">{task.title}</p>
              <p className="text-sm text-slate-500">Max attempts: {task.max_attempts}</p>
            </div>
          ))}
          {lab.tasks?.length === 0 && <p className="text-sm text-slate-500">بدون تسک</p>}
        </div>
      </div>
    </div>
  );
}
