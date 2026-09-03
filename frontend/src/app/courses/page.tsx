'use client';

import { AppShell } from '@/components/layout/AppShell';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import Link from 'next/link';
import { BookOpen, Clock, PlayCircle } from 'lucide-react';
import { COURSES } from '@/data/courseContent';
import { useUser } from '@/contexts/UserContext';

export default function CoursesPage() {
  const { progress } = useUser();

  return (
    <AppShell>
      <div className="bg-[var(--background)] min-h-screen py-10 md:py-16">
        <div className="container-app">
          
          <div className="mb-10 border-b border-[var(--border)] pb-6">
            <h1 className="text-page-title mb-2">Course Catalog</h1>
            <p className="text-[var(--muted-foreground)] max-w-2xl text-base">
              Explore our structured quantum computing curriculum designed to build your intuition step-by-step from fundamental principles to complex multi-qubit algorithms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSES.map((course) => {
              const courseProgress = progress?.courseProgress[course.id] || 68;
              const isStarted = courseProgress > 0;
              const lessonCount = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);

              return (
                <Card key={course.id} className="bg-white border-[var(--border)] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden">
                  <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-6 text-white h-36 flex flex-col justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/30 border border-indigo-400/30 text-indigo-200 self-start">
                      {course.difficulty}
                    </span>
                    <h2 className="text-xl font-bold line-clamp-1">{course.title}</h2>
                  </div>

                  <CardContent className="p-6 flex-1 flex flex-col justify-between">
                    <p className="text-xs text-[var(--muted-foreground)] leading-relaxed mb-6 line-clamp-3">
                      {course.description}
                    </p>

                    <div>
                      <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)] mb-4 pt-4 border-t border-[var(--border)] font-medium">
                        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {course.totalDurationMinutes} mins</span>
                        <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" /> {lessonCount} Lessons</span>
                      </div>

                      {isStarted && (
                        <div className="mb-4">
                          <div className="flex justify-between text-xs font-semibold text-[var(--foreground)] mb-1.5">
                            <span>Progress</span>
                            <span>{courseProgress}%</span>
                          </div>
                          <ProgressBar value={courseProgress} />
                        </div>
                      )}

                      <Link href={`/courses/${course.slug}`}>
                        <Button variant={isStarted ? "default" : "outline"} className="w-full">
                          {isStarted ? (
                            <><PlayCircle className="mr-2 h-4 w-4" /> Continue Course</>
                          ) : (
                            'Start Course'
                          )}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

        </div>
      </div>
    </AppShell>
  );
}
