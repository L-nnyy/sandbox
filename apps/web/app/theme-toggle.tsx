'use client';

import { useEffect, useState } from 'react';
import { Button } from '@acme/ui';

type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'atelier-theme-preference';

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    const nextTheme = stored ?? (prefersDark ? 'dark' : 'light');

    setTheme(nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme, ready]);

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  const label = ready
    ? theme === 'dark'
      ? 'Switch to light canvas'
      : 'Switch to dark canvas'
    : 'Calibrating theme…';

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      aria-pressed={theme === 'dark'}
      aria-label="Toggle between light and dark modes"
      disabled={!ready}
    >
      {label}
    </Button>
  );
};
