'use client';

import { useCircuit } from '@/contexts/CircuitContext';

export function ShotSelector() {
  const { circuit, setShots } = useCircuit();

  const options = [100, 1000, 8192];

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold uppercase text-[var(--text-muted)] tracking-wider">
        Shots (Measurements)
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => setShots(option)}
            className={`px-4 py-2 rounded-lg border font-medium text-sm transition-all ${
              circuit.shots === option
                ? 'border-[var(--brand-primary)] bg-[var(--brand-primary-light)] text-[var(--brand-primary)] shadow-sm'
                : 'border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--border-strong)]'
            }`}
          >
            {option}
          </button>
        ))}
        <div className="relative flex items-center">
          <input
            type="number"
            min="1"
            max="100000"
            value={circuit.shots}
            onChange={(e) => setShots(parseInt(e.target.value) || 100)}
            className="w-24 pl-3 pr-2 py-2 rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] text-sm outline-none focus:border-[var(--brand-primary)]"
            placeholder="Custom"
          />
        </div>
      </div>
    </div>
  );
}
