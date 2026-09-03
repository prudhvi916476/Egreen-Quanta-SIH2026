// Quantum API Service
// Integrates with Person 2's quantum simulation engine
// POST /api/quantum/simulate → proxied to quantum-engine at localhost:8000/simulate
// DO NOT MOCK this service — it calls the real Person 2 engine

import type { QuantumCircuit, SimulationResult } from '@/types/quantum';

const QUANTUM_API_BASE = '/api';

export class QuantumApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly detail?: string
  ) {
    super(message);
    this.name = 'QuantumApiError';
  }
}

/**
 * Simulate a quantum circuit using Person 2's engine.
 * Calls POST /simulate on the quantum-engine FastAPI.
 */
export async function simulateCircuit(circuit: QuantumCircuit): Promise<SimulationResult> {
  const response = await fetch(`${QUANTUM_API_BASE}/simulate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(circuit),
  });

  if (!response.ok) {
    let detail: string | undefined;
    try {
      const errorBody = await response.json();
      detail = errorBody.detail ?? errorBody.message;
    } catch {
      // non-JSON error body
    }
    throw new QuantumApiError(
      response.status,
      `Simulation failed: ${response.statusText}`,
      detail
    );
  }

  const result: SimulationResult = await response.json();

  // Enrich with frontend metadata
  return {
    ...result,
    executedAt: new Date().toISOString(),
    backendUsed: circuit.backend,
    shotsUsed: circuit.shots,
  };
}

/**
 * Check if the quantum engine is available.
 */
export async function checkQuantumEngineHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${QUANTUM_API_BASE}/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(3000),
    });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Get theoretical expectations for a circuit.
 * (Simple frontend logic for standard basic circuits like H, Bell state)
 */
export function getTheoreticalExpectation(circuit: QuantumCircuit): Record<string, number> | null {
  if (circuit.operations.length === 0) return null;
  
  // Single H gate
  if (circuit.operations.length === 1 && circuit.operations[0].gate === 'H') {
    return { '0': 0.5, '1': 0.5 };
  }
  
  // Bell State (H on 0, CNOT 0->1)
  if (
    circuit.operations.length === 2 && 
    circuit.operations[0].gate === 'H' && circuit.operations[0].target === 0 &&
    circuit.operations[1].gate === 'CNOT' && circuit.operations[1].control === 0 && circuit.operations[1].target === 1
  ) {
    return { '00': 0.5, '11': 0.5 };
  }
  
  // Not a recognizable basic circuit for theoretical mapping in this demo
  return null;
}
