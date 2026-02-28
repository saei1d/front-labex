import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-gradient-to-b from-white to-[#f8f7ff] py-16">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#6366f1] to-purple-600">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-[#6366f1] to-purple-600 bg-clip-text text-xl font-bold text-transparent">اسکیل‌لب</span>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[#6b7280]">
              برنامه‌نویسی، کلاد، دواپس و امنیت را با آزمایشگاه‌های تعاملی و پروژه‌های واقعی یاد بگیرید.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[#1a1625]">مسیرها</h3>
            <Link href="/courses" className="block text-sm text-[#6b7280] transition-colors hover:text-[#6366f1]">دوره‌ها</Link>
            <Link href="/labs" className="block text-sm text-[#6b7280] transition-colors hover:text-[#6366f1]">آزمایشگاه‌ها</Link>
            <Link href="/pricing" className="block text-sm text-[#6b7280] transition-colors hover:text-[#6366f1]">قیمت‌گذاری</Link>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[#1a1625]">حساب کاربری</h3>
            <Link href="/login" className="block text-sm text-[#6b7280] transition-colors hover:text-[#6366f1]">ورود</Link>
            <Link href="/register" className="block text-sm text-[#6b7280] transition-colors hover:text-[#6366f1]">ثبت‌نام</Link>
            <Link href="/admin" className="block text-sm text-[#6b7280] transition-colors hover:text-[#6366f1]">ادمین</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
