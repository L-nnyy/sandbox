# syntax=docker/dockerfile:1.6
FROM node:20-bookworm-slim

ENV PNPM_HOME=/pnpm
ENV PNPM_STORE_DIR=/pnpm/store
ENV PATH="${PNPM_HOME}:${PATH}"

WORKDIR /app

RUN corepack enable \
  && corepack prepare pnpm@8.15.5 --activate \
  && apt-get update \
  && apt-get install -y --no-install-recommends build-essential python3 ca-certificates git \
  && rm -rf /var/lib/apt/lists/* \
  && mkdir -p "${PNPM_HOME}" "${PNPM_STORE_DIR}"

RUN chown -R node:node /app "${PNPM_HOME}" "${PNPM_STORE_DIR}"
USER node

COPY --chown=node:node package.json pnpm-workspace.yaml ./
COPY --chown=node:node apps/web/package.json apps/web/
COPY --chown=node:node packages/shared/package.json packages/shared/
COPY --chown=node:node packages/ui/package.json packages/ui/
COPY --chown=node:node packages/database/package.json packages/database/

EXPOSE 3000

CMD ["pnpm", "dev"]
