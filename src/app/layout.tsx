import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata: Metadata = {
  title: 'LabCraft | Professional Learning Platform',
  description: 'A modern Persian-first hands-on learning platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <AuthProvider>
          <Header />
          <main className="mx-auto min-h-[calc(100vh-220px)] w-full max-w-6xl px-4 py-6">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
