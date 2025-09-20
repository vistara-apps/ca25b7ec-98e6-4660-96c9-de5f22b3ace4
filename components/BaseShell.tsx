'use client';

import { ReactNode } from 'react';

interface BaseShellProps {
  children: ReactNode;
}

export function BaseShell({ children }: BaseShellProps) {
  return (
    <div className="min-h-screen gradient-bg">
      <div className="max-w-md mx-auto bg-white/5 backdrop-blur-sm min-h-screen">
        <main className="relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
}
