'use client';

import { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { useCircuit } from '@/contexts/CircuitContext';
import { validateBellStateChallenge } from '@/services/assessmentApi';
import { GatePalette } from '@/components/circuit/GatePalette';
import { CircuitCanvas } from '@/components/circuit/CircuitCanvas';
import { CircuitToolbar } from '@/components/circuit/CircuitToolbar';
import { Button } from '@/components/ui/Button';
import { GateType } from '@/types/quantum';
import { ArrowLeft, Target, CheckCircle2, XCircle, ChevronLeft, Loader2, Sparkles, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function BellStateChallengePage() {
  const [selectedGate, setSelectedGate] = useState<GateType | null>(null);
  const { circuit } = useCircuit();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ passed: boolean; score: number; feedback: string } | null>(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await validateBellStateChallenge(circuit);
      setResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppShell>
      <div className="flex flex-col h-[calc(100vh-var(--nav-height))]">
        
        {/* Header */}
        <div className="bg-white border-b border-[var(--border)] p-4 shrink-0 z-30 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/challenges">
              <Button variant="ghost" size="sm" className="hidden sm:flex text-[var(--muted-foreground)]">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            </Link>
            <div className="h-6 w-px bg-[var(--border)] hidden sm:block" />
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-[var(--primary)]">Circuit Challenge</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">Beginner</span>
              </div>
              <h1 className="text-base font-bold text-[var(--foreground)]">Create a Bell State</h1>
            </div>
          </div>
          
          <Button 
            size="lg" 
            onClick={handleSubmit}
            disabled={isSubmitting || circuit.operations.length === 0}
            className="min-w-[160px] shadow-sm bg-emerald-600 hover:bg-emerald-700"
          >
            {isSubmitting ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Validating...</>
            ) : (
              <><Target className="mr-2 h-4 w-4" /> Submit Solution</>
            )}
          </Button>
        </div>

        <div className="flex flex-1 min-h-0 flex-col md:flex-row bg-[var(--background)]">
          
          {/* Instructions Sidebar */}
          <div className="w-full md:w-[320px] shrink-0 border-r border-[var(--border)] bg-white overflow-y-auto">
            <div className="p-6">
              <h2 className="font-bold text-sm uppercase tracking-wider text-[var(--muted-foreground)] mb-4 flex items-center gap-2">
                <BookOpen className="h-4 w-4" /> Instructions
              </h2>
              
              <div className="prose prose-sm prose-indigo mb-6">
                <p className="text-[var(--foreground)] leading-relaxed">
                  Construct a Bell state — the simplest form of quantum entanglement — using standard quantum gates.
                </p>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <h3 className="font-bold text-xs text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5" /> Hint
                </h3>
                <p className="text-sm text-amber-950 leading-relaxed font-medium">
                  The Bell state requires exactly 2 qubits. Put the first qubit in superposition, then entangle the second qubit with it.
                </p>
              </div>

              {result && (
                <div className={`mt-8 p-5 rounded-xl border shadow-sm ${result.passed ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-red-50 border-red-200 text-red-900'}`}>
                  <div className="flex items-center gap-2 mb-4 pb-4 border-b border-black/10">
                    {result.passed ? <CheckCircle2 className="h-5 w-5 text-emerald-600" /> : <XCircle className="h-5 w-5 text-red-600" />}
                    <h3 className="font-bold text-lg">{result.passed ? 'Challenge Passed!' : 'Try Again'}</h3>
                  </div>
                  
                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-4xl font-black">{result.score}%</span>
                    <span className="text-xs font-bold uppercase tracking-wider opacity-70 mb-1.5">Score</span>
                  </div>
                  
                  <p className="text-sm font-medium opacity-90 leading-relaxed bg-white/50 p-3 rounded border border-black/5">
                    {result.feedback}
                  </p>

                  {result.passed && (
                    <Button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700">
                      Continue to Next Challenge
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Circuit Builder Area */}
          <div className="flex-1 flex flex-col min-w-0 bg-[var(--background)]">
            <div className="flex flex-1 min-h-0 overflow-hidden">
              <GatePalette 
                selectedGate={selectedGate} 
                onGateSelect={(gate) => setSelectedGate(selectedGate === gate ? null : gate)} 
              />
              <div className="flex-1 flex flex-col relative min-w-0">
                <CircuitToolbar />
                <CircuitCanvas 
                  selectedGate={selectedGate}
                  onGatePlaced={() => { if (selectedGate === 'CNOT') setSelectedGate(null); }}
                />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </AppShell>
  );
}
