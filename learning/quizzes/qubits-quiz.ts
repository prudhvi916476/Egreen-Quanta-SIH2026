import { Quiz } from "../types";

export const qubitsQuiz: Quiz = {
  id: "quiz-qubits",
  lessonId: "lesson-qubits",
  title: "Qubits Concept Check",
  description: "Test your fundamental understanding of classical bits vs. qubits and the role of measurement.",
  points: 100,
  passingScorePercentage: 70,
  questions: [
    {
      id: "q-qubit-1",
      prompt: "What is the primary difference between a classical bit and a quantum bit (qubit)?",
      options: [
        {
          id: "opt-1a",
          text: "A classical bit can only be 0 or 1, whereas a qubit can exist in a superposition of |0⟩ and |1⟩.",
        },
        {
          id: "opt-1b",
          text: "A classical bit is analog, whereas a qubit is purely digital.",
        },
        {
          id: "opt-1c",
          text: "Qubits always output both 0 and 1 simultaneously when measured.",
        },
        {
          id: "opt-1d",
          text: "A classical bit has infinite states, while a qubit has only two.",
        },
      ],
      correctOptionId: "opt-1a",
      explanation:
        "Unlike classical bits which are deterministically either 0 or 1, a qubit can exist in a linear combination (superposition) of basis states until it is measured.",
    },
    {
      id: "q-qubit-2",
      prompt: "In standard computational basis notation, what are the two basis states of a single qubit called?",
      options: [
        { id: "opt-2a", text: "[0] and [1]" },
        { id: "opt-2b", text: "|0⟩ (ket zero) and |1⟩ (ket one)" },
        { id: "opt-2c", text: "⟨0| (bra zero) and ⟨1| (bra one)" },
        { id: "opt-2d", text: "alpha (α) and beta (β)" },
      ],
      correctOptionId: "opt-2b",
      explanation:
        "Standard Dirac (bra-ket) notation represents the computational basis states as |0⟩ ('ket zero') and |1⟩ ('ket one').",
    },
    {
      id: "q-qubit-3",
      prompt: "What happens when you measure a qubit that is in a superposition state?",
      options: [
        {
          id: "opt-3a",
          text: "It reveals both states at once without changing the qubit.",
        },
        {
          id: "opt-3b",
          text: "The state collapses irreversibly into either |0⟩ or |1⟩ with a specific probability.",
        },
        {
          id: "opt-3c",
          text: "It resets automatically to |0⟩ every single time.",
        },
        {
          id: "opt-3d",
          text: "The measurement is delayed until all qubits in the circuit have finished running.",
        },
      ],
      correctOptionId: "opt-3b",
      explanation:
        "Measurement forces the quantum wavefunction to collapse to a single computational basis outcome (|0⟩ or |1⟩), determined by the probability amplitudes.",
    },
  ],
};

export default qubitsQuiz;
