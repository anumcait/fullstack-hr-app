#!/usr/bin/env bash
set -e

echo "⏳ Checking if restore is needed …"

DB=hrdb
BACKUP=/pg_restore/hrdb.backup

count=$(psql -U "$POSTGRES_USER" -d "$DB" -t \
        -c "SELECT COUNT(*) FROM pg_tables WHERE schemaname='public';" | xargs)

if [ "$count" -eq 0 ]; then
  echo "📦 Restoring from $BACKUP into $DB …"

  # ── allow 'schema already exists' to be ignored ──
  pg_restore --verbose --no-owner --clean --if-exists \
             -U "$POSTGRES_USER" -d "$DB" "$BACKUP" || status=$?

  # If pg_restore exits 1 (warnings) treat it as success
  if [ "${status:-0}" -gt 1 ]; then
    echo "❌ pg_restore failed (status=$status)"; exit $status
  fi

  echo "✅ Restore finished"
else
  echo "ℹ️  $DB already has $count table(s) – skipping restore"
fi


# #!/usr/bin/env bash
# set -e

# echo "⏳ Restoring from /pg_restore/hrdb.backup..."

# DB=hrdb
# BACKUP=/pg_restore/hrdb.backup

# # restore only if DB is empty
# count=$(psql -U "$POSTGRES_USER" -d "$DB" -t -c \
#         "SELECT COUNT(*) FROM pg_tables WHERE schemaname='public';" | xargs)

# if [ "$count" -eq 0 ]; then
#   echo "📦  Restoring $BACKUP into $DB..."
#   pg_restore --verbose --no-owner -U "$POSTGRES_USER" -d "$DB" "$BACKUP"
#   echo "✅  Restore complete"
# else
#   echo "ℹ️  $DB already populated ($count tables) – skipping restore"
# fi           # ← you were missing this line
