#!/bin/bash
psql -U postgres -d hrdb < /docker-entrypoint-initdb.d/hrdb-backup.sql
echo "✅ Restore finished"