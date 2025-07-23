#!/bin/bash

# Set timestamp
TIMESTAMP=$(date +%Y%m%d%H%M%S)

# 1. Create backup file inside container
docker exec -u postgres hr_postgres \
  pg_dump -Fc -d hrdb -f /pg_backup/hrdb_${TIMESTAMP}.dump

# 2. Copy from container to host
docker cp hr_postgres:/pg_backup ./pg_backup

echo "✅ Backup completed: ./pg_backup/hrdb_${TIMESTAMP}.dump"
