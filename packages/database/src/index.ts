import { requireEnv } from '@acme/shared';

export type DatabaseConfig = {
  url: string;
};

export const getDatabaseConfig = (): DatabaseConfig => ({
  url: requireEnv('DATABASE_URL'),
});
