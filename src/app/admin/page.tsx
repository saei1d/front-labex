'use client';

import { useEffect, useState } from 'react';
import { courseService } from '@/services/courseService';
import { labService } from '@/services/labService';

interface AdminStats {
  courses: number;
  modules: number;
  labs: number;
  sections: number;
  tasks: number;
  rules: number;
}

export default function AdminPage() {
  const [stats, setStats] = useState<AdminStats>({ courses: 0, modules: 0, labs: 0, sections: 0, tasks: 0, rules: 0 });
  const [examples, setExamples] = useState<Record<string, unknown>>({});

  useEffect(() => {
    const load = async () => {
      const [courses, modules, labs, sections, tasks, rules] = await Promise.all([
        courseService.adminListCourses(),
        courseService.adminListModules(),
        labService.adminListLabs(),
        labService.adminListLabSections(),
        labService.adminListLabTasks(),
        labService.adminListValidationRules(),
      ]);

      setStats({
        courses: courses.length,
        modules: modules.length,
        labs: labs.length,
        sections: sections.length,
        tasks: tasks.length,
        rules: rules.length,
      });

      setExamples({ courses: courses.slice(0, 2), labs: labs.slice(0, 2), tasks: tasks.slice(0, 2) });
    };

    void load();
  }, []);

  const cards = [
    { title: 'دوره‌ها', count: stats.courses },
    { title: 'ماژول‌ها', count: stats.modules },
    { title: 'آزمایشگاه‌ها', count: stats.labs },
    { title: 'بخش‌ها', count: stats.sections },
    { title: 'تسک‌ها', count: stats.tasks },
    { title: 'قوانین اعتبارسنجی', count: stats.rules },
  ];

  return (
    <div className="container mx-auto space-y-8 px-6 py-16 lg:px-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">داشبورد ادمین</h1>
        <p className="text-[#6b7280]">آمار زنده موجودیت‌های API.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <div key={card.title} className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-[#6b7280]">{card.title}</p>
            <p className="mt-2 text-4xl font-bold text-[#6366f1]">{card.count}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border bg-[#0f172a] p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">نمونه خروجی‌ها</h2>
        <pre className="overflow-auto text-xs text-slate-200">{JSON.stringify(examples, null, 2)}</pre>
      </div>
    </div>
  );
}
