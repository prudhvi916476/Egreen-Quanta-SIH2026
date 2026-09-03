import { Card, CardContent } from '@/components/ui/Card';
import { Table } from 'lucide-react';

interface MeasurementCountsProps {
  counts: Record<string, number>;
  shots: number;
}

export function MeasurementCounts({ counts, shots }: MeasurementCountsProps) {
  // Sort states by count (descending)
  const sortedStates = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  return (
    <Card className="bg-white border-[var(--border)] shadow-sm">
      <div className="p-4 border-b border-[var(--border)] bg-gray-50/50 flex items-center gap-2">
        <Table className="h-4 w-4 text-[var(--muted-foreground)]" />
        <h3 className="font-bold text-sm text-[var(--foreground)]">Raw Measurements</h3>
      </div>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/80 text-[10px] uppercase text-[var(--muted-foreground)] border-b border-[var(--border)] tracking-wider">
              <tr>
                <th className="px-5 py-3 font-semibold">Basis State</th>
                <th className="px-5 py-3 font-semibold text-right">Count</th>
                <th className="px-5 py-3 font-semibold text-right">Frequency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] font-mono">
              {sortedStates.map(([state, count]) => {
                const percentage = ((count / shots) * 100).toFixed(1);
                return (
                  <tr key={state} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="px-5 py-3 text-[var(--primary)] font-bold">|{state}⟩</td>
                    <td className="px-5 py-3 text-right text-[var(--foreground)]">{count}</td>
                    <td className="px-5 py-3 text-right text-[var(--muted-foreground)]">{percentage}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
