#!/bin/sh

set -e

wait4ports -t 10 "tcp://everglot-db:5432"

# Migrations must be run manually in production!
# Run them using:
# PGHOST=<host> PGPORT=<port> PGDATABASE=everglot_app_db PGUSER=<user> PGPASSWORD=<pw> docker-compose -f docker-compose.yml -f docker-compose.prod.yml exec everglot-app "npm run migrate up"

exec "$@"
