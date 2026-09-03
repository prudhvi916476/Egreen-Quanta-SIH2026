'use client';

import { AppShell } from '@/components/layout/AppShell';
import { useUser } from '@/contexts/UserContext';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { UserCircle, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, logout } = useUser();
  const router = useRouter();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <AppShell>
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <h1 className="text-display mb-8">Profile</h1>
        
        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <UserCircle className="h-24 w-24 text-[var(--text-muted)] mb-4" />
            <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
            <p className="text-[var(--text-secondary)] mb-6">Demo Learner Account</p>
            
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
