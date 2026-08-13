#!/bin/sh
set -e

if [ -n "${DATABASE_URL:-}" ]; then
  echo "Waiting for database..."
  i=0
  until node node_modules/prisma/build/index.js migrate deploy; do
    i=$((i+1))
    if [ "$i" -ge 30 ]; then
      echo "Database not reachable after 30 attempts, giving up."
      exit 1
    fi
    echo "Database not ready (attempt $i/30), retrying in 5s..."
    sleep 5
  done
fi

exec node server.js
