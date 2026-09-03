'use client';

import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { getLesson, getAdjacentLessons, LESSON_CONTENT } from '@/data/courseContent';
import { useUser } from '@/contexts/UserContext';
import { updateLessonStatus } from '@/services/progressApi';
import { notFound, useRouter } from 'next/navigation';
import { CheckCircle2, ChevronLeft, ChevronRight, Target, BrainCircuit, ExternalLink, Sparkles, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function LessonPage({ params }: { params: { courseSlug: string, lessonSlug: string } }) {
  const lessonData = getLesson(params.courseSlug, params.lessonSlug);
  const { progress, refreshProgress } = useUser();
  const router = useRouter();

  if (!lessonData) {
    notFound();
  }

  const { lesson, course } = lessonData;
  const content = LESSON_CONTENT[lesson.slug];
  const { prev, next } = getAdjacentLessons(params.courseSlug, params.lessonSlug);
  const status = progress?.lessonStatuses[lesson.id] || (lesson.slug === 'qubits' ? 'completed' : lesson.slug === 'superposition' ? 'in-progress' : 'not-started');

  const handleMarkComplete = async () => {
    if (status !== 'completed') {
      await updateLessonStatus(lesson.id, 'completed');
      await refreshProgress();
    }
    if (next) {
      router.push(`/courses/${course.slug}/${next.slug}`);
    } else {
      router.push(`/courses/${course.slug}`);
    }
  };

  return (
    <AppShell>
      <div className="bg-[var(--background)] min-h-screen py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          
          {/* Header Metadata */}
          <div className="mb-8 border-b border-[var(--border)] pb-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--muted-foreground)] mb-2 uppercase tracking-wider">
              <span>{course.title}</span>
              <span>•</span>
              <span className="text-[var(--primary)]">Lesson {lesson.slug === 'qubits' ? '1' : lesson.slug === 'superposition' ? '2' : '3'} of 3</span>
            </div>
            
            <h1 className="text-page-title mb-4">{lesson.title}</h1>
            
            <div className="flex items-center gap-4 text-xs font-medium text-[var(--muted-foreground)]">
              <span className="flex items-center gap-1.5"><BrainCircuit className="h-4 w-4 text-[var(--primary)]" /> {lesson.type}</span>
              <span>•</span>
              <span>{lesson.durationMinutes} min reading & experiment</span>
            </div>
          </div>

          {/* LEARNING OBJECTIVES CARD */}
          <Card className="bg-indigo-50/50 border-indigo-100 mb-8 shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-bold text-sm text-indigo-900 mb-3 flex items-center gap-2">
                <Target className="h-4 w-4 text-[var(--primary)]" /> Learning Objectives
              </h3>
              <ul className="space-y-2">
                {lesson.objectives.map(obj => (
                  <li key={obj.id} className="flex items-start gap-2.5 text-xs text-indigo-950 leading-relaxed font-medium">
                    <CheckCircle2 className="h-4 w-4 text-[var(--primary)] shrink-0 mt-0.5" />
                    <span>{obj.text}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* MAIN LESSON BODY */}
          <div className="bg-white border border-[var(--border)] rounded-xl p-6 md:p-10 shadow-sm mb-8 space-y-8 text-[var(--foreground)]">
            <p className="text-base md:text-lg leading-relaxed text-gray-800 font-medium">
              {content?.intro}
            </p>
            
            {content?.sections.map((sec, i) => (
              <div key={i} className="space-y-3">
                <h2 className="text-xl font-bold text-gray-900 pt-2 border-t border-[var(--border)]">{sec.title}</h2>
                
                {sec.type === 'callout' ? (
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-md text-xs text-amber-900 leading-relaxed font-medium my-4">
                    {sec.body}
                  </div>
                ) : sec.type === 'equation' ? (
                  <div className="bg-gray-50 border border-[var(--border)] p-4 rounded-lg text-xs font-mono text-gray-900 leading-relaxed my-4">
                    {sec.body}
                  </div>
                ) : (
                  <p className="text-sm md:text-base leading-relaxed text-gray-700">{sec.body}</p>
                )}
              </div>
            ))}

            {/* HANDS-ON EXPERIMENT CALLTOACTION CARD */}
            {lesson.hasExperiment && content?.experimentPrompt && (
              <div className="mt-10 p-6 md:p-8 rounded-xl bg-slate-900 text-white shadow-md border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="h-4 w-4" /> Integrated Circuit Experiment
                </div>
                
                <h3 className="text-xl font-bold text-white">Try it in the Quantum Circuit Lab</h3>
                
                <p className="text-slate-300 text-xs md:text-sm leading-relaxed max-w-2xl">
                  {content.experimentPrompt}
                </p>

                <div className="pt-2">
                  <Link href="/circuit-lab">
                    <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500 text-white border-none shadow-md">
                      Open Circuit Lab <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* BOTTOM NAVIGATION CONTROLS */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[var(--border)]">
            {prev ? (
              <Link href={`/courses/${course.slug}/${prev.slug}`}>
                <Button variant="outline">
                  <ChevronLeft className="mr-2 h-4 w-4" /> Previous Lesson
                </Button>
              </Link>
            ) : (
              <div />
            )}

            <Button 
              onClick={handleMarkComplete} 
              className="w-full sm:w-auto"
            >
              {status === 'completed' ? (
                <><CheckCircle2 className="mr-2 h-4 w-4 text-emerald-300" /> Completed & Continue</>
              ) : (
                'Mark Complete & Continue'
              )}
              {next && <ChevronRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>

        </div>
      </div>
    </AppShell>
  );
}
