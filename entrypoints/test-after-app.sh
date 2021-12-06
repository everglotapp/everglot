#!/bin/sh
set -e

wait4ports -t 5 "tcp://everglot-db:5432"
wait4ports -t 100 -s 3 "tcp://everglot-app:30001"

exec "$@"
