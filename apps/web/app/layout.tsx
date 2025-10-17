import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Atelier de Travail · Identity System',
  description:
    'A warm, pedagogical design system inspired by workbooks, annotations, and the atelier de travail mindset.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-atelier-paper text-atelier-ink antialiased transition-colors dark:bg-atelier-night dark:text-atelier-parchment">
        <main className="flex min-h-screen flex-col">{children}</main>
      </body>
    </html>
  );
}
