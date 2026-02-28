'use client';

import { useEffect, useState } from 'react';
import { useLabTasks } from '@/hooks/useLabs';
import { sessionService } from '@/services/sessionService';
import { SessionData } from '@/types/api';
import { useParams } from 'next/navigation';

export default function SessionPage() {
  const params = useParams<{ session_id: string }>();
  const sessionId = params.session_id;
  const [session, setSession] = useState<SessionData>();
  const [message, setMessage] = useState('');
  const { data: tasks } = useLabTasks();

  const loadSession = async () => {
    const data = await sessionService.getSession(sessionId);
    setSession(data);
  };

  useEffect(() => {
    void sessionService.getSession(sessionId).then(setSession);
  }, [sessionId]);

  const stop = async () => {
    await sessionService.stopSession(sessionId);
    setMessage('جلسه با موفقیت متوقف شد.');
    void loadSession();
  };

  const validate = async (taskId: number) => {
    await sessionService.validateTask(sessionId, taskId);
    setMessage(`درخواست اعتبارسنجی برای تسک ${taskId} ارسال شد.`);
  };

  return (
    <div className="container mx-auto space-y-8 px-6 py-16 lg:px-8">
      <section className="rounded-3xl border bg-white p-8">
        <h1 className="text-3xl font-bold">جلسه: {sessionId}</h1>
        <pre className="mt-4 overflow-auto rounded-2xl bg-[#0f172a] p-4 text-xs text-slate-200">{JSON.stringify(session, null, 2)}</pre>
        <button onClick={stop} type="button" className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-white transition hover:bg-red-700">
          توقف جلسه
        </button>
      </section>

      <section className="rounded-3xl border bg-white p-8">
        <h2 className="mb-4 text-xl font-semibold">اعتبارسنجی تسک‌ها</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {tasks?.map((task) => (
            <button
              key={task.id}
              type="button"
              onClick={() => validate(task.id)}
              className="rounded-2xl border p-4 text-left transition-colors hover:bg-[#f8f7ff]"
            >
              <p className="font-medium">{task.title}</p>
              <p className="text-xs text-[#6b7280]">شناسه: {task.id}</p>
            </button>
          ))}
          {!tasks?.length && <p className="text-sm text-[#6b7280]">تسکی پیدا نشد.</p>}
        </div>
      </section>

      {message && <div className="rounded-2xl border border-green-200 bg-green-50 p-3 text-green-700">{message}</div>}
    </div>
  );
}
