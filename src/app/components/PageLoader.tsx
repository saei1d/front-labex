export default function PageLoader({ label = 'در حال بارگذاری...' }: { label?: string }) {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center gap-4">
      <div className="h-11 w-11 animate-spin rounded-full border-4 border-[var(--surface-soft)] border-t-[var(--primary)]" />
      <p className="text-sm text-[var(--text-muted)]">{label}</p>
    </div>
  );
}
