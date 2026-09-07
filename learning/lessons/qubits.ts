import { Lesson } from "../types";

const qubitsLesson: Lesson = {
  id: "lesson-qubits",
  moduleId: "module-quantum-basics",
  title: "Qubits",
  description:
    "Learn what a qubit is, how it differs from a classical bit, and why it is the fundamental unit of quantum information.",

  learningObjectives: [
    {
      id: "lo-qubits-1",
      text: "Explain the difference between a classical bit and a qubit.",
    },
    {
      id: "lo-qubits-2",
      text: "Identify the |0> and |1> basis states of a qubit.",
    },
    {
      id: "lo-qubits-3",
      text: "Describe what measurement does to a qubit in simple terms.",
    },
  ],

  sections: [
    {
      id: "qubits-what-is",
      title: "What is a Qubit?",
      content:
        "A qubit can be in a quantum state that is a combination (superposition) of the basis states |0⟩ and |1⟩. When measured in the computational basis, the result is either 0 or 1, with probabilities determined by the quantum state.",
    },
    {
      id: "qubits-states",
      title: "Qubit States: |0> and |1>",
      content:
        "A qubit has two special states called basis states, written as |0> (read 'ket zero') and |1> (read 'ket one'). These are analogous to classical 0 and 1. When you measure a qubit, you always get one of these two results — never anything else. The magic happens in what the qubit is doing *before* you measure it.",
    },
    {
      id: "qubits-measurement",
      title: "What Happens When You Measure?",
      content:
        "When a qubit is in a superposition (a mix of |0> and |1>), measuring it forces it to 'choose' one of the two states. The probability of getting 0 or 1 depends on how the qubit was prepared. This is fundamentally different from classical bits, where reading the value never changes it.",
    },
  ],

  activities: [
    {
      id: "act-qubits-reflect",
      type: "reflection",
      title: "Reflection: Classical vs Quantum",
      description:
        "Think about a classical bit as a coin that is either heads or tails. A qubit is more like a coin spinning in the air — it has not landed yet. Write down one difference between reading a classical bit and measuring a qubit.",
    },
  ],

  quizId: "quiz-qubits",
  estimatedDurationMinutes: 15,
};

export default qubitsLesson;
