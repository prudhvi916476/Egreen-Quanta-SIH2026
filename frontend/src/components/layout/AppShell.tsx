'use client';

import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { MobileNav } from './MobileNav';
import { Footer } from './Footer';
import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar'; // we'll use this specifically for course/lesson pages

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  
  // Specific layouts based on route
  const isLessonPage = pathname.startsWith('/courses/') && pathname.split('/').length > 3;
  const isCircuitLab = pathname.startsWith('/circuit-lab');
  const isCoursePage = isLessonPage;
  const courseSlug = isLessonPage ? pathname.split('/')[2] : null;

  // Circuit lab has a specific full-height layout, normal pages scroll normally.
  if (isCircuitLab) {
    return (
      <div className="h-screen bg-[var(--background)] flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-hidden relative">
          {children}
        </main>
      </div>
    );
  }

  // Lesson pages have a sidebar layout
  if (isLessonPage && courseSlug) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex flex-col">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar courseSlug={courseSlug} />
          <main className="flex-1 overflow-y-auto">
            {children}
            <Footer />
          </main>
        </div>
        <MobileNav />
      </div>
    );
  }

  // Default layout (Landing, Dashboard, Courses, etc.)
  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}
