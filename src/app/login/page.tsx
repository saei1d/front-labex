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
    <div className="container mx-auto px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-md rounded-3xl border bg-white p-8 shadow-xl shadow-[#6366f1]/10">
        <h1 className="mb-2 text-3xl font-bold">ورود</h1>
        <p className="mb-6 text-sm text-[#6b7280]">ادامه مسیر یادگیری شما.</p>

        <form className="space-y-4" onSubmit={submit}>
          <input
            className="w-full rounded-xl border px-4 py-3 focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ایمیل"
            type="email"
            required
          />
          <input
            className="w-full rounded-xl border px-4 py-3 focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="رمز عبور"
            required
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button className="w-full rounded-xl bg-gradient-to-r from-[#6366f1] to-purple-600 py-3 font-semibold text-white" type="submit">
            ورود
          </button>
        </form>

        <Link href="/register" className="mt-4 block text-center text-sm text-[#6366f1] hover:underline">
          حساب ندارید؟ ثبت‌نام کنید
        </Link>
      </div>
    </div>
  );
}
