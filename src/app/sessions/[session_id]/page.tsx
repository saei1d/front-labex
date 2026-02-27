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
    setMessage('Session متوقف شد.');
    loadSession();
  };

  const validate = async (taskId: number) => {
    await sessionService.validateTask(sessionId, taskId);
    setMessage(`اعتبارسنجی تسک ${taskId} ارسال شد.`);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-white p-6">
        <h1 className="text-2xl font-bold">Session: {sessionId}</h1>
        <pre className="mt-3 overflow-auto rounded bg-slate-100 p-3 text-xs">{JSON.stringify(session, null, 2)}</pre>
        <button onClick={stop} type="button" className="mt-4 rounded bg-red-600 px-4 py-2 text-white">
          توقف Session
        </button>
      </div>

      <div className="rounded-xl border bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">Validate تسک‌ها</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {tasks?.map((task) => (
            <button
              key={task.id}
              type="button"
              onClick={() => validate(task.id)}
              className="rounded border p-3 text-right hover:bg-slate-50"
            >
              <p className="font-medium">{task.title}</p>
              <p className="text-xs text-slate-500">ID: {task.id}</p>
            </button>
          ))}
        </div>
      </div>

      {message && <div className="rounded bg-green-100 p-3 text-green-800">{message}</div>}
    </div>
  );
}
