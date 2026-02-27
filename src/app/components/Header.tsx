'use client';

import Link from 'next/link';
import { useContext, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AuthContext } from '../context/AuthContext';

const navItems = [
  { href: '/', label: 'خانه' },
  { href: '/courses', label: 'دوره‌ها' },
  { href: '/labs', label: 'آزمایشگاه‌ها' },
  { href: '/admin', label: 'داشبورد ادمین' },
];

export default function Header() {
  const auth = useContext(AuthContext);
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-2xl font-black" style={{ color: 'var(--primary-dark)' }}>
          LabCraft
        </Link>

        <div className="hidden items-center gap-4 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-sm transition ${pathname === item.href ? 'bg-[var(--surface-soft)] font-bold' : 'hover:bg-[var(--surface-soft)]'}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {auth?.isAuthenticated ? (
            <>
              <span className="rounded-full bg-[var(--surface-soft)] px-3 py-1 text-xs">{auth.user?.email}</span>
              <button onClick={auth.logout} className="rounded-lg bg-black px-3 py-2 text-xs text-white" type="button">
                خروج
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="rounded-lg px-3 py-2 text-sm hover:bg-[var(--surface-soft)]">
                ورود
              </Link>
              <Link href="/register" className="rounded-lg bg-[var(--primary)] px-3 py-2 text-sm font-semibold text-white">
                شروع رایگان
              </Link>
            </>
          )}
        </div>

        <button className="rounded-lg border px-3 py-2 md:hidden" onClick={() => setMobileOpen((v) => !v)} type="button">
          منو
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-[var(--border)] bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-lg px-3 py-2 hover:bg-[var(--surface-soft)]" onClick={() => setMobileOpen(false)}>
                {item.label}
              </Link>
            ))}
            <div className="mt-2 border-t pt-2">
              {auth?.isAuthenticated ? (
                <button onClick={auth.logout} className="w-full rounded-lg bg-black px-3 py-2 text-white" type="button">
                  خروج
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/login" className="rounded-lg border px-3 py-2 text-center" onClick={() => setMobileOpen(false)}>
                    ورود
                  </Link>
                  <Link href="/register" className="rounded-lg bg-[var(--primary)] px-3 py-2 text-center text-white" onClick={() => setMobileOpen(false)}>
                    ثبت‌نام
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
