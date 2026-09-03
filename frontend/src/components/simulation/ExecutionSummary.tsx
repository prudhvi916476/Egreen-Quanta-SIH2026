import { Card, CardContent } from '@/components/ui/Card';
import { SimulationResult, QuantumCircuit } from '@/types/quantum';
import { Cpu, ListOrdered, CheckCircle2 } from 'lucide-react';

interface ExecutionSummaryProps {
  result: SimulationResult;
  circuit: QuantumCircuit;
}

export function ExecutionSummary({ result, circuit }: ExecutionSummaryProps) {
  return (
    <Card className="bg-white border-[var(--border)] shadow-sm">
      <CardContent className="p-0 flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
        
        <div className="flex-1 p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 border border-indigo-100">
            <Cpu className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider mb-1">Backend</div>
            <div className="font-mono text-sm font-semibold">{result.backendUsed || 'qiskit'}</div>
          </div>
        </div>

        <div className="flex-1 p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 border border-blue-100">
            <ListOrdered className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider mb-1">Total Shots</div>
            <div className="font-mono text-sm font-semibold">{(result.shotsUsed || 100).toLocaleString()}</div>
          </div>
        </div>

        <div className="flex-1 p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 border border-emerald-100">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider mb-1">Execution Status</div>
            <div className="font-semibold text-sm text-emerald-700">Completed Successfully</div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
