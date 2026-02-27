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
    <div className="mx-auto max-w-md rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
      <h1 className="mb-1 text-2xl font-black">ورود</h1>
      <p className="mb-4 text-sm text-[var(--text-muted)]">به حساب کاربری خود وارد شوید</p>
      <form className="space-y-3" onSubmit={submit}>
        <input className="w-full rounded-xl border border-[var(--border)] p-3" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ایمیل" />
        <input className="w-full rounded-xl border border-[var(--border)] p-3" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="رمز عبور" />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button className="w-full rounded-xl bg-[var(--primary)] p-3 font-semibold text-white" type="submit">
          ورود
        </button>
      </form>
      <Link href="/register" className="mt-4 block text-sm font-semibold text-[var(--primary-dark)]">
        حساب ندارید؟ ثبت‌نام کنید
      </Link>
    </div>
  );
}
