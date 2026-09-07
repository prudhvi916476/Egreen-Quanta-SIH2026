import {
  Quiz,
  QuizResult,
  QuizQuestionResult,
  QuizSubmission,
} from "../types";
import qubitsQuiz from "./qubits-quiz";
import superpositionQuiz from "./superposition-quiz";
import entanglementQuiz from "./entanglement-quiz";

export const allQuizzes: Quiz[] = [
  qubitsQuiz,
  superpositionQuiz,
  entanglementQuiz,
];

/** Look up a quiz by its unique ID */
export function getQuizById(id: string): Quiz | undefined {
  return allQuizzes.find((q) => q.id === id);
}

/** Look up a quiz associated with a specific lesson */
export function getQuizByLessonId(lessonId: string): Quiz | undefined {
  return allQuizzes.find((q) => q.lessonId === lessonId);
}

/**
 * Evaluates a user's quiz submission, computing points, percentage,
 * question-level breakdown, and detailed explanations.
 */
export function evaluateQuiz(
  quizId: string,
  submission: QuizSubmission | Record<string, string>
): QuizResult {
  const quiz = getQuizById(quizId);
  if (!quiz) {
    throw new Error(`Quiz with ID "${quizId}" was not found.`);
  }

  const answers =
    "answers" in submission ? submission.answers : submission;

  const totalQuestions = quiz.questions.length;
  let correctCount = 0;

  const details: QuizQuestionResult[] = quiz.questions.map((q) => {
    const selectedOptionId = answers[q.id] || "";
    const isCorrect = selectedOptionId === q.correctOptionId;
    if (isCorrect) correctCount++;

    return {
      questionId: q.id,
      selectedOptionId,
      correctOptionId: q.correctOptionId,
      isCorrect,
      explanation: q.explanation,
    };
  });

  const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const score = Math.round((percentage / 100) * quiz.points);
  const passed = percentage >= quiz.passingScorePercentage;

  const feedback = passed
    ? `Congratulations! You scored ${percentage}% (${correctCount}/${totalQuestions} correct) and passed the assessment!`
    : `You scored ${percentage}% (${correctCount}/${totalQuestions} correct). Review the explanations above and try again to achieve ≥${quiz.passingScorePercentage}%.`;

  return {
    quizId,
    score,
    maxScore: quiz.points,
    percentage,
    passed,
    details,
    feedback,
  };
}

export { qubitsQuiz, superpositionQuiz, entanglementQuiz };
