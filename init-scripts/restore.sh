#!/bin/bash
set -e
DB=hrdb
BACKUP=/pg_restore/hrdb.backup

# restore only if DB is empty
count=$(psql -U $POSTGRES_USER -d $DB -t -c "SELECT COUNT(*) FROM pg_tables WHERE schemaname='public';" | xargs)
if [ "$count" -eq 0 ]; then
  echo "📦  Restoring $BACKUP into $DB..."
  pg_restore -U $POSTGRES_USER -d $DB "$BACKUP"
  echo "✅  Restore complete"
else
  echo "ℹ️  $DB already populated ($count tables) – skipping restore"
fi