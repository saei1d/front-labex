'use client';

import { Search, Filter, Clock, Users, Star, ArrowRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useCourses } from '@/hooks/useCourses';

type CourseCard = {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  duration: string;
  students: string;
  rating: string;
  image: string;
};

const fallbackImage =
  'https://images.unsplash.com/photo-1763568258314-24ef37bb52e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjBjb2RpbmclMjB0ZXJtaW5hbCUyMHNjcmVlbnxlbnwxfHx8fDE3NzIyMzA1ODB8MA&ixlib=rb-4.1.0&q=80&w=1080';

export default function CoursesPage() {
  const { data, isLoading, error } = useCourses();
  const [selectedCategory, setSelectedCategory] = useState('همه');
  const [searchQuery, setSearchQuery] = useState('');

  const courses = useMemo<CourseCard[]>(() => {
    return (data ?? []).map((course, index) => ({
      id: course.id,
      title: course.title,
      description: course.description || 'Hands-on course with real-world exercises and guided labs.',
      category: normalizeCategory(course.level),
      level: course.level || 'Beginner',
      duration: `${Math.max((course.modules?.length ?? 1) * 2, 4)} weeks`,
      students: `${(index + 4) * 1.2}K`,
      rating: (4.6 + ((index % 4) * 0.1)).toFixed(1),
      image: fallbackImage,
    }));
  }, [data]);

  const categories = useMemo(() => ['همه', ...Array.from(new Set(courses.map((course) => course.category)))], [courses]);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesCategory = selectedCategory === 'همه' || course.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch = course.title.toLowerCase().includes(q) || course.description.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [courses, searchQuery, selectedCategory]);

  return (
    <div className="w-full">
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-amber-50 opacity-70" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-[#6366f1]/20 to-purple-600/20 blur-3xl" />

        <div className="container relative z-10 mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-8 text-center">
            <h1 className="text-5xl font-bold leading-tight md:text-7xl">
              <span className="bg-gradient-to-r from-[#6366f1] to-purple-600 bg-clip-text text-transparent">دوره‌ها</span> را کاوش کنید
            </h1>
            <p className="text-xl leading-relaxed text-[#6b7280]">دوره‌های عملی برای تسلط بر مهارت‌های پرتقاضای بازار.</p>

            <div className="relative mx-auto mt-10 max-w-2xl">
              <Search className="absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6b7280]" />
              <input
                type="text"
                placeholder="جستجوی دوره..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border-2 bg-white/80 py-5 pl-14 pr-6 shadow-lg shadow-[#6366f1]/5 backdrop-blur-sm transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="sticky top-20 z-40 border-y bg-white/90 py-6 backdrop-blur-sm">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            <Filter className="h-5 w-5 flex-shrink-0 text-[#6b7280]" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded-xl px-6 py-3 transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-[#6366f1] to-purple-600 text-white shadow-lg shadow-[#6366f1]/30'
                    : 'bg-[#f3f4f6] hover:bg-[#e5e7eb]'
                }`}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8">
          {isLoading && <p className="text-center text-[#6b7280]">در حال بارگذاری دوره‌ها...</p>}
          {Boolean(error) && <p className="text-center text-red-600">بارگذاری دوره‌ها ناموفق بود.</p>}
          {!isLoading && !Boolean(error) && (
            <>
              <div className="mb-8 text-[#6b7280]">
                نمایش <span className="font-semibold text-[#1a1625]">{filteredCourses.length}</span> دوره
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredCourses.map((course) => (
                  <div key={course.id} className="group overflow-hidden rounded-3xl border bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#6366f1]/10">
                    <div className="relative h-56 overflow-hidden">
                      <img src={course.image} alt={course.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute left-6 top-6">
                        <span className="rounded-xl bg-gradient-to-r from-[#6366f1] to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-lg">{course.level}</span>
                      </div>
                      <div className="absolute bottom-6 left-6 right-6">
                        <span className="inline-block rounded-lg bg-white/90 px-3 py-1.5 text-xs font-medium backdrop-blur-sm">{course.category}</span>
                      </div>
                    </div>

                    <div className="space-y-6 p-8">
                      <div>
                        <h3 className="mb-3 text-xl font-semibold">{course.title}</h3>
                        <p className="text-sm leading-relaxed text-[#6b7280]">{course.description}</p>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-[#6b7280]">
                        <div className="flex items-center gap-2"><Clock className="h-4 w-4" />{course.duration}</div>
                        <div className="flex items-center gap-2"><Users className="h-4 w-4" />{course.students}</div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-[#f59e0b] text-[#f59e0b]" />
                          <span className="font-medium text-[#1a1625]">{course.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t pt-6">
                        <Link href={`/courses/${course.id}`} className="text-sm font-medium text-[#6366f1] hover:underline">
                          جزئیات
                        </Link>
                        <Link
                          href={`/courses/${course.id}`}
                          className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#6366f1] to-purple-600 px-6 py-3 text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#6366f1]/30"
                        >
                          ثبت‌نام
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

function normalizeCategory(level?: string) {
  if (!level) return 'عمومی';
  const lower = level.toLowerCase();
  if (lower.includes('begin')) return 'توسعه وب';
  if (lower.includes('inter')) return 'دواپس';
  if (lower.includes('adv')) return 'رایانش ابری';
  return level;
}
