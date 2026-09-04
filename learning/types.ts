/**
 * Egreen Quanta — Learning Content & Assessment Types
 *
 * These types define the structure for courses, lessons, quizzes,
 * interactive quantum challenges, progress tracking, and AI-ready recommendations.
 */

// ─── Course & Lesson Types ──────────────────────────────────────

export interface LearningObjective {
  id: string;
  text: string;
}

export interface Activity {
  id: string;
  type: "experiment" | "reflection" | "comparison" | "challenge" | "placeholder";
  title: string;
  description: string;
  /** For experiment-type activities, points to the circuit lab / experiment ID */
  experimentId?: string;
  /** For challenge-type activities, points to the challenge definition ID */
  challengeId?: string;
  /** For comparison-type activities, the two conditions to compare */
  comparison?: {
    labelA: string;
    labelB: string;
  };
}

export interface LessonSection {
  id: string;
  title: string;
  content: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  learningObjectives: LearningObjective[];
  sections: LessonSection[];
  activities: Activity[];
  quizId?: string;
  challengeId?: string;
  estimatedDurationMinutes: number;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  lessonIds: string[];
  order: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  moduleIds: string[];
  estimatedDurationMinutes: number;
}

// ─── Quiz & Assessment Types ────────────────────────────────────

export interface QuizOption {
  id: string;
  text: string;
  explanation?: string;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
}

export interface Quiz {
  id: string;
  lessonId: string;
  title: string;
  description: string;
  points: number;
  passingScorePercentage: number;
  questions: QuizQuestion[];
}

export interface QuizSubmission {
  quizId: string;
  answers: Record<string, string>; // questionId -> selectedOptionId
}

export interface QuizQuestionResult {
  questionId: string;
  selectedOptionId: string;
  correctOptionId: string;
  isCorrect: boolean;
  explanation: string;
}

export interface QuizResult {
  quizId: string;
  score: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  details: QuizQuestionResult[];
  feedback: string;
}

// ─── Quantum Challenge Types (Canonical QIR-like) ───────────────

export interface CircuitOperation {
  gate: string;
  target: number;
  control?: number;
}

export interface CircuitData {
  num_qubits: number;
  operations: CircuitOperation[];
  shots?: number;
  backend?: string;
}

export interface ChallengeRequirement {
  id: string;
  description: string;
  checkType: "qubit_count" | "gate_present" | "exact_sequence" | "no_extra_qubits";
  gate?: string;
  minQubits?: number;
  expectedOperations?: { gate: string; target: number; control?: number }[];
}

export interface QuantumChallenge {
  id: string;
  lessonId: string;
  title: string;
  subtitle: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  points: number;
  expectedQubits: number;
  starterCircuit: CircuitData;
  expectedCircuit: CircuitData;
  instructions: string[];
  hints: string[];
  requirements: ChallengeRequirement[];
}

export interface ChallengeRequirementResult {
  requirementId: string;
  description: string;
  passed: boolean;
  message: string;
}

export interface ChallengeEvaluationResult {
  challengeId: string;
  passed: boolean;
  score: number;
  maxScore: number;
  feedback: string;
  requirementResults: ChallengeRequirementResult[];
}

// ─── Learner Progress & Recommendation Types ───────────────────

export type MasteryLevel = "Novice" | "Apprentice" | "Quantum Explorer" | "Quantum Pioneer";

export interface TopicRecommendation {
  topicId: string;
  title: string;
  type: "lesson" | "quiz" | "challenge" | "experiment";
  reason: string;
  actionUrl?: string;
}

export interface UserProgress {
  userId: string;
  completedLessons: string[];
  completedQuizzes: Record<string, number>; // quizId -> best score achieved
  completedChallenges: string[];
  score: number;
  overallProgressPercentage: number;
  recentExperiments: string[];
  masteryLevel: MasteryLevel;
  recommendedTopic: TopicRecommendation;
}
