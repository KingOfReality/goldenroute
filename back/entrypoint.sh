#!/bin/sh
until nc -z -v -w30 postgres 5432
do
  echo "Waiting for PostgreSQL database connection..."
  sleep 1
done
cd /app/db
npx prisma migrate dev deploy
cd /app

exec "$@"
