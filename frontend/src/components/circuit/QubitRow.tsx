'use client';

import { useCircuit } from '@/contexts/CircuitContext';
import { CircuitGate } from './CircuitGate';
import { GateType } from '@/types/quantum';
import { cn } from '@/lib/utils';

interface QubitRowProps {
  qubitIndex: number;
  selectedGate: GateType | null;
  pendingControl: number | null;
  onSetPendingControl: (qubit: number | null) => void;
  onGatePlaced: () => void;
}

export function QubitRow({ qubitIndex, selectedGate, pendingControl, onSetPendingControl, onGatePlaced }: QubitRowProps) {
  const { circuit, addOperation, removeOperation } = useCircuit();

  // Find operations on this qubit
  const rowOperations = circuit.operations.map((op, i) => ({ op, index: i }))
    .filter(({ op }) => op.target === qubitIndex || op.control === qubitIndex);

  const handleRowClick = () => {
    if (!selectedGate) return;

    if (selectedGate === 'CNOT') {
      if (pendingControl === null) {
        // First click: set control
        onSetPendingControl(qubitIndex);
      } else {
        // Second click: set target and add operation
        if (pendingControl !== qubitIndex) {
          addOperation({
            gate: 'CNOT',
            control: pendingControl,
            target: qubitIndex
          });
          onSetPendingControl(null);
          onGatePlaced();
        }
      }
    } else {
      // 1-qubit gate
      addOperation({
        gate: selectedGate,
        target: qubitIndex
      });
      onGatePlaced();
    }
  };

  const isPendingTarget = selectedGate === 'CNOT' && pendingControl !== null && pendingControl !== qubitIndex;
  const isPendingControl = pendingControl === qubitIndex;

  return (
    <div className="flex items-center h-16 w-full relative group">
      {/* Qubit Label */}
      <div className="w-12 shrink-0 flex items-center justify-center font-mono text-sm font-semibold text-[var(--text-secondary)]">
        q{qubitIndex}
      </div>

      {/* Wire and Canvas Area */}
      <div 
        className={cn(
          "flex-1 h-full flex items-center px-4 relative qubit-wire transition-colors cursor-pointer",
          selectedGate && !isPendingControl && "hover:bg-[var(--bg-subtle)]",
          isPendingTarget && "bg-amber-50/50 border-y border-dashed border-amber-200"
        )}
        onClick={handleRowClick}
      >
        {/* Placed Gates */}
        <div className="flex items-center gap-4 relative z-10 w-full">
          {circuit.operations.map((op, i) => {
            // We iterate all operations to maintain horizontal alignment
            const isOnThisRow = op.target === qubitIndex || op.control === qubitIndex;
            
            return (
              <div key={i} className="w-10 flex justify-center shrink-0">
                {isOnThisRow ? (
                  <CircuitGate 
                    type={op.gate} 
                    index={i} 
                    qubit={qubitIndex}
                    control={op.control}
                    onRemove={removeOperation}
                  />
                ) : (
                  // Empty placeholder to maintain grid alignment
                  <div className="w-10 h-10" />
                )}
              </div>
            );
          })}
          
          {/* Hover indicator for placing new gate */}
          {selectedGate && !isPendingControl && (
            <div className="w-10 h-10 border-2 border-dashed border-[var(--brand-primary)] rounded opacity-0 group-hover:opacity-50 transition-opacity flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-[var(--brand-primary)]">+</span>
            </div>
          )}
          
          {/* Indicator for CNOT control selection */}
          {isPendingControl && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded shadow-sm font-medium animate-pulse">
              Select Target Qubit ↓
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
