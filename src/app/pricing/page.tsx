import { Check, X, Sparkles, Zap, Crown, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="w-full">
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-amber-50 opacity-70" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-[#6366f1]/20 to-purple-600/20 blur-3xl" />

        <div className="container relative z-10 mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-8 text-center">
            <h1 className="text-5xl font-bold leading-tight md:text-7xl">
              <span className="bg-gradient-to-r from-[#6366f1] to-purple-600 bg-clip-text text-transparent">قیمت‌گذاری</span> ساده و شفاف
            </h1>
            <p className="text-xl leading-relaxed text-[#6b7280]">
              پلنی را انتخاب کنید که با هدف یادگیری شما سازگار است. همه پلن‌ها شامل آزمایشگاه عملی و پشتیبانی هستند.
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
            <PricingCard
              title="رایگان"
              price="$0"
              icon={<Sparkles className="h-6 w-6 text-[#6b7280]" />}
              description="مناسب برای شروع و آشنایی اولیه"
              cta="شروع"
              features={freeFeatures}
              missing={freeNotIncluded}
            />

            <PricingCard
              title="حرفه‌ای"
              price="$29"
              highlighted
              icon={<Zap className="h-6 w-6 text-white" />}
              description="برای یادگیری جدی و رشد شغلی"
              cta="شروع آزمایشی"
              features={proFeatures}
            />

            <PricingCard
              title="سازمانی"
              price="اختصاصی"
              icon={<Crown className="h-6 w-6 text-white" />}
              description="برای تیم‌ها و سازمان‌ها"
              cta="تماس با فروش"
              features={enterpriseFeatures}
              iconAccent
            />
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#f8f7ff] to-white py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-16 text-center text-4xl font-bold">سوالات پرتکرار</h2>
            <div className="grid gap-6">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl border bg-white p-8 transition-all duration-300 hover:shadow-lg">
                  <h3 className="mb-3 text-lg font-semibold">{faq.question}</h3>
                  <p className="leading-relaxed text-[#6b7280]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] p-16 text-center md:p-20">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600" />
            <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-white/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-white/20 blur-3xl" />

            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl font-bold leading-tight text-white md:text-5xl">ضمانت بازگشت وجه ۳۰ روزه</h2>
              <p className="mx-auto max-w-2xl text-xl leading-relaxed text-white/90">
                بدون ریسک امتحان کنید. اگر تا ۳۰ روز رضایت نداشتید، مبلغ شما بازگردانده می‌شود.
              </p>
              <Link
                href="/register"
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-indigo-600 transition-all duration-300 hover:bg-white/90 hover:shadow-2xl"
              >
                شروع رایگان
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function PricingCard({
  title,
  price,
  icon,
  description,
  cta,
  features,
  missing,
  highlighted = false,
  iconAccent = false,
}: {
  title: string;
  price: string;
  icon: React.ReactNode;
  description: string;
  cta: string;
  features: string[];
  missing?: string[];
  highlighted?: boolean;
  iconAccent?: boolean;
}) {
  return (
    <div
      className={`relative space-y-8 rounded-3xl border-2 bg-white p-10 transition-all duration-300 hover:shadow-xl ${
        highlighted ? 'scale-105 border-[#6366f1] shadow-2xl shadow-[#6366f1]/20' : ''
      }`}
    >
      {highlighted && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-gradient-to-r from-[#6366f1] to-purple-600 px-6 py-2 text-sm font-semibold text-white shadow-lg">پرطرفدارترین</span>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl ${
              highlighted
                ? 'bg-gradient-to-br from-[#6366f1] to-purple-600 shadow-lg shadow-[#6366f1]/30'
                : iconAccent
                  ? 'bg-gradient-to-br from-[#f59e0b] to-amber-600 shadow-lg shadow-[#f59e0b]/30'
                  : 'bg-gradient-to-br from-[#f3f4f6] to-[#f8f7ff]'
            }`}
          >
            {icon}
          </div>
          <h3 className="text-2xl font-bold">{title}</h3>
        </div>
        <div className="flex items-baseline gap-2">
          <span className={`text-5xl font-bold ${highlighted || iconAccent ? 'bg-gradient-to-r from-[#6366f1] to-purple-600 bg-clip-text text-transparent' : ''}`}>{price}</span>
          {price !== 'اختصاصی' && <span className="text-lg text-[#6b7280]">/ماه</span>}
        </div>
        <p className="leading-relaxed text-[#6b7280]">{description}</p>
      </div>

      <button
        type="button"
        className={`w-full rounded-xl py-4 font-semibold transition-all duration-300 ${
          highlighted
            ? 'bg-gradient-to-r from-[#6366f1] to-purple-600 text-white hover:shadow-xl hover:shadow-[#6366f1]/40'
            : 'border-2 hover:bg-[#f8f7ff]'
        }`}
      >
        {cta}
      </button>

      <div className="space-y-4 border-t pt-6">
        {features.map((feature) => (
          <div key={feature} className="flex items-start gap-3">
            <div className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${highlighted ? 'bg-gradient-to-br from-[#6366f1] to-purple-600' : 'bg-[#6366f1]/10'}`}>
              <Check className={`h-3 w-3 ${highlighted ? 'text-white' : 'text-[#6366f1]'}`} />
            </div>
            <span className="text-sm leading-relaxed">{feature}</span>
          </div>
        ))}
        {missing?.map((feature) => (
          <div key={feature} className="flex items-start gap-3">
            <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#f3f4f6]">
              <X className="h-3 w-3 text-[#6b7280]" />
            </div>
            <span className="text-sm leading-relaxed text-[#6b7280]">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const freeFeatures = ['دسترسی به بیش از ۲۰ آزمایشگاه رایگان', 'مسیرهای یادگیری پایه', 'پشتیبانی کامیونیتی', 'ردیابی پیشرفت'];
const freeNotIncluded = ['گواهی‌نامه', 'پروژه‌های پیشرفته', 'پشتیبانی اولویت‌دار'];
const proFeatures = ['همه امکانات پلن رایگان', 'دسترسی به بیش از ۵۰۰ آزمایشگاه', 'تمام مسیرهای یادگیری', 'گواهی‌های معتبر', 'پروژه‌های پیشرفته', 'پشتیبانی ایمیلی', 'دسترسی آفلاین به آزمایشگاه'];
const enterpriseFeatures = ['همه امکانات پلن حرفه‌ای', 'اعضای تیم نامحدود', 'مسیر یادگیری اختصاصی', 'داشبورد مدیریت', 'پشتیبانی ۲۴/۷', 'مدیر موفقیت اختصاصی', 'SSO و امنیت پیشرفته'];

const faqs = [
  {
    question: 'آیا هر زمان می‌توانم پلن را تغییر دهم؟',
    answer: 'بله. هر زمان می‌توانید پلن را ارتقا یا کاهش دهید و تغییرات در دوره بعدی اعمال می‌شود.',
  },
  {
    question: 'تخفیف دانشجویی دارید؟',
    answer: 'بله، با تایید معتبر دانشجویی تخفیف ارائه می‌شود. برای فعال‌سازی با پشتیبانی تماس بگیرید.',
  },
  {
    question: 'چه روش‌های پرداختی پشتیبانی می‌شود؟',
    answer: 'پرداخت با کارت‌های اعتباری اصلی و PayPal فعال است. برای سازمان‌ها پرداخت با فاکتور هم ممکن است.',
  },
  {
    question: 'لغو اشتراک امکان‌پذیر است؟',
    answer: 'بله. هر زمان می‌توانید لغو کنید و تا پایان دوره فعلی دسترسی خواهید داشت.',
  },
  {
    question: 'گواهی‌نامه‌ها معتبر هستند؟',
    answer: 'گواهی‌ها همسو با نیاز بازار هستند و برای نمایش مهارت عملی در فرآیند استخدام کاربرد دارند.',
  },
];
