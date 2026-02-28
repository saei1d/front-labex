'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Sparkles, X } from 'lucide-react';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const navItems = [
  { href: '/courses', label: 'دوره‌ها' },
  { href: '/labs', label: 'آزمایشگاه‌ها' },
  { href: '/pricing', label: 'قیمت‌گذاری' },
  { href: '/admin', label: 'ادمین' },
];

export default function Header() {
  const pathname = usePathname();
  const auth = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70">
      <nav className="container mx-auto flex h-20 items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#6366f1] to-purple-600 shadow-lg shadow-[#6366f1]/20 transition-all group-hover:shadow-[#6366f1]/30">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <span className="bg-gradient-to-r from-[#6366f1] to-purple-600 bg-clip-text text-xl font-bold text-transparent">اسکیل‌لب</span>
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link key={item.href} href={item.href} className={`relative text-sm transition-colors ${active ? 'text-[#6366f1]' : 'hover:text-[#6366f1]'}`}>
                {item.label}
                <span className={`absolute -bottom-6 left-0 h-0.5 bg-[#6366f1] transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          {auth?.isAuthenticated ? (
            <>
              <span className="text-sm text-[#6b7280]">{auth.user?.email}</span>
              <button onClick={auth.logout} className="rounded-xl border px-5 py-2.5 text-sm transition-colors hover:bg-[#f3f4f6]" type="button">
                خروج
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="px-5 py-2.5 text-sm transition-colors hover:text-[#6366f1]">
                ورود
              </Link>
              <Link
                href="/register"
                className="rounded-xl bg-gradient-to-r from-[#6366f1] to-purple-600 px-6 py-2.5 text-sm text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#6366f1]/30"
              >
                شروع رایگان
              </Link>
            </>
          )}
        </div>

        <button className="p-2 md:hidden" onClick={() => setMobileMenuOpen((prev) => !prev)} type="button" aria-label="تغییر منو">
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t bg-white/95 backdrop-blur-xl md:hidden">
          <div className="container mx-auto flex flex-col gap-4 px-6 py-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-3 text-sm transition-colors hover:text-[#6366f1]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 border-t pt-4">
              {auth?.isAuthenticated ? (
                <button
                  onClick={() => {
                    auth.logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full rounded-xl border px-4 py-3 text-sm transition-colors hover:bg-[#f3f4f6]"
                  type="button"
                >
                  خروج
                </button>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full rounded-xl border px-4 py-3 text-center text-sm transition-colors hover:bg-[#f3f4f6]">
                    ورود
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full rounded-xl bg-gradient-to-r from-[#6366f1] to-purple-600 px-4 py-3 text-center text-sm text-white"
                  >
                    شروع رایگان
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
