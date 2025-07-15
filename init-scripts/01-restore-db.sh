#!/bin/bash
set -e

echo "⏳ Restoring …"
/usr/bin/psql -U postgres -d hrdb < /pg_restore/backup.sql
echo "✅ Restore finished"