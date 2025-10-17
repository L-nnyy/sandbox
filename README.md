# ACME Monorepo

This repository is a pnpm-powered monorepo that houses a Next.js web application and shared packages for UI components, environment utilities, and future database integrations.

## Getting started

1. Install dependencies using [pnpm](https://pnpm.io):

   ```bash
   pnpm install
   ```

2. Copy the example environment file and adjust the values to match your local setup:

   ```bash
   cp .env.example .env.local
   cp apps/web/.env.local.example apps/web/.env.local
   ```

3. Run the development server:

   ```bash
   pnpm dev
   ```

   To run the same setup inside Docker, use:

   ```bash
   pnpm dev:docker
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

## Containerized development environment

A Docker Compose stack is available for local development. It runs the Next.js dev server alongside PostgreSQL 15 with the pgvector extension enabled so you can work against the same services the application expects in production.

### Services

- **web** – builds the repository image and runs `pnpm dev` with hot reloading.
- **db** – `pgvector/pgvector:pg15` with the `vector` extension enabled.

### Usage

1. Ensure Docker Engine (with Compose v2) is installed.
2. Start the stack (this also installs pnpm dependencies in the container on first run):

   ```bash
   pnpm dev:docker
   ```

   Add the `--build` flag (for example, `pnpm dev:docker -- --build`) if you need Docker to rebuild the images after changing dependencies or base images.

   Use `pnpm dev:docker:detached` to keep the stack running in the background. Bring everything down with:

   ```bash
   pnpm docker:down
   ```

3. The web app is available at [http://localhost:3000](http://localhost:3000) and PostgreSQL listens on `localhost:5432`.

### Database bootstrap

- `docker/postgres/init/01-create-databases.sql` provisions separate `acme_dev` and `acme_test` databases.
- `docker/postgres/init/02-enable-extensions.sh` enables the `vector` extension in each database so the pgvector data type is ready to use.
- `.env.example` now exposes matching `DATABASE_URL` and `TEST_DATABASE_URL` values you can reuse in application code and scripts.
- Default credentials are `postgres` / `postgres`, matching the Compose configuration.
- Run `docker compose down --volumes` if you need to reset the database and rerun the initialization scripts.

### Seeding data

Seed SQL files live in `docker/postgres/seeds` and are mounted read-only at `/seed` inside the database container. Add your INSERT statements to `docker/postgres/seeds/base_seed.sql` and execute them with (ensure the Docker stack is running first):

```bash
pnpm db:seed
```

You can also drop into `psql` directly:

```bash
docker compose exec db psql -U postgres -d acme_dev
```

Swap `acme_dev` for `acme_test` in the commands above if you need to seed or inspect the test database instead.

Run your test suite against `TEST_DATABASE_URL` to keep environments isolated.
