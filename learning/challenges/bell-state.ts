import { QuantumChallenge } from "../types";

export const bellStateChallenge: QuantumChallenge = {
  id: "challenge-bell-state",
  lessonId: "lesson-entanglement",
  title: "Create a Bell State (|Φ⁺⟩)",
  subtitle: "Construct your first entangled two-qubit quantum state using H and CNOT gates",
  description:
    "In this challenge, you will construct the maximally entangled Bell state |Φ⁺⟩ = (|00⟩ + |11⟩) / √2. When measured, the outcomes of both qubits are completely correlated: roughly 50% for |00⟩ and 50% for |11⟩, with zero counts for |01⟩ or |10⟩ in an ideal simulator.",
  difficulty: "beginner",
  points: 150,
  expectedQubits: 2,
  starterCircuit: {
    num_qubits: 2,
    operations: [],
    shots: 100,
    backend: "qiskit",
  },
  expectedCircuit: {
    num_qubits: 2,
    operations: [
      { gate: "H", target: 0 },
      { gate: "CNOT", control: 0, target: 1 },
    ],
    shots: 100,
    backend: "qiskit",
  },
  instructions: [
    "Ensure your circuit has 2 qubits (q0 and q1).",
    "Place a Hadamard (H) gate on qubit q0 to generate a superposition state.",
    "Place a Controlled-NOT (CNOT) gate with control set to q0 and target set to q1.",
    "Execute the simulation on Qiskit Aer with 100 or 1,000 shots and submit your circuit.",
  ],
  hints: [
    "Start by putting qubit 0 into an equal superposition using the H gate.",
    "Use a CNOT gate where qubit 0 is the control and qubit 1 is the target to create the entanglement link.",
    "Make sure the H gate is applied before the CNOT gate.",
  ],
  requirements: [
    {
      id: "req-qubits",
      description: "Circuit must contain at least 2 qubits.",
      checkType: "qubit_count",
      minQubits: 2,
    },
    {
      id: "req-h-gate",
      description: "Apply a Hadamard (H) gate on qubit 0 (q0).",
      checkType: "gate_present",
      gate: "H",
    },
    {
      id: "req-cnot-gate",
      description: "Apply a CNOT gate with control on q0 and target on q1.",
      checkType: "gate_present",
      gate: "CNOT",
    },
    {
      id: "req-sequence",
      description: "Apply the Hadamard gate before the CNOT gate in the execution sequence.",
      checkType: "exact_sequence",
      expectedOperations: [
        { gate: "H", target: 0 },
        { gate: "CNOT", control: 0, target: 1 },
      ],
    },
  ],
};

export default bellStateChallenge;
