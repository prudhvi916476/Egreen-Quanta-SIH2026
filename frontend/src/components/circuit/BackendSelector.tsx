'use client';

import { useCircuit } from '@/contexts/CircuitContext';
import { BACKENDS } from '@/types/quantum';
import { Server, Zap } from 'lucide-react';

export function BackendSelector() {
  const { circuit, setBackend } = useCircuit();

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold uppercase text-[var(--text-muted)] tracking-wider">
        Execution Backend
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {BACKENDS.map((b) => {
          const isSelected = circuit.backend === b.value;
          return (
            <button
              key={b.value}
              onClick={() => setBackend(b.value)}
              className={`flex flex-col items-start text-left p-3 rounded-lg border transition-all ${
                isSelected 
                  ? 'border-[var(--brand-primary)] bg-[var(--brand-primary-light)] shadow-sm' 
                  : 'border-[var(--border-default)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)]'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {b.value === 'qiskit' ? (
                  <Server className={`h-4 w-4 ${isSelected ? 'text-[var(--brand-primary)]' : 'text-[var(--text-secondary)]'}`} />
                ) : (
                  <Zap className={`h-4 w-4 ${isSelected ? 'text-[var(--brand-primary)]' : 'text-[var(--text-secondary)]'}`} />
                )}
                <span className={`font-semibold text-sm ${isSelected ? 'text-[var(--brand-primary)]' : 'text-[var(--text-primary)]'}`}>
                  {b.label}
                </span>
              </div>
              <span className={`text-xs ${isSelected ? 'text-[var(--quantum-700)]' : 'text-[var(--text-muted)]'} line-clamp-1`}>
                {b.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
