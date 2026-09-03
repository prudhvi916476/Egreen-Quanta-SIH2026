import { useCircuit } from '@/contexts/CircuitContext';
import { Button } from '@/components/ui/Button';
import { PlayCircle, Trash2, Save, Download, HelpCircle } from 'lucide-react';
import { BackendSelector } from './BackendSelector';
import { ShotSelector } from './ShotSelector';
import { useRouter } from 'next/navigation';

export function CircuitToolbar() {
  const { circuit, runSimulation, isSimulating } = useCircuit();
  const router = useRouter();

  const handleRun = async () => {
    if (circuit.operations.length === 0) return;
    await runSimulation();
    router.push('/circuit-lab/results');
  };

  const handleClear = () => {
    // Basic clear using standard context dispatcher if available, otherwise just warn
    if (confirm('Clear the entire circuit?')) {
      // In a real implementation we would have clearCircuit in the context
      window.location.reload(); 
    }
  };

  return (
    <div className="h-16 border-b border-[var(--border)] bg-white px-4 md:px-6 flex items-center justify-between shrink-0 shadow-sm z-10 relative">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <BackendSelector />
          <ShotSelector />
        </div>
        
        <div className="hidden md:flex h-8 w-px bg-[var(--border)] mx-2" />
        
        <div className="hidden md:flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
          <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-600">Qubits: {circuit.num_qubits}</span>
          <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-600">Depth: {circuit.operations.length}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 mr-2">
          <Button variant="ghost" size="sm" onClick={handleClear} className="text-gray-500 hover:text-red-600">
            <Trash2 className="h-4 w-4 mr-1.5" /> Clear
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Download className="h-4 w-4" />
          </Button>
        </div>

        <Button 
          onClick={handleRun} 
          disabled={isSimulating || circuit.operations.length === 0}
          className="shadow-md bg-indigo-600 hover:bg-indigo-500 min-w-[140px]"
        >
          {isSimulating ? (
            <span className="flex items-center">
              <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
              Simulating...
            </span>
          ) : (
            <span className="flex items-center">
              <PlayCircle className="mr-2 h-4 w-4" /> Run Circuit
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
