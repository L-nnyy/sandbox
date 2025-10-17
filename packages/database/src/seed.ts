import { Prisma } from '@prisma/client';

import { prisma } from './client';

const sampleRncpTitles: Array<{
  code: string;
  label: string;
  level?: string;
  active?: boolean;
  expiresAt?: Date;
  reacPayload: Prisma.JsonObject;
}> = [
  {
    code: 'RNCP17791',
    label: 'Chef(fe) de projet digital',
    level: '7',
    active: true,
    expiresAt: new Date('2027-12-31T23:59:59.999Z'),
    reacPayload: {
      provider: 'France Compétences',
      lastRevision: '2023-05-12',
      eligibility: ['CPF', 'Contrat de professionnalisation'],
    },
  },
  {
    code: 'RNCP34079',
    label: 'Data analyst',
    level: '6',
    active: true,
    expiresAt: new Date('2026-08-31T23:59:59.999Z'),
    reacPayload: {
      provider: 'France Compétences',
      lastRevision: '2022-11-01',
      eligibility: ['CPF'],
    },
  },
];

const seedRncpTitles = async (): Promise<void> => {
  for (const entry of sampleRncpTitles) {
    const { reacPayload, ...titleData } = entry;

    const rncpTitle = await prisma.rncpTitle.upsert({
      where: { code: entry.code },
      update: {
        label: titleData.label,
        level: titleData.level,
        active: titleData.active ?? true,
        expiresAt: titleData.expiresAt,
      },
      create: {
        code: titleData.code,
        label: titleData.label,
        level: titleData.level,
        active: titleData.active ?? true,
        expiresAt: titleData.expiresAt,
      },
    });

    await prisma.reacCache.upsert({
      where: { rncpTitleId: rncpTitle.id },
      update: {
        payload: reacPayload,
        fetchedAt: new Date(),
      },
      create: {
        rncpTitleId: rncpTitle.id,
        payload: reacPayload,
      },
    });
  }
};

async function main(): Promise<void> {
  await seedRncpTitles();
}

main()
  .then(() => {
    // eslint-disable-next-line no-console
    console.info('Database seeded with sample RNCP metadata.');
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Seeding failed', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
