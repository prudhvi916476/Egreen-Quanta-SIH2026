// Progress API Service — MOCK adapter for Person 4's learning/progress backend
// INTEGRATION POINT: Replace mock data with real Person 4 API calls when available.

import type { LearnerProgress, LessonStatus } from '@/types/learning';

// MOCK — replace with real Person 4 API URL
const PROGRESS_API_BASE = process.env.NEXT_PUBLIC_PROGRESS_API_URL ?? null;

const MOCK_PROGRESS: LearnerProgress = {
  userId: 'demo-user',
  overallMastery: 62,
  streak: 3,
  totalLessonsCompleted: 1,
  totalExperimentsCompleted: 2,
  totalChallengesCompleted: 0,
  courseProgress: {
    'quantum-computing-fundamentals': 68,
  },
  lessonStatuses: {
    qubits: 'completed',
    superposition: 'in-progress',
    entanglement: 'not-started',
  },
  lastActivity: new Date().toISOString(),
};

let _progress = { ...MOCK_PROGRESS };

export async function getProgress(): Promise<LearnerProgress> {
  try {
    const response = await fetch('/api/progress');
    if (response.ok) {
      const backendData = await response.json();
      
      // Map the backend UserProgress model to the frontend LearnerProgress interface
      return {
        userId: backendData.user_id || 'demo-user',
        overallMastery: backendData.overall_progress_percentage || 62,
        streak: 3, // Fallback since it's not in the backend model
        totalLessonsCompleted: backendData.completed_lessons?.length || 1,
        totalExperimentsCompleted: backendData.recent_experiments?.length || 2,
        totalChallengesCompleted: 0,
        courseProgress: {
          'quantum-computing-fundamentals': backendData.overall_progress_percentage || 68,
        },
        lessonStatuses: {
          qubits: 'completed',
          superposition: 'in-progress',
          entanglement: 'not-started',
        },
        lastActivity: new Date().toISOString(),
      };
    }
    console.error('Failed to get progress from backend, falling back to mock');
  } catch (e) {
    console.error('Failed to connect to backend, falling back to mock', e);
  }
  return { ..._progress };
}

export async function updateLessonStatus(lessonId: string, status: LessonStatus): Promise<void> {
  // INTEGRATION POINT: if (PROGRESS_API_BASE) { await fetch(`${PROGRESS_API_BASE}/progress/lesson`, ...) }
  await new Promise((r) => setTimeout(r, 150));
  _progress.lessonStatuses[lessonId] = status;
  if (status === 'completed') {
    _progress.totalLessonsCompleted = Object.values(_progress.lessonStatuses).filter(s => s === 'completed').length;
  }
}

export async function incrementExperiments(): Promise<void> {
  await new Promise((r) => setTimeout(r, 100));
  _progress.totalExperimentsCompleted += 1;
}

export async function incrementChallenges(): Promise<void> {
  await new Promise((r) => setTimeout(r, 100));
  _progress.totalChallengesCompleted += 1;
}

void PROGRESS_API_BASE;
