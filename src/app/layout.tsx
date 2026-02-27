import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata: Metadata = {
  title: 'LabEx Clone',
  description: 'Hands-on lab learning platform powered by your API',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="bg-slate-50 text-slate-900">
        <AuthProvider>
          <Header />
          <main className="container mx-auto min-h-[calc(100vh-136px)] px-4 py-6">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
