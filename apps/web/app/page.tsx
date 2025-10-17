import { Button } from '@acme/ui';
import { optionalEnv } from '@acme/shared';

const apiUrl = optionalEnv('NEXT_PUBLIC_API_URL', 'http://localhost:3000/api');

export default function HomePage() {
  return (
    <section className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold text-slate-900">Welcome to the ACME monorepo</h1>
        <p className="text-slate-600">
          This Next.js application is powered by a pnpm workspace that shares UI components, utilities,
          and configuration across the repository.
        </p>
      </header>

      <div className="flex flex-col gap-2 text-sm text-slate-500">
        <p>
          Shared tooling is already wired up for TypeScript project references, ESLint, Prettier, Husky,
          lint-staged, and TailwindCSS.
        </p>
        <p>
          Update your environment files to point at the right services. The current API URL is set to:
        </p>
        <code className="w-fit rounded bg-slate-900 px-2 py-1 font-mono text-xs text-white">{apiUrl}</code>
      </div>

      <div>
        <Button type="button" variant="primary">
          Explore the monorepo
        </Button>
      </div>
    </section>
  );
}
