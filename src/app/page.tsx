'use client';

import { ArrowRight, Play, CheckCircle2, Users, Award, Clock, Sparkles, Terminal, Database, Shield, Zap, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useCourses } from '@/hooks/useCourses';
import { useLabs } from '@/hooks/useLabs';

export default function HomePage() {
  const { data: courses } = useCourses();
  const { data: labs } = useLabs();

  const totalCourses = courses?.length ?? 0;
  const totalLabs = labs?.length ?? 0;

  return (
    <div className="w-full">
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-amber-50 opacity-70" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-[#6366f1]/20 to-purple-600/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-amber-400/20 to-[#6366f1]/20 blur-3xl" />

        <div className="container relative z-10 mx-auto px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-3 rounded-full border border-[#6366f1]/20 bg-gradient-to-r from-[#6366f1]/10 to-purple-600/10 px-5 py-2.5 backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-[#6366f1]" />
                <span className="bg-gradient-to-r from-[#6366f1] to-purple-600 bg-clip-text text-sm font-medium text-transparent">یادگیری با انجام دادن</span>
              </div>

              <div className="space-y-6">
                <h1 className="text-5xl font-bold leading-tight md:text-7xl">
                  مهارت‌های فنی را با
                  <span className="bg-gradient-to-r from-[#6366f1] via-purple-600 to-[#f59e0b] bg-clip-text text-transparent"> آزمایشگاه‌های تعاملی</span>
                  {' '}یاد بگیرید
                </h1>
                <p className="text-xl leading-relaxed text-[#6b7280]">
                  برنامه‌نویسی، دواپس، رایانش ابری و امنیت سایبری را با تمرین عملی در محیط واقعی یاد بگیرید.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/courses"
                  className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6366f1] to-purple-600 px-8 py-4 text-white transition-all duration-300 hover:shadow-xl hover:shadow-[#6366f1]/30"
                >
                  شروع رایگان
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/labs"
                  className="flex items-center justify-center gap-2 rounded-xl border-2 px-8 py-4 transition-all duration-300 hover:bg-[#f8f7ff]"
                >
                  <Play className="h-5 w-5" />
                  مشاهده دمو
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-4">
                <Stat icon={<CheckCircle2 className="h-5 w-5 text-[#6366f1]" />} title={`${totalLabs || 500}+`} label="آزمایشگاه" />
                <Stat icon={<Zap className="h-5 w-5 text-[#f59e0b]" />} title="بدون نصب" label="آماده اجرا" />
                <Stat icon={<TrendingUp className="h-5 w-5 text-purple-600" />} title={`${totalCourses || 95}+`} label="دوره" />
              </div>
            </div>

            <div className="relative lg:ml-auto">
              <div className="relative overflow-hidden rounded-3xl border-2 shadow-2xl backdrop-blur-sm">
                <img
                  src="https://images.unsplash.com/photo-1763568258314-24ef37bb52e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjBjb2RpbmclMjB0ZXJtaW5hbCUyMHNjcmVlbnxlbnwxfHx8fDE3NzIyMzA1ODB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Interactive coding environment"
                  className="h-auto w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#6366f1]/20 to-transparent" />
              </div>

              <div className="absolute -bottom-6 -left-6 rounded-2xl border bg-white p-4 shadow-xl backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#6366f1] to-purple-600">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">50K+</div>
                    <div className="text-xs text-[#6b7280]">کاربر فعال</div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-6 -top-6 rounded-2xl border bg-white p-4 shadow-xl backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#f59e0b] to-amber-600">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">آموزش معتبر</div>
                    <div className="text-xs text-[#6b7280]">دارای گواهی</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y bg-gradient-to-b from-white to-[#f8f7ff] py-20">
        <div className="container mx-auto grid grid-cols-2 gap-12 px-6 text-center md:grid-cols-4 lg:px-8">
          <Metric value={`${totalLabs || 500}+`} label="آزمایشگاه عملی" className="from-[#6366f1] to-purple-600" />
          <Metric value="50K+" label="کاربر فعال" className="from-purple-600 to-pink-600" />
          <Metric value={`${totalCourses || 100}+`} label="مسیر مهارتی" className="from-[#f59e0b] to-amber-600" />
          <Metric value="95%" label="نرخ موفقیت" className="from-[#6366f1] to-[#f59e0b]" />
        </div>
      </section>

      <section className="py-24 md:py-36">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto mb-20 max-w-3xl space-y-6 text-center">
            <h2 className="text-4xl font-bold md:text-6xl">
              چرا با <span className="bg-gradient-to-r from-[#6366f1] to-purple-600 bg-clip-text text-transparent">اسکیل‌لب</span> یاد بگیریم؟
            </h2>
            <p className="text-xl leading-relaxed text-[#6b7280]">بهترین مسیر یادگیری فناوری را با تمرین تعاملی تجربه کنید.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="group rounded-3xl border bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#6366f1]/10">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6366f1]/10 to-purple-600/10 transition-transform duration-300 group-hover:scale-110">
                  <feature.icon className="h-7 w-7 text-[#6366f1]" />
                </div>
                <h3 className="mb-4 text-xl font-semibold">{feature.title}</h3>
                <p className="leading-relaxed text-[#6b7280]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#f8f7ff] to-white py-24 md:py-36">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto mb-20 max-w-3xl space-y-6 text-center">
            <h2 className="text-4xl font-bold md:text-6xl">مسیرهای محبوب یادگیری</h2>
            <p className="text-xl leading-relaxed text-[#6b7280]">دوره‌های ساختاریافته برای رساندن شما از مبتدی به حرفه‌ای.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {learningPaths.map((path) => (
              <div key={path.title} className="group overflow-hidden rounded-3xl border bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#6366f1]/10">
                <div className="relative h-56 overflow-hidden">
                  <img src={path.image} alt={path.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute left-6 top-6">
                    <span className="rounded-xl bg-gradient-to-r from-[#6366f1] to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-lg">{path.level}</span>
                  </div>
                </div>
                <div className="space-y-6 p-8">
                  <div className="flex items-center gap-4 text-sm text-[#6b7280]">
                    <div className="flex items-center gap-2"><Clock className="h-4 w-4" />{path.duration}</div>
                    <div className="flex items-center gap-2"><Users className="h-4 w-4" />{path.students}</div>
                  </div>
                  <div>
                    <h3 className="mb-3 text-xl font-semibold">{path.title}</h3>
                    <p className="text-sm leading-relaxed text-[#6b7280]">{path.description}</p>
                  </div>
                  <Link href="/courses" className="inline-flex items-center gap-2 font-medium text-[#6366f1] transition-all hover:gap-3">
                    مشاهده بیشتر
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-36">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] p-16 text-center md:p-24">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600" />
            <div className="absolute right-0 top-0 h-[600px] w-[600px] animate-pulse rounded-full bg-gradient-to-br from-white/20 to-transparent blur-3xl" />
            <div className="absolute bottom-0 left-0 h-[600px] w-[600px] animate-pulse rounded-full bg-gradient-to-tr from-amber-400/20 to-transparent blur-3xl" style={{ animationDelay: '1s' }} />

            <div className="relative z-10 mx-auto max-w-3xl space-y-8">
              <h2 className="text-4xl font-bold leading-tight text-white md:text-6xl">یادگیری را از همین امروز شروع کنید</h2>
              <p className="text-xl leading-relaxed text-white/90">
                همین حالا به هزاران یادگیرنده فعال بپیوندید. بدون نیاز به کارت بانکی.
              </p>
              <div className="flex flex-col justify-center gap-4 pt-6 sm:flex-row">
                <Link
                  href="/register"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-indigo-600 transition-all duration-300 hover:bg-white/90 hover:shadow-2xl"
                >
                  شروع رایگان
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-xl border-2 border-white px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                >
                  مشاهده قیمت‌ها
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ icon, title, label }: { icon: React.ReactNode; title: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#6366f1]/10 to-purple-600/10">{icon}</div>
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-xs text-[#6b7280]">{label}</div>
      </div>
    </div>
  );
}

function Metric({ value, label, className }: { value: string; label: string; className: string }) {
  return (
    <div className="space-y-2">
      <div className={`bg-gradient-to-r ${className} bg-clip-text text-5xl font-bold text-transparent`}>{value}</div>
      <div className="text-sm text-[#6b7280]">{label}</div>
    </div>
  );
}

const features = [
  {
    title: 'محیط واقعی',
    description: 'در محیط‌های شبیه تولید با ابزارها و زیرساخت آماده تمرین کنید.',
    icon: Terminal,
  },
  {
    title: 'محتوای تخصصی',
    description: 'از مدرس‌های باتجربه صنعت با راهنمایی کاملاً عملی یاد بگیرید.',
    icon: Users,
  },
  {
    title: 'گواهی معتبر',
    description: 'گواهی‌های شناخته‌شده دریافت کنید و رزومه حرفه‌ای‌تری بسازید.',
    icon: Award,
  },
  {
    title: 'یادگیری با سرعت خودت',
    description: '۲۴/۷ به آزمایشگاه‌ها دسترسی داشته باشید و هر زمان خواستید تمرین کنید.',
    icon: Clock,
  },
  {
    title: 'پروژه‌محور',
    description: 'پروژه‌های واقعی بسازید و در نمونه‌کار خود ارائه دهید.',
    icon: Database,
  },
  {
    title: 'سندباکس امن',
    description: 'بدون نگرانی از خراب شدن سیستم شخصی، در محیط ایزوله تمرین کنید.',
    icon: Shield,
  },
];

const learningPaths = [
  {
    title: 'توسعه وب فول‌استک',
    description: 'فرانت‌اند و بک‌اند را با React، Node.js و پایگاه‌داده مسلط شوید.',
    level: 'مبتدی',
    duration: '۱۲ هفته',
    students: '15.2K',
    image: 'https://images.unsplash.com/photo-1763568258314-24ef37bb52e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjBjb2RpbmclMjB0ZXJtaW5hbCUyMHNjcmVlbnxlbnwxfHx8fDE3NzIyMzA1ODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'مهندسی دواپس',
    description: 'CI/CD، داکر، کوبرنتیز و اتوماسیون زیرساخت ابری را یاد بگیرید.',
    level: 'متوسط',
    duration: '۱۰ هفته',
    students: '12.8K',
    image: 'https://images.unsplash.com/photo-1728933102332-a4f1a281a621?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcyMTE5NjA3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'مبانی امنیت سایبری',
    description: 'پایه قوی در امنیت شبکه، هک اخلاقی و تحلیل تهدید بسازید.',
    level: 'مبتدی',
    duration: '۸ هفته',
    students: '9.5K',
    image: 'https://images.unsplash.com/photo-1762340916350-ad5a3d620c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlciUyMHNlY3VyaXR5JTIwbmV0d29ya3xlbnwxfHx8fDE3NzIyMzA1ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];
