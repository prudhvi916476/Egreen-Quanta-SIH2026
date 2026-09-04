/**
 * Egreen Quanta — Learning & Assessment Main Entry Point
 *
 * One unified entry point exporting courses, lessons, quizzes,
 * quantum challenges, progress tracking, and recommendations.
 */

import { Course, Module, Lesson } from "./types";
import {
  courseQuantumFundamentals,
  moduleQuantumBasics,
} from "./courses/quantum-fundamentals";
import qubitsLesson from "./lessons/qubits";
import superpositionLesson from "./lessons/superposition";
import entanglementLesson from "./lessons/entanglement";

// ─── Courses, Modules & Lessons ───────────────────────────────
export const courses: Course[] = [courseQuantumFundamentals];
export const modules: Module[] = [moduleQuantumBasics];
export const lessons: Lesson[] = [
  qubitsLesson,
  superpositionLesson,
  entanglementLesson,
];

// ─── Helper Functions: Courses & Lessons ──────────────────────

/** Look up a course by its ID */
export function getCourseById(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}

/** Look up a module by its ID */
export function getModuleById(id: string): Module | undefined {
  return modules.find((m) => m.id === id);
}

/** Look up a lesson by its ID */
export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}

/** Get all lessons in a module, in order */
export function getLessonsByModuleId(moduleId: string): Lesson[] {
  const mod = getModuleById(moduleId);
  if (!mod) return [];
  return mod.lessonIds
    .map((lid) => getLessonById(lid))
    .filter((l): l is Lesson => l !== undefined);
}

// ─── Re-export Quizzes ────────────────────────────────────────
export * from "./quizzes";

// ─── Re-export Challenges ─────────────────────────────────────
export * from "./challenges";

// ─── Re-export Progress & Recommendations ─────────────────────
export * from "./progress";

// ─── Re-export All Types ──────────────────────────────────────
export type {
  Course,
  Module,
  Lesson,
  LessonSection,
  LearningObjective,
  Activity,
  Quiz,
  QuizOption,
  QuizQuestion,
  QuizSubmission,
  QuizQuestionResult,
  QuizResult,
  CircuitOperation,
  CircuitData,
  ChallengeRequirement,
  ChallengeRequirementResult,
  ChallengeEvaluationResult,
  QuantumChallenge,
  MasteryLevel,
  TopicRecommendation,
  UserProgress,
} from "./types";
