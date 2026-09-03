import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t border-[var(--border)] bg-white py-12 md:py-16">
      <div className="container-app">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="bg-[var(--primary)] text-white p-1 rounded-md flex items-center justify-center">
                <span className="font-bold font-serif text-sm leading-none">E</span>
                <span className="font-bold font-serif text-sm leading-none -ml-[1px]">Q</span>
              </div>
              <span className="font-bold tracking-tight text-[var(--foreground)]">
                Egreen Quanta
              </span>
            </Link>
            <p className="text-sm text-[var(--muted-foreground)] max-w-xs leading-relaxed">
              An interactive quantum computing learning platform built for the SIH 2026 hackathon. Empowering the next generation of quantum engineers.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-[var(--foreground)] mb-4 text-sm">Platform</h4>
            <ul className="space-y-3 text-sm text-[var(--muted-foreground)]">
              <li><Link href="/courses" className="hover:text-[var(--primary)] transition-colors">Course Catalog</Link></li>
              <li><Link href="/circuit-lab" className="hover:text-[var(--primary)] transition-colors">Circuit Lab</Link></li>
              <li><Link href="/challenges" className="hover:text-[var(--primary)] transition-colors">Challenges</Link></li>
              <li><Link href="/dashboard" className="hover:text-[var(--primary)] transition-colors">My Learning</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-[var(--foreground)] mb-4 text-sm">Resources</h4>
            <ul className="space-y-3 text-sm text-[var(--muted-foreground)]">
              <li><a href="#" className="hover:text-[var(--primary)] transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-[var(--primary)] transition-colors">Quantum Glossary</a></li>
              <li><a href="#" className="hover:text-[var(--primary)] transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-[var(--primary)] transition-colors">Help Center</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[var(--foreground)] mb-4 text-sm">Legal</h4>
            <ul className="space-y-3 text-sm text-[var(--muted-foreground)]">
              <li><a href="#" className="hover:text-[var(--primary)] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[var(--primary)] transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[var(--border)] text-sm text-[var(--muted-foreground)]">
          <p>© 2026 Egreen Quanta. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span>SIH 2026 Submission</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
