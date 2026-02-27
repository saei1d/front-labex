'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { usePathname } from 'next/navigation';
import { AuthContext } from '../context/AuthContext';

const navItems = [
  { href: '/', label: 'خانه' },
  { href: '/courses', label: 'دوره‌ها' },
  { href: '/labs', label: 'آزمایشگاه‌ها' },
  { href: '/admin', label: 'ادمین' },
];

export default function Header() {
  const auth = useContext(AuthContext);
  const pathname = usePathname();

  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-bold text-indigo-700">
          LabEx
        </Link>
        <div className="flex items-center gap-4 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? 'font-bold text-indigo-700' : 'text-slate-600 hover:text-indigo-600'}
            >
              {item.label}
            </Link>
          ))}
          {auth?.isAuthenticated ? (
            <>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs">{auth.user?.email}</span>
              <button
                onClick={auth.logout}
                className="rounded-md bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                type="button"
              >
                خروج
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-slate-600 hover:text-indigo-600">
                ورود
              </Link>
              <Link href="/register" className="rounded-md bg-indigo-600 px-3 py-1 text-white hover:bg-indigo-700">
                ثبت‌نام
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
