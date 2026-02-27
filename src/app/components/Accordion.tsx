'use client';

import { useState } from 'react';

interface Item {
  key: string | number;
  title: string;
  content: string;
  meta?: string;
}

export default function Accordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<string | number | null>(items[0]?.key ?? null);

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const active = open === item.key;
        return (
          <div key={item.key} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
            <button
              type="button"
              onClick={() => setOpen(active ? null : item.key)}
              className="flex w-full items-center justify-between px-4 py-4 text-right"
            >
              <div>
                <h4 className="font-semibold">{item.title}</h4>
                {item.meta && <p className="text-xs text-[var(--text-muted)]">{item.meta}</p>}
              </div>
              <span className="text-lg">{active ? '−' : '+'}</span>
            </button>
            {active && <div className="border-t border-[var(--border)] px-4 py-4 text-sm text-[var(--text-muted)]">{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
}
