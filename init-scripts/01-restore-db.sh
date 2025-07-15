#!/usr/bin/env bash
set -euo pipefail

echo "🟡  01‑restore‑db.sh running …"

until pg_isready -U "$POSTGRES_USER" -d "$POSTGRES_DB" >/dev/null 2>&1 ; do
  sleep 1
done

echo "📦  Restoring $POSTGRES_DB from /pg_restore/hrdb.backup …"
psql      -U "$POSTGRES_USER" -c "DROP DATABASE IF EXISTS \"$POSTGRES_DB\";"
psql      -U "$POSTGRES_USER" -c "CREATE DATABASE        \"$POSTGRES_DB\";"
pg_restore --no-owner --clean --if-exists \
           -U "$POSTGRES_USER" -d "$POSTGRES_DB" /pg_restore/hrdb.backup

echo "✅ Restore finished"