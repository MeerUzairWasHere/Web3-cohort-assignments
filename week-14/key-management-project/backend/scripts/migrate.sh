#!/bin/bash

# Load environment variables from .env file
export $(grep -v '^#' .env | xargs)

# Get the migration name from the first argument, default to "init" if not provided
MIGRATION_NAME=${1:-init}

echo '🟡 - Waiting for database to be ready...'
./wait-for-it.sh "$DATABASE_URL" -- echo '🟢 - Database is ready!'
npx prisma migrate dev --name "$MIGRATION_NAME"
npm run start

