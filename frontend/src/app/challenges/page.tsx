'use client';

import { useEffect, useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { getChallenges } from '@/services/assessmentApi';
import { Challenge } from '@/types/learning';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Target, CheckCircle2, ChevronRight, BrainCircuit, PlayCircle, Lock } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/contexts/UserContext';

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const { progress } = useUser();

  useEffect(() => {
    getChallenges().then(setChallenges);
  }, []);

  return (
    <AppShell>
      <div className="bg-[var(--background)] min-h-screen py-10 md:py-16">
        <div className="container-app max-w-5xl">
          
          <div className="mb-10 border-b border-[var(--border)] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-page-title mb-2">Quantum Challenges</h1>
              <p className="text-[var(--muted-foreground)] max-w-2xl text-base">
                Test your knowledge by solving practical quantum circuit challenges. Earn mastery points for completing them successfully.
              </p>
            </div>
            
            <div className="bg-white border border-[var(--border)] rounded-lg p-4 flex items-center gap-4 shrink-0 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-indigo-50 text-[var(--primary)] flex items-center justify-center font-bold text-lg">
                {progress?.overallMastery || 0}
              </div>
              <div>
                <div className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wider">Total Score</div>
                <div className="text-sm font-semibold text-[var(--foreground)]">Mastery Points</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {challenges.map((challenge, i) => {
              const isLocked = i > 1; // Just for demo UI

              return (
                <Card 
                  key={challenge.id} 
                  className={`bg-white border-[var(--border)] shadow-sm transition-all ${isLocked ? 'opacity-75' : 'hover:shadow-md hover:border-[var(--primary)] group'}`}
                >
                  <CardContent className="p-0 flex flex-col sm:flex-row">
                    
                    {/* Status Indicator Sidebar */}
                    <div className={`w-full sm:w-24 flex items-center justify-center p-4 border-b sm:border-b-0 sm:border-r border-[var(--border)] shrink-0
                      ${challenge.status === 'passed' ? 'bg-emerald-50' : isLocked ? 'bg-gray-50' : 'bg-indigo-50'}`}>
                      {challenge.status === 'passed' ? (
                        <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                      ) : isLocked ? (
                        <Lock className="h-8 w-8 text-gray-400" />
                      ) : (
                        <BrainCircuit className="h-8 w-8 text-[var(--primary)]" />
                      )}
                    </div>

                    {/* Challenge Details */}
                    <div className="p-6 flex-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded
                            ${isLocked ? 'bg-gray-100 text-gray-600' : 'bg-indigo-50 text-[var(--primary)]'}`}>
                            {challenge.difficulty}
                          </span>
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border
                            ${isLocked ? 'bg-white border-gray-200 text-gray-500' : 'bg-white border-[var(--primary)] text-[var(--primary)]'}`}>
                            {challenge.type}
                          </span>
                        </div>
                        
                        <h3 className={`text-lg font-bold mb-1 ${isLocked ? 'text-gray-500' : 'text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors'}`}>
                          {challenge.title}
                        </h3>
                        <p className="text-sm text-[var(--muted-foreground)] line-clamp-2 max-w-xl">
                          {challenge.description}
                        </p>
                      </div>
                      
                      <div className="shrink-0 flex items-center gap-4 w-full sm:w-auto border-t sm:border-t-0 border-[var(--border)] pt-4 sm:pt-0">
                        {challenge.score !== undefined && (
                          <div className="text-right px-4 border-r border-[var(--border)]">
                            <div className="text-xl font-bold text-emerald-600">{challenge.score}%</div>
                            <div className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider">Score</div>
                          </div>
                        )}
                        
                        {isLocked ? (
                          <Button disabled variant="outline" className="w-full sm:w-auto bg-gray-50 text-gray-400">
                            Locked
                          </Button>
                        ) : (
                          <Link href={`/challenges/${challenge.slug}`} className="w-full sm:w-auto">
                            <Button className="w-full sm:w-auto">
                              <PlayCircle className="mr-2 h-4 w-4" /> 
                              {challenge.status === 'passed' ? 'Review' : 'Start'}
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>

                  </CardContent>
                </Card>
              );
            })}
          </div>

        </div>
      </div>
    </AppShell>
  );
}
