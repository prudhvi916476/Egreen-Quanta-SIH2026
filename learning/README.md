# Egreen Quanta — Learning & Assessment Engine

This directory contains the educational content, assessment engines, interactive challenges, progress tracking, and recommendation logic for the Egreen Quanta platform.

Designed by **Person 4 (Learning & Assessment Developer)** to seamlessly integrate with **Person 1's Frontend**, **Person 2's Simulator**, and **Person 3's AI Backend**.

---

## 📁 Architecture & Directory Structure

```
learning/
├── types.ts                      # Universal TypeScript types for courses, quizzes, challenges, progress
├── index.ts                      # Main entry point — re-exports all modules and utilities
├── courses/
│   └── quantum-fundamentals.ts   # Course & module definitions
├── lessons/
│   ├── qubits.ts                 # Lesson 1: Qubits & measurement
│   ├── superposition.ts          # Lesson 2: Superposition & Hadamard gate
│   └── entanglement.ts           # Lesson 3: Entanglement & Bell pairs
├── quizzes/
│   ├── qubits-quiz.ts            # Multiple-choice quiz for Qubits
│   ├── superposition-quiz.ts     # Multiple-choice quiz for Superposition & shot variance
│   ├── entanglement-quiz.ts      # Multiple-choice quiz for Entanglement & Bell states
│   └── index.ts                  # Quiz lookup and `evaluateQuiz()` engine
├── challenges/
│   ├── bell-state.ts             # SIH Flagship Bell-State Challenge (|Φ⁺⟩)
│   └── index.ts                  # Challenge lookup and `evaluateChallengeCircuit()` engine
├── progress/
│   ├── initial-state.ts          # DEMO_INITIAL_PROGRESS (68%) & CLEAN_RESET_PROGRESS (0%)
│   ├── tracker.ts                # Scoring, mastery levels, and state transition functions
│   ├── recommendations.ts        # Smart next-step recommendation engine
│   └── index.ts                  # Progress module aggregator
└── README.md
```

---

## 🚀 Quick Start & Integration Examples

### 1. Rendering a Lesson

```tsx
import { getLessonById } from "../learning";

const lesson = getLessonById("lesson-superposition");
console.log(lesson?.title); // "Superposition"
console.log(lesson?.quizId); // "quiz-superposition"
```

### 2. Evaluating a Quiz Assessment

```typescript
import { getQuizById, evaluateQuiz } from "../learning";

const submission = {
  "q-super-1": "opt-s1b",
  "q-super-2": "opt-s2b",
  "q-super-3": "opt-s3c",
};

const result = evaluateQuiz("quiz-superposition", submission);
console.log(result.passed); // true
console.log(result.percentage); // 100%
console.log(result.score); // 100 points
console.log(result.details); // per-question breakdown and explanations
```

### 3. Evaluating the Bell-State Challenge Circuit

```typescript
import { evaluateChallengeCircuit } from "../learning";

const circuit = {
  num_qubits: 2,
  operations: [
    { gate: "H", target: 0 },
    { gate: "CNOT", control: 0, target: 1 },
  ],
  shots: 100,
};

const simulationCounts = { "00": 49, "11": 51 };

const evaluation = evaluateChallengeCircuit(
  "challenge-bell-state",
  circuit,
  simulationCounts
);

console.log(evaluation.passed); // true
console.log(evaluation.score); // 150 points
console.log(evaluation.feedback); // "Awesome work! You successfully constructed the Bell State |Φ⁺⟩..."
```

### 4. Tracking Learner Progress & Mastery

```typescript
import {
  DEMO_INITIAL_PROGRESS,
  CLEAN_RESET_PROGRESS,
  completeLesson,
  recordChallengeResult,
  getNextRecommendation,
} from "../learning";

// Start with clean or demo state
let user = DEMO_INITIAL_PROGRESS;

// Update state when challenge is completed
user = recordChallengeResult(user, evaluation);

console.log(user.score); // 300
console.log(user.overallProgressPercentage); // updated %
console.log(user.masteryLevel); // "Quantum Explorer"
console.log(user.recommendedTopic.title); // Next topic recommended by AI/engine
```

---

## 🎯 Flagship SIH Demo Alignment

| SIH Demo Stage | Platform Feature | Person 4 Implementation |
| :--- | :--- | :--- |
| **Stage 2: Start Learning** | Dashboard navigation | `DEMO_INITIAL_PROGRESS` shows 68% progress, active course. |
| **Stage 3: Explain Concept** | Superposition lesson | `superpositionLesson` with theory, H-gate, and 50/50 probability. |
| **Stage 4 & 5: Experiment** | 100 vs 1000 shots | `act-super-experiment` and `act-super-compare` activities. |
| **Stage 10: Challenge** | Bell-State challenge | `bellStateChallenge` with H + CNOT validation and auto-scoring. |
| **Stage 11: Progress** | Mastery & recommendation | `calculateMasteryLevel()`, `getNextRecommendation()` suggesting next steps. |
| **Stage 14: Reset Demo** | Deterministic state reset | `CLEAN_RESET_PROGRESS` resets all values to 0 for a fresh run. |
