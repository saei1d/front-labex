'use client';

import { useEffect, useState } from 'react';
import { courseService } from '@/services/courseService';
import { labService } from '@/services/labService';
import PageLoader from '../components/PageLoader';

interface AdminStats {
  courses: number;
  modules: number;
  labs: number;
  sections: number;
  tasks: number;
  rules: number;
}

export default function AdminPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
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
      setExamples({ courses: courses.slice(0, 1), labs: labs.slice(0, 1), tasks: tasks.slice(0, 1) });
    };

    void load();
  }, []);

  if (!stats) return <PageLoader label="در حال بارگذاری داده‌های ادمین..." />;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black">داشبورد مدیریت محتوا</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {Object.entries(stats).map(([k, v]) => (
          <div key={k} className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm">
            <p className="text-sm text-[var(--text-muted)]">{k}</p>
            <p className="mt-1 text-3xl font-black">{v}</p>
          </div>
        ))}
      </div>
      <section className="rounded-2xl border border-[var(--border)] bg-black p-4 text-xs text-white">
        <h3 className="mb-2 text-sm font-bold">نمونه خروجی API</h3>
        <pre className="overflow-auto">{JSON.stringify(examples, null, 2)}</pre>
      </section>
    </div>
  );
}
