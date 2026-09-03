'use client';

import { AppShell } from '@/components/layout/AppShell';
import { GatePalette } from '@/components/circuit/GatePalette';
import { CircuitCanvas } from '@/components/circuit/CircuitCanvas';
import { CircuitToolbar } from '@/components/circuit/CircuitToolbar';
import { useState } from 'react';
import { GateType } from '@/types/quantum';

export default function CircuitLabPage() {
  const [selectedGate, setSelectedGate] = useState<GateType | null>(null);

  return (
    <AppShell>
      <div className="flex h-full w-full bg-[var(--background)]">
        {/* Left Sidebar - Gate Palette */}
        <GatePalette 
          selectedGate={selectedGate} 
          onGateSelect={(gate) => setSelectedGate(selectedGate === gate ? null : gate)} 
        />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 relative">
          <CircuitToolbar />
          <CircuitCanvas 
            selectedGate={selectedGate}
            onGatePlaced={() => {
              if (selectedGate === 'CNOT') {
                setSelectedGate(null); // Reset after placing CNOT for UX
              }
            }}
          />
        </div>
      </div>
    </AppShell>
  );
}
