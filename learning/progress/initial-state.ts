import { UserProgress } from "../types";

/**
 * The default demo progress state described in Egreen Quanta SIH Demo Plan (Section 4.3 & 11).
 * Shows the learner having completed Qubits and ready for Entanglement & Bell State.
 */
export const DEMO_INITIAL_PROGRESS: UserProgress = {
  userId: "user-demo-sih",
  completedLessons: ["lesson-qubits", "lesson-superposition"],
  completedQuizzes: {
    "quiz-qubits": 100,
    "quiz-superposition": 100,
  },
  completedChallenges: [],
  score: 300,
  overallProgressPercentage: 55,
  recentExperiments: ["H-Gate Experiment (100 shots)", "Bell State Attempt"],
  masteryLevel: "Apprentice",
  recommendedTopic: {
    topicId: "lesson-entanglement",
    title: "Learn Entanglement",
    type: "lesson",
    reason: "You've mastered single-qubit Superposition. Next, explore how multi-qubit Entanglement powers quantum computing.",
    actionUrl: "/lessons/lesson-entanglement",
  },
};

/**
 * Clean baseline progress state allowing the demo to be reset to 0% at any time.
 */
export const CLEAN_RESET_PROGRESS: UserProgress = {
  userId: "user-clean",
  completedLessons: [],
  completedQuizzes: {},
  completedChallenges: [],
  score: 0,
  overallProgressPercentage: 0,
  recentExperiments: [],
  masteryLevel: "Novice",
  recommendedTopic: {
    topicId: "lesson-qubits",
    title: "1. Qubits",
    type: "lesson",
    reason: "Start your quantum computing journey by understanding what a qubit is and how it differs from a classical bit.",
    actionUrl: "/lessons/lesson-qubits",
  },
};
