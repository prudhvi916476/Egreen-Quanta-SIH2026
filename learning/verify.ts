// Egreen Quanta — Verification Script for Learning & Assessment Module
import {
  courses,
  modules,
  lessons,
  getLessonById,
  getLessonsByModuleId,
} from "./index.ts";
import {
  allQuizzes,
  getQuizById,
  getQuizByLessonId,
  evaluateQuiz,
} from "./quizzes/index.ts";
import {
  allChallenges,
  getChallengeById,
  evaluateChallengeCircuit,
} from "./challenges/index.ts";
import {
  DEMO_INITIAL_PROGRESS,
  CLEAN_RESET_PROGRESS,
  completeLesson,
  recordChallengeResult,
  getNextRecommendation,
} from "./progress/index.ts";

let passedTests = 0;
let totalTests = 0;

function assert(condition: boolean, message: string) {
  totalTests++;
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    process.exitCode = 1;
  } else {
    console.log(`✅ PASS: ${message}`);
    passedTests++;
  }
}

console.log("==================================================");
console.log("   EGREEN QUANTA — LEARNING MODULE VERIFICATION   ");
console.log("==================================================\n");

// 1. Courses & Lessons Verification
console.log("--- 1. Courses & Lessons ---");
assert(courses.length === 1, "Exactly 1 demo course exists");
assert(modules.length === 1, "Exactly 1 module exists");
assert(lessons.length === 3, "All 3 core lessons exist");

const qubits = getLessonById("lesson-qubits");
assert(qubits !== undefined && qubits.title === "Qubits", "Lookup lesson-qubits succeeds");

const superpos = getLessonById("lesson-superposition");
assert(superpos !== undefined && superpos.activities.length >= 2, "Superposition has activities (experiment + comparison)");

const entangle = getLessonById("lesson-entanglement");
assert(entangle !== undefined && entangle.challengeId === "challenge-bell-state", "Entanglement links to Bell-State challenge");

const moduleLessons = getLessonsByModuleId("module-quantum-basics");
assert(moduleLessons.length === 3, "Module contains 3 lessons in order");

// 2. Quizzes Verification
console.log("\n--- 2. Quizzes & Assessment Engine ---");
assert(allQuizzes.length === 3, "All 3 lesson quizzes exist");

const superQuiz = getQuizByLessonId("lesson-superposition");
assert(superQuiz !== undefined && superQuiz.id === "quiz-superposition", "Lookup quiz by lesson ID succeeds");

// Perfect submission test
const perfectAnswers = {
  "q-super-1": "opt-s1b",
  "q-super-2": "opt-s2b",
  "q-super-3": "opt-s3c",
};
const perfectResult = evaluateQuiz("quiz-superposition", perfectAnswers);
assert(perfectResult.passed === true, "Perfect quiz submission passes");
assert(perfectResult.score === 100 && perfectResult.percentage === 100, "Score is 100%");

// Failing submission test
const failingAnswers = {
  "q-super-1": "opt-s1a",
  "q-super-2": "opt-s2a",
  "q-super-3": "opt-s3a",
};
const failingResult = evaluateQuiz("quiz-superposition", failingAnswers);
assert(failingResult.passed === false, "Failing quiz submission is marked passed=false");
assert(failingResult.percentage === 0, "Failing score is 0%");

// 3. Challenge Verification
console.log("\n--- 3. Quantum Challenges & Circuit Evaluator ---");
assert(allChallenges.length >= 1, "At least 1 quantum challenge exists");

const bellChallenge = getChallengeById("challenge-bell-state");
assert(bellChallenge !== undefined && bellChallenge.expectedQubits === 2, "Bell-State challenge exists and requires 2 qubits");

// Valid Bell state circuit
const validCircuit = {
  num_qubits: 2,
  operations: [
    { gate: "H", target: 0 },
    { gate: "CNOT", control: 0, target: 1 },
  ],
  shots: 100,
};
const simCounts = { "00": 48, "11": 52 };
const validEval = evaluateChallengeCircuit("challenge-bell-state", validCircuit, simCounts);
assert(validEval.passed === true, "Valid H + CNOT circuit passes challenge");
assert(validEval.score === 150, "Full 150 points awarded for Bell-State");

// Invalid circuit (missing CNOT)
const invalidCircuit = {
  num_qubits: 2,
  operations: [{ gate: "H", target: 0 }],
  shots: 100,
};
const invalidEval = evaluateChallengeCircuit("challenge-bell-state", invalidCircuit);
assert(invalidEval.passed === false, "Incomplete circuit fails challenge");
assert(invalidEval.requirementResults.some(r => !r.passed && r.description.includes("CNOT")), "Identifies missing CNOT");

// 4. Progress, Mastery & Recommendation Verification
console.log("\n--- 4. Progress Tracking & Recommendation Engine ---");
assert(CLEAN_RESET_PROGRESS.overallProgressPercentage === 0, "Clean reset state starts at 0%");
assert(CLEAN_RESET_PROGRESS.masteryLevel === "Novice", "Clean reset mastery is Novice");

const rec0 = getNextRecommendation(CLEAN_RESET_PROGRESS);
assert(rec0.topicId === "lesson-qubits", "Clean state recommends 1. Qubits");

// Advance user from clean state
let user = { ...CLEAN_RESET_PROGRESS, completedLessons: [...CLEAN_RESET_PROGRESS.completedLessons], completedQuizzes: { ...CLEAN_RESET_PROGRESS.completedQuizzes }, completedChallenges: [...CLEAN_RESET_PROGRESS.completedChallenges], recentExperiments: [...CLEAN_RESET_PROGRESS.recentExperiments] };
user = completeLesson(user, "lesson-qubits");
assert(user.completedLessons.includes("lesson-qubits"), "Completing Qubits adds to completedLessons");
assert(user.score === 50, "Earns 50 pts for lesson");

const recAfterQubits = getNextRecommendation(user);
assert(recAfterQubits.topicId === "quiz-qubits", "Recommends Qubits Quiz after lesson");

// Check Demo Initial State
assert(DEMO_INITIAL_PROGRESS.overallProgressPercentage === 55, "Demo state starts at 55% progress");
assert(DEMO_INITIAL_PROGRESS.masteryLevel === "Apprentice", "Demo state mastery is Apprentice");
assert(DEMO_INITIAL_PROGRESS.recommendedTopic.topicId === "lesson-entanglement", "Demo state recommends Entanglement");

// Complete Bell State on Demo State
const userAfterBell = recordChallengeResult(DEMO_INITIAL_PROGRESS, validEval);
assert(userAfterBell.completedChallenges.includes("challenge-bell-state"), "Challenge added to completedChallenges");
assert(userAfterBell.score === 450, "Score increases to 450 (300 + 150)");
assert(userAfterBell.masteryLevel === "Quantum Explorer", "Mastery level upgrades to Quantum Explorer");
assert(userAfterBell.overallProgressPercentage > 55, "Progress increases beyond 55%");

console.log("\n==================================================");
console.log(`TEST SUMMARY: ${passedTests}/${totalTests} tests passed`);
console.log("==================================================");
