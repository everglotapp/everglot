#!/bin/sh
set -e

wait4ports -t 5 "tcp://everglot-db:5432"
wait4ports -t 60 "tcp://everglot-app:3000"

exec "$@"
