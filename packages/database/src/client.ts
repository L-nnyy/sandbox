import { PrismaClient } from '@prisma/client';

import { getDatabaseConfig } from './config';

type PrismaGlobal = {
  __acmePrisma__?: PrismaClient;
};

const getPrismaFromGlobal = (): PrismaClient | undefined => {
  return (globalThis as unknown as PrismaGlobal).__acmePrisma__;
};

const setPrismaOnGlobal = (client: PrismaClient): void => {
  (globalThis as unknown as PrismaGlobal).__acmePrisma__ = client;
};

const instantiatePrisma = (): PrismaClient => {
  const { url } = getDatabaseConfig();

  return new PrismaClient({
    datasources: {
      db: { url },
    },
  });
};

export const createPrismaClient = instantiatePrisma;

export const prisma: PrismaClient = getPrismaFromGlobal() ?? instantiatePrisma();

if (process.env.NODE_ENV !== 'production') {
  setPrismaOnGlobal(prisma);
}
