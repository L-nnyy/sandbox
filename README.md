# ACME Monorepo

This repository is a pnpm-powered monorepo that houses a Next.js web application and shared packages for UI components, environment utilities, and future database integrations.

## Getting started

1. Install dependencies using [pnpm](https://pnpm.io):

   ```bash
   pnpm install
   ```

   > When adding or updating dependencies, always commit the generated `pnpm-lock.yaml` so CI can reuse cached installs.

2. Copy the example environment file and adjust the values to match your local setup:

   ```bash
   cp .env.example .env.local
   cp apps/web/.env.local.example apps/web/.env.local
   ```

3. Run the development server:

   ```bash
   pnpm dev
   ```

## Tooling

- **TypeScript** project references ensure type safety across packages (`pnpm typecheck`).
- **ESLint** and **Prettier** maintain consistent code quality (`pnpm lint`, `pnpm format`).
- **Husky** and **lint-staged** run linting and formatting on staged changes before commits.
- **Tailwind CSS** is configured for the Next.js App Router.
- **dotenv-flow** powers environment variable management with layered `.env` files.

## Workspace layout

```
apps/
  web/          # Next.js App Router project
packages/
  shared/       # Shared utilities (including environment helpers)
  ui/           # Reusable UI components
  database/     # Database helpers and configuration
```

Update or expand the packages as your project grows, and enjoy the shared tooling configured out of the box.
