'use client';

import { AppShell } from '@/components/layout/AppShell';
import { useUser } from '@/contexts/UserContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import Link from 'next/link';
import { PlayCircle, Award, Target, Beaker, Clock, BookOpen, CheckCircle2, AlertCircle } from 'lucide-react';
import { COURSES } from '@/data/courseContent';

export default function DashboardPage() {
  const { user, progress, isLoading } = useUser();

  if (isLoading) return null;
  if (!user) {
    return (
      <AppShell>
        <div className="container-app py-16 text-center">
          <p className="text-[var(--muted-foreground)]">Please log in to view your dashboard.</p>
        </div>
      </AppShell>
    );
  }

  const mainCourse = COURSES[0];
  const courseProgress = progress?.courseProgress[mainCourse.id] || 68;

  return (
    <AppShell>
      <div className="bg-[var(--background)] min-h-screen py-8 md:py-12">
        <div className="container-app">
          
          {/* Welcome Header */}
          <div className="mb-8 border-b border-[var(--border)] pb-6">
            <h1 className="text-page-title mb-1">
              Welcome back, {user.name.split(' ')[0]} 👋
            </h1>
            <p className="text-[var(--muted-foreground)] text-sm">
              Continue learning where you left off.
            </p>
          </div>

          {/* LEARNING STATS BAR */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white border-[var(--border)] shadow-sm">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-[var(--primary)] flex items-center justify-center shrink-0">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[var(--foreground)]">{progress?.overallMastery || 62}%</div>
                  <div className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">Overall Mastery</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-[var(--border)] shadow-sm">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[var(--foreground)]">{progress?.streak || 3} Days</div>
                  <div className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">Learning Streak</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-[var(--border)] shadow-sm">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Beaker className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[var(--foreground)]">{progress?.totalExperimentsCompleted || 2}</div>
                  <div className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">Experiments</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-[var(--border)] shadow-sm">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[var(--foreground)]">{progress?.totalLessonsCompleted || 1} / 3</div>
                  <div className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">Lessons Done</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Main Column (8 cols) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* CONTINUE LEARNING CARD */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-3">
                  Continue Learning
                </h2>
                <Card className="bg-white border-[var(--border-strong)] shadow-sm overflow-hidden">
                  <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-indigo-50 text-[var(--primary)] uppercase tracking-wider">
                          {mainCourse.difficulty}
                        </span>
                        <span className="text-xs text-[var(--muted-foreground)] flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" /> {mainCourse.totalDurationMinutes} mins
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-[var(--foreground)]">{mainCourse.title}</h3>
                      
                      <div className="p-3.5 rounded-lg bg-[var(--background)] border border-[var(--border)]">
                        <div className="flex justify-between items-center text-xs font-medium text-[var(--foreground)] mb-2">
                          <span>Current Lesson: <strong className="text-[var(--primary)]">Superposition</strong></span>
                          <span>{courseProgress}% Complete</span>
                        </div>
                        <ProgressBar value={courseProgress} />
                      </div>
                    </div>

                    <Link href={`/courses/${mainCourse.slug}/superposition`} className="shrink-0 w-full md:w-auto">
                      <Button size="lg" className="w-full md:w-auto">
                        <PlayCircle className="mr-2 h-5 w-5" /> Continue Learning
                      </Button>
                    </Link>
                  </div>
                </Card>
              </div>

              {/* MY LEARNING GRID */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-3">
                  My Enrolled Courses
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {COURSES.map((c) => (
                    <Card key={c.id} className="bg-white border-[var(--border)] shadow-sm flex flex-col justify-between">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)] mb-2">
                          <span className="font-semibold uppercase text-indigo-600">{c.difficulty}</span>
                          <span>{c.totalDurationMinutes} mins</span>
                        </div>
                        <h4 className="font-bold text-base text-[var(--foreground)] mb-2">{c.title}</h4>
                        <p className="text-xs text-[var(--muted-foreground)] line-clamp-2 mb-4">{c.description}</p>
                        
                        <div className="mt-auto pt-4 border-t border-[var(--border)]">
                          <div className="flex justify-between text-xs font-medium mb-1.5">
                            <span>Progress</span>
                            <span>{courseProgress}%</span>
                          </div>
                          <ProgressBar value={courseProgress} />
                        </div>
                      </CardContent>
                      <div className="p-4 bg-gray-50 border-t border-[var(--border)] flex justify-end">
                        <Link href={`/courses/${c.slug}`}>
                          <Button variant="outline" size="sm">Course Overview</Button>
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* RECENT EXPERIMENTS LIST */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-3">
                  Recent Experiments
                </h2>
                <Card className="bg-white border-[var(--border)] shadow-sm overflow-hidden">
                  <div className="divide-y divide-[var(--border)] text-sm">
                    <div className="p-4 flex items-center justify-between hover:bg-[var(--background)] transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-[var(--foreground)]">H-Gate Superposition</div>
                          <div className="text-xs text-[var(--muted-foreground)] font-mono">Qiskit Aer • 100 shots</div>
                        </div>
                      </div>
                      <span className="text-xs font-medium px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Completed
                      </span>
                    </div>

                    <div className="p-4 flex items-center justify-between hover:bg-[var(--background)] transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                          <AlertCircle className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-[var(--foreground)]">Bell State Attempt</div>
                          <div className="text-xs text-[var(--muted-foreground)] font-mono">PennyLane • 1000 shots</div>
                        </div>
                      </div>
                      <span className="text-xs font-medium px-2.5 py-1 rounded bg-red-50 text-red-700 border border-red-200">
                        Failed
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 border-t border-[var(--border)] text-center">
                    <Link href="/circuit-lab" className="text-xs font-semibold text-[var(--primary)] hover:underline">
                      Open Circuit Lab →
                    </Link>
                  </div>
                </Card>
              </div>

            </div>

            {/* Side Column (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* RECOMMENDED NEXT CARD */}
              <Card className="bg-white border-[var(--border)] shadow-sm">
                <CardHeader className="pb-3 border-b border-[var(--border)]">
                  <CardTitle className="text-sm uppercase tracking-wider text-[var(--muted-foreground)] font-bold">
                    Recommended Next
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 text-[var(--primary)] flex items-center justify-center mb-4">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-lg text-[var(--foreground)] mb-2">Entanglement</h3>
                  <p className="text-xs text-[var(--muted-foreground)] leading-relaxed mb-6">
                    You've mastered superposition. Continue by learning how multiple qubits can become correlated using H and CNOT gates.
                  </p>
                  <Link href={`/courses/${mainCourse.slug}/entanglement`}>
                    <Button className="w-full">
                      Start Lesson
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* QUICK LINKS & RESOURCES */}
              <Card className="bg-white border-[var(--border)] shadow-sm">
                <CardHeader className="pb-3 border-b border-[var(--border)]">
                  <CardTitle className="text-sm uppercase tracking-wider text-[var(--muted-foreground)] font-bold">
                    Quick Tools
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 divide-y divide-[var(--border)] text-sm">
                  <Link href="/circuit-lab" className="py-2.5 flex items-center justify-between font-medium hover:text-[var(--primary)]">
                    <span>Quantum Circuit Sandbox</span>
                    <span className="text-xs text-[var(--muted-foreground)]">Launch →</span>
                  </Link>
                  <Link href="/tutor" className="py-2.5 flex items-center justify-between font-medium hover:text-[var(--primary)]">
                    <span>Quanta AI Assistant</span>
                    <span className="text-xs text-[var(--muted-foreground)]">Chat →</span>
                  </Link>
                  <Link href="/challenges" className="py-2.5 flex items-center justify-between font-medium hover:text-[var(--primary)]">
                    <span>Bell State Challenge</span>
                    <span className="text-xs text-[var(--muted-foreground)]">Solve →</span>
                  </Link>
                </CardContent>
              </Card>

            </div>

          </div>

        </div>
      </div>
    </AppShell>
  );
}
