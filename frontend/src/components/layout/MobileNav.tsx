'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, Cpu, Target, UserCircle } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { cn } from '@/lib/utils';

export function MobileNav() {
  const pathname = usePathname();
  const { user } = useUser();

  if (!user) return null;

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/courses', label: 'Learn', icon: BookOpen },
    { href: '/circuit-lab', label: 'Lab', icon: Cpu },
    { href: '/challenges', label: 'Challenges', icon: Target },
    { href: '/profile', label: 'Profile', icon: UserCircle },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-[var(--border-default)] bg-[var(--bg-surface)] px-2 pb-safe">
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.href);
        const Icon = item.icon;
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full gap-1 transition-colors",
              isActive ? "text-[var(--brand-primary)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
