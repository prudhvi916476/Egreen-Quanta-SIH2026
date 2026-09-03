import { Card, CardContent } from '@/components/ui/Card';
import { QuantumCircuit } from '@/types/quantum';
import { Scale } from 'lucide-react';
import { getTheoreticalExpectation } from '@/services/quantumApi';

interface TheoryComparisonProps {
  counts: Record<string, number>;
  shots: number;
  circuit: QuantumCircuit;
}

export function TheoryComparison({ counts, shots, circuit }: TheoryComparisonProps) {
  const theoretical = getTheoreticalExpectation(circuit);
  
  if (!theoretical) return null;

  return (
    <Card className="bg-white border-[var(--border)] shadow-sm">
      <div className="p-4 border-b border-[var(--border)] bg-gray-50/50 flex items-center gap-2">
        <Scale className="h-4 w-4 text-[var(--muted-foreground)]" />
        <h3 className="font-bold text-sm text-[var(--foreground)]">Theory vs Reality</h3>
      </div>
      <CardContent className="p-6">
        <div className="space-y-6">
          {Object.entries(theoretical).map(([state, expectedProb]) => {
            const actualCount = counts[state] || 0;
            const actualProb = actualCount / shots;
            
            // Calculate absolute error
            const error = Math.abs(expectedProb - actualProb);
            const errorPercentage = (error * 100).toFixed(1);

            return (
              <div key={state}>
                <div className="flex justify-between items-center mb-2 font-mono text-xs">
                  <span className="font-bold text-[var(--primary)]">|{state}⟩</span>
                  <span className="text-[var(--muted-foreground)]">Diff: {errorPercentage}%</span>
                </div>
                
                <div className="space-y-2">
                  <div className="relative">
                    <div className="flex justify-between text-[10px] text-[var(--muted-foreground)] mb-1 uppercase font-semibold">
                      <span>Measured ({actualCount})</span>
                      <span>{(actualProb * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-indigo-50 h-2 rounded-full overflow-hidden">
                      <div className="bg-indigo-500 h-full rounded-full transition-all" style={{ width: `${actualProb * 100}%` }} />
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="flex justify-between text-[10px] text-gray-500 mb-1 uppercase font-semibold">
                      <span>Theoretical Expected</span>
                      <span>{(expectedProb * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-gray-400 h-full rounded-full transition-all" style={{ width: `${expectedProb * 100}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
