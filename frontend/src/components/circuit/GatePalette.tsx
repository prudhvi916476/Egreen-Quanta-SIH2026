import { GateType } from '@/types/quantum';
import { cn } from '@/lib/utils';
import { MousePointer2 } from 'lucide-react';

interface GatePaletteProps {
  selectedGate: GateType | null;
  onGateSelect: (gate: GateType | null) => void;
}

export function GatePalette({ selectedGate, onGateSelect }: GatePaletteProps) {
  const gates: { type: GateType; label: string; colorClass: string; desc: string }[] = [
    { type: 'H', label: 'H', colorClass: 'border-[#8b5cf6] text-[#8b5cf6] hover:bg-purple-50', desc: 'Hadamard - Creates superposition' },
    { type: 'X', label: 'X', colorClass: 'border-[#10b981] text-[#10b981] hover:bg-emerald-50', desc: 'Pauli X - Bit flip (NOT)' },
    { type: 'Y', label: 'Y', colorClass: 'border-[#f59e0b] text-[#f59e0b] hover:bg-amber-50', desc: 'Pauli Y - Bit/Phase flip' },
    { type: 'Z', label: 'Z', colorClass: 'border-[#ef4444] text-[#ef4444] hover:bg-red-50', desc: 'Pauli Z - Phase flip' },
    { type: 'CNOT', label: '⊕', colorClass: 'border-[#3b82f6] text-[#3b82f6] hover:bg-blue-50 rounded-full', desc: 'CNOT - Entanglement (2 qubits)' },
    { type: 'M', label: 'M', colorClass: 'border-[#4b5563] text-[#4b5563] bg-gray-50 hover:bg-gray-100', desc: 'Measure to classical bit' },
  ];

  return (
    <div className="flex flex-col h-full bg-white border-r border-[var(--border)] overflow-y-auto w-64 shrink-0 shadow-[1px_0_4px_rgba(0,0,0,0.02)]">
      <div className="p-4 border-b border-[var(--border)] bg-gray-50/50">
        <h2 className="font-bold text-sm text-[var(--foreground)] uppercase tracking-wider">Gate Palette</h2>
        <p className="text-xs text-[var(--muted-foreground)] mt-1">Select a gate to place it on the circuit canvas.</p>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {/* Deselect Tool */}
        <button
          onClick={() => onGateSelect(null)}
          className={cn(
            "flex items-center gap-3 p-3 rounded-md text-left transition-all border",
            selectedGate === null 
              ? "bg-indigo-50 border-[var(--primary)] text-[var(--primary)] shadow-sm" 
              : "bg-white border-[var(--border)] text-[var(--muted-foreground)] hover:border-[var(--border-strong)] hover:text-[var(--foreground)]"
          )}
        >
          <MousePointer2 className="h-4 w-4" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Pointer</span>
            <span className="text-[10px] opacity-80">Select / Move</span>
          </div>
        </button>

        <div className="h-px w-full bg-[var(--border)] my-1" />

        {/* Gate Tools */}
        <div className="grid grid-cols-2 gap-3">
          {gates.map((g) => (
            <button
              key={g.type}
              onClick={() => onGateSelect(g.type)}
              title={g.desc}
              className={cn(
                "flex flex-col items-center justify-center p-3 rounded-md transition-all border-2 group",
                selectedGate === g.type 
                  ? "border-[var(--primary)] bg-indigo-50/50 shadow-sm shadow-indigo-100/50 scale-[0.98]" 
                  : "border-[var(--border)] hover:border-[var(--border-strong)] bg-white hover:bg-gray-50"
              )}
            >
              <div className={cn(
                "w-10 h-10 flex items-center justify-center font-bold text-lg border-2 bg-white shadow-sm transition-transform group-hover:scale-105",
                g.colorClass,
                g.type !== 'CNOT' && "rounded-md"
              )}>
                {g.label}
              </div>
              <span className="text-[10px] font-bold mt-2 text-[var(--foreground)] tracking-wide">{g.type}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
