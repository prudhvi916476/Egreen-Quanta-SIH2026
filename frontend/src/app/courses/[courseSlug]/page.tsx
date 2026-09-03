'use client';

import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import Link from 'next/link';
import { PlayCircle, Clock, BookOpen, CheckCircle2, ChevronRight, Circle } from 'lucide-react';
import { getCourse } from '@/data/courseContent';
import { useUser } from '@/contexts/UserContext';
import { notFound } from 'next/navigation';

export default function CourseOverviewPage({ params }: { params: { courseSlug: string } }) {
  const course = getCourse(params.courseSlug);
  const { progress } = useUser();

  if (!course) {
    notFound();
  }

  const courseProgress = progress?.courseProgress[course.id] || 68;
  const isStarted = courseProgress > 0;
  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <AppShell>
      <div className="bg-white border-b border-[var(--border)] py-12 md:py-16">
        <div className="container-app">
          
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--muted-foreground)] mb-6">
            <Link href="/courses" className="hover:text-[var(--primary)]">Courses</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[var(--foreground)]">{course.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-indigo-50 text-[var(--primary)]">
                  {course.difficulty}
                </span>
                <span className="text-xs text-[var(--muted-foreground)] flex items-center gap-1 font-medium">
                  <Clock className="h-3.5 w-3.5" /> {course.totalDurationMinutes} minutes total
                </span>
                <span className="text-xs text-[var(--muted-foreground)] flex items-center gap-1 font-medium">
                  <BookOpen className="h-3.5 w-3.5" /> {totalLessons} lessons
                </span>
              </div>

              <h1 className="text-page-title mb-4">{course.title}</h1>
              
              <p className="text-base text-[var(--muted-foreground)] leading-relaxed mb-8 max-w-3xl">
                {course.description}
              </p>

              <div className="flex items-center gap-4">
                <Link href={`/courses/${course.slug}/superposition`}>
                  <Button size="lg">
                    <PlayCircle className="mr-2 h-5 w-5" /> 
                    {isStarted ? 'CONTINUE COURSE' : 'START COURSE'}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Course Summary Box */}
            <div className="lg:col-span-4">
              <Card className="bg-white border-[var(--border-strong)] shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-bold text-sm text-[var(--foreground)] mb-4">Course Progress</h3>
                  <div className="text-3xl font-extrabold text-[var(--primary)] mb-2">{courseProgress}%</div>
                  <ProgressBar value={courseProgress} className="mb-4" />
                  <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                    You have completed 1 of 3 lessons in this course. Continue to unlock entanglement and multi-qubit gates.
                  </p>
                </CardContent>
              </Card>
            </div>

          </div>

        </div>
      </div>

      {/* CURRICULUM SECTION */}
      <div className="bg-[var(--background)] py-12 md:py-16">
        <div className="container-app">
          <div className="max-w-4xl">
            <h2 className="text-section-title mb-6">Course Curriculum</h2>

            <div className="space-y-6">
              {course.modules.map((module, i) => (
                <Card key={module.id} className="bg-white border-[var(--border)] shadow-sm overflow-hidden">
                  <div className="p-4 bg-gray-50 border-b border-[var(--border)] flex justify-between items-center">
                    <h3 className="font-bold text-sm text-[var(--foreground)]">
                      Module {i + 1}: {module.title}
                    </h3>
                    <span className="text-xs text-[var(--muted-foreground)] font-medium">
                      {module.lessons.length} Lessons
                    </span>
                  </div>

                  <div className="divide-y divide-[var(--border)]">
                    {module.lessons.map((lesson, j) => {
                      const status = progress?.lessonStatuses[lesson.id] || (j === 0 ? 'completed' : j === 1 ? 'in-progress' : 'not-started');
                      
                      return (
                        <Link 
                          key={lesson.id} 
                          href={`/courses/${course.slug}/${lesson.slug}`}
                          className="p-5 flex items-center justify-between hover:bg-indigo-50/40 transition-colors group"
                        >
                          <div className="flex items-center gap-4">
                            <span className="font-mono text-xs text-[var(--muted-foreground)] font-bold w-4">{j + 1}.</span>
                            <div>
                              <div className="font-bold text-sm text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                                {lesson.title}
                              </div>
                              <div className="text-xs text-[var(--muted-foreground)] mt-0.5">
                                {lesson.description}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 shrink-0">
                            <span className="text-xs text-[var(--muted-foreground)] font-mono">{lesson.durationMinutes}m</span>
                            {status === 'completed' ? (
                              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded">
                                <CheckCircle2 className="h-3.5 w-3.5" /> Completed
                              </span>
                            ) : status === 'in-progress' ? (
                              <span className="flex items-center gap-1 text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded">
                                <PlayCircle className="h-3.5 w-3.5" /> In Progress
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded">
                                <Circle className="h-3.5 w-3.5" /> Not Started
                              </span>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </Card>
              ))}
            </div>

          </div>
        </div>
      </div>
    </AppShell>
  );
}
