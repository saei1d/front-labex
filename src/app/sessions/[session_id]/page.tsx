'use client';

import { useEffect, useState } from 'react';
import { useLabTasks } from '@/hooks/useLabs';
import { sessionService } from '@/services/sessionService';
import { SessionData } from '@/types/api';
import { useParams } from 'next/navigation';
import PageLoader from '@/app/components/PageLoader';

export default function SessionPage() {
  const params = useParams<{ session_id: string }>();
  const sessionId = params.session_id;
  const [session, setSession] = useState<SessionData>();
  const [message, setMessage] = useState('');
  const { data: tasks, isLoading } = useLabTasks();

  const loadSession = async () => {
    const data = await sessionService.getSession(sessionId);
    setSession(data);
  };

  useEffect(() => {
    void sessionService.getSession(sessionId).then(setSession);
  }, [sessionId]);

  const stop = async () => {
    await sessionService.stopSession(sessionId);
    setMessage('Session متوقف شد.');
    void loadSession();
  };

  const validate = async (taskId: number) => {
    await sessionService.validateTask(sessionId, taskId);
    setMessage(`اعتبارسنجی تسک ${taskId} ارسال شد.`);
  };

  if (isLoading) return <PageLoader label="در حال بارگذاری تسک‌ها..." />;

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-black">مدیریت Session</h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">شناسه: {sessionId}</p>
        <pre className="mt-4 overflow-auto rounded-xl bg-[var(--surface-soft)] p-3 text-xs">{JSON.stringify(session, null, 2)}</pre>
        <button onClick={stop} type="button" className="mt-4 rounded-lg bg-black px-4 py-2 text-white">
          توقف Session
        </button>
      </section>

      <section className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-black">ارسال Validate برای تسک‌ها</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {tasks?.map((task) => (
            <button key={task.id} type="button" onClick={() => validate(task.id)} className="rounded-xl border border-[var(--border)] p-4 text-right hover:bg-[var(--surface-soft)]">
              <p className="font-semibold">{task.title}</p>
              <p className="text-xs text-[var(--text-muted)]">Task ID: {task.id}</p>
            </button>
          ))}
        </div>
      </section>

      {message && <div className="rounded-xl bg-green-100 p-3 text-green-800">{message}</div>}
    </div>
  );
}
