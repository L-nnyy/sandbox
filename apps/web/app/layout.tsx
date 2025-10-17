import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'ACME Web',
  description: 'Starter application for the ACME monorepo',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
        <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 p-6">
          {children}
        </main>
      </body>
    </html>
  );
}
