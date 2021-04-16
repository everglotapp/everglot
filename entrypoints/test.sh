#!/bin/sh
set -e

wait4ports -t 5 "tcp://everglot-db:5432"

npm run migrate up

exec "$@"
