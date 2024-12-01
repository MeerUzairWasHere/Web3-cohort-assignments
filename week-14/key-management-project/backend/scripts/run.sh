# Load environment variables from .env file
export $(grep -v '^#' .env | xargs)

# Get the migration name from the first argument, default to "init" if not provided
MIGRATION_NAME=${1:-init}

npx prisma generate
npm run start
