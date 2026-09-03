import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { UserProvider } from '@/contexts/UserContext';
import { CircuitProvider } from '@/contexts/CircuitContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Egreen Quanta - Interactive Quantum Learning',
  description: 'Learn quantum computing by building and simulating circuits.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <UserProvider>
          <CircuitProvider>
            {children}
          </CircuitProvider>
        </UserProvider>
      </body>
    </html>
  );
}
