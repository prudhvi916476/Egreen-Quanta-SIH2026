// Static course content for Quantum Computing Fundamentals
// This is the canonical course data. When Person 4's API is ready,
// this will be replaced by dynamic data from the backend.

import type { Course } from '@/types/learning';

export const COURSES: Course[] = [
  {
    id: 'quantum-computing-fundamentals',
    slug: 'quantum-computing-fundamentals',
    title: 'Quantum Computing Fundamentals',
    description:
      'A beginner-friendly introduction to the core concepts of quantum computing — Qubits, Superposition, and Entanglement — with hands-on circuit experiments.',
    difficulty: 'beginner',
    totalDurationMinutes: 53,
    progress: 68,
    lastViewedLessonId: 'superposition',
    tags: ['quantum', 'beginner', 'fundamentals', 'circuits'],
    modules: [
      {
        id: 'quantum-basics',
        title: 'Quantum Computing Basics',
        lessons: [
          {
            id: 'qubits',
            slug: 'qubits',
            title: 'Qubits',
            description: 'Understand the fundamental unit of quantum information and how it differs from classical bits.',
            type: 'concept',
            durationMinutes: 15,
            status: 'completed',
            hasExperiment: false,
            objectives: [
              { id: 'q1', text: 'Explain the difference between a classical bit and a qubit' },
              { id: 'q2', text: 'Describe the |0⟩ and |1⟩ basis states' },
              { id: 'q3', text: 'Understand what measurement does to a qubit' },
              { id: 'q4', text: 'Complete the qubit reflection activity' },
            ],
          },
          {
            id: 'superposition',
            slug: 'superposition',
            title: 'Superposition',
            description: 'Explore superposition and the Hadamard gate through hands-on circuit experiments.',
            type: 'experiment',
            durationMinutes: 25,
            status: 'in-progress',
            hasExperiment: true,
            experimentId: 'h-gate-experiment',
            objectives: [
              { id: 's1', text: 'Understand what superposition means physically' },
              { id: 's2', text: 'Apply the Hadamard gate to a qubit' },
              { id: 's3', text: 'Understand why measurement results are approximately 50/50' },
              { id: 's4', text: 'Explain how shot count affects the measured distribution' },
            ],
          },
          {
            id: 'entanglement',
            slug: 'entanglement',
            title: 'Entanglement',
            description: 'Discover quantum entanglement and create your first Bell state using H and CNOT gates.',
            type: 'experiment',
            durationMinutes: 13,
            status: 'not-started',
            hasExperiment: true,
            experimentId: 'bell-state-experiment',
            objectives: [
              { id: 'e1', text: 'Define quantum entanglement' },
              { id: 'e2', text: 'Build a Bell state circuit with H and CNOT' },
              { id: 'e3', text: 'Interpret Bell state measurement results' },
              { id: 'e4', text: 'Explain why entangled qubits always correlate' },
            ],
          },
        ],
      },
    ],
  },
];

export function getCourse(slug: string): Course | undefined {
  return COURSES.find((c) => c.slug === slug);
}

export function getLesson(courseSlug: string, lessonSlug: string) {
  const course = getCourse(courseSlug);
  if (!course) return undefined;
  for (const module of course.modules) {
    const lesson = module.lessons.find((l) => l.slug === lessonSlug);
    if (lesson) return { lesson, module, course };
  }
  return undefined;
}

export function getAllLessons(courseSlug: string) {
  const course = getCourse(courseSlug);
  if (!course) return [];
  return course.modules.flatMap((m) => m.lessons);
}

export function getAdjacentLessons(courseSlug: string, lessonSlug: string) {
  const lessons = getAllLessons(courseSlug);
  const idx = lessons.findIndex((l) => l.slug === lessonSlug);
  return {
    prev: idx > 0 ? lessons[idx - 1] : null,
    next: idx < lessons.length - 1 ? lessons[idx + 1] : null,
    current: lessons[idx] ?? null,
  };
}

