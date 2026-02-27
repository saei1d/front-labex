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

    load();
  }, []);

  const cards = [
    { title: 'Courses', count: stats.courses },
    { title: 'Modules', count: stats.modules },
    { title: 'Labs', count: stats.labs },
    { title: 'Sections', count: stats.sections },
    { title: 'Tasks', count: stats.tasks },
    { title: 'Rules', count: stats.rules },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">پنل مدیریت API</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <div key={card.title} className="rounded-xl border bg-white p-5">
            <p className="text-sm text-slate-500">{card.title}</p>
            <p className="text-3xl font-bold">{card.count}</p>
          </div>
        ))}
      </div>
      <pre className="overflow-auto rounded-xl bg-slate-900 p-4 text-xs text-slate-100">{JSON.stringify(examples, null, 2)}</pre>
    </div>
  );
}
