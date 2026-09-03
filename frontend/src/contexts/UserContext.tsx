'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { LearnerProgress } from '@/types/learning';
import { getProgress } from '@/services/progressApi';

interface UserContextState {
  user: { name: string; id: string } | null;
  progress: LearnerProgress | null;
  loginAsDemoUser: () => void;
  logout: () => void;
  refreshProgress: () => Promise<void>;
  isLoading: boolean;
}

const UserContext = createContext<UserContextState | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ name: string; id: string } | null>(null);
  const [progress, setProgress] = useState<LearnerProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProgress = async () => {
    try {
      const p = await getProgress();
      setProgress(p);
    } catch (e) {
      console.error('Failed to load progress', e);
    }
  };

  useEffect(() => {
    // Check local storage for mock session
    const savedUser = localStorage.getItem('quanta_demo_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      fetchProgress().finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const loginAsDemoUser = () => {
    const demoUser = { name: 'Demo Learner', id: 'demo-user' };
    setUser(demoUser);
    localStorage.setItem('quanta_demo_user', JSON.stringify(demoUser));
    fetchProgress();
  };

  const logout = () => {
    setUser(null);
    setProgress(null);
    localStorage.removeItem('quanta_demo_user');
  };

  return (
    <UserContext.Provider
      value={{
        user,
        progress,
        loginAsDemoUser,
        logout,
        refreshProgress: fetchProgress,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
