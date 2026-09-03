'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Bell, HelpCircle, User, LogOut, Grid } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useUser();

  const isAuth = !!user;

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const isActive = pathname.startsWith(href) && (href !== '/' || pathname === '/');
    return (
      <Link
        href={href}
        className={`text-sm font-medium transition-colors hover:text-[var(--primary)] ${
          isActive ? 'text-[var(--primary)]' : 'text-[var(--muted-foreground)]'
        }`}
      >
        {children}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-white">
      <div className="flex h-[var(--nav-height)] items-center px-4 md:px-8 max-w-[1440px] mx-auto gap-8">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="bg-[var(--primary)] text-white p-1.5 rounded-md flex items-center justify-center">
            <span className="font-bold font-serif text-lg leading-none">E</span>
            <span className="font-bold font-serif text-lg leading-none -ml-0.5">Q</span>
          </div>
          <span className="font-bold text-lg tracking-tight text-[var(--foreground)]">
            Egreen Quanta
          </span>
        </Link>
        
        {/* Center-Left: Navigation (Desktop) */}
        {isAuth && (
          <nav className="hidden md:flex items-center gap-6">
            <NavLink href="/dashboard">Dashboard</NavLink>
            <NavLink href="/courses">Courses</NavLink>
            <NavLink href="/circuit-lab">Circuit Lab</NavLink>
            <NavLink href="/challenges">Challenges</NavLink>
          </nav>
        )}

        {/* Center: Search */}
        {isAuth && (
          <div className="hidden lg:flex flex-1 max-w-xl mx-auto">
            <div className="relative w-full text-[var(--muted-foreground)] focus-within:text-[var(--foreground)] group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
              <input
                type="search"
                placeholder="Search courses, concepts, circuits..."
                className="w-full h-10 rounded-full border border-[var(--input)] bg-[var(--background)] pl-10 pr-4 text-sm outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all group-hover:border-[var(--border-strong)]"
              />
            </div>
          </div>
        )}

        {/* Right: Actions */}
        <div className="flex items-center gap-4 ml-auto shrink-0">
          {isAuth ? (
            <>
              <Button variant="ghost" size="icon" className="hidden sm:flex text-[var(--muted-foreground)]">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hidden sm:flex text-[var(--muted-foreground)]">
                <HelpCircle className="h-5 w-5" />
              </Button>
              
              <div className="h-8 w-px bg-[var(--border)] mx-2 hidden sm:block" />
              
              <div className="flex items-center gap-3 cursor-pointer group relative">
                <div className="h-8 w-8 rounded-full bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center font-bold text-sm">
                  {user.name.charAt(0)}
                </div>
                
                {/* Simple dropdown mock */}
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-[var(--border)] shadow-lg rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="p-3 border-b border-[var(--border)]">
                    <div className="font-medium text-sm text-[var(--foreground)]">{user.name}</div>
                    <div className="text-xs text-[var(--muted-foreground)]">Demo Learner</div>
                  </div>
                  <div className="p-1">
                    <button 
                      onClick={logout}
                      className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-sm flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" /> Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-medium hover:text-[var(--primary)]">Log in</Link>
              <Link href="/login">
                <Button>Start Learning</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
