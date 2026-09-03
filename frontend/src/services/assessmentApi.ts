// Assessment API Service — MOCK adapter for Person 4's assessment backend
// INTEGRATION POINT: Replace mock data with real Person 4 API calls when available.

import type { Challenge, QuizQuestion } from '@/types/learning';
import type { QuantumCircuit } from '@/types/quantum';

const ASSESSMENT_API_BASE = process.env.NEXT_PUBLIC_ASSESSMENT_API_URL ?? null;

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What does the Hadamard gate do to a qubit in the |0⟩ state?',
    options: [
      'Keeps it in |0⟩',
      'Flips it to |1⟩',
      'Creates a superposition of |0⟩ and |1⟩',
      'Entangles it with another qubit',
    ],
    correctIndex: 2,
    explanation:
      'The Hadamard gate transforms |0⟩ into (|0⟩ + |1⟩)/√2, an equal superposition of both basis states.',
  },
  {
    id: 'q2',
    question: 'Why do you get approximately 50% for each outcome when measuring a Hadamard-applied qubit?',
    options: [
      'The gate is random',
      'The qubit has a 50% hardware defect rate',
      'Measurement collapses equal superposition to each state with equal probability',
      'The simulator is approximating',
    ],
    correctIndex: 2,
    explanation:
      'In a equal superposition, |α|² = |β|² = 0.5. Each measurement collapses the qubit to |0⟩ or |1⟩ with probability 0.5.',
  },
  {
    id: 'q3',
    question: 'In a Bell state created by H+CNOT, which measurement outcomes are possible?',
    options: ['|00⟩ and |11⟩ only', '|01⟩ and |10⟩ only', 'All four: |00⟩, |01⟩, |10⟩, |11⟩', '|00⟩ only'],
    correctIndex: 0,
    explanation:
      'The Bell state (|00⟩ + |11⟩)/√2 means both qubits always collapse to the same value — either both 0 or both 1.',
  },
  {
    id: 'q4',
    question: 'Why does running more shots give a result closer to the theoretical probability?',
    options: [
      'The computer works harder with more shots',
      'More shots reduces statistical sampling error',
      'The quantum simulator is more accurate at high shot counts',
      'Shots don\'t affect the result',
    ],
    correctIndex: 1,
    explanation:
      'By the law of large numbers, the sample mean converges to the true probability as sample size increases. More shots = less sampling noise.',
  },
];

export const CHALLENGES: Challenge[] = [
  {
    id: 'bell-state',
    slug: 'bell-state',
    title: 'Create a Bell State',
    description: 'Construct a Bell state — the simplest form of quantum entanglement — using H and CNOT gates.',
    difficulty: 'beginner',
    type: 'circuit',
    status: 'not-started',
    expectedCircuit: {
      description: 'Apply H gate to qubit 0, then CNOT with control=0, target=1',
      hint: 'The Bell state requires exactly 2 qubits. Start with H on q0, then CNOT.',
    },
  },
];

export async function getChallenges(): Promise<Challenge[]> {
  await new Promise((r) => setTimeout(r, 200));
  return CHALLENGES;
}

export async function getQuizQuestions(): Promise<QuizQuestion[]> {
  await new Promise((r) => setTimeout(r, 150));
  return QUIZ_QUESTIONS;
}

/**
 * Validate a submitted circuit against the Bell state challenge.
 * INTEGRATION POINT: Replace with Person 4's validation endpoint.
 */
export async function validateBellStateChallenge(
  circuit: QuantumCircuit
): Promise<{ passed: boolean; score: number; feedback: string }> {
  try {
    const response = await fetch('/api/challenge/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ challenge_id: 'bell-state', circuit }),
    });
    
    if (!response.ok) {
      throw new Error(`Challenge submission failed: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to validate challenge:', error);
    return { passed: false, score: 0, feedback: 'Failed to communicate with the validation server.' };
  }
}

void ASSESSMENT_API_BASE;
