#!/bin/sh
set -euo pipefail

if [ ! -d "/app/node_modules" ] || [ -z "$(ls -A /app/node_modules 2>/dev/null)" ]; then
  echo "Installing workspace dependencies with pnpm..."

  INSTALL_CMD="pnpm install --ignore-scripts"
  if [ ! -f "/app/pnpm-lock.yaml" ]; then
    INSTALL_CMD="$INSTALL_CMD --no-lockfile"
  fi

  sh -c "$INSTALL_CMD"
fi

echo "Starting Next.js development server..."
exec pnpm dev
