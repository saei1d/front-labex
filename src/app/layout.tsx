import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from './context/AuthContext';
import AntdProvider from './components/AntdProvider';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata: Metadata = {
  title: 'اسکیل‌لب',
  description: 'یادگیری مهارت‌های فنی با آزمایشگاه‌های تعاملی',
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const iranSans = localFont({
  src: [
    {
      path: '../../public/fonts/woff/IRANSansX-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/woff/IRANSansX-Medium.woff',
      weight: '500',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-iransans',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="ltr" className={`${iranSans.variable} ${inter.variable}`}>
      <body>
        <AntdProvider>
          <AuthProvider>
            <div className="min-h-screen bg-white text-[#1a1625]">
              <Header />
              <main className="min-h-[calc(100vh-160px)]">{children}</main>
              <Footer />
            </div>
          </AuthProvider>
        </AntdProvider>
      </body>
    </html>
  );
}
