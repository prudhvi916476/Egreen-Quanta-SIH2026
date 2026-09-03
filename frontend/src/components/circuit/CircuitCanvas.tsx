import { useState, useRef, useEffect } from 'react';
import { useCircuit } from '@/contexts/CircuitContext';
import { QubitRow } from './QubitRow';
import { GateType, QuantumOperation } from '@/types/quantum';
import { HelpCircle } from 'lucide-react';

interface CircuitCanvasProps {
  selectedGate: GateType | null;
  onGatePlaced?: () => void;
}

export function CircuitCanvas({ selectedGate, onGatePlaced }: CircuitCanvasProps) {
  const { circuit, addOperation, removeOperation } = useCircuit();
  const [controlQubit, setControlQubit] = useState<number | null>(null);
  
  // Create a grid representation for visual alignment
  const MAX_COLUMNS = 12;

  const handleCellClick = (qubit: number, col: number) => {
    if (!selectedGate) {
      // If no gate is selected and we click a gate, try to remove it
      // Simple exact match logic for demo
      const opIndex = circuit.operations.findIndex(
        (op, idx) => op.target === qubit && idx === col
      );
      if (opIndex !== -1) {
        removeOperation(opIndex);
      }
      return;
    }

    if (selectedGate === 'CNOT') {
      if (controlQubit === null) {
        setControlQubit(qubit);
      } else {
        if (controlQubit !== qubit) {
          addOperation({ gate: 'CNOT', control: controlQubit, target: qubit });
          if (onGatePlaced) onGatePlaced();
        }
        setControlQubit(null);
      }
    } else {
      addOperation({ gate: selectedGate, target: qubit });
      if (onGatePlaced) onGatePlaced();
    }
  };

  return (
    <div className="flex-1 bg-[#fafafa] relative overflow-auto custom-scrollbar flex flex-col">
      {/* Canvas Header / Grid Indicators */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-[var(--border)] h-8 flex">
        <div className="w-16 shrink-0 border-r border-[var(--border)]" />
        <div className="flex-1 flex px-4">
          {Array.from({ length: MAX_COLUMNS }).map((_, i) => (
            <div key={i} className="flex-1 border-r border-gray-100 flex justify-center items-center">
              <span className="text-[10px] text-gray-400 font-mono select-none">{i}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 relative p-4 lg:p-8 min-w-[800px]">
        {/* Background Grid Lines */}
        <div className="absolute inset-0 pointer-events-none px-4 lg:px-8 top-0 flex ml-16">
          {Array.from({ length: MAX_COLUMNS }).map((_, i) => (
            <div key={i} className="flex-1 border-r border-gray-100/50 h-full" />
          ))}
        </div>

        <div className="relative z-10 space-y-10 mt-8">
          {Array.from({ length: circuit.num_qubits }).map((_, qubitIndex) => (
            <QubitRow
              key={qubitIndex}
              qubitIndex={qubitIndex}
              selectedGate={selectedGate}
              pendingControl={controlQubit}
              onSetPendingControl={setControlQubit}
              onGatePlaced={() => { if (onGatePlaced) onGatePlaced(); }}
            />
          ))}
        </div>

        {selectedGate === 'CNOT' && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-blue-900 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 text-sm font-medium animate-in slide-in-from-bottom-5">
            <HelpCircle className="h-4 w-4 text-blue-300" />
            {controlQubit === null ? 
              "Select the control qubit (filled circle)" : 
              `Select target qubit to entangle with q[${controlQubit}]`
            }
          </div>
        )}
      </div>
    </div>
  );
}
