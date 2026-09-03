'use client';

import { useEffect, useState } from 'react';
import { SimulationResult, QuantumCircuit } from '@/types/quantum';
import { explainSimulationResult } from '@/services/tutorApi';
import { Loader2 } from 'lucide-react';

interface ResultInsightProps {
  result: SimulationResult;
  circuit: QuantumCircuit;
}

export function ResultInsight({ result, circuit }: ResultInsightProps) {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const fetchInsight = async () => {
      setLoading(true);
      try {
        const response = await explainSimulationResult(
          circuit,
          result,
          { circuitDescription: 'Simulation result analysis' }
        );
        if (isMounted) {
          setInsight(response.message);
        }
      } catch (error) {
        if (isMounted) {
          setInsight("Unable to generate AI insight at this time.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchInsight();

    return () => {
      isMounted = false;
    };
  }, [circuit, result]);

  if (loading) {
    return (
      <div className="p-6 flex items-center gap-3 text-indigo-200">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm font-medium">Analyzing statistical variance...</span>
      </div>
    );
  }

  return (
    <div className="p-6 text-sm text-indigo-50 leading-relaxed font-medium">
      {insight}
    </div>
  );
}
