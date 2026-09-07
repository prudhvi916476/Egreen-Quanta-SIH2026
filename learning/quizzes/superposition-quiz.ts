import { Quiz } from "../types";

export const superpositionQuiz: Quiz = {
  id: "quiz-superposition",
  lessonId: "lesson-superposition",
  title: "Superposition & Hadamard Gate Assessment",
  description:
    "Evaluate your mastery of the Hadamard gate, 50/50 probability, and shot-count sampling variance.",
  points: 100,
  passingScorePercentage: 70,
  questions: [
    {
      id: "q-super-1",
      prompt: "If a single qubit begins in the pure state |0⟩, what state is produced after applying a single Hadamard (H) gate?",
      options: [
        { id: "opt-s1a", text: "The inverted state |1⟩ with 100% certainty." },
        {
          id: "opt-s1b",
          text: "An equal superposition state: (|0⟩ + |1⟩) / √2, giving equal 50% probability for |0⟩ and |1⟩.",
        },
        { id: "opt-s1c", text: "The state remains unchanged in |0⟩." },
        { id: "opt-s1d", text: "A multi-qubit entangled state." },
      ],
      correctOptionId: "opt-s1b",
      explanation:
        "The Hadamard transformation transforms |0⟩ into (|0⟩ + |1⟩)/√2 (often denoted |+⟩), creating an equal probability distribution between outcomes 0 and 1.",
    },
    {
      id: "q-super-2",
      prompt: "You ran an H-gate circuit with 100 shots on Qiskit Aer and observed 48 counts for |0⟩ and 52 counts for |1⟩. Why didn't you get exactly 50/50?",
      options: [
        {
          id: "opt-s2a",
          text: "The quantum simulator has a mathematical bug.",
        },
        {
          id: "opt-s2b",
          text: "Quantum measurement is probabilistic; finite sampling produces statistical fluctuations around the theoretical expectation.",
        },
        {
          id: "opt-s2c",
          text: "The Hadamard gate was only 96% effective.",
        },
        {
          id: "opt-s2d",
          text: "The circuit needed a phase gate (Z) to balance the probabilities.",
        },
      ],
      correctOptionId: "opt-s2b",
      explanation:
        "Finite sampling in quantum experiments causes statistical variance. Just like flipping a fair coin 100 times won't always give exactly 50 heads, 100 shots produce slight deviations from the ideal 50%.",
    },
    {
      id: "q-super-3",
      prompt: "What is the most effective way to make your measured distribution converge closer to the theoretical 50/50 expectation?",
      options: [
        { id: "opt-s3a", text: "Decrease the number of shots from 100 to 10." },
        { id: "opt-s3b", text: "Add more qubits to the circuit." },
        {
          id: "opt-s3c",
          text: "Increase the number of execution shots (e.g., from 100 to 1,000 or 10,000).",
        },
        { id: "opt-s3d", text: "Replace the Hadamard gate with an X gate." },
      ],
      correctOptionId: "opt-s3c",
      explanation:
        "By the Law of Large Numbers, increasing the number of shots reduces relative statistical noise, causing the observed frequencies to converge toward the theoretical probability.",
    },
  ],
};

export default superpositionQuiz;
