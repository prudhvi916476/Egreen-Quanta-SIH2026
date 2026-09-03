'use client';

import { AppShell } from '@/components/layout/AppShell';
import { useCircuit } from '@/contexts/CircuitContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { ProbabilityChart } from '@/components/simulation/ProbabilityChart';
import { MeasurementCounts } from '@/components/simulation/MeasurementCounts';
import { ExecutionSummary } from '@/components/simulation/ExecutionSummary';
import { TheoryComparison } from '@/components/simulation/TheoryComparison';
import { ResultInsight } from '@/components/simulation/ResultInsight';
import { TutorPanel } from '@/components/tutor/TutorPanel';
import { ArrowLeft, BarChart2, Lightbulb, Activity } from 'lucide-react';
import Link from 'next/link';

export default function ResultsPage() {
  const { circuit, result } = useCircuit();
  const router = useRouter();

  if (!result || !circuit) {
    return (
      <AppShell>
        <div className="container-app py-16 text-center">
          <p className="text-[var(--muted-foreground)] mb-6">No simulation results found.</p>
          <Button onClick={() => router.push('/circuit-lab')}>
            Return to Circuit Lab
          </Button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="bg-[var(--background)] min-h-screen pb-16">
        
        {/* Header Bar */}
        <div className="bg-white border-b border-[var(--border)] py-4 sticky top-[var(--nav-height)] z-30 shadow-sm">
          <div className="container-app flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => router.push('/circuit-lab')} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] -ml-2">
                <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to Lab
              </Button>
              <div className="h-4 w-px bg-[var(--border)]" />
              <h1 className="font-bold text-lg text-[var(--foreground)] flex items-center gap-2">
                <Activity className="h-5 w-5 text-indigo-600" />
                Simulation Results
              </h1>
            </div>
          </div>
        </div>

        <div className="container-app pt-8">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            
            {/* Left Column (Data Visualization) */}
            <div className="xl:col-span-8 space-y-6">
              
              <ExecutionSummary result={result} circuit={circuit} />

              <Card className="bg-white shadow-sm border-[var(--border)]">
                <div className="p-4 border-b border-[var(--border)] bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-bold text-[var(--foreground)] flex items-center gap-2">
                    <BarChart2 className="h-4 w-4 text-[var(--primary)]" /> Measurement Probabilities
                  </h3>
                </div>
                <CardContent className="p-6">
                  <div className="h-80 w-full">
                    <ProbabilityChart result={result} />
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MeasurementCounts counts={result.counts} shots={result.shotsUsed || 100} />
                <TheoryComparison counts={result.counts} shots={result.shotsUsed || 100} circuit={circuit} />
              </div>
            </div>

            {/* Right Column (AI Tutor Insights) */}
            <div className="xl:col-span-4 space-y-6 sticky top-[calc(var(--nav-height)+5rem)]">
              
              <Card className="bg-indigo-900 text-white shadow-md border border-indigo-800">
                <div className="p-4 border-b border-indigo-800 bg-indigo-950/50 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-amber-300" />
                  <h3 className="font-bold text-sm">Quanta AI Insight</h3>
                </div>
                <CardContent className="p-0">
                  <ResultInsight result={result} circuit={circuit} />
                </CardContent>
              </Card>

              <TutorPanel />

            </div>

          </div>
        </div>
      </div>
    </AppShell>
  );
}
