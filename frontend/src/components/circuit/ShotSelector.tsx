'use client';

import { useCircuit } from '@/contexts/CircuitContext';

export function ShotSelector() {
  const { circuit, setShots } = useCircuit();

  const options = [100, 1000, 8192];

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Shots</span>
      <select
        value={options.includes(circuit.shots) ? circuit.shots : "custom"}
        onChange={(e) => {
          if (e.target.value !== "custom") {
            setShots(parseInt(e.target.value));
          }
        }}
        className="text-sm border border-gray-300 rounded-md px-2 py-1.5 bg-white text-gray-800 outline-none focus:border-indigo-500 cursor-pointer shadow-sm"
      >
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
        {!options.includes(circuit.shots) && (
          <option value="custom">{circuit.shots} (Custom)</option>
        )}
      </select>
    </div>
  );
}
