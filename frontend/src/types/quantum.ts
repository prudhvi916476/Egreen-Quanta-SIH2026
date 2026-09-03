// Quantum Types — mirrors Person 2's Pydantic models exactly
// DO NOT modify without coordinating with Person 2 (quantum-engine/models.py)

export type GateType = 'H' | 'X' | 'Y' | 'Z' | 'CNOT' | 'M';

export type Backend = 'qiskit' | 'cirq' | 'pennylane';

export interface QuantumOperation {
  gate: GateType;
  target: number;
  control?: number; // Required for CNOT
}

export interface QuantumCircuit {
  num_qubits: number;
  operations: QuantumOperation[];
  shots: number;
  backend: Backend;
}

export interface SimulationResult {
  counts: Record<string, number>;
  probabilities: Record<string, number>;
  status: 'success' | 'error';
  message?: string | null;
  // UI-enriched fields (added by frontend, not from API)
  executedAt?: string;
  backendUsed?: Backend;
  shotsUsed?: number;
}

export interface Probability {
  state: string;
  count: number;
  probability: number;
}

// Parsed and sorted probabilities for UI rendering
export function parseProbabilities(result: SimulationResult): Probability[] {
  return Object.entries(result.probabilities)
    .map(([state, probability]) => ({
      state: `|${state}>`,
      count: result.counts[state] ?? 0,
      probability,
    }))
    .sort((a, b) => b.probability - a.probability);
}

export const GATE_INFO: Record<GateType, { label: string; symbol: string; description: string; color: string }> = {
  H: {
    label: 'Hadamard',
    symbol: 'H',
    description: 'Creates superposition. Transforms |0⟩ → (|0⟩+|1⟩)/√2',
    color: '#7c3aed',
  },
  X: {
    label: 'Pauli-X',
    symbol: 'X',
    description: 'Quantum NOT gate. Flips |0⟩ ↔ |1⟩',
    color: '#dc2626',
  },
  Y: {
    label: 'Pauli-Y',
    symbol: 'Y',
    description: 'Rotation about Y-axis with phase shift',
    color: '#0284c7',
  },
  Z: {
    label: 'Pauli-Z',
    symbol: 'Z',
    description: 'Phase flip gate. |1⟩ → -|1⟩',
    color: '#16a34a',
  },
  CNOT: {
    label: 'CNOT',
    symbol: '●—⊕',
    description: 'Controlled-NOT. Flips target when control is |1⟩. Creates entanglement.',
    color: '#d97706',
  },
  M: {
    label: 'Measure',
    symbol: 'M',
    description: 'Collapse qubit state via measurement',
    color: '#52525b',
  },
};

export const BACKENDS: { value: Backend; label: string; description: string }[] = [
  { value: 'qiskit', label: 'Qiskit Aer', description: 'IBM\'s quantum circuit simulator' },
  { value: 'cirq', label: 'Cirq', description: 'Google\'s quantum programming framework' },
  { value: 'pennylane', label: 'PennyLane', description: 'Xanadu\'s quantum ML framework' },
];
