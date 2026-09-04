import { UserProgress, TopicRecommendation } from "../types";

/**
 * Computes the learner's next recommended educational action
 * based on their current progress through lessons, quizzes, experiments, and challenges.
 */
export function getNextRecommendation(
  progress: UserProgress
): TopicRecommendation {
  const completedLessons = new Set(progress.completedLessons);
  const completedQuizzes = progress.completedQuizzes || {};
  const completedChallenges = new Set(progress.completedChallenges);
  const recentExps = progress.recentExperiments || [];

  // 1. Qubits Lesson
  if (!completedLessons.has("lesson-qubits")) {
    return {
      topicId: "lesson-qubits",
      title: "1. Qubits",
      type: "lesson",
      reason: "Start your quantum computing journey by understanding what a qubit is and how it differs from a classical bit.",
      actionUrl: "/lessons/lesson-qubits",
    };
  }

  // 2. Qubits Quiz
  if (!completedQuizzes["quiz-qubits"]) {
    return {
      topicId: "quiz-qubits",
      title: "Qubits Concept Check",
      type: "quiz",
      reason: "Reinforce your foundational knowledge with a quick 3-question assessment.",
      actionUrl: "/quizzes/quiz-qubits",
    };
  }

  // 3. Superposition Lesson
  if (!completedLessons.has("lesson-superposition")) {
    return {
      topicId: "lesson-superposition",
      title: "2. Superposition",
      type: "lesson",
      reason: "Learn how the Hadamard gate places qubits into simultaneous computational states.",
      actionUrl: "/lessons/lesson-superposition",
    };
  }

  // 4. H-Gate Experiment in Circuit Lab
  const hasRunHGate = recentExps.some((exp) =>
    exp.toLowerCase().includes("h-gate")
  );
  if (!hasRunHGate) {
    return {
      topicId: "exp-hadamard-basic",
      title: "Run H-Gate Simulation",
      type: "experiment",
      reason: "Experience finite quantum sampling firsthand by running a 100-shot circuit in the Circuit Lab.",
      actionUrl: "/lab?experiment=exp-hadamard-basic",
    };
  }

  // 5. Superposition Quiz
  if (!completedQuizzes["quiz-superposition"]) {
    return {
      topicId: "quiz-superposition",
      title: "Superposition & Sampling Quiz",
      type: "quiz",
      reason: "Test your understanding of Hadamard gates and why 100 shots deviate slightly from 50/50.",
      actionUrl: "/quizzes/quiz-superposition",
    };
  }

  // 6. Entanglement Lesson
  if (!completedLessons.has("lesson-entanglement")) {
    return {
      topicId: "lesson-entanglement",
      title: "3. Entanglement",
      type: "lesson",
      reason: "Discover how quantum entanglement links multiple qubits and powers quantum algorithms.",
      actionUrl: "/lessons/lesson-entanglement",
    };
  }

  // 7. Bell-State Challenge
  if (!completedChallenges.has("challenge-bell-state")) {
    return {
      topicId: "challenge-bell-state",
      title: "Bell-State Challenge",
      type: "challenge",
      reason: "Build and execute an H + CNOT circuit to create the maximally entangled Bell state |Φ⁺⟩!",
      actionUrl: "/challenges/challenge-bell-state",
    };
  }

  // 8. Completed MVP Fundamentals
  return {
    topicId: "module-quantum-algorithms",
    title: "Quantum Teleportation & Algorithms",
    type: "lesson",
    reason: "Outstanding achievement! You've mastered Fundamentals. Advance to Quantum Teleportation and Grover's search.",
    actionUrl: "/courses/quantum-teleportation",
  };
}
