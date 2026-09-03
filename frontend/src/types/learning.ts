// Learning platform types for courses, lessons, and progress

export type LessonType = 'concept' | 'experiment' | 'quiz' | 'challenge';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';
export type LessonStatus = 'not-started' | 'in-progress' | 'completed';

export interface LearningObjective {
  id: string;
  text: string;
}

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: LessonType;
  durationMinutes: number;
  status: LessonStatus;
  objectives: LearningObjective[];
  hasExperiment: boolean;
  experimentId?: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  totalDurationMinutes: number;
  modules: Module[];
  progress: number; // 0-100
  lastViewedLessonId?: string;
  thumbnail?: string;
  tags: string[];
}

export interface Experiment {
  id: string;
  title: string;
  circuitDescription: string;
  backend: string;
  shots: number;
  result?: string;
  completedAt?: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface LearnerProgress {
  userId: string;
  overallMastery: number; // 0-100
  streak: number; // days
  totalLessonsCompleted: number;
  totalExperimentsCompleted: number;
  totalChallengesCompleted: number;
  courseProgress: Record<string, number>; // courseId -> 0-100
  lessonStatuses: Record<string, LessonStatus>; // lessonId -> status
  lastActivity: string;
}

export interface Challenge {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  type: 'circuit' | 'quiz';
  status: 'not-started' | 'in-progress' | 'passed' | 'failed';
  score?: number;
  expectedCircuit?: {
    description: string;
    hint: string;
  };
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
