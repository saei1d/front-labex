'use client';

import { AuthContext } from '@/app/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';

export default function LoginPage() {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await auth?.login(email, password);
      router.push('/courses');
    } catch {
      setError('ورود ناموفق بود.');
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-white p-6">
      <h1 className="mb-4 text-2xl font-bold">ورود</h1>
      <form className="space-y-3" onSubmit={submit}>
        <input className="w-full rounded border p-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ایمیل" />
        <input
          className="w-full rounded border p-2"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="رمز عبور"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button className="w-full rounded bg-indigo-600 p-2 text-white" type="submit">
          ورود
        </button>
      </form>
      <Link href="/register" className="mt-3 block text-sm text-indigo-600">
        حساب ندارید؟ ثبت‌نام
      </Link>
    </div>
  );
}
