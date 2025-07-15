#!/usr/bin/env bash
set -euo pipefail

echo "⏳ Waiting for PostgreSQL to accept connections…"
until pg_isready -U postgres -d "$POSTGRES_DB" >/dev/null 2>&1; do
  sleep 1
done
echo "✅ PostgreSQL is up."

echo "📦 Restoring $POSTGRES_DB from /pg_restore/hrdb.backup …"
# Drop + recreate database to guarantee a clean restore
psql -U postgres -c "DROP DATABASE IF EXISTS \"$POSTGRES_DB\";"
psql -U postgres -c "CREATE DATABASE \"$POSTGRES_DB\";"
pg_restore --no-owner --clean --if-exists \
           -U postgres -d "$POSTGRES_DB" /pg_restore/hrdb.backup

echo "✅ Restore finished"


# #!/usr/bin/env bash
# # init-scripts/01-restore-db.sh
# set -euo pipefail

# DB=hrdb
# USER=postgres
# BACKUP_FILE=/pg_restore/hrdb.backup   # make sure this path is mounted!

# echo "⏳ Waiting for PostgreSQL to become ready..."
# until pg_isready -U "$USER" -d "$DB" >/dev/null 2>&1; do
#   sleep 2
# done
# echo "✅ PostgreSQL is accepting connections."

# # If you dumped with pg_dump -Fc (custom format) use pg_restore:
# echo "📦 Restoring $DB from backup ($BACKUP_FILE)..."
# pg_restore --clean --if-exists --no-owner \
#            -U "$USER" -d "$DB" "$BACKUP_FILE"

# echo "🗄️  Restore completed for $DB."
# echo "✅ Restore finished"


# #!/usr/bin/env bash
# set -e

# echo "⏳ Checking if restore is needed …"

# DB=hrdb
# BACKUP=/pg_restore/hrdb.backup

# count=$(psql -U "$POSTGRES_USER" -d "$DB" -t \
#         -c "SELECT COUNT(*) FROM pg_tables WHERE schemaname='public';" | xargs)

# if [ "$count" -eq 0 ]; then
#   echo "📦 Restoring from $BACKUP into $DB …"

#   # ── allow 'schema already exists' to be ignored ──
#   pg_restore --verbose --no-owner --clean --if-exists \
#              -U "$POSTGRES_USER" -d "$DB" "$BACKUP" || status=$?

#   # If pg_restore exits 1 (warnings) treat it as success
#   if [ "${status:-0}" -gt 1 ]; then
#     echo "❌ pg_restore failed (status=$status)"; exit $status
#   fi

#   echo "✅ Restore finished"
# else
#   echo "ℹ️  $DB already has $count table(s) – skipping restore"
# fi


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
