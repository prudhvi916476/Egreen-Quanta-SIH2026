'use client';

import { AppShell } from '@/components/layout/AppShell';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { 
  ArrowRight, BookOpen, Cpu, Sparkles, BarChart2, ShieldCheck, 
  Target, Layers, Zap, Clock, PlayCircle, CheckCircle2, Award 
} from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LandingPage() {
  const { user } = useUser();
  const router = useRouter();

  // Redirect to dashboard if logged in
  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  return (
    <AppShell>
      <div className="flex flex-col min-h-screen bg-[var(--background)]">
        
        {/* HERO SECTION */}
        <section className="w-full bg-white border-b border-[var(--border)] py-16 md:py-24">
          <div className="container-app">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Copy & CTAs */}
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3.5 py-1 text-xs font-semibold text-[var(--primary)] mb-6">
                  <Sparkles className="h-3.5 w-3.5" />
                  SIH 2026 Interactive Learning Platform
                </div>
                
                <h1 className="text-hero text-[var(--foreground)] mb-6">
                  Learn Quantum Computing by <span className="text-[var(--primary)]">Building It.</span>
                </h1>
                
                <p className="text-lg text-[var(--muted-foreground)] mb-8 max-w-2xl leading-relaxed">
                  Learn quantum concepts, build circuits, run experiments, understand results, and practice with AI-guided learning—all in one unified platform.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <Link href="/login">
                    <Button size="lg" className="w-full sm:w-auto text-base">
                      START LEARNING
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/circuit-lab">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto text-base">
                      EXPLORE CIRCUIT LAB
                    </Button>
                  </Link>
                </div>

                <div className="mt-10 flex items-center gap-6 text-xs text-[var(--muted-foreground)] font-medium">
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-[var(--success)]" /> Real Qiskit & Cirq Backends</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-[var(--success)]" /> Interactive visual builder</span>
                </div>
              </div>

              {/* Right Column: Realistic Product Preview (Circuit Mockup) */}
              <div className="lg:col-span-5">
                <div className="rounded-xl border border-[var(--border-strong)] bg-[var(--card)] shadow-xl overflow-hidden">
                  <div className="bg-gray-900 text-gray-300 px-4 py-3 border-b border-gray-800 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                      <span className="ml-2 text-gray-400">superposition_experiment.qasm</span>
                    </div>
                    <span className="text-emerald-400 font-semibold">Qiskit Aer • 100 shots</span>
                  </div>
                  
                  {/* Visual Circuit Canvas inside Card */}
                  <div className="p-6 bg-slate-950 text-white font-mono text-sm space-y-6">
                    {/* Wire 0 */}
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400 font-bold w-6">q[0]</span>
                      <div className="flex-1 h-px bg-slate-700 relative flex items-center gap-6 px-4">
                        <div className="w-9 h-9 rounded border-2 border-purple-400 bg-purple-900/60 text-purple-200 flex items-center justify-center font-bold text-sm shadow-md">H</div>
                        <div className="w-9 h-9 rounded border-2 border-slate-500 bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-xs">M</div>
                      </div>
                    </div>
                    
                    {/* Wire 1 */}
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400 font-bold w-6">q[1]</span>
                      <div className="flex-1 h-px bg-slate-700 relative flex items-center gap-6 px-4">
                        <div className="w-9 h-9 rounded border-2 border-blue-400 bg-blue-900/60 text-blue-200 flex items-center justify-center font-bold text-sm">⊕</div>
                        <div className="w-9 h-9 rounded border-2 border-slate-500 bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-xs">M</div>
                      </div>
                    </div>

                    {/* Simulation Result Preview Bar */}
                    <div className="pt-4 border-t border-slate-800">
                      <div className="flex justify-between text-xs text-slate-400 mb-2 font-sans">
                        <span>Measurement Distribution</span>
                        <span>100 Shots</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs font-sans">
                        <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                          <div className="flex justify-between font-mono mb-1"><span className="text-indigo-400">|00⟩</span> <span>49%</span></div>
                          <div className="w-full bg-slate-800 h-1.5 rounded-full"><div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '49%' }} /></div>
                        </div>
                        <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                          <div className="flex justify-between font-mono mb-1"><span className="text-indigo-400">|11⟩</span> <span>51%</span></div>
                          <div className="w-full bg-slate-800 h-1.5 rounded-full"><div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '51%' }} /></div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* LEARNING LOOP SECTION */}
        <section className="w-full py-16 bg-[var(--background)] border-b border-[var(--border)]">
          <div className="container-app">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-section-title mb-3">The Complete Learning Loop</h2>
              <p className="text-[var(--muted-foreground)]">A structured, closed-loop methodology designed for deep conceptual and practical quantum mastery.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
              {[
                { title: 'LEARN', desc: 'Theory & concepts' },
                { title: 'BUILD', desc: 'Circuit design' },
                { title: 'EXECUTE', desc: 'Real simulation' },
                { title: 'VISUALIZE', desc: 'Probabilities' },
                { title: 'UNDERSTAND', desc: 'AI guidance' },
                { title: 'PRACTICE', desc: 'Experiments' },
                { title: 'ASSESS', desc: 'Challenges' },
                { title: 'TRACK', desc: 'Analytics' }
              ].map((step, idx) => (
                <div key={step.title} className="bg-white border border-[var(--border)] p-4 rounded-lg text-center flex flex-col items-center justify-between h-32 hover:border-[var(--primary)] transition-colors">
                  <div className="w-7 h-7 rounded-full bg-indigo-50 text-[var(--primary)] font-bold text-xs flex items-center justify-center mb-2">
                    0{idx + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-xs tracking-wider text-[var(--foreground)] mb-1">{step.title}</h3>
                    <p className="text-[11px] text-[var(--muted-foreground)]">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED COURSE SECTION */}
        <section className="w-full py-20 bg-white border-b border-[var(--border)]">
          <div className="container-app">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary)] mb-2 block">Featured Curriculum</span>
                <h2 className="text-section-title">Start with the Fundamentals</h2>
              </div>
              <Link href="/courses">
                <Button variant="outline">Browse All Courses</Button>
              </Link>
            </div>

            {/* Udemy-style Course Card */}
            <div className="max-w-4xl border border-[var(--border-strong)] rounded-xl bg-white shadow-sm overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow">
              <div className="md:w-2/5 bg-gradient-to-br from-indigo-900 to-slate-900 p-8 text-white flex flex-col justify-between relative overflow-hidden">
                <div className="relative z-10">
                  <span className="bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 text-xs px-2.5 py-1 rounded font-semibold uppercase tracking-wider">Beginner Level</span>
                  <h3 className="text-2xl font-bold mt-4 mb-2">Quantum Computing Fundamentals</h3>
                  <p className="text-slate-300 text-sm">Master Qubits, Superposition, and Entanglement with interactive hands-on circuit experiments.</p>
                </div>
                <div className="mt-8 flex items-center gap-4 text-xs text-slate-300 relative z-10">
                  <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> 53 mins</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><BookOpen className="h-4 w-4" /> 3 Modules</span>
                </div>
              </div>

              <div className="md:w-3/5 p-8 flex flex-col justify-between">
                <div>
                  <h4 className="font-semibold text-sm text-[var(--muted-foreground)] uppercase tracking-wider mb-4">Curriculum Overview</h4>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--background)] border border-[var(--border)]">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-indigo-100 text-[var(--primary)] text-xs font-bold flex items-center justify-center">1</span>
                        <span className="text-sm font-semibold">Qubits</span>
                      </div>
                      <span className="text-xs text-[var(--muted-foreground)]">15 mins</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--background)] border border-[var(--border)]">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-indigo-100 text-[var(--primary)] text-xs font-bold flex items-center justify-center">2</span>
                        <span className="text-sm font-semibold">Superposition</span>
                      </div>
                      <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">Includes Experiment</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--background)] border border-[var(--border)]">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-indigo-100 text-[var(--primary)] text-xs font-bold flex items-center justify-center">3</span>
                        <span className="text-sm font-semibold">Entanglement</span>
                      </div>
                      <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">Bell State Lab</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                  <span className="text-xs text-[var(--muted-foreground)] font-medium">Free Access • Full Simulator Access</span>
                  <Link href="/courses/quantum-computing-fundamentals">
                    <Button>
                      <PlayCircle className="mr-2 h-4 w-4" /> Start Course
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY EGREEN QUANTA SECTION */}
        <section className="w-full py-20 bg-[var(--background)] border-b border-[var(--border)]">
          <div className="container-app">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-section-title mb-3">Why Egreen Quanta</h2>
              <p className="text-[var(--muted-foreground)]">Purpose-built for computer science students, researchers, and engineers getting started with quantum algorithms.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: BookOpen, title: 'Interactive Quantum Learning', desc: 'Bite-sized, structured theory paired directly with visual execution for immediate reinforcement.' },
                { icon: Cpu, title: 'Circuit Simulation', desc: 'Construct multi-qubit circuits and execute on Qiskit Aer, Cirq, or PennyLane backends.' },
                { icon: Sparkles, title: 'AI Tutor Guidance', desc: 'Contextual AI assistance that reads your simulation results and explains quantum statistical variance.' },
                { icon: BarChart2, title: 'Visual Results & Analytics', desc: 'Rich histograms comparing measured probabilities against theoretical expectations.' },
                { icon: Target, title: 'Practice & Challenges', desc: 'Solve hands-on circuit challenges (e.g., Bell States) with automated evaluation.' },
                { icon: Layers, title: 'Progress Tracking', desc: 'Track your skill mastery, lesson completion, and experiment stats in a clean dashboard.' }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.title} className="bg-white border-[var(--border)] shadow-sm">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-lg bg-indigo-50 text-[var(--primary)] flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-card-title mb-2">{item.title}</h3>
                      <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{item.desc}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CIRCUIT LAB PREVIEW SECTION */}
        <section className="w-full py-20 bg-white border-b border-[var(--border)]">
          <div className="container-app">
            <div className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="lg:w-1/2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2 block">Interactive Sandbox</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">The Quantum Circuit Lab</h2>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Design single and multi-qubit circuits visually using standard quantum gates (Hadamard, Pauli-X, Pauli-Y, Pauli-Z, CNOT, Measurement). Choose your target simulator backend and shot counts.
                </p>
                <div className="flex flex-wrap gap-3 mb-8 text-xs font-mono text-slate-300">
                  <span className="bg-slate-800 px-3 py-1.5 rounded border border-slate-700">q0 ─── H ─── M</span>
                  <span className="bg-slate-800 px-3 py-1.5 rounded border border-slate-700">q1 ───────── M</span>
                  <span className="bg-indigo-900/60 text-indigo-300 px-3 py-1.5 rounded border border-indigo-700 font-semibold">Qiskit Aer • 100 shots</span>
                </div>
                <Link href="/circuit-lab">
                  <Button size="lg" className="bg-indigo-600 text-white hover:bg-indigo-500 border-none">
                    Open Circuit Lab
                  </Button>
                </Link>
              </div>

              <div className="lg:w-1/2 w-full">
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 shadow-inner font-mono text-sm space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-800 text-xs text-slate-400">
                    <span>Circuit Gate Palette</span>
                    <span className="text-emerald-400">Ready to simulate</span>
                  </div>
                  <div className="grid grid-cols-5 gap-3">
                    <div className="h-12 border-2 border-purple-500/80 bg-purple-950/40 text-purple-300 font-bold rounded flex items-center justify-center text-base">H</div>
                    <div className="h-12 border-2 border-emerald-500/80 bg-emerald-950/40 text-emerald-300 font-bold rounded flex items-center justify-center text-base">X</div>
                    <div className="h-12 border-2 border-amber-500/80 bg-amber-950/40 text-amber-300 font-bold rounded flex items-center justify-center text-base">Y</div>
                    <div className="h-12 border-2 border-red-500/80 bg-red-950/40 text-red-300 font-bold rounded flex items-center justify-center text-base">Z</div>
                    <div className="h-12 border-2 border-blue-500/80 bg-blue-950/40 text-blue-300 font-bold rounded-full flex items-center justify-center text-base">⊕</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA SECTION */}
        <section className="w-full py-20 bg-[var(--background)]">
          <div className="container-app text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Your quantum journey starts here.</h2>
            <p className="text-[var(--muted-foreground)] max-w-xl mx-auto mb-8 text-base">
              Join students and researchers building real quantum intuition with Egreen Quanta.
            </p>
            <Link href="/login">
              <Button size="lg" className="px-10 py-3 text-base">
                Start Learning
              </Button>
            </Link>
          </div>
        </section>

      </div>
    </AppShell>
  );
}
