import {
  UserProgress,
  MasteryLevel,
  QuizResult,
  ChallengeEvaluationResult,
} from "../types";
import { getNextRecommendation } from "./recommendations";

/**
 * Calculates the learner's mastery level from their cumulative platform score.
 */
export function calculateMasteryLevel(score: number): MasteryLevel {
  if (score >= 600) return "Quantum Pioneer";
  if (score >= 400) return "Quantum Explorer";
  if (score >= 150) return "Apprentice";
  return "Novice";
}

/**
 * Calculates the overall progress percentage (0 - 100%) across all curriculum items:
 * - 3 Core Lessons (10% each = 30%)
 * - 3 Quizzes (10% each = 30%)
 * - Circuit Experiments (15%)
 * - Flagship Bell-State Challenge (25%)
 */
export function calculateProgressPercentage(
  completedLessons: string[],
  completedQuizzes: Record<string, number>,
  completedChallenges: string[],
  recentExperiments: string[]
): number {
  let progress = 0;

  // Lessons: up to 30%
  const lessonCount = Math.min(completedLessons.length, 3);
  progress += lessonCount * 10;

  // Quizzes: up to 30%
  const passedQuizzesCount = Math.min(
    Object.keys(completedQuizzes).length,
    3
  );
  progress += passedQuizzesCount * 10;

  // Experiments: up to 15%
  const hasHGateExp = recentExperiments.some((e) =>
    e.toLowerCase().includes("h-gate")
  );
  const hasBellExp = recentExperiments.some((e) =>
    e.toLowerCase().includes("bell")
  );
  if (hasHGateExp) progress += 8;
  if (hasBellExp) progress += 7;

  // Bell-State Challenge: 25%
  if (completedChallenges.includes("challenge-bell-state")) {
    progress += 25;
  }

  return Math.min(100, Math.round(progress));
}

/**
 * Updates a learner's progress upon successfully completing a lesson.
 */
export function completeLesson(
  current: UserProgress,
  lessonId: string
): UserProgress {
  if (current.completedLessons.includes(lessonId)) {
    return current; // already completed
  }

  const completedLessons = [...current.completedLessons, lessonId];
  const newScore = current.score + 50;
  const overallProgressPercentage = calculateProgressPercentage(
    completedLessons,
    current.completedQuizzes,
    current.completedChallenges,
    current.recentExperiments
  );
  const masteryLevel = calculateMasteryLevel(newScore);

  const updated: UserProgress = {
    ...current,
    completedLessons,
    score: newScore,
    overallProgressPercentage,
    masteryLevel,
    recommendedTopic: current.recommendedTopic, // placeholder for now
  };

  updated.recommendedTopic = getNextRecommendation(updated);
  return updated;
}

/**
 * Updates a learner's progress when a quiz assessment is evaluated.
 */
export function recordQuizResult(
  current: UserProgress,
  result: QuizResult
): UserProgress {
  const previousScore = current.completedQuizzes[result.quizId] || 0;
  const pointsEarned = Math.max(0, result.score - previousScore);

  const completedQuizzes = {
    ...current.completedQuizzes,
    [result.quizId]: Math.max(previousScore, result.score),
  };

  const newScore = current.score + pointsEarned;
  const overallProgressPercentage = calculateProgressPercentage(
    current.completedLessons,
    completedQuizzes,
    current.completedChallenges,
    current.recentExperiments
  );
  const masteryLevel = calculateMasteryLevel(newScore);

  const updated: UserProgress = {
    ...current,
    completedQuizzes,
    score: newScore,
    overallProgressPercentage,
    masteryLevel,
    recommendedTopic: current.recommendedTopic,
  };

  updated.recommendedTopic = getNextRecommendation(updated);
  return updated;
}

/**
 * Records an experiment run from the Circuit Lab into the learner's recent history.
 */
export function recordExperiment(
  current: UserProgress,
  experimentTitle: string
): UserProgress {
  const filtered = current.recentExperiments.filter((e) => e !== experimentTitle);
  const recentExperiments = [experimentTitle, ...filtered].slice(0, 5);

  const overallProgressPercentage = calculateProgressPercentage(
    current.completedLessons,
    current.completedQuizzes,
    current.completedChallenges,
    recentExperiments
  );

  const updated: UserProgress = {
    ...current,
    recentExperiments,
    overallProgressPercentage,
  };

  updated.recommendedTopic = getNextRecommendation(updated);
  return updated;
}

/**
 * Updates a learner's progress upon submitting a challenge solution.
 */
export function recordChallengeResult(
  current: UserProgress,
  result: ChallengeEvaluationResult
): UserProgress {
  const isAlreadyCompleted = current.completedChallenges.includes(
    result.challengeId
  );
  const completedChallenges = isAlreadyCompleted || !result.passed
    ? current.completedChallenges
    : [...current.completedChallenges, result.challengeId];

  // Award points if newly passed
  const pointsEarned = !isAlreadyCompleted && result.passed ? result.score : 0;
  const newScore = current.score + pointsEarned;

  const overallProgressPercentage = calculateProgressPercentage(
    current.completedLessons,
    current.completedQuizzes,
    completedChallenges,
    current.recentExperiments
  );
  const masteryLevel = calculateMasteryLevel(newScore);

  const updated: UserProgress = {
    ...current,
    completedChallenges,
    score: newScore,
    overallProgressPercentage,
    masteryLevel,
    recommendedTopic: current.recommendedTopic,
  };

  updated.recommendedTopic = getNextRecommendation(updated);
  return updated;
}
