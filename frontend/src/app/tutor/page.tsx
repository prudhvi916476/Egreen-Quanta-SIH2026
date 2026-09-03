'use client';

import { AppShell } from '@/components/layout/AppShell';
import { TutorPanel } from '@/components/tutor/TutorPanel';

export default function TutorPage() {
  return (
    <AppShell>
      <div className="container mx-auto max-w-4xl px-4 py-8 h-[calc(100vh-var(--nav-height))] flex flex-col">
        <div className="mb-6">
          <h1 className="text-display mb-2">Quanta Tutor</h1>
          <p className="text-[var(--text-secondary)]">Your personal AI assistant for learning quantum mechanics.</p>
        </div>
        <div className="flex-1 min-h-0 pb-8">
          <div className="h-full w-full shadow-md">
            <TutorPanel />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
