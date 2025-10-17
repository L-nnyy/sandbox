#!/bin/bash
set -euo pipefail

# Enable pgvector in the default database as well as the dev/test databases.
databases=()

if [ -n "${POSTGRES_DB:-}" ]; then
  databases+=("${POSTGRES_DB}")
fi

databases+=("acme_dev" "acme_test")

for db in "${databases[@]}"; do
  echo "Enabling pgvector extension in database: ${db}"
  psql --username "${POSTGRES_USER}" --dbname "${db}" -v ON_ERROR_STOP=1 <<'SQL'
    CREATE EXTENSION IF NOT EXISTS vector;
SQL
done
