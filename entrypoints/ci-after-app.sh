#!/bin/sh
set -e

wait4ports -t 3 "tcp://everglot-db:5432"
wait4ports -t 10 "tcp://everglot-app:3000"

exec "$@"
