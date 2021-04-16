#!/bin/sh
set -e

wait4ports "tcp://everglot-db:5432"

# Note: Migrations should be run manually in development!
# Run them using:
# PGHOST=localhost PGDATABASE=everglot_app_db PGUSER=everglot_app_user PGPASSWORD=everglot_app_pass docker-compose -f docker-compose.yml -f docker-compose.dev.yml exec everglot-app "npm run migrate up"

exec "$@"
