'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useContext(AuthContext)!;

  return (
    <header className="bg-blue-500 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">LabEx</Link>
        <div>
          <Link href="/courses" className="mx-2">Courses</Link>
          <Link href="/labs" className="mx-2">Labs</Link>
          {user ? (
            <>
              <span className="mx-2">{user.email}</span>
              <button onClick={logout} className="mx-2">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="mx-2">Login</Link>
              <Link href="/register" className="mx-2">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}