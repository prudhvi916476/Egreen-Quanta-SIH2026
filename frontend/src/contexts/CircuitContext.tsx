'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { QuantumCircuit, QuantumOperation, Backend, SimulationResult } from '@/types/quantum';
import { simulateCircuit } from '@/services/quantumApi';

interface CircuitContextState {
  circuit: QuantumCircuit;
  result: SimulationResult | null;
  isSimulating: boolean;
  simulationError: string | null;
  // Actions
  setNumQubits: (num: number) => void;
  setBackend: (backend: Backend) => void;
  setShots: (shots: number) => void;
  addOperation: (op: QuantumOperation) => void;
  removeOperation: (index: number) => void;
  clearCircuit: () => void;
  runSimulation: () => Promise<void>;
  clearResult: () => void;
}

const CircuitContext = createContext<CircuitContextState | undefined>(undefined);

const DEFAULT_CIRCUIT: QuantumCircuit = {
  num_qubits: 2,
  operations: [],
  shots: 100,
  backend: 'qiskit',
};

export function CircuitProvider({ children }: { children: ReactNode }) {
  const [circuit, setCircuit] = useState<QuantumCircuit>(DEFAULT_CIRCUIT);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationError, setSimulationError] = useState<string | null>(null);

  const setNumQubits = (num: number) => setCircuit((prev) => ({ ...prev, num_qubits: Math.max(1, Math.min(5, num)) }));
  const setBackend = (backend: Backend) => setCircuit((prev) => ({ ...prev, backend }));
  const setShots = (shots: number) => setCircuit((prev) => ({ ...prev, shots: Math.max(1, shots) }));
  
  const addOperation = (op: QuantumOperation) => {
    setCircuit((prev) => ({
      ...prev,
      operations: [...prev.operations, op],
    }));
    // Clear result when circuit changes
    setResult(null);
  };

  const removeOperation = (index: number) => {
    setCircuit((prev) => ({
      ...prev,
      operations: prev.operations.filter((_, i) => i !== index),
    }));
    setResult(null);
  };

  const clearCircuit = () => {
    setCircuit((prev) => ({ ...prev, operations: [] }));
    setResult(null);
    setSimulationError(null);
  };

  const clearResult = () => {
    setResult(null);
    setSimulationError(null);
  };

  const runSimulation = async () => {
    setIsSimulating(true);
    setSimulationError(null);
    try {
      const res = await simulateCircuit(circuit);
      setResult(res);
    } catch (e: any) {
      setSimulationError(e.message || 'Simulation failed');
      setResult(null);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <CircuitContext.Provider
      value={{
        circuit,
        result,
        isSimulating,
        simulationError,
        setNumQubits,
        setBackend,
        setShots,
        addOperation,
        removeOperation,
        clearCircuit,
        runSimulation,
        clearResult
      }}
    >
      {children}
    </CircuitContext.Provider>
  );
}

export function useCircuit() {
  const context = useContext(CircuitContext);
  if (context === undefined) {
    throw new Error('useCircuit must be used within a CircuitProvider');
  }
  return context;
}
