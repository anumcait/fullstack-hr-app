#!/bin/bash

# # Set timestamp
# TIMESTAMP=$(date +%Y%m%d%H%M%S)

# # 1. Create backup file inside container
# docker exec -u postgres hr_postgres \
#   pg_dump -Fc -d hrdb -f /pg_backup/hrdb_${TIMESTAMP}.dump

# # 2. Copy from container to host
# docker cp hr_postgres:/pg_backup ./pg_backup

# echo "✅ Backup completed: ./pg_backup/hrdb_${TIMESTAMP}.dump"

docker exec hr_postgres chown -R postgres:postgres pg_backup && docker exec -u postgres hr_postgres bash -c 'pg_dump -Fc -d hrdb -f /pg_backup/hrdb_temp.dump' && docker cp hr_postgres:/pg_backup/hrump' && docker cp hr_postgres:/pg_backup/hrdb_temp.dump ./pg_restore/hrdb.backup
Successfully copied 24.1kB to D:\Fullstack-hr-app\pg_restore\hrdb.backup