'use client';

import { parseProbabilities, SimulationResult } from '@/types/quantum';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export function ProbabilityChart({ result }: { result: SimulationResult }) {
  const data = parseProbabilities(result).map(item => ({
    state: item.state,
    probability: item.probability * 100, // Convert to percentage
    count: item.count
  }));

  // Ensure we show at least the states present. A more robust implementation 
  // might show all 2^n possible states if n is small.
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-md p-3 rounded-lg">
          <p className="font-mono font-bold text-[var(--quantum-700)] mb-1">{label}</p>
          <p className="text-sm">Probability: <span className="font-semibold">{payload[0].value.toFixed(1)}%</span></p>
          <p className="text-sm text-[var(--text-secondary)]">Count: {payload[0].payload.count}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-base">Probability Distribution</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-[300px]">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-subtle)" />
              <XAxis 
                dataKey="state" 
                tick={{ fill: 'var(--text-secondary)', fontFamily: 'monospace', fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: 'var(--border-default)' }}
              />
              <YAxis 
                tickFormatter={(value) => `${value}%`}
                tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--bg-subtle)' }} />
              <Bar 
                dataKey="probability" 
                radius={[4, 4, 0, 0]}
                animationDuration={1000}
                animationEasing="ease-out"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.probability > 40 && entry.probability < 60 ? 'var(--quantum-500)' : 'var(--brand-primary)'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-[var(--text-muted)]">
            No probabilities to chart.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
