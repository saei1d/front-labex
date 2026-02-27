export default function Footer() {
  return (
    <footer className="mt-12 border-t border-[var(--border)] bg-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 md:grid-cols-3">
        <div>
          <h4 className="mb-2 text-lg font-bold">LabCraft</h4>
          <p className="text-sm text-[var(--text-muted)]">پلتفرم آموزش پروژه‌محور با لَب‌های واقعی، ارزیابی خودکار و مسیر یادگیری حرفه‌ای.</p>
        </div>
        <div>
          <h5 className="mb-2 font-semibold">بخش‌ها</h5>
          <ul className="space-y-1 text-sm text-[var(--text-muted)]">
            <li>دوره‌ها</li>
            <li>آزمایشگاه‌ها</li>
            <li>پنل مدیریت</li>
          </ul>
        </div>
        <div>
          <h5 className="mb-2 font-semibold">وضعیت</h5>
          <p className="text-sm text-[var(--text-muted)]">ساخته‌شده با Next.js و API اختصاصی شما</p>
        </div>
      </div>
    </footer>
  );
}
