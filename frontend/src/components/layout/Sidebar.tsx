'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PlayCircle, CheckCircle2, Circle, ChevronLeft } from 'lucide-react';
import { getCourse } from '@/data/courseContent';
import { useUser } from '@/contexts/UserContext';
import { cn } from '@/lib/utils';
import { ProgressBar } from '@/components/ui/ProgressBar';

export function Sidebar({ courseSlug }: { courseSlug: string }) {
  const pathname = usePathname();
  const { progress } = useUser();
  const course = getCourse(courseSlug);
  
  if (!course) return null;

  const courseProgress = progress?.courseProgress[course.id] || 68;
  
  return (
    <aside className="hidden md:flex flex-col w-[var(--sidebar-width)] border-r border-[var(--border)] bg-white h-[calc(100vh-var(--nav-height))] overflow-y-auto shrink-0 sticky top-[var(--nav-height)]">
      
      {/* Sidebar Header */}
      <div className="p-5 border-b border-[var(--border)] bg-gray-50/50">
        <Link href={`/courses/${course.slug}`} className="inline-flex items-center text-xs font-semibold text-[var(--muted-foreground)] hover:text-[var(--primary)] mb-3">
          <ChevronLeft className="h-3.5 w-3.5 mr-1" /> Back to Course Overview
        </Link>
        <h2 className="font-bold text-sm text-[var(--foreground)] mb-3 line-clamp-1">{course.title}</h2>
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-medium text-[var(--muted-foreground)]">
            <span>Course Progress</span>
            <span>{courseProgress}%</span>
          </div>
          <ProgressBar value={courseProgress} />
        </div>
      </div>

      {/* Curriculum Module List */}
      <div className="flex-1 py-3">
        {course.modules.map((module, modIdx) => (
          <div key={module.id} className="mb-4">
            <div className="px-5 py-2 text-[11px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider bg-gray-50 border-y border-[var(--border)]">
              Module {modIdx + 1}: {module.title}
            </div>
            <ul className="divide-y divide-gray-100">
              {module.lessons.map((lesson, lessonIdx) => {
                const href = `/courses/${course.slug}/${lesson.slug}`;
                const isActive = pathname === href;
                const status = progress?.lessonStatuses[lesson.id] || (lessonIdx === 0 ? 'completed' : lessonIdx === 1 ? 'in-progress' : 'not-started');
                
                return (
                  <li key={lesson.id}>
                    <Link
                      href={href}
                      className={cn(
                        "flex items-start gap-3 px-5 py-3 transition-colors text-xs font-medium",
                        isActive 
                          ? "bg-indigo-50/70 text-[var(--primary)] font-semibold border-l-4 border-[var(--primary)] pl-4" 
                          : "hover:bg-gray-50 text-[var(--foreground)]"
                      )}
                    >
                      {status === 'completed' ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : status === 'in-progress' || isActive ? (
                        <PlayCircle className={cn("h-4 w-4 shrink-0 mt-0.5", isActive ? "text-[var(--primary)]" : "text-gray-400")} />
                      ) : (
                        <Circle className="h-4 w-4 text-gray-300 shrink-0 mt-0.5" />
                      )}
                      
                      <div className="flex flex-col overflow-hidden">
                        <span className="truncate">{lesson.title}</span>
                        <span className="text-[11px] text-[var(--muted-foreground)] font-normal mt-0.5">
                          {lesson.durationMinutes} min
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

    </aside>
  );
}
