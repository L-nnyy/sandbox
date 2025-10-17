import type { DotenvConfigOptions } from 'dotenv-flow';
import { config as loadDotenv } from 'dotenv-flow';

let isLoaded = false;

export const loadEnv = (options?: DotenvConfigOptions): void => {
  if (isLoaded) {
    return;
  }

  loadDotenv({ silent: true, ...options });
  isLoaded = true;
};

export const requireEnv = (key: string, fallback?: string): string => {
  loadEnv();

  const value = process.env[key];
  if (value === undefined || value === '') {
    if (fallback !== undefined) {
      return fallback;
    }

    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
};

export const optionalEnv = (key: string, fallback?: string): string | undefined => {
  loadEnv();
  const value = process.env[key];
  return value ?? fallback;
};

export const env = new Proxy(
  {},
  {
    get: (_, key: string | symbol) => requireEnv(String(key)),
  },
) as Record<string, string>;
