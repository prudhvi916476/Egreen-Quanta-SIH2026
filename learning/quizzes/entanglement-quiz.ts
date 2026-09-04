import { Quiz } from "../types";

export const entanglementQuiz: Quiz = {
  id: "quiz-entanglement",
  lessonId: "lesson-entanglement",
  title: "Entanglement & Bell States Assessment",
  description:
    "Test your understanding of entangled quantum systems, Bell state circuits, and measurement correlations.",
  points: 100,
  passingScorePercentage: 70,
  questions: [
    {
      id: "q-ent-1",
      prompt: "Starting with two qubits in the ground state |00⟩, which gate sequence creates the maximally entangled Bell state |Φ⁺⟩ = (|00⟩ + |11⟩) / √2?",
      options: [
        {
          id: "opt-e1a",
          text: "Hadamard gate on q0, followed by a CNOT gate with control on q0 and target on q1.",
        },
        {
          id: "opt-e1b",
          text: "Hadamard gate on both q0 and q1 simultaneously without any two-qubit gates.",
        },
        {
          id: "opt-e1c",
          text: "X gate on q0, followed by a Z gate on q1.",
        },
        {
          id: "opt-e1d",
          text: "CNOT gate with control on q0 and target on q1, followed by Hadamard on q1.",
        },
      ],
      correctOptionId: "opt-e1a",
      explanation:
        "Applying H to q0 creates (|0⟩ + |1⟩)/√2 on qubit 0. Then CNOT with control q0 and target q1 flips q1 only when q0 is 1, creating the entangled state (|00⟩ + |11⟩)/√2.",
    },
    {
      id: "q-ent-2",
      prompt: "Suppose qubits q0 and q1 are in the Bell state |Φ⁺⟩ = (|00⟩ + |11⟩) / √2. If you measure q0 and get result 1, what is the guaranteed outcome when measuring q1?",
      options: [
        { id: "opt-e2a", text: "0 with 100% certainty" },
        { id: "opt-e2b", text: "1 with 100% certainty" },
        { id: "opt-e2c", text: "Equal 50% chance of 0 or 1" },
        { id: "opt-e2d", text: "Indeterminate until a reset gate is executed" },
      ],
      correctOptionId: "opt-e2b",
      explanation:
        "The state |Φ⁺⟩ contains only the basis terms |00⟩ and |11⟩. When measuring q0 yields 1, the state collapses onto |11⟩, ensuring that measuring q1 will also yield 1 with 100% certainty.",
    },
    {
      id: "q-ent-3",
      prompt: "Does quantum entanglement allow instantaneous, faster-than-light (FTL) transmission of classical messages between two distant observers?",
      options: [
        {
          id: "opt-e3a",
          text: "Yes, because the measurement on one qubit instantaneously dictates the other.",
        },
        {
          id: "opt-e3b",
          text: "No; individual measurement outcomes are completely random, so no information can be sent without a classical communication channel (No-Communication Theorem).",
        },
        {
          id: "opt-e3c",
          text: "Only if the distance is less than 1,000 kilometers.",
        },
        {
          id: "opt-e3d",
          text: "Yes, but only in superconducting quantum computers.",
        },
      ],
      correctOptionId: "opt-e3b",
      explanation:
        "While measurement correlations are instantaneous, the local outcome is purely random. Neither party can control the outcome to transmit a message without transmitting classical data, consistent with Einstein's relativistic causality.",
    },
  ],
};

export default entanglementQuiz;
