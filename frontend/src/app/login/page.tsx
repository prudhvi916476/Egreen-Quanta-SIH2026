'use client';

import { AppShell } from '@/components/layout/AppShell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useUser } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Atom } from 'lucide-react';

export default function LoginPage() {
  const { user, loginAsDemoUser, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user && !isLoading) {
      router.push('/dashboard');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-[var(--bg-base)]">Loading...</div>;
  }

  return (
    <AppShell>
      <div className="min-h-[calc(100vh-var(--nav-height))] flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg border-[var(--border-default)]">
          <CardHeader className="text-center pb-8 pt-8">
            <div className="mx-auto bg-[var(--brand-primary)] w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-sm">
              <Atom className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl">Welcome to Quanta</CardTitle>
            <CardDescription>
              SIH 2026 Hackathon Demo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-[var(--bg-subtle)] rounded-lg text-sm text-[var(--text-secondary)] border border-[var(--border-default)]">
              This is a demonstration environment. Authentication is mocked for the frontend MVP. Click below to enter as a demo learner with pre-loaded progress.
            </div>
          </CardContent>
          <CardFooter className="pb-8">
            <Button 
              className="w-full" 
              size="lg" 
              onClick={() => {
                loginAsDemoUser();
              }}
            >
              Enter as Demo Learner
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AppShell>
  );
}
