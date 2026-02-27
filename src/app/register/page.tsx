'use client';

import { AuthContext } from '@/app/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';

export default function RegisterPage() {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await auth?.register(email, password);
      router.push('/courses');
    } catch {
      setError('ثبت‌نام ناموفق بود.');
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-white p-6">
      <h1 className="mb-4 text-2xl font-bold">ثبت‌نام</h1>
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
          ثبت‌نام
        </button>
      </form>
      <Link href="/login" className="mt-3 block text-sm text-indigo-600">
        قبلا ثبت‌نام کرده‌اید؟ ورود
      </Link>
    </div>
  );
}