// Lesson content — full educational text per lesson
export const LESSON_CONTENT: Record<string, {
  intro: string;
  sections: { title: string; body: string; type?: 'callout' | 'note' | 'equation' | 'text' }[];
  experimentPrompt?: string;
  shotComparisonExplanation?: string;
}> = {
  qubits: {
    intro:
      'A qubit is the fundamental unit of quantum information — the quantum equivalent of a classical bit. But unlike a classical bit, which is always exactly 0 or 1, a qubit can exist in states far more nuanced.',
    sections: [
      {
        title: 'Classical bits vs. Qubits',
        body: 'In classical computing, every piece of information is encoded as a bit — either 0 or 1. A qubit, by contrast, can be in the |0⟩ state, the |1⟩ state, or — until measured — a superposition of both. This is not an approximation or a hardware limitation; it is a fundamental property of quantum mechanics.',
      },
      {
        title: 'The |0⟩ and |1⟩ States',
        body: 'We write qubit states using Dirac notation (bra-ket notation). |0⟩ represents the ground state (analogous to classical 0) and |1⟩ represents the excited state (analogous to classical 1). These are called basis states.',
        type: 'equation',
      },
      {
        title: 'What Happens When We Measure?',
        body: 'Measurement collapses a qubit from its quantum state into one of the classical outcomes — |0⟩ or |1⟩ — with probabilities determined by the qubit\'s current state. Once measured, the qubit is in a definite state. This irreversible collapse is one of the most important and subtle aspects of quantum mechanics.',
        type: 'callout',
      },
      {
        title: 'Why Qubits Matter',
        body: 'The ability to represent and process information in superposition is what gives quantum computers their potential power. Algorithms like Shor\'s factoring algorithm and Grover\'s search exploit this to outperform classical computers on specific problems.',
      },
    ],
  },
  superposition: {
    intro:
      'Superposition is the property that allows a qubit to exist in multiple states simultaneously. It is not an approximation — it is a precise mathematical and physical reality, described by quantum wave functions.',
    sections: [
      {
        title: 'What is Superposition?',
        body: 'A qubit in superposition has a state α|0⟩ + β|1⟩, where α and β are complex probability amplitudes. The probability of measuring |0⟩ is |α|² and the probability of measuring |1⟩ is |β|². These must sum to 1: |α|² + |β|² = 1.',
        type: 'equation',
      },
      {
        title: 'The Hadamard Gate',
        body: 'The Hadamard gate (H) is the most important single-qubit gate for creating superposition. Applied to |0⟩, it produces an equal superposition: H|0⟩ = (|0⟩ + |1⟩)/√2, giving exactly 50% probability for each outcome. Applied to |1⟩, it produces H|1⟩ = (|0⟩ − |1⟩)/√2.',
        type: 'equation',
      },
      {
        title: 'Why Do We See ~50% for Each Outcome?',
        body: 'When you run a Hadamard circuit with 100 shots, you will see results close to 50/50 — but not exactly. This is not a simulator error. It\'s statistics. Each shot independently samples the probability distribution. With finite samples, there will always be small random fluctuations around the true 50% probability.',
        type: 'callout',
      },
      {
        title: 'How Shot Count Affects Results',
        body: 'By the Law of Large Numbers, the sample average converges to the true probability as sample size grows. 100 shots might give 48/52. 1000 shots typically gives results like 497/503. 10,000 shots get even closer. Try comparing 100 vs 1000 shots in the experiment below.',
      },
    ],
    experimentPrompt: 'Place an H gate on qubit 0, then run the circuit. Observe the probability distribution. Then run again with 1000 shots and compare.',
    shotComparisonExplanation:
      'Notice how the 1000-shot result is closer to the theoretical 50/50 than the 100-shot result. This demonstrates sampling convergence — more shots = less statistical noise = better approximation of the true quantum probability.',
  },
  entanglement: {
    intro:
      'Quantum entanglement is a phenomenon where two qubits become correlated in a way that has no classical analog. Measuring one qubit instantly determines the state of its entangled partner, regardless of the physical distance between them.',
    sections: [
      {
        title: 'What is Entanglement?',
        body: 'Entanglement occurs when two qubits share a quantum state that cannot be described independently. The combined system is in a superposition of correlated states. The most fundamental entangled states are the Bell states.',
      },
      {
        title: 'Creating a Bell State',
        body: 'The simplest Bell state is (|00⟩ + |11⟩)/√2. To create it: (1) Apply H to qubit 0, putting it in superposition. (2) Apply CNOT with qubit 0 as control and qubit 1 as target. The CNOT flips qubit 1 only when qubit 0 is |1⟩.',
        type: 'equation',
      },
      {
        title: 'Interpreting Bell State Results',
        body: 'When you measure a Bell state, you will only ever see |00⟩ or |11⟩ — never |01⟩ or |10⟩. This perfect correlation is the signature of entanglement. If qubit 0 measures as 0, qubit 1 will also be 0. If qubit 0 measures as 1, qubit 1 will also be 1. This is true even if the qubits are separated by any distance.',
        type: 'callout',
      },
      {
        title: 'Why This Matters',
        body: 'Bell states are the foundation of quantum teleportation, quantum cryptography (BB84 and E91 protocols), and quantum error correction. Understanding entanglement is essential for any deeper study of quantum information.',
      },
    ],
    experimentPrompt: 'Build a Bell state: H on q0, then CNOT (control=0, target=1). Run with 100 shots. Observe that you only see |00⟩ and |11⟩ outcomes.',
  },
};
