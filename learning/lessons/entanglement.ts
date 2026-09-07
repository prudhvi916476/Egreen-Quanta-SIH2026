import { Lesson } from "../types";

const entanglementLesson: Lesson = {
  id: "lesson-entanglement",
  moduleId: "module-quantum-basics",
  title: "Entanglement",
  description:
    "Learn what quantum entanglement is, why it is called 'spooky action at a distance', and how it connects two qubits.",

  learningObjectives: [
    {
      id: "lo-ent-1",
      text: "Describe what entanglement means for two qubits.",
    },
    {
      id: "lo-ent-2",
      text: "Explain why measuring one entangled qubit instantly reveals information about the other.",
    },
    {
      id: "lo-ent-3",
      text: "Identify the role of entanglement in quantum algorithms (conceptual).",
    },
  ],

  sections: [
    {
      id: "ent-what-is",
      title: "What is Entanglement?",
      content:
        "Entanglement is a special quantum connection between two or more qubits. When two qubits are entangled, their measurement outcomes can be strongly correlated. Measuring one qubit allows us to predict the corresponding outcome of the other for certain entangled states, even when the qubits are far apart. This does not allow information to be transmitted faster than light.",
    },
    {
      id: "ent-pair",
      title: "Creating an Entangled Pair",
      content:
        "The simplest entangled state is created by taking two qubits, both in |0>, applying a Hadamard gate to the first qubit, and then using a CNOT (Controlled-NOT) gate with the first qubit as control and the second as target. The result is one of the four Bell states — maximally entangled two-qubit states. When you measure both qubits, you will always get matching results: either both |0> or both |1>, each with 50% probability.",
    },
    {
      id: "ent-why-matters",
      title: "Why Entanglement Matters",
      content:
        "Entanglement allows quantum computers to coordinate information across qubits in ways that have no classical equivalent. Many quantum algorithms — including Shor's algorithm for factoring and Grover's algorithm for search — rely on entanglement as a core resource. Entanglement is an important resource in many quantum algorithms and quantum information protocols.",
    },
  ],

  activities: [
    {
      id: "act-ent-bell-challenge",
      type: "challenge",
      title: "Bell State Challenge",
      description:
        "Build a Bell state circuit in the Circuit Lab using H and CNOT gates, run it on Qiskit Aer, and verify the entanglement through correlated measurement outcomes.",
      challengeId: "challenge-bell-state",
    },
  ],

  quizId: "quiz-entanglement",
  challengeId: "challenge-bell-state",
  estimatedDurationMinutes: 18,
};

export default entanglementLesson;
