'use client';

import { GateType, GATE_INFO } from '@/types/quantum';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface CircuitGateProps {
  type: GateType;
  index: number;
  qubit: number;
  control?: number;
  onRemove: (index: number) => void;
  onClick?: () => void;
  selected?: boolean;
}

export function CircuitGate({ type, index, qubit, control, onRemove, onClick, selected }: CircuitGateProps) {
  const info = GATE_INFO[type];
  
  if (type === 'CNOT' && control !== undefined) {
    // Multi-qubit gate visualization
    const min = Math.min(qubit, control);
    const max = Math.max(qubit, control);
    const distance = max - min;
    const isControl = qubit === control;
    const isTarget = qubit !== control;
    
    // We only render the full visual group from the control qubit row to keep DOM clean,
    // or render connecting lines. For simplicity in this grid layout, we'll render the parts in each row
    // and a connecting line.
    
    if (isControl) {
      return (
        <div className="relative group cursor-pointer" onClick={onClick}>
          <div className="w-10 h-10 flex items-center justify-center relative z-10">
            <div className="w-3 h-3 rounded-full bg-[#d97706]" />
          </div>
          {/* Vertical connection line */}
          <div 
            className="absolute left-1/2 w-0.5 bg-[#d97706] -translate-x-1/2 z-0" 
            style={{ 
              top: '50%',
              height: `${distance * 64}px`, // Assuming 64px row height
              ...(qubit > control ? { top: 'auto', bottom: '50%' } : {})
            }}
          />
        </div>
      );
    }
    
    if (isTarget) {
      return (
        <div className="relative group cursor-pointer" onClick={onClick}>
          <div className={cn("gate-chip gate-cnot group-hover:border-red-500", selected && "ring-2 ring-[var(--brand-primary)]")}>
            ⊕
            <button 
              className="absolute -top-2 -right-2 bg-white rounded-full p-0.5 shadow-sm border opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 text-red-500"
              onClick={(e) => { e.stopPropagation(); onRemove(index); }}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>
      );
    }
  }

  // Standard 1-qubit gate
  return (
    <div className="relative group cursor-pointer" onClick={onClick}>
      <div className={cn("gate-chip", `gate-${type.toLowerCase()}`, selected && "ring-2 ring-[var(--brand-primary)]")}>
        {info.symbol}
        <button 
          className="absolute -top-2 -right-2 bg-white rounded-full p-0.5 shadow-sm border opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 text-red-500 z-20"
          onClick={(e) => { e.stopPropagation(); onRemove(index); }}
          title="Remove gate"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
