'use client';

import { useCircuit } from '@/contexts/CircuitContext';
import { BACKENDS } from '@/types/quantum';

export function BackendSelector() {
  const { circuit, setBackend } = useCircuit();

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Backend</span>
      <select
        value={circuit.backend}
        onChange={(e) => setBackend(e.target.value as any)}
        className="text-sm border border-gray-300 rounded-md px-2 py-1.5 bg-white text-gray-800 outline-none focus:border-indigo-500 cursor-pointer shadow-sm min-w-[140px]"
      >
        {BACKENDS.map(b => (
          <option key={b.value} value={b.value}>{b.label}</option>
        ))}
      </select>
    </div>
  );
}
